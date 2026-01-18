"use client";

import { AppShell, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";
import { PropsWithChildren } from "react";
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
      header={{ height: 60 }}
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

      <AppShell.Main>
        <Container>{children}</Container>
      </AppShell.Main>

      <AppShell.Footer withBorder={false}>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}
