import React, {useState, useRef, useEffect} from 'react';
import TodoList from "./TodoList.js";
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'
function App() {
    const [todos, setTodos] = useState([]);
    const todoNameRef = useRef();
    useEffect(()=> {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if(storedTodos)
            setTodos(storedTodos)
    }, [])

    useEffect(()=> {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos])

    function toggle(id){
        const newTodos = [...todos];
        todos.map(todo => {
            if(todo.id == id)
            {
                todo.completed = !todo.completed
            }
            setTodos(newTodos)
        })
    }

    function countCompleted(arr){
        var cnt = 0;
        for(var i = 0; i < arr.length; i ++){
            if(arr[i].completed) cnt ++;
        }
        return cnt;
    }
    function handleAddTodo(e){
        const name = todoNameRef.current.value
        if(name === '') return
        const newTodos = [...todos];
        newTodos.push({id:uuidv4(), name:name, completed:false});
        //console.log(newTodos)
        setTodos(newTodos);
        todoNameRef.current.value = ''
    }

    function clearChecked(e){
        console.log(todos)
        const newTodos = []
        for(var i = 0; i < todos.length; i ++ ){
            if(!todos[i].completed){
                newTodos.push(todos[i])
            }
        }
        console.log(newTodos)
        setTodos(newTodos)
    }

    return (
        <>
            <TodoList todos={todos} toggleTodo ={toggle} />
            <input ref={todoNameRef} type="text" />
            <button onClick ={handleAddTodo}>Add</button>
            <button onClick ={clearChecked}>Clear</button>
            <div>{countCompleted(todos)}/{todos.length}</div>
        </>
    )
}

export default App;
