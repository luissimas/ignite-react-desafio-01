import { Trash } from "phosphor-react";
import { TaskT } from "../App";
import styles from "./Task.module.css";

export type TaskProps = {
  task: TaskT;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
};

export function Task({ task, toggleTask, deleteTask }: TaskProps) {
  function handleToggleTask() {
    toggleTask(task.id);
  }

  function handleDeleteTask() {
    deleteTask(task.id);
  }

  return (
    <div className={task.done ? styles.taskChecked : styles.task}>
      <input type="checkbox" checked={task.done} onChange={handleToggleTask} />
      <p>{task.content}</p>
      <button onClick={handleDeleteTask} title="Deletar tarefa">
        <Trash size={14} />
      </button>
    </div>
  );
}
