import { useState } from "react";
import "./App.css";

type Todo = {
  id: number;
  title: string;
  checked: boolean;
};
function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState<string>("");

  function addNewItem(event: React.SyntheticEvent) {
    event.preventDefault();

    if (value !== "") {
      const newItems = [
        ...todos,
        {
          id: Date.now(),
          title: value,
          checked: false,
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
