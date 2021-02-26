import React from "react";
import "./TasksDone.css";

export class TasksDone extends React.Component {
    // each element in the tasksDone array in the props passed down from the parent component is mapped into a list item
    renderRows() {
        return this.props.tasksDone.map((task, i) => {          
            return <li className = "row done" 
                        key= {"taskDoneRow" + i}
            ><i class="fas fa-check-square"></i>  {task}</li>

        })
    }
    render() {
        return (<ul>
                    {this.renderRows()}
                </ul>)
    } 

}