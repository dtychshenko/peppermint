"use client";

import { Table } from "@mantine/core";
import { useMemo } from "react";
import { type TableProps, TableVirtuoso } from "react-virtuoso";
import { MAIN_HEADER_HEIGHT } from "../../../config/layout";
import { TransactionDAO } from "../../../db";
import { TransactionRow } from "./TransactionRow";

interface Props {
  transactions: Array<TransactionDAO>;
}

const Headers = () => (
  <Table.Tr>
    <Table.Th>Date</Table.Th>
    <Table.Th>Payee</Table.Th>
    <Table.Th align="right">Amount</Table.Th>
  </Table.Tr>
);

export function TransactionsTable({ transactions }: Props) {
  const components = useMemo(
    () => ({
      Table: (props: TableProps) => (
        <Table
          {...props}
          highlightOnHover
          striped
          stickyHeader
          stickyHeaderOffset={MAIN_HEADER_HEIGHT}
          style={{ ...props.style, borderCollapse: "separate" }}
        />
      ),
      TableHead: Table.Thead,
      TableRow: Table.Tr,
      TableBody: Table.Tbody,
    }),
    [],
  );

  return (
    <TableVirtuoso
      data={transactions}
      useWindowScroll
      minOverscanItemCount={50}
      defaultItemHeight={40}
      fixedItemHeight={40}
      components={components}
      fixedHeaderContent={Headers}
      computeItemKey={(_index, item) => item.id}
      itemContent={(_index, transaction) => <TransactionRow transaction={transaction} />}
    />
  );
}
