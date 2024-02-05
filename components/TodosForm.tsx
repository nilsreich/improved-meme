" use client";

import { FormEvent, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type TodoFormProps = {
  addTodo: (title: string) => void;
};

export const TodosForm = ({ addTodo }: TodoFormProps) => {
  const [value, setValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim() === "") return;
    addTodo(value);
    setValue("");
    inputRef.current?.focus();
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex gap-2 absolute bottom-0 left-0 right-0 p-2"
    >
      <Input
        type="text"
        placeholder="Add a new todo"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
        ref={inputRef}
      />
      <Button type="submit">Add</Button>
    </form>
  );
};
