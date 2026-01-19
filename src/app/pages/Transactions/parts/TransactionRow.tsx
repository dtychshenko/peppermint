import { Table, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { memo } from "react";
import { TransactionDAO } from "../../../db";
import { toDisplayCurrency } from "../../../shared/numbers";

interface Props {
  transaction: TransactionDAO;
}

export const TransactionRow = memo(function TransactionRow({ transaction }: Props) {
  return (
    <>
      <Table.Td w={110}>
        <DatePickerInput
          value={new Date(transaction.date)}
          variant="unstyled"
          valueFormat="ddd, MMM D"
        />
      </Table.Td>
      <Table.Td>
        <TextInput variant="unstyled" placeholder="Add a payee" defaultValue={transaction.payee} />
      </Table.Td>
      <Table.Td align="right">{toDisplayCurrency(transaction.amount)}</Table.Td>
    </>
  );
});
