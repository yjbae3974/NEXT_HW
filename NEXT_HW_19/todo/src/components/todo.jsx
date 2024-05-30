import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Todo = (props) => {
    const [editingIndex, setEditingIndex] = useState(-1);
    const [updatedTodo, setUpdatedTodo] = useState("");
    const [updatedDueDate, setUpdatedDueDate] = useState(new Date());

    const handleUpdate = (index) => {
        setEditingIndex(index);
        setUpdatedTodo(props.todos[index].todo);
        setUpdatedDueDate(new Date(props.todos[index].dueDate));
    };

    const handleUpdateChange = (event) => {
        setUpdatedTodo(event.target.value);
    };

    const handleUpdateSubmit = (index) => {
        const updated = {
            ...props.todos[index],
            todo: updatedTodo,
            dueDate: updatedDueDate,
        };
        props.updateTodo(index, updated);
        setEditingIndex(-1);
        setUpdatedTodo("");
        setUpdatedDueDate(new Date());
    };

    return (
        <div className="todo-container">
            <ul className="todo-container">
                {props.todos.map((todo, index) => (
                    <li key={index}>
                        {editingIndex === index ? (
                            <div>
                                <input
                                    type="text"
                                    value={updatedTodo}
                                    onChange={handleUpdateChange}
                                />
                                <DatePicker
                                    selected={updatedDueDate}
                                    onChange={(date) => setUpdatedDueDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    className="date-picker"
                                />
                                <button
                                    className="update-button"
                                    onClick={() => handleUpdateSubmit(index)}
                                >
                                    Update
                                </button>
                            </div>
                        ) : (
                            <div style={{width: '100%'}}>
                                <div className="todo-text-tot">
                                    <span className="todo-text">
                                        {todo.todo}
                                    </span>{" "}
                                    -{" "}
                                    <span>
                                        {todo.dueDate
                                            ? new Date(
                                                  todo.dueDate
                                              ).toLocaleDateString()
                                            : ""}
                                    </span>
                                </div>
                                <div style={{width: '100%', display: 'flex',justifyContent:'right'}}>
                                <div className="button-wrapper">
                                    <button
                                        className="delete-button"
                                        onClick={() => props.deleteTodo(index)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="update-button"
                                        onClick={() => handleUpdate(index)}
                                    >
                                        Update
                                    </button>
                                </div>
                                </div>
                                
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todo;
