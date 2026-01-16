import { StrictMode } from "react";
import type { LayoutProps } from "rwsdk/router";
import { AppLayoutClient } from "./AppLayoutClient";
import { ClientMantineProvider } from "./ClientMantineProvider";

export function AppLayout(props: LayoutProps) {
  const { children, requestInfo } = props;
  const path = requestInfo?.path.replace(/\/$/, "") || "/";

  return (
    <StrictMode>
      <ClientMantineProvider>
        <AppLayoutClient path={path}>{children}</AppLayoutClient>
      </ClientMantineProvider>
    </StrictMode>
  );
}
