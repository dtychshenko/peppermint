import styles from "./navbar.module.css";

export default function DesktopMenu() {
  return (
    <div className={styles.navbarFull}>
      <a href="/">
        <img className={styles.logo} src="/logo-full.svg" alt="Peppermint logo" />
      </a>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
      </ul>
    </div>
  );
}
