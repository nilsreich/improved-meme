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
} from "@/components/ui/collapsible";

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
  editListName: (oldName: string, newName: string) => void;
  deleteList: (list: string) => void;
};

export const Todos = ({
  list,
  todos,
  deleteTodo,
  editTodo,
  toggleTodo,
  editListName,
  deleteList
}: TodoListProps) => {
  const [editingTodo, setEditingTodo] = useState<string | null>(null);
  const [editingList, setEditingList] = useState(false);
  const [listName, setListName] = useState(list);
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

  const handleRenameList = (e: React.FormEvent) => {
    if (listName.trim() === "") return;
    e.preventDefault();
    setEditingList(false);
    editListName(list, listName);
  };

  return (
    <div className="p-4">
      <div className="flex gap-2 items-center mb-12 group">
        {editingList ? (
          <form onSubmit={e => handleRenameList(e)}>  <Input
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            onBlur={() => {
              setEditingList(false);
            }}

            autoFocus
          /></form>

        ) : (
          <div className={'grow text-3xl '}>
            {list}
          </div>
        )}
        <Button className="group-hover:block hidden" variant={"ghost"} size={"sm"} onClick={() => setEditingList(!editingList)}>
          <PenIcon size={"12px"} />
        </Button>
        <Button className={'group-hover:block hidden'} variant={"ghost"} size={"sm"} onClick={() => deleteList(list)}>
          <Trash2Icon size={"12px"} />
        </Button>
      </div>
      <Label>Remaining</Label>
      <ul>
        {remainingTodos.map((todo) => (
          <li key={todo.id} className="flex gap-2 items-center my-2 group">
            {editingTodo === todo.id ? (
              <Input
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            ) : (
              <div className={'grow whitespace-nowrap'}>
                {todo.title}
              </div>
            )}
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => deleteTodo(todo.id)}
              className={`${editingTodo === todo.id ? 'hidden' : "group-hover:block hidden"}`}
            >
              <Trash2Icon size={"12px"} />
            </Button>
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => {
                setEditingTodo(todo.id);
                setCurrentValue(todo.title);
              }}
              className={`${editingTodo === todo.id ? 'hidden' : "group-hover:block hidden"}`}
            >
              <PenIcon size={"12px"} />
            </Button>
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => toggleTodo(todo.id)}
            >
              <CheckIcon size={"12px"} />
            </Button>

          </li>
        ))}
      </ul>

      <Collapsible className="mt-12">
        <CollapsibleTrigger>
          <Label>Completed</Label>
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
                  <div
                    className={`${todo.completed ? "line-through" : ""} grow whitespace-nowrap `}
                  >
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
