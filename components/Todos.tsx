'use client'

type TodoListProps = {
    list: string;
    todos: {
        id: string;
        list: string;
        title: string;
        completed: boolean;
    }[];
    };



export const Todos = ({list, todos}:TodoListProps) => {
    const filteredTodos = todos.filter(todo => todo.list === list);
    return (
        <div>
            <h1>{list}</h1>
            <ul>
                {filteredTodos.map(todo => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
            
        </div>
    );
};
