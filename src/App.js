import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import TaskDetails from "./components/TaskDetails";

import {useEffect, useState} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
    const [showAddTask, setShowAddTask] = useState(false);

    const initialState = [];
    const [tasks, setTasks] = useState(initialState);

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks();
            setTasks(tasksFromServer)
        }

        getTasks();
    }, []);

    // Fetch tasks
    const fetchTasks = async () => {
        const response = await fetch("http://localhost:5000/tasks");
        return await response.json();
    }

    // Fetch task
    const fetchTask = async (id) => {
        const response = await fetch(`http://localhost:5000/tasks/${id}`);
        return await response.json();
    }

    // Add Task
    const addTask = async (task) => {
        // Have a random ID
        // const id = Math.floor(Math.random() * 10000) + 1;
        // const newTask = {id, ...task};
        // setTasks([...tasks, newTask]);
        const response = await fetch("http://localhost:5000/tasks", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(task)
        });

        const data = await response.json();
        setTasks([...tasks, data]);
    }

    // Delete task
    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: "DELETE"
        })
        setTasks(tasks.filter((task) => task.id !== id));
    }

    // Toggle reminder
    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id);
        const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

        const response = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(updatedTask)
        });

        const data = await response.json();

        setTasks(tasks.map((task) =>
            task.id === id ? {...task, reminder: data.reminder} : task))
    }

    return (
        <Router>
            <div className="container">
                <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
                {/*{showAddTask && <AddTask onAdd={addTask}/>}*/}
                {/*{tasks.length > 0 ?*/}
                {/*    (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>) : ("No tasks to show!")}*/}
                <Routes>
                    <Route path="/" element={
                        <>
                            {showAddTask && <AddTask onAdd={addTask}/>}
                            {tasks.length > 0 ?
                                (<Tasks tasks={tasks} onDelete={deleteTask}
                                        onToggle={toggleReminder}/>) : ("No tasks to show!")
                            }
                        </>
                    }/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/task/:id" element={<TaskDetails/>}/>
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
