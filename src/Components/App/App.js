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

  //push a new empty string into the toDoTasks array in the state
  addToDoTask() {
    this.state.toDoTasks.push("");
    this.setState({
      toDoTasks: this.state.toDoTasks,  
    })
  }

  //move the cursor to the last row
  handleCursor() {
    const index = this.state.toDoTasks.length -1;
    document.getElementById("task" + index).focus();
  }

  //when the user presses Enter, an empty string is pushed into the toDoTasks array in the state, and the cursor is then moved
  handleEnter(event) {
    if (event.keyCode === 13) {
      this.state.toDoTasks.push("");
      this.setState({
        toDoTasks: this.state.toDoTasks,  
      },this.handleCursor); 
    } 
  }

  //when the text input is changed, the element in the toDoTasks array in the state is replaced
  handleChange(i, event) {
    const task = event.target.value;
    this.state.toDoTasks.splice(i, 1, task);
    this.setState({toDoTasks: this.state.toDoTasks});
  }

  //if the string is not empty, it is pushed into the tasksDone array in the state and removed from the toDoTasks array in the state
  moveToTasksDone(task) {
    if (task !== "") {
    this.state.tasksDone.push(task);
    const index = this.state.toDoTasks.indexOf(task);
    this.state.toDoTasks.splice(index,1);
    this.setState({
      toDoTasks: this.state.toDoTasks,
      tasksDone: this.state.tasksDone
    })
   }
  }

  //when a checkbox is checked, the moveToTasksDone method is called, and the checkbox becomes unchecked; if all there's no checkbox left, a new empty string is pushed into he toDoTasks array in the state
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

  //each element of the toDoTasks array in the sate is mapped into a row with two input fields - a check box and a text input
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
