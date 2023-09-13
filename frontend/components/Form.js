import React from 'react'

export default class Form extends React.Component {
  render() {

    return (
    <div>
      <form id='todoForm' onSubmit={this.props.todoFormSubmit}>
        <input value={this.props.todoNameInput} onChange={this.props.onTodoNameChange} type='text' placeholder='type todo'></input>
        <input type='submit'></input>
      </form>
      <button onClick={this.props.toggleDisplayCompleted}> {this.props.displayCompleted ? 'Hide Completed' : 'Display Completed'}</button>
    </div>
    )
  }
}
