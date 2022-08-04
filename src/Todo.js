import React from 'react'
import Checkbox from '@mui/material/Checkbox';

export default function Todo({todo, toggleTodo}) {

    function handleTodoClick(e){
            toggleTodo(todo.id)
    }

    return (

        <div>
            <label>
                <Checkbox  checked={todo.completed} onChange= {handleTodoClick}/>
                {todo.name}
            </label>
        </div>

    )
}
