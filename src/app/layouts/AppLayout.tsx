import { StrictMode } from "react";
import type { LayoutProps } from "rwsdk/router";
import Navbar from "./header/navbar";

export function AppLayout({ children, requestInfo }: LayoutProps) {
  const path = requestInfo?.path.replace(/\/$/, "") || "/";

  return (
    <StrictMode>
      <div className="app">
        <header>
          <Navbar path={path} />
        </header>
        <main>{children}</main>
        {/* <footer>&copy; {new Date().getFullYear()}</footer> */}
      </div>
    </StrictMode>
  );
}
