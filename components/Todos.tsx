"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon, PenIcon, Trash2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"

type TodoListProps = {
  list: string;
  todos: {
    id: string;
    list: string;
    title: string;
    completed: boolean;
  }[];
  deleteTodo: (id: string) => void;
  editTodo: (id: string, title: string) => void;
  toggleTodo: (id: string) => void;
};

export const Todos = ({
  list,
  todos,
  deleteTodo,
  editTodo,
  toggleTodo,
}: TodoListProps) => {
  const [editingTodo, setEditingTodo] = useState<string | null>(null);
  const [currentValue, setCurrentValue] = useState("");

  const filteredTodos = todos.filter((todo) => todo.list === list);
  const completedTodos = filteredTodos.filter((todo) => todo.completed);
  const remainingTodos = filteredTodos.filter((todo) => !todo.completed);

  const handleBlur = () => {
    if (editingTodo) {
      editTodo(editingTodo, currentValue);
      setEditingTodo(null);
      setCurrentValue("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleBlur();
    }
  };

  return (
    <div>
      <h1>{list}</h1>
      <Label>Remaining</Label>
      <ul>
        {remainingTodos.map((todo) => (
          <li key={todo.id} className="flex gap-2 items-center">
            {editingTodo === todo.id ? (
              <Input
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            ) : (
              <div className={`${todo.completed ? "line-through" : ""} grow`}>
                {todo.title}
              </div>
            )}
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => deleteTodo(todo.id)}
            >
              <Trash2Icon size={"12px"} />
            </Button>
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => toggleTodo(todo.id)}
            >
              <CheckIcon size={"12px"} />
            </Button>
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => {
                setEditingTodo(todo.id);
                setCurrentValue(todo.title);
              }}
            >
              <PenIcon size={"12px"} />
            </Button>
          </li>
        ))}
      </ul>

      <Collapsible>
  <CollapsibleTrigger>      <Label>Completed</Label>
</CollapsibleTrigger>
  <CollapsibleContent>

  <ul>
        {completedTodos.map((todo) => (
          <li key={todo.id} className="flex gap-2 items-center">
            {editingTodo === todo.id ? (
              <Input
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            ) : (
              <div className={`${todo.completed ? "line-through" : ""} grow`}>
                {todo.title}
              </div>
            )}
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => deleteTodo(todo.id)}
            >
              <Trash2Icon size={"12px"} />
            </Button>
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => toggleTodo(todo.id)}
            >
              <CheckIcon size={"12px"} />
            </Button>
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => {
                setEditingTodo(todo.id);
                setCurrentValue(todo.title);
              }}
            >
              <PenIcon size={"12px"} />
            </Button>
          </li>
        ))}
      </ul>
  </CollapsibleContent>
</Collapsible>

    </div>
  );
};
