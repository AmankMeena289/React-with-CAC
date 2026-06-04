import React, { useState } from 'react'
import { useTodo } from '../contexts'

function TodoForm() {
    // State to track what the user is typing in this specific input box
    const [todoText, setTodoText] = useState("")
    
    // Pull only the addTodo function out of our global context
    const { addTodo } = useTodo()

    const handleSubmit = (e) => {
        e.preventDefault() // Prevents the browser from reloading the entire page

        if (!todoText.trim()) return // If the text is empty or just spaces, do nothing

        // Pass the typed text string directly to our global addTodo function
        addTodo(todoText)
        
        // Clear the input field text box after adding
        setTodoText("")
    }

    return (
        <form onSubmit={handleSubmit} className="flex">
            <input
                type="text"
                placeholder="Write a task..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;