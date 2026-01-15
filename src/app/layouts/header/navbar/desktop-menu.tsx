import { navigation } from "../../../config/navigation";
import styles from "./navbar.module.css";

interface DesktopMenuProps {
  path: string;
}

export default function DesktopMenu({ path }: DesktopMenuProps) {
  return (
    <div className={styles.navbarFull}>
      <a href="/">
        <img className={styles.logo} src="/logo-full.svg" alt="Peppermint logo" />
      </a>
      <ul>
        {navigation.config.map((item) => (
          <li key={item.href} className={path === item.href ? styles.active : ""}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
