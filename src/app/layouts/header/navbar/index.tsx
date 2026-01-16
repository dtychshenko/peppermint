"use client";

import { useMediaQuery } from "@mantine/hooks";
import { Activity } from "react";
import DesktopMenu from "./desktop-menu";
import MobileMenu from "./mobile-menu";
import styles from "./navbar.module.css";

const mobileBreakpoint = 768;

interface NavbarProps {
  path: string;
}

export default function Navbar({ path }: NavbarProps) {
  const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint}px)`);

  return (
    <nav className={styles.navbar}>
      <Activity mode={isMobile ? "hidden" : "visible"}>
        <DesktopMenu path={path} />
      </Activity>
      <Activity mode={isMobile ? "visible" : "hidden"}>
        <MobileMenu />
      </Activity>
    </nav>
  );
}
