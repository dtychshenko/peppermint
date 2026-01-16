import { Anchor, Image } from "@mantine/core";

export function Logo() {
  return (
    <Anchor underline="never" href="/">
      <Image h={40} w="auto" fit="contain" src="/logo-full.svg" alt="Peppermint logo" />
    </Anchor>
  );
}
