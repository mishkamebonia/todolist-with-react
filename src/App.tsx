import { useEffect, useState } from "react";
import { db } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import "./App.css";

type Todo = {
  id: string;
  text: string;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newValue, setNewValue] = useState<string>("");

  const todosCollectionRef = collection(db, "todolist");

  const getTodoList = async () => {
    try {
      const data = await getDocs(todosCollectionRef);

      const filteredData: Todo[] = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        text: doc.data().text,
      }));

      setTodos(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTodoList();
  });

  const addNewItem = async () => {
    try {
      if (newValue !== "") {
        await addDoc(todosCollectionRef, {
          text: newValue,
        });
      }

      getTodoList();
      setNewValue("");
    } catch (err) {
      console.error(err);
    }
  };

  function removeItem(id: number) {}

  function editItem(id: number) {}

  return (
    <>
      <div>
        <input
          type="text"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <button onClick={addNewItem}>add</button>
      </div>
      <div className="output">
        {todos.map((todo) => {
          return (
            <div key={todo.id} className="todos">
              <p>{todo.text}</p>
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
