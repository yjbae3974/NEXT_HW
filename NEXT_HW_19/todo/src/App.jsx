import React, { useState } from "react";
import Todo from "./components/todo";
import Header from "./components/header";
import Create from "./components/create";

function App() {
    const [todos, setTodos] = useState([]);
    const [currentTodo, setCurrentTodo] = useState("");
    const [dueDate, setDueDate] = useState(""); // Add state for due date

    const addTodo = () => {
        if (currentTodo.trim() !== "") {
            const newTodo = { todo: currentTodo, dueDate: dueDate }; // Create a new todo object with the due date
            setTodos([...todos, newTodo]);
            setCurrentTodo("");
            setDueDate("");
        }
    };

    const deleteTodo = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
    };

    const updateTodo = (index, updatedTodo) => {
        const updatedTodos = todos.map((todo, i) =>
            i === index ? updatedTodo : todo
        );
        setTodos(updatedTodos);
    };

    return (
        <div>
            <Header />
            <Create
                currentTodo={currentTodo}
                setCurrentTodo={setCurrentTodo}
                addTodo={addTodo}
                dueDate={dueDate}
                setDueDate={setDueDate}
            />
            <Todo
                todos={todos}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
            />
        </div>
    );
}

export default App;
