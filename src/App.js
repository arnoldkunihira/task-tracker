import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

import {useState} from "react";

function App() {
    const [showAddTask, setShowAddTask] = useState(false);

    const initialState = [
        {
            "id": 1,
            "text": "Doctors Appointment",
            "day": "Feb 5th at 3:30pm",
            "reminder": false
        },
        {
            "id": 2,
            "text": "Meeting at School",
            "day": "Feb 6th at 2:30pm",
            "reminder": false
        },
        {
            "id": 3,
            "text": "Take home Challenge",
            "day": "Jan 18th, 5pm",
            "reminder": true
        },
        {
            "id": 4,
            "text": "Interview Scheduling",
            "day": "Dec 6th, 11am",
            "reminder": true
        }
    ];

    const [tasks, setTasks] = useState(initialState);

    // Add Task
    const addTask = (task) => {
        // Have a random ID
        const id = Math.floor(Math.random() * 10000) + 1;
        const newTask = {id, ...task};
        setTasks([...tasks, newTask]);
    }

    // Delete task
    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    }

    // Toggle reminder
    const toggleReminder = (id) => {
        console.log('toggle', id);
        setTasks(tasks.map((task) =>
            task.id === id ? {...task, reminder: !task.reminder} : task))
    }

    return (
        <div className="container">
            <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
            {showAddTask && <AddTask onAdd={addTask}/>}
            {tasks.length > 0 ?
                (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>) : ("No tasks to show!")}
        </div>
    );
}

export default App;
