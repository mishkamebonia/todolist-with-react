import { useEffect, useState } from "react";
import "./App.css";

type Todo = {
  id: number;
  title: string;
};

const initialTodos = JSON.parse(localStorage.getItem("todos") || "[]");
function App() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addNewItem(event: React.SyntheticEvent) {
    event.preventDefault();

    if (value !== "") {
      const newItems = [
        ...todos,
        {
          id: Date.now(),
          title: value,
        },
      ];
      setTodos(newItems);
    }

    setValue("");
  }

  function removeItem(id: number) {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  }

  function editItem(id: number) {
    const editInput = window.prompt("edit");

    if (editInput === null) {
      return;
    }

    // find editing todo
    // update todo name
    // update todo list

    if (editInput !== "") {
      const newTodos = todos.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            title: editInput,
          };
        }

        return item;
      });

      setTodos(newTodos);
    }
  }

  return (
    <>
      <form action="" onSubmit={addNewItem}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button>add</button>
      </form>
      <div className="output">
        {todos.map((todo) => {
          return (
            <div key={todo.id} className="todos">
              <p>{todo.title}</p>
              <button onClick={() => removeItem(todo.id)}>remove</button>
              <button onClick={() => editItem(todo.id)}>edit</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
