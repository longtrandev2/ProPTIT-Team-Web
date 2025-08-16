import { useState } from "react";
import type { Todo } from "./types";
import { TodoItem } from "./TodoItem"; // thêm import

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
const [hideDone, setHideDone] = useState(false);

    function toggle(id: string): void {
  setTodos((prev) =>
    prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
  );
}

function remove(id: string): void {
  setTodos((prev) => prev.filter((t) => t.id !== id));
}

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: trimmed,
      done: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
    setTitle(""); // clear input
  }
const remaining = todos.filter((t) => !t.done).length;
  return (
    <div style={{ maxWidth: 520, margin: "40px auto", fontFamily: "system-ui" }}>
      <h1>Todo List</h1>

      <form onSubmit={handleAdd} style={{ display: "flex", gap: 8 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nhập việc cần làm…"
          style={{ flex: 1, padding: "8px 10px" }}
        />
        <button type="submit">Add</button>
      </form>
<p style={{ marginTop: 16 }}>
  Còn lại: <strong>{remaining}</strong> việc
</p>

<button
  style={{ marginTop: 12 }}
  onClick={() => setHideDone((prev) => !prev)}
>
  {hideDone ? "Hiện tất cả" : "Ẩn việc đã hoàn thành"}
</button>

<ul style={{ marginTop: 16, paddingLeft: 18 }}>
 <ul style={{ marginTop: 16, paddingLeft: 18 }}>
  {todos
  .filter((t) => (hideDone ? !t.done : true))
  .map((t) => (
    <TodoItem
      key={t.id}
      todo={t}
      onToggle={toggle}
      onRemove={remove}
    />
  ))}
</ul>
</ul>
    </div>
  );
  // 1) Thêm hàm toggle vào bên trong component App:

}

