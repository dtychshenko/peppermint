import { MethodHandlers } from "rwsdk/router";
import { RequestInfo } from "rwsdk/worker";
import { deleteTransactions as deleteTransactionsFn } from "../functions/transactions";

/**
 * Delete transactions
 *
 * DELETE: /api/transactions
 * Content-Type: application/json
 * Body: Array of transaction IDs to delete
 *
 * @param requestInfo Request with JSON body of transaction IDs to delete
 * @returns 204 No Content
 */
async function deleteTransactions({ request }: RequestInfo) {
  const transactionIds: Array<string> = await request.json();
  await deleteTransactionsFn(transactionIds);
  return new Response(null, { status: 204 });
}

export const TransactionsApi: MethodHandlers = {
  delete: deleteTransactions,
} as const;
