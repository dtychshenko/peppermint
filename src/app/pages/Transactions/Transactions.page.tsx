import { Suspense } from "react";
import { RequestInfo } from "rwsdk/worker";
import { TableSkeleton } from "./parts/TableSkeleton";
import { TransactionsTable } from "./parts/TransactionsTable";
import { ZeroState } from "./parts/ZeroState";

async function Transactions({ ctx }: Pick<RequestInfo, "ctx">) {
  // TODO: replace ctx with DB call
  if (!ctx?.transactions?.length) {
    return <ZeroState />;
  }

  return <TransactionsTable transactions={ctx.transactions} />;
}

export default async function TransactionsPage(request: RequestInfo) {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <Transactions ctx={request.ctx} />
    </Suspense>
  );
}
