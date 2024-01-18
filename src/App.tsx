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

  function addNewItem(event: React.SyntheticEvent) {}

  function removeItem(id: number) {}

  function editItem(id: number) {}

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
