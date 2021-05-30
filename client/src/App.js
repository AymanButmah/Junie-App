import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Task from './components/Tasks'
import AddTask from './components/AddTask'
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';

function App() {

  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    getTasks();
  }, []);

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/api/v1/tasks');
    const data = await res.json();
    return data;
  }

  // Fetch tasks
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/api/v1/tasks/${id}`);
    const data = await res.json();
    return data;
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/api/v1/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    const data = await res.json();
    setTasks([...tasks, data]);
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/api/v1/tasks/${id}`, {
      method: 'DELETE'
    });
    setTasks(tasks.filter((task) => task._id !== id));
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    const res = await fetch(`http://localhost:5000/api/v1/tasks/${id}`,{
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    });
    const data = await res.json();
    setTasks(tasks.map((task) => task._id === id ? { ...task, reminder: data.reminder } : task));
  }

  return (
    <Router>
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      <Route path='/' exact render={(props) => (
        <>
          {showAddTask && <AddTask onAdd={addTask}/>}
          {tasks.length > 0 ? (<Task tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>) : ('No Tasks to Show')}
        </>
      )} />
      <Route path='/about' component={About} />
      <Footer />
    </div>
    </Router>
  );
}

export default App;
