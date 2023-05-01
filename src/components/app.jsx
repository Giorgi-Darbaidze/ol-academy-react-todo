import React from 'react'

class Todo extends React.Component {
    constructor(props) {
      super(props)
  
      this.state = {
        todo_list: [{
            inputValue: '', 
            checked: false,
            isDone: false,
            name: 'Test', 
            id: 1,
        }],

        editor: {
            isEditing: false,
            inputValue: "",
            id: null,
        },
      }
    }
  


// ----Add New Task----
  addOnClick = () => {
    const usedIds = this.state.todo_list.map((todo_list) => todo_list.id)
    const newID = Math.max(...usedIds) + 1 

    this.setState({todo_list: [...this.state.todo_list, {name: this.state.inputValue, id: newID}],
    inputValue: ''})
}
    

// ----Delete Task----
  deleteTask = (id) => {
    const filtered = this.state.todo_list.filter((todo_list) => todo_list.id !== id)
    this.setState({todo_list: filtered})
}


// ----Finish Task----
  finishTask = (todoId) => {
    const finishedTaskList = this.state.todo_list.map(todo => {

    if (todo.id === todoId) {
        todo.isDone = true
      }

      return todo
    })

    this.setState({ todo_list: finishedTaskList })
  }
  

// ----Delete All Todo----
  deleteAll = () =>{
    this.setState({todo_list: []})
  }
   

// ----Delete Finished Task----
  deleteFinishedTodos = () => {
    const todo_list = this.state.todo_list.filter(todo => !todo.isDone)
    this.setState({ todo_list })
  }
  

// ----Delete Checked Tasks----
  deleteCheckedTasks = () => {
    const todo_list = this.state.todo_list.filter(todo => !todo.checked)
    this.setState({ todo_list })
  }
  

// ----Edit Todo----
  editTask = (id, inputValue) => {
   this.setState({
      editor: {
        id: id,
        isEditing: true,
        inputValue: inputValue
      }
    })
  }
  
  editChangeAction = (event) => {
  this.setState({
    editor: {
      ...this.state.editor,
      inputValue: event.target.value
    }
  })
  }
  
  updateTask = ()=>{
    const todo_list = [...this.state.todo_list]
    todo_list.map((todo) => {

      if(todo.id === this.state.editor.id){
        todo.name = this.state.editor.inputValue
      }
    })

    this.setState({
      todo_list: todo_list,
      editor: {isEditing: false
      }
    })
  }
  

// ----Check Task----
  todoChecked = todoChecked => {
    const todo_list = this.state.todo_list.map(todo => {

      if (todo === todoChecked) {
        return { ...todo, checked: !todo.checked }
      }

      return todo
    })
    this.setState({ todo_list })
  }



  render() {
      return (
        <main id="main">
            <h1>My To-dos</h1>
            {this.state.todo_list.length > 0 ? (
                
                <article>
                    <input
                        id='input_bar' 
                        value={this.state.inputValue}
                        placeholder='Enter New Todo'
                        onChange={(event) => this.setState({inputValue: event.target.value})}
                    />

                    <button id='add_btn' onClick={this.addOnClick}>Submit</button>

                    <ul>
                    {this.state.todo_list.map((todo) => (
                
                    <div>
                        <li 
                            style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }} 
                            key={todo.id}
                          >
                          {todo.name}
                        </li>
                        <input 
                            checked={todo.checked}
                            onChange={() => this.todoChecked(todo)} type="checkbox"
                        />

                        <button id='edit_btn' onClick={()=> this.editTask(todo.id, todo.name)}>Edit</button>
                        <button id='isDone_btn' onClick={() => this.finishTask(todo.id)}>Done</button>
                        <button id='delete_btn' onClick={() => this.deleteTask(todo.id)}>Delete</button>
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
                        value={this.state.inputValue}
                        placeholder='Enter New Todo'
                        onChange={(event) => this.setState({inputValue: event.target.value})}
                    />

                    <button id='add_btn' onClick={this.addOnClick}>Add</button>

                    <ul>
                    {this.state.todo_list.map((todo) => (
                
                    <div>
                        <li 
                            style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }} 
                            key={todo.id}
                          >
                          {todo.name}
                        </li>
                        <input
                            checked={todo.checked}
                            onChange={() => this.todoChecked(todo)} type="checkbox"
                        />

                        <button id='edit_btn' onClick={()=> this.editTask(todo.id, todo.name)}>Edit</button>
                        <button id='isDone_btn' onClick={() => this.finishTask(todo.id)}>Done</button>
                        <button id='delete_btn' onClick={() => this.deleteTask(todo.id)}>Delete</button>
                    </div>
                    ))}
                    </ul>
                </article>
            )}

            {
                this.state.editor.isEditing && (
                <section>
                    <input 
                        value={this.state.editor.inputValue}
                        onChange={this.editChangeAction}
                    />
                    <button onClick={this.updateTask}>Update</button>
                </section>
                )}   

            <button id='deleteAll_btn' onClick={this.deleteAll}>Delete All</button>
            <button onClick={this.deleteFinishedTodos}>Delete Done Todos</button>
            <button onClick={this.deleteCheckedTasks}>Delete Checked</button>
        </main>
     )
  }
  }
  export {Todo}