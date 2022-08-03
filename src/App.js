import React, {useState, useRef, useEffect} from 'react';
import TodoList from "./TodoList.js";
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'
function App() {
    const [todos, setTodos] = useState([]);
    const [shown, setShown] = useState([]);
    const [allState, setAllState] = useState(0);
    const todoNameRef = useRef();
    useEffect(()=> {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        console.log(storedTodos)
        setTodos(storedTodos)
        setShown(storedTodos)
        setAllState(0)
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

        showGeneral()
    }

    function countCompleted(arr){
        var cnt = 0;
        for(var i = 0; i < arr.length; i ++){
            if(arr[i].completed) cnt ++;
        }
        return cnt;

    }

    function showAll(){
        setShown([...todos])
        setAllState(0);
    }

    function showActive(){
        var newTodos = []

        for(var i = 0; i < todos.length; i ++)
        {
            if(!todos[i].completed){
                newTodos.push(todos[i])
            }
        }
        setShown(newTodos)
        setAllState(1);
        //console.log(allState);
    }

    function showInactive(){
        var newTodos = []

        for(var i = 0; i < todos.length; i ++)
        {
            if(todos[i].completed){
                newTodos.push(todos[i])
            }
        }
        setShown(newTodos)
        setAllState(2);
    }

    function showGeneral(){
        if(allState == 0){
            showAll()
        }
        else if(allState == 1){
            showActive()
        }
        else if(allState == 2){
            showInactive()
        }
    }

    function handleAddTodo(e){
        const name = todoNameRef.current.value
        if(name === '') return
        const newTodos = [...todos];
        newTodos.push({id:uuidv4(), name:name, completed:false});
        //console.log(newTodos)
        setTodos(newTodos);
        setAllState(0);
        setShown(newTodos);
        todoNameRef.current.value = ''
    }


    function clearChecked(e){
        const newTodos = []
        for(var i = 0; i < todos.length; i ++ ){
            if(!todos[i].completed){
                newTodos.push(todos[i])
            }
        }
        setTodos(newTodos)
        setAllState(0)
        setShown(newTodos)
    }

    return (
        <>
            <div>
                <input type="radio" value="All" name="filter" onClick ={showAll} checked={allState==0} /> All
                <input type="radio" value="Active" name="filter" onClick ={showActive} checked={allState==1} /> Active
                <input type="radio" value="Completed" name="filter" onClick ={showInactive} checked={allState==2} /> Completed
            </div>
            <TodoList todos={shown} toggleTodo ={toggle} defaultChecked />
            <input ref={todoNameRef} type="text" />
            <button onClick ={handleAddTodo}>Add</button>
            <button onClick ={clearChecked}>Clear</button>
            <div>{countCompleted(todos)}/{todos.length}</div>
        </>
    )
}

export default App;
