"use server";

import { db } from "../db";

/**
 * Delete transactions server function
 *
 * @param transactionIds Array of transaction IDs to delete
 * @returns Number of deleted transactions
 */
export async function deleteTransactions(transactionIds: Array<string>): Promise<number> {
  const batch = 50;
  let deleted = 0;

  console.log("Delete transactions request", transactionIds);

  for (let i = 0; i < transactionIds.length; i += batch) {
    const [result] = await db
      .deleteFrom("transactions")
      .where("id", "in", transactionIds.slice(i, i + batch))
      .execute();
    deleted += Number(result.numDeletedRows);
  }

  console.log("Deleted transactions", deleted);
  return deleted;
}

/**
 * Get transactions grouped and aggregated by category
 *
 * @returns Array of transactions grouped by category
 */
export async function getTransactionsByCategory() {
  return db
    .selectFrom("transactions as t")
    .innerJoin("predictions as p", "p.transactionId", "t.id")
    .innerJoin("categories as c", "c.id", "p.categoryId")
    .select("c.name")
    .select(({ fn }) => fn.sum("t.amount").as("value"))
    .groupBy("c.name")
    .execute();
}
