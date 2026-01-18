"use server";

import { randomUUID } from "node:crypto";
import { Readable } from "node:stream";
import Papa, { type ParseStepResult } from "papaparse";
import { getRequestInfo } from "rwsdk/worker";
import { Transaction } from "../models/transaction";

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

async function extractCsvData(file: File): Promise<Array<Transaction>> {
  const { promise, resolve, reject } = Promise.withResolvers<Array<Transaction>>();
  const rows: Array<Transaction> = [];

  const onRow = (row: ParseStepResult<InputFileSchema>) => {
    rows.push({
      id: randomUUID(),
      date: new Date(row.data["Transaction Date"]).toISOString(),
      payee: row.data["Description 1"],
      amount: Number(row.data["CAD$"]),
      categoryId: "0",
      source: "csv",
      status: "unreviewed",
      createdDateTime: new Date().toISOString(),
      updatedDateTime: new Date().toISOString(),
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

export async function processCsvUpload(file: File): Promise<Array<Transaction>> {
  console.log(`Starting csv processing on server`);
  const transactions = await extractCsvData(file);

  // TODO: Replace with save to DB
  const { ctx } = getRequestInfo();
  ctx.transactions = transactions;

  return transactions;
}
