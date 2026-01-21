import { Checkbox, Select, Table, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { memo, useCallback, useMemo } from "react";
import { CategoryDAO } from "../../../db";
import { CategorizedTransaction } from "../../../models/transaction";
import { toDisplayCurrency } from "../../../shared/numbers";

interface Props {
  transaction: CategorizedTransaction;
  categories: Array<CategoryDAO>;
  selected: boolean;
  onSelect: (transactionId: string) => void;
}

export const TransactionRow = memo(function TransactionRow(props: Props) {
  const { transaction, categories, selected, onSelect } = props;

  const onClick = useCallback(() => onSelect(transaction.id), [onSelect, transaction.id]);
  const amount = useMemo(() => toDisplayCurrency(transaction.amount), [transaction.amount]);
  const date = useMemo(() => new Date(transaction.date), [transaction.date]);
  const categoryIds = useMemo(
    () => categories.map((category) => ({ value: category.id, label: category.name })),
    [categories],
  );

  return (
    <>
      <Table.Td w={40}>
        <Checkbox checked={selected} onChange={onClick} />
      </Table.Td>
      <Table.Td w={110}>
        <DatePickerInput value={date} variant="unstyled" valueFormat="ddd, MMM D" />
      </Table.Td>
      <Table.Td>
        <TextInput variant="unstyled" placeholder="Add a payee" defaultValue={transaction.payee} />
      </Table.Td>
      <Table.Td w={160}>
        <Select
          variant="unstyled"
          data={categoryIds}
          color="peppermint"
          placeholder="Uncategorized"
          defaultValue={transaction.categoryId}
        />
      </Table.Td>
      <Table.Td align="right" w={100}>
        {amount}
      </Table.Td>
    </>
  );
});
