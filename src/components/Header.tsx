import styles from "./Header.module.css";
import rocketIcon from "../assets/rocket.svg";

export function Header() {
  return (
    <header className={styles.header}>
      <img src={rocketIcon} alt="Rocket icon" />
      <p className={styles.blueText}>to</p>
      <p className={styles.purpleText}>do</p>
    </header>
  );
}
