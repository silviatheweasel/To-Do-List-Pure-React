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

  //when the user presses Enter, an empty string is pushed into the toDoTasks array in the state, and the cursor is then moved;
  //when the user presses Delete or Backspace when the row only consists of an empty string, the empty string is removed
  handleEnterAndDelete(i, event) {
    if (event.keyCode === 13 && !this.state.toDoTasks.includes("")) {
      this.state.toDoTasks.push("");
      this.setState({
        toDoTasks: this.state.toDoTasks  
      },this.handleCursor); 
    } 
    if (event.key === "Delete" || event.key === "Backspace" && this.state.toDoTasks.length >=2 && i === this.state.toDoTasks.length - 1 && event.target.value === "") {     
      this.state.toDoTasks.splice(i, 1);
      this.setState({toDoTasks: this.state.toDoTasks}, document.getElementById("task" + (i-1)).focus());
    }
  }

  //when the text input is changed and the first letter is not space, the element in the toDoTasks array in the state is replaced; 
  //if the input value is an empty string and it is not the only element in the array, it will be removed from the array
  handleChange(i, event) {
    const task = event.target.value;
    if (task[0] !== " ") {
      this.state.toDoTasks.splice(i, 1, task);
      this.setState({toDoTasks: this.state.toDoTasks});
    }
    if (task === "" && this.state.toDoTasks.length > 1) {
      this.state.toDoTasks.splice(i, 1); 
      if (i >=1) {
        this.setState({toDoTasks: this.state.toDoTasks}, document.getElementById("task" + (i-1)).focus());
      } else if (i === 0) {
        this.setState({toDoTasks: this.state.toDoTasks}, document.getElementById("task0").focus());
      }
    }
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
              <li className="row" key={"row" + i}>
                  <input  type="checkbox" 
                          name={"checkbox" + i} 
                          id={"checkbox" + i}
                          onChange={context.handleCheckBoxChange.bind(context, i)}                        
                      
                  ></input> 
                  <input  type="text"
                          id={"task" + i}
                          onChange={context.handleChange.bind(context, i)}
                          onKeyUp={context.handleEnterAndDelete.bind(context, i)}
                          value={taskRow}    
                          autocomplete="off"  
                          maxlength="30"                                 
                  ></input>
              </li>
          )
      }) 
  } 

  // show active cursor when the page is rendered
  componentDidMount() {
    document.getElementById("task0").focus();
  }

  render() {
    return (
      <div className="container">
        <div className="list-container">
        <h1>To Do List</h1>

        <ul>
          {this.renderRows()}         
        </ul>
      </div>

        <div className="list-container">
          <h1>Things Done</h1>
          <TasksDone tasksDone={this.state.tasksDone}                
          />
        </div>
      </div>
    )
  }
}
