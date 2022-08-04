
import React, {useState, useRef, useEffect} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import TodoList from "./TodoList.js";
import { v4 as uuidv4 } from 'uuid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

const darkTheme = createTheme({
  palette: {
      mode: 'dark',
  },
});

function App() {
    const [todos, setTodos] = useState([]);
    const [shown, setShown] = useState([]);
    const [allState, setAllState] = useState(0);
    const [newTodo, setNewTodo] = useState("");
    const [isDarkEnabled, setIsDarkEnabled] = useState(false);

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
        const name = newTodo
        //todoNameRef.current.value
        if(name === '') return
        const newTodos = [...todos];
        newTodos.push({id:uuidv4(), name:name, completed:false});
        //console.log(newTodos)
        setTodos(newTodos);
        setAllState(0);
        setShown(newTodos);
        setNewTodo("")
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

    function toggleDarkMode(e){
        setIsDarkEnabled(!isDarkEnabled)
    }
    function AppContent(){
        return (
            <>
                <FormControlLabel control={<Switch checked={isDarkEnabled} onChange={toggleDarkMode} />} label="Dark Mode" />
                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                    <FormControlLabel value="All" control={<Radio />} label="All" checked={allState==0} onClick ={showAll}/>
                    <FormControlLabel value="Active" control={<Radio />} label="Active" checked={allState==1} onClick ={showActive}/>
                    <FormControlLabel value="Completed" control={<Radio />} label="Completed" checked={allState==2} onClick ={showInactive}/>
                </RadioGroup>
                <div>
                    <TodoList todos={shown} toggleTodo ={toggle} defaultChecked />
                    <TextField value ={newTodo} onChange={(e) => {setNewTodo(e.target.value);}} label="Todo" variant="filled" />
                </div>
                <span>&nbsp;&nbsp;</span>
                <div>
                    <Button variant="contained" onClick ={handleAddTodo}>Add</Button>
                    <Button variant="contained" onClick ={clearChecked}>Clear</Button>
                </div>
                <span>&nbsp;&nbsp;</span>

                <div>{countCompleted(todos)}/{todos.length}</div>
            </>
        )

    }

    if(isDarkEnabled){
        return(
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <AppContent/>
            </ThemeProvider>

        )
    }
    else{
        return(<AppContent/>)
    }

}

export default App;
