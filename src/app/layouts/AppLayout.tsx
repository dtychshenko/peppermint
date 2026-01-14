import { StrictMode } from "react";
import type { LayoutProps } from "rwsdk/router";
import Navbar from "./header/navbar";

export function AppLayout({ children }: LayoutProps) {
  return (
    <StrictMode>
      <div className="app">
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        {/* <footer>&copy; {new Date().getFullYear()}</footer> */}
      </div>
    </StrictMode>
  );
}
