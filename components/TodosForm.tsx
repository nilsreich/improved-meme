" use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type TodoFormProps = {
  addTodo: (title: string) => void;
};

export const TodosForm = ({ addTodo }: TodoFormProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim() === "") return;
    addTodo(value);
    setValue("");
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
      />
      <Button type="submit">Add</Button>
    </form>
  );
};
