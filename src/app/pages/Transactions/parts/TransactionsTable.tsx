"use client";

import { Table, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { MAIN_HEADER_HEIGHT } from "../../../config/layout";
import { TransactionDAO } from "../../../db";
import { toDisplayCurrency } from "../../../shared/numbers";

interface Props {
  transactions: Array<TransactionDAO>;
}

export function TransactionsTable({ transactions }: Props) {
  return (
    <Table highlightOnHover striped stickyHeader stickyHeaderOffset={MAIN_HEADER_HEIGHT}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Date</Table.Th>
          <Table.Th>Payee</Table.Th>
          <Table.Th align="right">Amount</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {transactions.map((transaction) => (
          <Table.Tr key={transaction.id}>
            <Table.Td w={110}>
              <DatePickerInput
                value={new Date(transaction.date)}
                variant="unstyled"
                valueFormat="ddd, MMM D"
              />
            </Table.Td>
            <Table.Td>
              <TextInput
                variant="unstyled"
                placeholder="Add a payee"
                defaultValue={transaction.payee}
              />
            </Table.Td>
            <Table.Td align="right">{toDisplayCurrency(transaction.amount)}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
