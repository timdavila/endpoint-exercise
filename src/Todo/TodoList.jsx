import React, { useEffect, useState } from 'react';
import { getTodos } from './actions';
import TodoItem from './TodoItem';

export default function TodoList() {
    const [isLoading, setIsLoading] = useState(false);
    const [todoList, setTodoList] = useState([]);

    const fetchTodoList = async() => {
        setIsLoading(true);
        try {
            const todos = await getTodos();
            setTodoList(todos);
        } catch (err) {
            console.error(err.message);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        // fetch the to do list items from server on mount
        fetchTodoList();
    }, []);
  return (
    <div>
        <ul className="todo-list">
        {todoList.map((todo) => (
            <TodoItem key={todo.id} id={todo.id} name={todo.description}/>
        ))}
        </ul>
    </div>
  );
}
