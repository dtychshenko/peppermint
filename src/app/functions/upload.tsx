"use server";

import { randomUUID } from "node:crypto";
import { Readable } from "node:stream";
import Papa, { type ParseStepResult } from "papaparse";
import { db, TransactionDAO } from "../db";
import { partition } from "../utils/collections";

// Warn: require fixed input file schema for POC purposes
interface InputFileSchema {
  ["Account Type"]: string;
  ["Account Number"]: string;
  ["Transaction Date"]: string;
  ["Cheque Number"]: string;
  ["Description 1"]: string;
  ["Description 2"]: string;
  ["CAD$"]: string;
  ["USD$"]: string;
}

// This can happen if
const UNIQUE_TRANSACTION_ERROR =
  "UNIQUE constraint failed: transactions.date, transactions.payee, transactions.amount: SQLITE_CONSTRAINT";

async function extractCsvData(file: File): Promise<Array<TransactionDAO>> {
  const { promise, resolve, reject } = Promise.withResolvers<Array<TransactionDAO>>();
  const rows: Array<TransactionDAO> = [];

  const onRow = (row: ParseStepResult<InputFileSchema>) => {
    rows.push({
      id: randomUUID(),
      date: new Date(row.data["Transaction Date"]).getTime(),
      payee: row.data["Description 1"],
      amount: Number(row.data["CAD$"]),
      categoryId: null,
      source: "csv",
      status: "unreviewed",
      createdDateTime: new Date().getTime(),
      updatedDateTime: new Date().getTime(),
      notes: null,
      metadata: null,
    });
  };

  const onError = (error: Error) => {
    console.error("Encountered error while processing file", error);
    reject(error);
  };

  const onComplete = () => {
    console.log(`Finished streaming. Extracted ${rows.length} rows.`);
    resolve(rows);
  };

  const stream = Readable.fromWeb(file.stream() as import("node:stream/web").ReadableStream);
  Papa.parse(stream, {
    header: true,
    skipEmptyLines: "greedy",
    step: onRow,
    error: onError,
    complete: onComplete,
  });

  return promise;
}

export async function processCsvUpload(file: File): Promise<number> {
  console.log(`Starting csv processing on server`);
  const transactions = await extractCsvData(file);

  console.time("Transactions DB insert");
  const results = await Promise.allSettled(
    transactions.map((transaction) => db.insertInto("transactions").values(transaction).execute()),
  );
  console.timeEnd("Transactions DB insert");

  const [successful, failed] = partition(results, (result) => result.status === "fulfilled");
  const [duplicates, others] = partition(
    failed as Array<PromiseRejectedResult>,
    (result) => result.reason.message === UNIQUE_TRANSACTION_ERROR,
  );

  console.log("Successful writes", successful.length);
  console.log("Skipped duplicates", duplicates.length);
  console.log("Failed writes", others);

  return successful.length;
}
