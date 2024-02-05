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

  const [lists, setLists] = useState<string[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? Array.from(new Set(JSON.parse(savedTodos).map((todo: Todos) => todo.list))) : [];
  });
  const editListName = (oldName: string, newName: string) => {
    const updatedTodos = todos.map(todo =>
      todo.list === oldName ? { ...todo, list: newName } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    const updatedLists = lists.map(list =>
      list === oldName ? newName : list
    );
    setLists(updatedLists);
    setActiveList(newName);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim() === "") return;
    setActiveList(value);
    addTodo(value);
    setValue("");
    setOpen(false);

    if (!lists.includes(value)) {
      setLists(prevLists => [...prevLists, value]);
    }
  };

  const deleteList = (list: string) => {
    const updatedTodos = todos.filter((todo) => todo.list !== list);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    const updatedLists = lists.filter((l) => l !== list);
    setLists(updatedLists);
    setActiveList(updatedLists[0]);
  }

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
        {lists.map((list) => (
          <Button
            key={list}
            variant={"ghost"}
            className={`${activeList === list ? "bg-muted" : ""}`}
            onClick={() => setActiveList(list)}
          >
            {list}
          </Button>
        ))}
        <Dialog open={open} onOpenChange={() => setOpen(true)}>
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
          editListName={editListName}
          deleteList={deleteList}
        />
        <TodosForm addTodo={addTodo} />
      </div>
    </main>
  );
}
