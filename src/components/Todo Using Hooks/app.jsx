import { useState } from 'react'
import React from 'react'

function Todo() {
  const [inputValue, setInputValue] = useState('')
  const [todo_list, setTodo_list] = useState([{
    inputValue: '', 
    checked: false,
    isDone: false,
    name: 'Test', 
    id: 1,
  }])

  const [editor, setEditor] = useState({
    isEditing: false,
    editorInputValue: "",
    id: null,
  })
  
  
  
// ----Add New Task----
let addTask = (event) => {
  setInputValue(event.target.value)
}

let handleAddTodo = (id) => {
  let newTodo = { id: id, name: inputValue}
  let updatedTodos = todo_list.concat(newTodo)
}


// ----Delete Task----
let deleteTask = (id) => {
  const filtered = todo_list.filter((todo_list) => todo_list.id !== id)
  setTodo_list(filtered)
}


// ----Finish Task----
let  finishTask = (Id) => {
  const finishedTaskList = todo_list.map(todo => {
    
    if (todo.id === Id) {
      todo.isDone = true
    }
    
    return todo
  })
  
  setTodo_list(finishedTaskList)
}


// ----Delete All Todo----
const deleteAll = () => {
  setTodo_list([])
}


// ----Delete Finished Task----
  let deleteFinishedTodos = () => {
    const updateList = todo_list.filter(todo => !todo.isDone)
    setTodo_list(updateList)
  }
  
  
  // ----Delete Checked Tasks----
  let deleteCheckedTasks = () => {
    const updateList2 = todo_list.filter(todo => !todo.checked)
    setTodo_list(updateList2)
  }
  
  
  // ----Edit Todo----
  let openEditor = (id, inputValue) => {
    setEditor({
      editorInputValue: inputValue,
      isEditing: true,
      id: id
    })
  }
  
  let editTask = (event) => {
    setEditor({
      ...editor,
      editorInputValue: event.target.value
    })
  }
  
  let updateTask = ()=>{
    const updateList3 = [...todo_list]
    updateList3.map((todo) => {
      
      if(todo.id === editor.id){
        todo.name = editor.editorInputValue
      }
    })

    setTodo_list({updateList3})
    setEditor({isEditing: false})
  }
  
  
  // ----Check Task----
  let todoChecked = todoChecked => {
    const checkOnOff = todo_list.map(todo => {
      
      if (todo === todoChecked) {
        return { ...todo, checked: !todo.checked }
      }
      
      return todo
    })
    setTodo_list(checkOnOff)
  }
  
  
  
    return (
      <main id="main">
            <h1>My To-dos</h1>
            {todo_list.length > 0 ? (
              
              <article>
                    <input
                        id='input_bar' 
                        value={inputValue}
                        placeholder='Enter New Todo'
                        onChange={addTask}
                    />

                    <button id='add_btn' onClick={addTask}>Submit</button>

                    <ul>
                    {todo_list.map((todo) => (
                      
                    <div>
                        <li 
                            style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }} 
                            key={todo.id}
                            >
                          {todo.name}
                        </li>
                        <input 
                            checked={todo.checked}
                            onChange={() => todoChecked(todo)} type="checkbox"
                        />

                        <button id='edit_btn' onClick={()=> editTask(todo.id, todo.name)}>Edit</button>
                        <button id='isDone_btn' onClick={() => finishTask(todo.id)}>Done</button>
                        <button id='delete_btn' onClick={() => deleteTask(todo.id)}>Delete</button>
                    </div>
                    ))}
                    </ul>
                </article>

            ) : ( // ----If No Todos----

                <article>
                    <h2>You have nothing to do</h2>
                    <h3 className='italic'>Go code or smth</h3>

                    <input
                        id='input_bar' 
                        value={inputValue}
                        placeholder='Enter New Todo'
                        onChange={(addTask)}
                    />

                    <button id='add_btn' onClick={addTask}>Add</button>

                    <ul>
                    {todo_list.map((todo) => (
                      
                      <div>
                        <li 
                            style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }} 
                            key={todo.id}
                        >
                          {todo.name}
                        </li>
                        <input
                            checked={todo.checked}
                            onChange={() => todoChecked(todo)} type="checkbox"
                        />

                        <button id='edit_btn' onClick={editTask(todo.id, todo.name)}>Edit</button>
                        <button id='isDone_btn' onClick={finishTask(todo.id)}>Done</button>
                        <button id='delete_btn' onClick={deleteTask(todo.id)}>Delete</button>
                    </div>
                    ))}
                    </ul>
                </article>
            )}

            {
                editor.isEditing && (
                  <section>
                    <input 
                        value={editor.editorInputValue}
                        onChange={editTask}
                    />
                    <button onClick={updateTask}>Update</button>
                </section>
                )}   

            <button id='deleteAll_btn' onClick={deleteAll}>Delete All</button>
            <button onClick={deleteFinishedTodos}>Delete Done Todos</button>
            <button onClick={deleteCheckedTasks}>Delete Checked</button>
        </main>
     )
}
export {Todo}
