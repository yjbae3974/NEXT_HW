import React from 'react';
import Datepicker from './datepicker';

function Create({ currentTodo, setCurrentTodo, addTodo, dueDate, setDueDate }) {
    const handleCreateChange = (e) => {
        setCurrentTodo(e.target.value);
    };

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        addTodo();
    };

    return (
        <form className='create-todo' onSubmit={handleCreateSubmit}>
            <input type="text" value={currentTodo} onChange={handleCreateChange} />
            <Datepicker selected={dueDate} onChange={(date) => setDueDate(date)} />
            <button>Create</button>
        </form>
    );
}

export default Create;
