import React, { useEffect, useState } from "react";
import AddTask from "./components/home/AddTask";
import Footer from "./components/home/Footer";
import Header from "./components/home/Header";
import Tasks from "./components/home/Tasks";
import Logout from "./components/login/Logout";

function App() {
  const [showAddTask, setShowAddTask] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [flag, setFlag] = useState(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getTasks = async () => {
    const tasksFromServer = await fetchTasks();
    setTasks(tasksFromServer);
  };

  useEffect(() => {
    getTasks();
  }, [flag]);
  // // fetch tasks
  const fetchTasks = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await res.json();
    return data;
  };

  // fetch task
  const fetchTask = async (id) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        method: "GET",
      }
    );

    const data = await res.json();

    return data;
  };

  // //Add Task
  const addTask = async (task) => {
    await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    setFlag(!flag);
  };

  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    });
    setFlag(!flag);
  };

  //Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, completed: !taskToToggle.completed };

    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });
    setFlag(!flag);
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
      <div></div>
    </div>
  );
}

export default App;
