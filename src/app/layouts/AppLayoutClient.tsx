"use client";

import { AppShell, Container } from "@mantine/core";
import { PropsWithChildren } from "react";
import { Footer } from "./footer";
import { Header } from "./header";

interface Props {
  path: string;
}

export function AppLayoutClient({ path, children }: PropsWithChildren<Props>) {
  return (
    <AppShell header={{ height: 60 }} padding="sm">
      <Header path={path} />
      <AppShell.Main>
        <Container>{children}</Container>
      </AppShell.Main>
      <Footer />
    </AppShell>
  );
}
