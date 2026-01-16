import { AppShellFooter, Center, Text } from "@mantine/core";

export function Footer() {
  return (
    <AppShellFooter withBorder={false}>
      <Center>
        <Text size="xs">Peppermint. &copy; {new Date().getFullYear()}</Text>
      </Center>
    </AppShellFooter>
  );
}
