import React, { useState, useEffect } from "react";

import {
  BrowserRouter as Routes,
  Route,
  Outlet,
  useNavigate,
} from "react-router-dom";
import Header from "./components/home/Header";
import Footer from "./components/home/Footer";
import Tasks from "./components/home/Tasks";
import About from "./components/home/About";
import AddTask from "./components/home/AddTask";
import Logout from "./components/login/Logout";

function App() {
  const [showAddTask, setShowAddTask] = useState(true);
  const [tasks, setTasks, userId] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const authenticate = async () => {
      const res = await fetch("http://localhost:5000/auth");

      const data = await res.json();

      if (data.length === 1) {
        userId = data[0].id;
        getTasks();
      } else {
        navigate("/login");
      }
    };

    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    authenticate();
  }, []);

  // fetch tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  };

  // fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };
  //Add Task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    setTasks([...tasks, data]);
  };

  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    <div className="container">
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No task to show"
      )}
      <Logout />
      <Footer />
      <Outlet />
    </div>
  );
}
// class App extends React.Component {
//   render() {
//     return <h1>Hello from class</h1>;
//   }
// }
export default App;
