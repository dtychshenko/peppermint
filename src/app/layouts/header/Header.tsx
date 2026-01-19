"use client";

import { MOBILE_BREAKPOINT } from "@/app/config/layout";
import { Box, Burger, type BurgerProps, Group } from "@mantine/core";
import { LanguageMenu } from "./parts/LanguageMenu";
import { Logo } from "./parts/Logo";
import { NavigationTabs } from "./parts/NavigationTabs";
import { Spacer } from "./parts/Spacer";
import { ThemeSwitch } from "./parts/ThemeSwitch";

interface Props {
  path: string;
  opened?: BurgerProps["opened"];
  toggle: BurgerProps["onClick"];
}

export function Header({ path, opened, toggle }: Props) {
  return (
    <Group h="100%" gap="sm" wrap="nowrap">
      <Logo />
      <NavigationTabs path={path} />
      <Spacer />
      <Box visibleFrom={MOBILE_BREAKPOINT}>
        <Group gap="xs">
          <LanguageMenu />
          <ThemeSwitch />
        </Group>
      </Box>
      <Burger
        color="peppermint.7"
        opened={opened}
        hiddenFrom={MOBILE_BREAKPOINT}
        onClick={toggle}
        aria-label="Toggle navigation"
      />
    </Group>
  );
}
