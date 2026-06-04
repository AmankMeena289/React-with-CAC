import React, { useState, useEffect } from 'react'
import { TodoProvider } from './contexts'
import { TodoForm, TodoItem } from './components'


function App() {
  // This is our main list where all our task items will be stored
  const [todos, setTodos] = useState([])

  // 1. How to ADD a new task
  const addTodo = (todoText) => {
    // We create a brand new task item box
    const newTodoBox = { 
      id: Date.now(), 
      todo: todoText, 
      completed: false 
    }
    
    // We add our new box to the top of our old list
    setTodos((oldTodoList) => [newTodoBox, ...oldTodoList])
  }

  // 2. How to UPDATE/EDIT an existing task
  const updateTodo = (id, newText) => {
    setTodos((oldTodoList) => 
      oldTodoList.map((eachTodoItem) => 
        eachTodoItem.id === id ? { ...eachTodoItem, todo: newText } : eachTodoItem
      )
    )
  }

  // 3. How to DELETE a task
  const deleteTodo = (id) => {
    setTodos((oldTodoList) => 
      oldTodoList.filter((eachTodoItem) => eachTodoItem.id !== id)
    )
  }

  // 4. How to CHECK/UNCHECK the completion box
  const toggleComplete = (id) => {
    setTodos((oldTodoList) => 
      oldTodoList.map((eachTodoItem) => 
        eachTodoItem.id === id ? { ...eachTodoItem, completed: !eachTodoItem.completed } : eachTodoItem
      )
    )
  }

// 1. THIS FIRST: Load data on initial page render (Keep this at the top)
  useEffect(() => {
    const storedTodosString = localStorage.getItem("todos")
    if (storedTodosString) {
      const parsedTodosArray = JSON.parse(storedTodosString)
      setTodos(parsedTodosArray)
    }
  }, []) // Empty array runs strictly once at startup

  // 2. THIS SECOND: Save data every time the todos state array changes
  useEffect(() => {
    // FIX: Only write to local storage if our todos array actually has items,
    // OR if we intentionally cleared the list. This prevents startup wipes.
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos))
    }
  }, [todos]) // Fires whenever the 'todos' state variable updates

  /*
  Why We Need Two Separate Effects
Local Storage can only store plain text (strings). It cannot store JavaScript arrays or objects directly.

Effect 1 (Load): When the application starts, we grab the raw text string from the browser, use JSON.parse() to turn it back into a working JavaScript array, and update our state.

Effect 2 (Save): Whenever a user adds, edits, or deletes a todo, the todos array changes. This triggers the second effect, which turns the updated array into text using JSON.stringify() and overwrites the old data in the browser.

We keep them separate because if you put saving and loading logic into the same block, you create an infinite loop where saving data triggers a reload, which triggers another save.
  */


  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          
          {/* 1. Render our input form at the top */}
          <div className="mb-4">
            <TodoForm />
          </div>
          
          {/* 2. Loop through our array and display our todo rows dynamically */}
          
          <div className="flex flex-wrap gap-y-3">
            {todos.map((individualTodo) => (
              <div key={individualTodo.id} className="w-full">
              {/*
                 Every time you use a loop to render a list of elements in React, you must provide a unique string or number to the outermost wrapper element called a key. */}  
                <TodoItem todo={individualTodo} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </TodoProvider>
  )
}

export default App
