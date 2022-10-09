import { Header } from "./components/Header";

import styles from "./App.module.css";

import { PlusCircle } from "phosphor-react";
import {
  ChangeEvent,
  FormEvent,
  InvalidEvent,
  useEffect,
  useState,
} from "react";
import { v4 as uuid } from "uuid";
import { Task } from "./components/Task";
import "./global.css";
import { EmptyState } from "./components/EmptyState";

export type TaskT = {
  id: string;
  done: boolean;
  content: string;
};

export function App() {
  const [tasks, setTasks] = useState<TaskT[]>([]);
  const [newTaskText, setNewTaskText] = useState<string>("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("todo-tasks");

    if (!storedTasks) return;

    const parsedTasks = JSON.parse(storedTasks);
    setTasks(parsedTasks);
  }, []);

  function onToggleTask(id: string) {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );

    updateStorage(newTasks);
    setTasks(newTasks);
  }

  function onDeleteTask(id: string) {
    const newTasks = tasks.filter((task) => task.id !== id);

    updateStorage(newTasks);
    setTasks(newTasks);
  }

  function countTotal() {
    return tasks.reduce((acc, _task) => acc + 1, 0);
  }

  function countDone() {
    return tasks.reduce((acc, task) => (task.done ? acc + 1 : acc), 0);
  }

  function handleNewTaskTextChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNewTaskText(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Campo obrigatório");
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const newTask: TaskT = {
      id: uuid(),
      done: false,
      content: newTaskText,
    };
    const newTasks = [newTask, ...tasks];

    updateStorage(newTasks);
    setTasks(newTasks);
    setNewTaskText("");
  }

  function updateStorage(newTasks: TaskT[]) {
    localStorage.setItem("todo-tasks", JSON.stringify(newTasks));
  }

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <main className={styles.wrapper}>
          <form className={styles.taskForm} onSubmit={handleCreateNewTask}>
            <input
              type="text"
              placeholder="Adicione uma nova tarefa"
              value={newTaskText}
              onChange={handleNewTaskTextChange}
              onInvalid={handleNewTaskInvalid}
              required
            />
            <button type="submit">
              Criar <PlusCircle size={16} />
            </button>
          </form>
          <div className={styles.taskHeader}>
            <div className={styles.taskCreatedCounter}>
              <span>Tarefas criadas</span>
              <strong>{countTotal()}</strong>
            </div>
            <div className={styles.taskCompletedCounter}>
              <span>Concluídas</span>
              <strong>
                {countTotal() > 0 ? `${countDone()} de ${countTotal()}` : 0}
              </strong>
            </div>
          </div>
          <div className={styles.taskList}>
            {countTotal() > 0 ? (
              tasks.map((task) => (
                <Task
                  task={task}
                  key={task.id}
                  deleteTask={onDeleteTask}
                  toggleTask={onToggleTask}
                />
              ))
            ) : (
              <EmptyState />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
