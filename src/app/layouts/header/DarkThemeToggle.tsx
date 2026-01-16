import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { Activity } from "react";

export function DarkThemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });
  const isLight = computedColorScheme === "light";

  return (
    <ActionIcon
      onClick={() => setColorScheme(isLight ? "dark" : "light")}
      variant="default"
      size="lg"
      visibleFrom="xs"
      aria-label="Toggle color scheme">
      <Activity mode={isLight ? "visible" : "hidden"}>
        <IconSun stroke={1.5} />
      </Activity>
      <Activity mode={isLight ? "hidden" : "visible"}>
        <IconMoon stroke={1.5} />
      </Activity>
    </ActionIcon>
  );
}
