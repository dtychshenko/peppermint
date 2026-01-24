"use client";

import { CategorizedTransaction } from "@/app/models/transaction";
import { Checkbox, Table, Transition } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import { type TableProps, TableVirtuoso } from "react-virtuoso";
import { MAIN_HEADER_HEIGHT } from "../../../config/layout";
import { CategoryDAO } from "../../../db";
import { deleteTransactions } from "../../../functions/transactions";
import { TransactionRow } from "./TransactionRow";
import { TransactionsMenu } from "./TransactionsMenu";

interface Props {
  transactions: Array<CategorizedTransaction>;
  categories: Array<CategoryDAO>;
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

export function TransactionsTable({ transactions, categories }: Props) {
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
        <Table.Th>Merchant</Table.Th>
        <Table.Th>Category</Table.Th>
        <Table.Th style={{ textAlign: "right" }}>Amount</Table.Th>
      </Table.Tr>
    ),
    [selected.size, transactions.length],
  );

  const onDelete = useCallback(async () => {
    setSelected(new Set());

    const notificationId = notifications.show({
      loading: true,
      title: "Deleting transactions",
      message: `Removing ${selected.size} selected transactions...`,
      autoClose: false,
      withCloseButton: false,
    });

    await deleteTransactions(Array.from(selected));
    notifications.update({
      id: notificationId,
      color: "green",
      title: "Done!",
      message: `Deleted ${selected.size} transactions`,
      icon: <IconCheck size={18} />,
      loading: false,
      withCloseButton: true,
      autoClose: 5000,
    });
  }, [selected]);

  return (
    <>
      <Transition
        mounted={selected.size > 0}
        transition="slide-left"
        timingFunction="ease"
        duration={300}>
        {(styles) => <TransactionsMenu style={styles} onDelete={onDelete} />}
      </Transition>
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
            categories={categories}
            selected={selected.has(transaction.id)}
            onSelect={onSelect}
          />
        )}
      />
    </>
  );
}
