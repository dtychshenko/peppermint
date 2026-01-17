import { Center, Text } from "@mantine/core";

export function Footer() {
  return (
    <Center>
      <Text size="xs">Peppermint. &copy; {new Date().getFullYear()}</Text>
    </Center>
  );
}
