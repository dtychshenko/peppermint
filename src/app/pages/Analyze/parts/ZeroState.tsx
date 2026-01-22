import { Anchor, Stack, Text, Title } from "@mantine/core";
import Leafy from "../../../shared/leafy.svg?react";

export function ZeroState() {
  return (
    <Stack align="center">
      <Leafy />
      <Title order={5}>Nothing to show here</Title>
      <Text size="sm" c="dimmed">
        Head over to the <Anchor href="/import">import page</Anchor> to get started.
      </Text>
    </Stack>
  );
}
