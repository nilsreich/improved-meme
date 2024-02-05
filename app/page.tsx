'use client'

import { Sidebar } from "@/components/Sidebar";
import { Todos } from "@/components/Todos";
import { TodosForm } from "@/components/TodosForm";
import {useState, useEffect} from "react";

type Todos = {
  id: string;
  list:string;
  title: string;
  completed: boolean;
};

const intiValues =[
  {id: '1', list: 'Home', title: 'Do the laundry', completed: false},
  {id: '2', list: 'Work', title: 'Work1', completed: false},
  {id: '3', list: 'Home', title: 'Do the dishes', completed: false},
  {id: '4', list: 'Work', title: 'working22', completed: false},
]


export default function Home() {
  const [activeList, setActiveList] = useState('Home');
  const [todos, setTodos] = useState<Todos[]>(intiValues);

  const addTodo = (title: string) => {
    const newTodo = {id: Math.random().toString(), list: activeList, title, completed: false};
    setTodos([...todos, newTodo]);
  }
  return (
    <main className="flex">
      <Sidebar >
        <button onClick={() => setActiveList('Home')}>Home</button>
        <button onClick={() => setActiveList('Work')}>Work</button>
      </Sidebar>
      <div>
      <Todos todos={todos} list={activeList}/>
<TodosForm addTodo={addTodo}/>
      </div>
    </main>
  );
}
