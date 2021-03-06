import { useState } from 'react';

import '../styles/tasklist.scss';

import { FiTrash, FiCheckSquare } from 'react-icons/fi';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if (newTaskTitle == '') {
      return document.getElementById('task_input')!.focus();
    } else {
      const randomId = Math.floor(Math.random() * 10000);
      const title = newTaskTitle && newTaskTitle;
      const newTaskItem = {
        id: randomId,
        title,
        isComplete: false,
      };
      setTasks([...tasks, newTaskItem]);
      setNewTaskTitle('');
    }
  }

  function handleToggleTaskCompletion(id: number) {
    let allTasks = [...tasks];
    allTasks.find((task) => task.id === id)!.isComplete = !allTasks.find(
      (task) => task.id === id
    )?.isComplete;
    setTasks([...allTasks]);
  }

  function handleRemoveTask(id: number) {
    let allTasks = [...tasks];
    const newTasks = allTasks.filter((task) => task.id !== id);
    setTasks([...newTasks]);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tarefas</h2>

        <div className="input-group">
          <input
            id="task_input"
            type="text"
            placeholder="Adicionar nova tarefa"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? 'completed' : ''}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
