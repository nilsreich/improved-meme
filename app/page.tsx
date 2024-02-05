"use client";

import { Sidebar } from "@/components/Sidebar";
import { Todos } from "@/components/Todos";
import { TodosForm } from "@/components/TodosForm";
import { Button } from "@/components/ui/button";
import { useState, FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
type Todos = {
  id: string;
  list: string;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [activeList, setActiveList] = useState("Home");
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [todos, setTodos] = useState<Todos[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const uniqueLists = Array.from(new Set(todos.map((todo) => todo.list)));
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim() === "") return;
    const addTodo = {
      id: crypto.randomUUID(),
      list: value,
      title: "Sample Todo",
      completed: false,
    };
    setActiveList(value);
    setOpen(false)
  };

  const addTodo = (title: string) => {
    const newTodo = {
      id: crypto.randomUUID(),
      list: activeList,
      title,
      completed: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const editTodos = (id: string, title: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };
  return (
    <main className="flex grow ">
      <Sidebar>
        {uniqueLists.map((list) => (
          <Button
            key={list}
            variant={"ghost"}
            className={`${activeList === list ? "bg-muted" : ""}`}
            onClick={() => setActiveList(list)}
          >
            {list}
          </Button>
        ))}
        <Dialog open={open}>
          <DialogTrigger>add list</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a new list</DialogTitle>
              <DialogDescription className="flex gap-2 items-center">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <Input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <Button>Add</Button>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </Sidebar>
      <div className="relative grow">
        <Todos
          todos={todos}
          list={activeList}
          deleteTodo={deleteTodo}
          editTodo={editTodos}
          toggleTodo={toggleTodo}
        />
        <TodosForm addTodo={addTodo} />
      </div>
    </main>
  );
}
