import React from 'react'

class Todo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            todo_list: [{text: "Test1", id: 1, isDone: false}],
            inputValue: ''
        }
    }

// ----Adds Task on Click----
    addOnClick = () => {
        const usedIds = this.state.todo_list.map((todo_list) => todo_list.id)
        const newID = Math.max(...usedIds) + 1 

        this.setState({todo_list: [...this.state.todo_list, {text: this.state.inputValue, id: newID}],
        inputValue: ""})
    }

// ----Removes Task on Click---- 
    taskDelete = (id) => {
        const filtered = this.state.todo_list.filter((todo_list) => todo_list.id !== id)
        this.setState({todo_list: filtered})
    }

//----Clears the List on Click----
    deleteAll = () => {
        const clearList = this.state.todo_list.filter((todo_list) => todo_list = 0)
        this.setState({todo_list: clearList})
    }

// ----Finishes Task on Click----
finishedTask = (todoId) => {
        const isDone_btn_style = document.getElementById('isDone_btn').style.background = "#47ac47"
        this.setState({
            todo_list: this.state.todo_list.map((todo_list) => {

              if (todo_list.id === todoId) {
                return { 
                    ...todo_list, isDone: true && isDone_btn_style
                }
              }
              
              else {
                return todo_list
              }
            })
          })
    }




    render() {
        return (
            
            <main id='main'>
                <header>
                    <h1>Todo List</h1>
                </header>

                {this.state.todo_list.length > 0 ? (
                    <article>

                        <ul>
                            {this.state.todo_list.map((todo_list) => (
                                <li key={todo_list.id}>
                                    {todo_list.text} 
                                <button id='delete_btn' onClick={() => this.taskDelete(todo_list.id)}>Delete</button>
                                <button id='isDone_btn' onClick={() => this.finishedTask(todo_list.id)}>Done</button>
                                </li>
                            ))}
                        </ul>

                        <input 
                            id='input_bar' 
                            value={this.state.inputValue}
                            placeholder='Type and Submit'
                            onChange={(event) => this.setState({inputValue: event.target.value})}
                        />

                        <button id='submit_btn' onClick={this.addOnClick}>Submit</button>
                        <button id='deleteAll_btn' onClick={() => this.deleteAll()}>Delete All</button>
                    </article>

                ) : ( // ----If No Todos----

                    <article>
                        <p>No Todos</p>

                    <ul>
                        {this.state.todo_list.map((todo_list) => (
                            <li key={todo_list.id}>
                                {todo_list.text} 
                            <button id='delete_btn' onClick={() => this.taskDelete(todo_list.id)}>Delete</button>
                            <button id='isDone_btn' onClick={() => this.finishedTask(todo_list.id)}>Done</button>
                            </li>
                        ))}
                    </ul>

                    <input 
                        id='input_bar' 
                        value={this.state.inputValue}
                        placeholder='Type and Submit'
                        onChange={(event) => this.setState({inputValue: event.target.value})}
                    />

                    <button id='submit_btn' onClick={this.addOnClick}>Submit</button>
                    <button id='deleteAll_btn' onClick={() => this.deleteAll()}>Delete All</button>
                </article>
                )}   
            </main>
        )
    }
}
export default Todo