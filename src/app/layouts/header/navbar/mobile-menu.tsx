import { Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function MobileMenu() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <Burger color="peppermint" opened={opened} onClick={toggle} aria-label="Toggle navigation" />
  );
}
