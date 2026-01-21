import { Suspense } from "react";
import { db } from "../../db";
import { TableSkeleton } from "./parts/TableSkeleton";
import { TransactionsTable } from "./parts/TransactionsTable";
import { ZeroState } from "./parts/ZeroState";

async function Transactions() {
  const transactions = await db
    .selectFrom("transactions")
    .selectAll("transactions")
    .select((eb) =>
      eb
        .selectFrom("predictions as p")
        .innerJoin("categories as c", "c.id", "p.categoryId")
        .select("c.id")
        .whereRef("p.transactionId", "=", "transactions.id")
        .orderBy("p.createdDateTime", "asc")
        .limit(1)
        .as("categoryId"),
    )
    .orderBy("transactions.date", "desc")
    .execute();

  if (!transactions?.length) {
    return <ZeroState />;
  }

  const categories = await db.selectFrom("categories").selectAll("categories").execute();
  return <TransactionsTable transactions={transactions} categories={categories} />;
}

export default async function TransactionsPage() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <Transactions />
    </Suspense>
  );
}
