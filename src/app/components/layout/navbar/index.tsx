import styles from "./navbar.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarFull}>
        <Link
          href="/"
          prefetch={true}
          className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6">
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
    </nav>
  );
}
