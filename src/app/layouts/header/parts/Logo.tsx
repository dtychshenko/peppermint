import { Anchor, Image, useComputedColorScheme } from "@mantine/core";
import { Activity } from "react";

export function Logo() {
  const colorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });
  const isLight = colorScheme === "light";

  return (
    <Anchor underline="never" href="/">
      <Activity mode={isLight ? "visible" : "hidden"}>
        <Image h={40} w="auto" fit="contain" src="/logo-full.svg" alt="Peppermint logo" />
      </Activity>
      <Activity mode={isLight ? "hidden" : "visible"}>
        <Image h={40} w="auto" fit="contain" src="/logo-full-inverted.svg" alt="Peppermint logo" />
      </Activity>
    </Anchor>
  );
}
