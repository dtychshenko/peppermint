import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.scss";

export default function DesktopMenu() {
  return (
    <div className={styles.navbarFull}>
      <Link href="/" prefetch={true}>
        <Image
          className={styles.logo}
          src="/logo-full.svg"
          alt="Peppermint logo"
          width={200}
          height={64}
          priority
        />
      </Link>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </div>
  );
}
