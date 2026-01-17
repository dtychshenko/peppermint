import { Switch, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

export function ThemeSwitch() {
  const { toggleColorScheme } = useMantineColorScheme();
  const colorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });

  return (
    <Switch
      size="md"
      color="dark.3"
      checked={colorScheme === "light"}
      onLabel={<IconSun size={16} stroke={1.5} color="var(--mantine-color-yellow-4)" />}
      offLabel={<IconMoonStars size={16} stroke={1.5} color="var(--mantine-color-blue-6)" />}
      onClick={toggleColorScheme}
      aria-label="Toggle color scheme"
    />
  );
}
