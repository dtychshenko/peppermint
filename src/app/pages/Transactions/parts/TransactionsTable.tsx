"use client";

import { Checkbox, Table } from "@mantine/core";
import { useCallback, useState } from "react";
import { type TableProps, TableVirtuoso } from "react-virtuoso";
import { MAIN_HEADER_HEIGHT } from "../../../config/layout";
import { TransactionDAO } from "../../../db";
import { TransactionRow } from "./TransactionRow";

interface Props {
  transactions: Array<TransactionDAO>;
}

const components = {
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
};

export function TransactionsTable({ transactions }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const onSelect = useCallback((transactionId: string) => {
    setSelected((prev) => {
      const newSelected = new Set(prev);

      if (newSelected.has(transactionId)) {
        newSelected.delete(transactionId);
      } else {
        newSelected.add(transactionId);
      }

      return newSelected;
    });
  }, []);

  const Headers = useCallback(
    () => (
      <Table.Tr>
        <Table.Th w={40}>
          <Checkbox
            checked={selected.size === transactions.length}
            onChange={({ currentTarget: { checked } }) => {
              setSelected(checked ? new Set(transactions.map(({ id }) => id)) : new Set());
            }}
          />
        </Table.Th>
        <Table.Th>Date</Table.Th>
        <Table.Th>Payee</Table.Th>
        <Table.Th align="right">Amount</Table.Th>
      </Table.Tr>
    ),
    [selected.size, transactions.length],
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
      itemContent={(_index, transaction) => (
        <TransactionRow
          transaction={transaction}
          selected={selected.has(transaction.id)}
          onSelect={onSelect}
        />
      )}
    />
  );
}
