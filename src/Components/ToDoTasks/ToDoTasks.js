import React from "react";
import "./ToDoTasks.css";

export class ToDoTasks extends React.Component {

    handleEnter(event) {
        if (event.keyCode === 13) {
        this.props.addToDoTask(event.target.value); 
        }   
    }

    handleCheckBoxChange(event) {
        const checked = event.target.checked;
        if (checked) {
            const index = event.target.name;
            const task = document.getElementById("task" + index).value
            this.props.moveToTasksDone(task);
        }
    }

    renderRows() {
        return this.props.toDoTasks.map( (taskRow, i) => {
            return (
                <li class="row" key={"row" + i}>
                    <input  type="checkbox" 
                            name={i} 
                            onChange={this.handleCheckBoxChange.bind(this)}
                            
 
                    ></input> 
                    <input  type="text"
                            onKeyUp={this.handleEnter.bind(this)}
                            id={"task" + i}
                            
                    ></input>
                </li>
            )
        })
    }

    render() {
        return (
            <ul>
                {this.renderRows()}
            </ul>)
        }
};