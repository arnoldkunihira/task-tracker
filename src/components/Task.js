import React from "react";
import {FaTimes} from "react-icons/fa";
import {Link} from "react-router-dom"

const Task = ({task, onDelete, onToggle}) => {
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
            <h3>{task.text} <FaTimes style={faStyle} onClick={() => onDelete(task.id)}/></h3>
            <p>{task.day}</p>
            <p><Link to={`/task/${task.id}`}>View Details</Link></p>
        </div>
    );
}

const faStyle = {
    color: 'red',
    cursor: 'pointer'
}

export default Task