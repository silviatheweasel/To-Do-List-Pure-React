import React from "react";
import "./ToDoTasks.css";

export class ToDoTasks extends React.Component {

    handleEnter(event) {
        if (event.keyCode === 13) {
        this.props.addToDoTask(event.target.value);  
        }   
    }

    renderRows() {
        return this.props.toDoTasks.map( (taskRow, i) => {
            return (
                <li class="row" key={"row" + i}>
                    <input  type="checkbox" 
                            name={"task" + i} 
                            value="false"
                    ></input> 
                    <input  type="text"
                            onKeyUp={this.handleEnter.bind(this)}
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