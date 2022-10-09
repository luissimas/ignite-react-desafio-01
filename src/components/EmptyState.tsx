import styles from "./EmptyState.module.css";
import clipboardIcon from "../assets/clipboard.svg";

export function EmptyState() {
  return (
    <div className={styles.wrapper}>
      <img src={clipboardIcon} alt="Clipboard icon" />
      <strong>Você ainda não tem tarefas cadastradas</strong>
      <p>Crie tarefas e organize seus itens a fazer</p>
    </div>
  );
}
