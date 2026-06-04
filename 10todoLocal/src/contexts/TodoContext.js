import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos:[
        {
            id : 1,
            todo : "Learn React Context API",
            completed : false,
        }
    ],

    addTodo: (node) => {},
    updateTodo : (id ,todo) => {},
    deleteTodo : (id) => {},
    toggleComplete : (id) => {}
});

export const useTodo = () => {
    return useContext(TodoContext);
}

export const TodoProvider = TodoContext.Provider;