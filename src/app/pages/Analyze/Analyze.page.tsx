import { Center, Container, Loader } from "@mantine/core";
import { Suspense } from "react";
import { getTransactionsByCategory } from "../../functions/transactions";
import { ByCategory } from "./parts/charts/ByCategory";
import { ZeroState } from "./parts/ZeroState";

async function TransactionsByCategory() {
  const data = await getTransactionsByCategory();

  if (!data?.length) {
    return <ZeroState />;
  }

  return <ByCategory data={data} />;
}

export default async function Analyze() {
  return (
    <Container w="100%" fluid>
      <Center>
        <Suspense fallback={<Loader size="xl" />}>
          <TransactionsByCategory />
        </Suspense>
      </Center>
    </Container>
  );
}
