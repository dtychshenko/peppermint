import styles from "./navbar.module.css";

export default function DesktopMenu() {
  return (
    <div className={styles.navbarFull}>
      <a href="/">
        <img className={styles.logo} src="/logo-full.svg" alt="Peppermint logo" />
      </a>
      <ul>
        <li>
          <a href="/">Transactions</a>
        </li>
        <li>
          <a href="/upload">Upload</a>
        </li>
      </ul>
    </div>
  );
}
