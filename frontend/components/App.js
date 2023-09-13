import React from 'react'
import axios from 'axios'
import Form from './Form'
import TodoList from './TodoList'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: 'No Error',
    todoNameInput: '',
    displayCompleted: true,
  }

  onTodoNameChange = e => {
    const { value } = e.target;
    this.setState({ ...this.state, todoNameInput: value });

  }

  resetForm = () => {
    this.setState({ ...this.state, todoNameInput: ''})
  }

  setAxiosResError = (err) => {
    this.setState({...this.state, error: err.response.data.message})
  }

  postNewTodo = () => {
    axios.post(URL, {name: this.state.todoNameInput})
    .then(res => {
      this.setState({...this.state, todos: this.state.todos.concat(res.data.data)})
      this.resetForm();
    })

    .catch(this.setAxiosResError)
  }

  todoFormSubmit = (e) => {
    e.preventDefault();
    this.postNewTodo(); 
  }

  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({ ...this.state, todos: res.data.data})
      })
      .catch(this.setAxiosResError)
  }

  toggleCompleted = (id) => e => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({ ...this.state, todos: this.state.todos.map(td => {
          if (td.id !== id) return td
          return res.data.data
        })})
      })
      .catch(this.setAxiosResError)
  }

  toggleDisplayCompleted = () => {
    this.setState({...this.state, displayCompleted: !this.state.displayCompleted})
  }

  componentDidMount() { 
    this.fetchAllTodos(); 
  }

  render() {
    return (
      <div>
        <div id='error'>
          Error: {this.state.error}
        </div>
        <div>
            <TodoList
            todos={this.state.todos}
            toggleCompleted={this.toggleCompleted}
            displayCompleted={this.state.displayCompleted}
            />
            
            <Form 
            onTodoNameChange={this.onTodoNameChange}
            toggleCompleted={this.toggleCompleted}
            toggleDisplayCompleted={this.toggleDisplayCompleted}
            todoFormSubmit={this.todoFormSubmit}
            onTodoNameInput={this.state.todoNameInput}
            displayCompleted={this.state.displayCompleted}
            />
            
        </div>
      </div>
    )
  }
}
