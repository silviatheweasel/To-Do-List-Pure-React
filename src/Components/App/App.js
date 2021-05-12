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

 getNumberOfTasks(taskArray) {
   if (taskArray.includes("")) {
     return taskArray.length - 1;
   } else {
     return taskArray.length;
   }
 }

 renderNumberOfTasks(taskArray) {
   const numberOfToDo = this.getNumberOfTasks(this.state.toDoTasks);
   const numberOfDone = this.getNumberOfTasks(this.state.tasksDone);
   const totalNumber = numberOfToDo + numberOfDone;

  if (taskArray === this.state.toDoTasks) {
    if (totalNumber > 1) {
         return (<p className="number-of-tasks">{numberOfToDo} of {totalNumber} tasks</p>)
       } else {
         return (<p className="number-of-tasks">{numberOfToDo} of {totalNumber} task</p>)
       }
  }
  if (taskArray === this.state.tasksDone) {
    if (totalNumber > 1) {
         return (<p className="number-of-tasks">{numberOfDone} of {totalNumber} tasks</p>)
       } else {
         return (<p className="number-of-tasks">{numberOfDone} of {totalNumber} task</p>)
       }
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
    if ((event.key === "Delete" || event.key === "Backspace") && this.state.toDoTasks.length >=2 && i === this.state.toDoTasks.length - 1 && event.target.value === "") {     
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

  //move the task from the tasks done list back to the to do list 
  moveTaskBack(task) {
    const index = this.state.tasksDone.indexOf(task);
    this.state.tasksDone.splice(index, 1);
    this.state.toDoTasks.unshift(task);
    this.setState({toDoTasks: this.state.toDoTasks,
                   tasksDone: this.state.tasksDone
                  })
  }

  //when a checkbox is checked, the moveToTasksDone method is called, and the checkbox becomes unchecked; if all there's no checkbox left, a new empty string is pushed into he toDoTasks array in the state
  handleCheckBoxChange(i, event) {
      const checked = event.target.checked;
      const task = document.getElementById("task" + i).value;
      if (checked && task) {     
        document.getElementById("checkbox" + i).classList.add("checked");
        setTimeout(() => {
          document.getElementById("checkbox" + i).classList.remove("checked");
          this.moveToTasksDone(task);
          if (this.state.toDoTasks.length < 1) {
            this.addToDoTask();
          }
        }, 100);
      }
      document.getElementById("checkbox" + i).checked = !document.getElementById("checkbox" + i).checked;
  }

  deleteTask(task) {
    const index = this.state.tasksDone.indexOf(task);
    this.state.tasksDone.splice(index, 1);
    this.setState({tasksDone: this.state.tasksDone});
  }

  //each element of the toDoTasks array in the sate is mapped into a row with two input fields - a check box and a text input
  renderRows() {
      const context = this;
      return this.state.toDoTasks.map((taskRow, i) => {
          return (
              <li className="row" key={"row" + i}>
                  <input  type="checkbox"
                          className="checkbox" 
                          name={"checkbox" + i} 
                          id={"checkbox" + i}
                          onChange={context.handleCheckBoxChange.bind(context, i)}                        
                      
                  ></input> 
                  <input  type="text"
                          id={"task" + i}
                          className="text-input"
                          onChange={context.handleChange.bind(context, i)}
                          onKeyUp={context.handleEnterAndDelete.bind(context, i)}
                          value={taskRow}    
                          autoComplete="off"  
                          maxLength="30"                                 
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
        <h1>To-Do List</h1>
        {this.renderNumberOfTasks(this.state.toDoTasks)}
        <div className="inner-container">
          <ul>
            {this.renderRows()}         
          </ul>
        </div>
      </div>

        <div className="list-container">
          <h1>Tasks Done</h1>
          {this.renderNumberOfTasks(this.state.tasksDone)}
          <TasksDone tasksDone={this.state.tasksDone}
                     moveTaskBack={this.moveTaskBack.bind(this)}
                     deleteTask={this.deleteTask.bind(this)}                
          />
        </div>
      </div>
    )
  }
}
