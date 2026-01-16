import { StrictMode } from "react";
import type { LayoutProps } from "rwsdk/router";
import { ClientMantineProvider } from "./ClientMantineProvider";
import Navbar from "./header/navbar";

export function AppLayout({ children, requestInfo }: LayoutProps) {
  const path = requestInfo?.path.replace(/\/$/, "") || "/";

  return (
    <StrictMode>
      <ClientMantineProvider>
        <header>
          <Navbar path={path} />
        </header>
        <main>{children}</main>
        {/* <footer>&copy; {new Date().getFullYear()}</footer> */}
      </ClientMantineProvider>
    </StrictMode>
  );
}
