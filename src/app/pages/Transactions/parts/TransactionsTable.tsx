"use client";

import { Table } from "@mantine/core";
import { MAIN_HEADER_HEIGHT } from "../../../config/layout";
import { Transaction } from "../../../models/transaction";

interface Props {
  transactions: Array<Transaction>;
}

export function TransactionsTable({ transactions }: Props) {
  return (
    <Table highlightOnHover striped stickyHeader stickyHeaderOffset={MAIN_HEADER_HEIGHT}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Date</Table.Th>
          <Table.Th>Payee</Table.Th>
          <Table.Th>Amount</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {transactions.map((transaction) => (
          <Table.Tr key={transaction.id}>
            <Table.Td>{transaction.date}</Table.Td>
            <Table.Td>{transaction.payee}</Table.Td>
            <Table.Td>{transaction.amount}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
