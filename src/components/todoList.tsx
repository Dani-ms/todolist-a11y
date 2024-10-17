
import React, { useState } from "react";

interface Todo {
  text: string;
  isCompleted: boolean;
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      setTodos([...todos, { text: value, isCompleted: false }]);
      setValue('');
    }
  };
  const removeTodo = (index: number) => {
    const newTodos = todos.filter((_: Todo, i: number) => i !== index);
    setTodos(newTodos);
  }

  const completeTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  }
  return (
  <div>
    <form  aria-labelledby="todoFormLabel" className="todo-list-form">
    <label htmlFor="new-todo">
        Add a new task:
      </label>
      <input
        name="new-todo"
        type="text"
        className="todo-list-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-required="true"
        aria-label="New To-Do Item"
      />
      <button type="submit" className="button" aria-label="Add New To-Do Item" onClick={handleSubmit}>
        Add Todo </button>
    </form>
    
    <ul aria-label="List of tasks">
    {todos.map((todo: Todo, index: number) => (
      <li key={index}>
            <div>
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => completeTodo(index)}
                aria-label={`Mark ${todo.text} as complete`}
              />
              <span
                style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}
                aria-live="polite"
              >
                {todo.text}
              </span>
              <button
                onClick={() => removeTodo(index)}
                aria-label={`Delete ${todo.text}`}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
    </ul>
    </div>
  );
}