import React from "react";
import {useState} from "react";

const AddTask = ({onAdd}) => {
    const [text, setText] = useState("");
    const [day, setDay] = useState("");
    const [reminder, setReminder] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault(); // this does not submit to a page

        // Validations
        if (!text) {
            alert("Please add a task!");
        }

        onAdd({text, day, reminder});

        // Clear the form
        setText("");
        setDay("");
        setReminder(false);
    }
    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Task</label>
                <input type="text" placeholder="Add Task" value={text}
                       onChange={(e) => setText(e.target.value)}/>
            </div>
            <div className="form-control">
                <label>Day & Time</label>
                <input type="text" placeholder="Add Day & Time" value={day}
                       onChange={(e) => setDay(e.target.value)}/>
            </div>
            <div className="form-control form-control-check">
                <label>Set Reminder</label>
                <input type="checkbox" checked={reminder} value={reminder}
                       onChange={(e) => setReminder(e.currentTarget.checked)}/>
            </div>

            <input style={buttonStyle} type="submit" value="Save Task" className="btn btn-block"/>
        </form>
    );
}

const buttonStyle = {
    backgroundColor: 'green'
}
export default AddTask