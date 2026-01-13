"use client";

import { Activity } from "react";
import { useMediaQuery } from "usehooks-ts";
import DesktopMenu from "./desktop-menu";
import MobileMenu from "./mobile-menu";
import styles from "./navbar.module.scss";

const mobileBreakpoint = 768;

export default function Navbar() {
  const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint}px)`, { defaultValue: false });

  return (
    <nav className={styles.navbar}>
      <Activity mode={isMobile ? "hidden" : "visible"}>
        <DesktopMenu />
      </Activity>
      <Activity mode={isMobile ? "visible" : "hidden"}>
        <MobileMenu />
      </Activity>
    </nav>
  );
}
