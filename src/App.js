import React, {useState, useRef} from 'react';
import TodoList from "./TodoList.js";
import { v4 as uuidv4 } from 'uuid';


function App() {
    const [todos, setTodos] = useState([]);
    const todoNameRef = useRef();

    function handleAddTodo(e){
        const name = todoNameRef.current.value
        if(name == '') return
        setTodos(prevTodos => {
            return [...prevTodos, {id:1, name: name, complete: false}]
        })
        todoNameRef.current.value = ''
    }

    return (
        <>
            <TodoList todos={todos}/>
            <input ref={todoNameRef} type="text" />
            <button onClick ={handleAddTodo}>Add</button>
            <button>Deneme2</button>
            <div>0</div>
        </>
)
}

export default App;
