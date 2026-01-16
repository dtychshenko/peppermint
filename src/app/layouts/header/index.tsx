"use client";

import { AppShellHeader, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DarkThemeToggle } from "./DarkThemeToggle";
import { Logo } from "./Logo";
import { NavigationTabs } from "./NavigationTabs";

interface Props {
  path: string;
}

const Spacer = () => <div style={{ flexGrow: 1 }} />;

export function Header({ path }: Props) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShellHeader>
      <Group h="100%" gap="sm" wrap="nowrap">
        <Logo />
        <NavigationTabs path={path} />
        <Spacer />
        <DarkThemeToggle />
        <Burger
          color="peppermint"
          opened={opened}
          hiddenFrom="xs"
          onClick={toggle}
          aria-label="Toggle navigation"
        />
      </Group>
    </AppShellHeader>
  );
}
