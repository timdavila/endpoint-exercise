import React, { useEffect, useState, useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Flipper, Flipped } from 'react-flip-toolkit';
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
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
            <div className="px-4 py-2">
                <h1 className="text-gray-800 font-bold text-2xl uppercase">To Do</h1>
            </div>
            {isLoading ? (
                <div className="px-6">
                    <Skeleton count={6} height={30} />
                </div>
            ): (
                <Flipper flipKey={sortedTodoList.map((item) => item.id).join('')}>
                    <ul className="divide-y divide-gray-200 px-4">
                    {sortedTodoList.map((todo) => (
                        <Flipped key={todo.id} flipId={`${todo.description}${todo.isComplete}`}>
                            {flippedProps => 
                                <TodoItem 
                                    key={todo.id}
                                    {...todo}
                                    flippedProps={flippedProps}
                                    toggleComplete={() => handleToggleComplete(todo.id,todo.isComplete)}/>
                            }
                        </Flipped>
                    ))}
                    </ul>
                </Flipper>
            )}
        </div>
    );
}
