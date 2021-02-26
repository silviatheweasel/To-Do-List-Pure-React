import React from "react";
import "./ToDoTasks.css";


let t;

export class ToDoTasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {toDoTasks: this.props.toDoTasks}
    }
    handleEnter(event) {
        if (event.keyCode === 13) {
            this.props.addToDoTask(event.target.value); 
            clearTimeout(t);
        } 
    }

    handleChange(event) {
        if (setTimeout) {
            clearTimeout(t);
        }
            t = setTimeout(() => this.props.addToDoTask(event.target.value), 1500 );  
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
        const context = this;
        return this.state.toDoTasks.map((taskRow, i) => {
            return (
                <li class="row" key={"row" + i}>
                    <input  type="checkbox" 
                            name={i} 
                            onChange={context.handleCheckBoxChange.bind(context)}
                        
                    ></input> 
                    <input  type="text"
                            id={"task" + i}
                            onChange={context.handleChange.bind(context)}
                            onKeyUp={context.handleEnter.bind(context)}
                            value={taskRow}
                            
                            // placeholder="task"
                                            
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