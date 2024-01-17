import { useEffect, useState } from "react";
import "./App.css";

type Todo = {
  completed: boolean;
  id: number;
  todo: string;
  userId: number;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    fetch("https://dummyjson.com/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data.todos);
        console.log(data.todos);
      });
  }, []);

  function addNewItem(event: React.SyntheticEvent) {
    event.preventDefault();

    if (value !== "") {
      const newItems = [
        {
          completed: false,
          id: Date.now(),
          todo: value,
          userId: Date.now(),
        },
        ...todos,
      ];
      setTodos(newItems);
    }

    setValue("");
  }

  function removeItem(id: number) {
    fetch("https://dummyjson.com/todos/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(console.log);

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
              <p>{todo.todo}</p>
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
