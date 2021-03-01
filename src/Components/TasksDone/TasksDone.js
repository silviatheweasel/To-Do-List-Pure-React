import React from "react";
import "./TasksDone.css";

export class TasksDone extends React.Component {
    handleCheckbox(i, event) {
        const checked = event.target.checked;
        if (!checked) {
            const task = document.getElementById("taskDone" + i).innerHTML;
            this.props.moveTaskBack(task);
        }
        document.getElementById("checkboxDone" + i).checked = !document.getElementById("checkboxDone" + i).checked;
    }

    handleClick(event) {
        this.props.deleteTask(event.target.value);
    }


    // each element in the tasksDone array in the props passed down from the parent component is mapped into a list item
    renderRows() {
        const context = this;
        return this.props.tasksDone.map((task, i) => {          
            return (<li className = "row done"
                        key= {"taskDoneRow" + i}
                        ><input type="checkbox"
                                id={"checkboxDone" + i}
                                onChange={context.handleCheckbox.bind(context, i)}
                                checked
                                >
                        </input>  
                        <span id={"taskDone" + i}>{task}</span>
                        <button onClick={context.handleClick.bind(context)}
                                className="deleteBtn">
                            <i class="fas fa-minus"></i>
                        </button>
                     </li>)
        })
    }
    render() {
        return (<ul>
                    {this.renderRows()}
                </ul>)
    } 

}