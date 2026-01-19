import { Suspense } from "react";
import { db } from "../../db";
import { TableSkeleton } from "./parts/TableSkeleton";
import { TransactionsTable } from "./parts/TransactionsTable";
import { ZeroState } from "./parts/ZeroState";

async function Transactions() {
  const transactions = await db.selectFrom("transactions").selectAll().execute();

  if (!transactions?.length) {
    return <ZeroState />;
  }

  return <TransactionsTable transactions={transactions} />;
}

export default async function TransactionsPage() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <Transactions />
    </Suspense>
  );
}
