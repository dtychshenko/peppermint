import { Divider, Stack } from "@mantine/core";
import { Upload } from "./parts/Upload";
import { BankBanner } from "./parts/bank/BankBanner";

export default function Import() {
  return (
    <Stack align="center" justify="center">
      <Upload />
      <Divider label="OR" labelPosition="center" w="100%" maw={480} />
      <BankBanner />
    </Stack>
  );
}
