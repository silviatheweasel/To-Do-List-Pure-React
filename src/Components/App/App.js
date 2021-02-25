import './App.css';
import { ToDoTasks } from "../ToDoTasks/ToDoTasks";
import { TasksDone } from "../TasksDone/TasksDone";
import React from "react";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoTasks: [''],
      tasksDone: [],
    }
  }

  addToDoTask(newTask) {
    this.state.toDoTasks.push(newTask);
    this.setState({toDoTasks: this.state.toDoTasks});
  }

  moveToTasksDone(task) {
    this.state.tasksDone.push(task);
    const index = this.state.toDoTasks.indexOf(task);
    this.state.toDoTasks.splice(index, 1);
 
    this.setState({
      toDoTasks: this.state.toDoTasks,
      tasksDone: this.state.tasksDone
    })
  }

  componentDidUpdate(prevState) {
    if (prevState.toDoTasks !== this.state.toDoTasks) {
      const index = this.state.toDoTasks.length -1;
        document.getElementById("task" + index).focus();
    }
}

  render() {
    return (
      <div>
        <h1>To Do List</h1>
        <ToDoTasks addToDoTask={this.addToDoTask.bind(this)}
                   toDoTasks={this.state.toDoTasks}
                   moveToTasksDone={this.moveToTasksDone.bind(this)}
        />

        <h1>Things Done</h1>
        <TasksDone tasksDone={this.state.tasksDone} 
                   
        />

      </div>
    )
  }
}
