' use client'

import { FormEvent, useState } from "react";

type TodoFormProps = {
    addTodo: (title: string) => void;
};

export const TodosForm = ({addTodo}:TodoFormProps) => { 
    const [value, setValue] = useState('');  

    const handleSubmit=(e:FormEvent)=>{
        e.preventDefault();
if (value.trim() === '') return;
        addTodo(value);
        setValue('');
    }

    return (
        <form onSubmit={e=>handleSubmit(e)}>
            <input type="text" placeholder="Add a new todo"  value={value} onChange={(e)=>setValue(e.target.value)}/>
            <button type="submit">Add</button>
        </form>
    );
}