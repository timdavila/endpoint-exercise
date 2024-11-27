import React, { useMemo } from 'react';
import './TodoItem.css';
export default function TodoItem({id, description, isComplete, isOverdue, dueDate, toggleComplete, flippedProps}) {

    const formattedDueDate = useMemo(() => {
        if (!dueDate) return '';
        return new Date(dueDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }, [dueDate]);

    return (
        <li className={`py-4 todo ${isComplete ? 'complete ' : ''}${isOverdue ? 'overdue' : ''}`} {...flippedProps}>
            <div className="flex items-center">
                <input type="checkbox"
                    id={`todo-${id}`}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    checked={isComplete}
                    onChange={() => toggleComplete()} />
                <label htmlFor={`todo-${id}`}
                    className="ml-3 block text-gray-900">
                    <span className={`text-lg ${isComplete ? 'font-light line-through' : 'font-medium'}`}>{description}</span> 
                    <span className="text-sm font-light text-gray-600 pl-2">{formattedDueDate}</span>
                </label>
            </div>
        </li>
    );
}