import './App.css';

import { TasksDone } from "../TasksDone/TasksDone";
import React from "react";


export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoTasks: [""],
      tasksDone: [],
    }
  }


  addToDoTask() {
    this.state.toDoTasks.push("");
    this.setState({
      toDoTasks: this.state.toDoTasks,  
    })
  }

  handleEnter(event) {
    if (event.keyCode === 13) {
        this.addToDoTask();
    } 
  }

  handleChange(i, event) {
    const task = event.target.value;
    this.state.toDoTasks[i] = task;
    this.setState({toDoTasks: this.state.toDoTasks});
  }

  moveToTasksDone(task) {
    this.state.tasksDone.push(task);
    const index = this.state.toDoTasks.indexOf(task);
    this.state.toDoTasks.splice(index,1);
    this.setState({
      toDoTasks: this.state.toDoTasks,
      tasksDone: this.state.tasksDone
    })
  }

  handleCheckBoxChange(i, event) {
      const checked = event.target.checked;
      if (checked) {
          const task = document.getElementById("task" + i).value;
          this.moveToTasksDone(task);
      }
      if (this.state.toDoTasks.length === 0) {
        this.addToDoTask();
      }
      document.getElementById("checkbox" + i).checked = !document.getElementById("checkbox" + i).checked;
  }

  componentDidUpdate(prevState) {
    if (prevState.toDoTasks !== this.state.toDoTasks) {
      const index = this.state.toDoTasks.length -1;
        document.getElementById("task" + index).focus();
    }
  }

renderRows() {
    const context = this;
    return this.state.toDoTasks.map((taskRow, i) => {
        return (
            <li class="row" key={"row" + i}>
                <input  type="checkbox" 
                        name={"checkbox" + i} 
                        id={"checkbox" + i}
                        onChange={context.handleCheckBoxChange.bind(context, i)}                        
                    
                ></input> 
                <input  type="text"
                        id={"task" + i}
                        onChange={context.handleChange.bind(context, i)}
                        onKeyUp={context.handleEnter.bind(context)}
                        value={taskRow}
                        placeholder="task"                                       
                ></input>
            </li>
        )
    }) 
} 

  render() {
    return (
      <div>
        <h1>To Do List</h1>

        <ul>
          {this.renderRows()}         
        </ul>

        <h1>Things Done</h1>
        <TasksDone tasksDone={this.state.tasksDone} 
                   
        />

      </div>
    )
  }
}
