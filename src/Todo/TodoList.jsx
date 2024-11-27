import React, { useEffect, useState, useMemo } from 'react';
import { getTodos, updateTodoStatus } from './actions';
import TodoItem from './TodoItem';

export default function TodoList() {
    const [isLoading, setIsLoading] = useState(false);
    const [todoList, setTodoList] = useState([]);

    const sortedTodoList = useMemo(() => {
        // add an isOverdue property if the dueDate has passed
        const today = new Date();
        let todoListWithOverdue = todoList.map(task => {
            return {
                ...task,
                isOverdue: task.dueDate && !task.isComplete ? new Date(task.dueDate) < today : false
            }
        });
        return todoListWithOverdue.sort((a, b) => {
            if (a.isComplete === b.isComplete) {
                // sort by due date
                if (a.dueDate === null) return 1
                if (b.dueDate === null) return -1;
                return new Date(a.dueDate) - new Date(b.dueDate);
            }
            return a.isComplete ? 1 : -1; // incomplete tasks first
        });
    }, [todoList]);


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

    const handleToggleComplete = (id, previousCompleted) => {
        setIsLoading(true);
        const completed = !previousCompleted;   // toggle the completed status
        try {
            const result = updateTodoStatus(id, completed);
            if (result) {
                // server returned success
                // Ideally we would get the updated todo object from the server, or re-fetch the entire list
                // Since this is a demo with a static API we will manipulate it client side
                let todos = todoList;
                todos = todos.map(todo => 
                    todo.id === id ? { ...todo, isComplete: completed } : todo
                );
                setTodoList(todos);
            }
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
            <ul className={isLoading ? 'loading' : ''}>
            {sortedTodoList.map((todo) => (
                <TodoItem 
                    key={todo.id}
                    {...todo}
                    toggleComplete={() => handleToggleComplete(todo.id,todo.isComplete)}/>
            ))}
            </ul>
        </div>
    );
}
