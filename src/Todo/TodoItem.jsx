import React, { useMemo } from 'react';
import './TodoItem.css';
export default function TodoItem({id, description, isComplete, isOverdue, dueDate, toggleComplete}) {

    const formattedDueDate = useMemo(() => {
        if (!dueDate) return '';
        return new Date(dueDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }, [dueDate]);

    const className = `todo ${isComplete ? 'complete ' : ''}${isOverdue ? 'overdue' : ''}`;

    return (
        <li className={className}>
            <input type="checkbox"
                checked={isComplete}
                onChange={() => toggleComplete()} />
            {description} {formattedDueDate}
        </li>
    );
}