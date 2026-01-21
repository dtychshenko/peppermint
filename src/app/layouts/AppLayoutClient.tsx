"use client";

import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";
import { PropsWithChildren } from "react";
import { MAIN_HEADER_HEIGHT } from "../config/layout";
import { Footer } from "./footer/Footer";
import { Header } from "./header/Header";
import { MobileMenu } from "./header/parts/MobileMenu";

interface Props {
  path: string;
}

export function AppLayoutClient({ path, children }: PropsWithChildren<Props>) {
  const [opened, { toggle, close }] = useDisclosure();

  return (
    <AppShell
      header={{ height: MAIN_HEADER_HEIGHT }}
      padding="sm"
      aside={{
        width: 200,
        breakpoint: "xs",
        collapsed: { desktop: true, mobile: !opened },
      }}>
      <AppShell.Header px="sm">
        <Header path={path} opened={opened} toggle={toggle} />
      </AppShell.Header>

      <MobileMenu path={path} opened={opened} onClose={close} />
      <Notifications />

      <AppShell.Main>{children}</AppShell.Main>

      <AppShell.Footer withBorder={false}>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}
