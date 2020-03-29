import React, { useState } from "react";
import ReactDOM from "react-dom";

type FormElem = React.FormEvent<HTMLFormElement>;

interface ITodo {
  id: number;
  text: string;
  complete: boolean;
}

export default function App(): JSX.Element {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]);

  const newId = () => {
    return Math.round(Math.random() * 100);
  };

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };
  const addTodo = (phrase: string): void => {
    const newTodo: ITodo[] = [
      ...todos,
      { id: newId(), text: phrase, complete: false }
    ];
    setTodos(newTodo);
  };
  const removeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  const completeTodos = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  return (
    <>
      <h1>Todo list</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          required
        />
        <button type="submit">Add todo</button>
      </form>
      <ul>
        {todos.map((todo: ITodo, index: number) => {
          return (
            <li key={index}>
              {todo.text}{" "}
              <button type="button" onClick={() => completeTodos(index)}>
                {todo.complete ? "incomplete" : "complete"}
              </button>
              <button type="button" onClick={() => removeTodo(index)}>
                &times;
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

const root = document.getElementById("app-root");
ReactDOM.render(<App />, root);
