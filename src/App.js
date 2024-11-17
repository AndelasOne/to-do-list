import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

const App = () => {
  const [showAddTask, setshowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const jsonServerURL = "https://json-fake-server1.herokuapp.com/tasks"; //"http://localhost:5000/tasks"

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []); //dependency array (for example if implement a user)

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch(jsonServerURL);
    const data = await res.json();

    return data;
  };

  //Fetch single Task
  const fetchSingleTask = async (id) => {
    const res = await fetch(jsonServerURL + id);
    const task = await res.json();
    return task;
  };

  //Add Task
  const addTask = async (task) => {
    //console.log(task.text, task.day, task.reminder);

    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);

    await fetch(jsonServerURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
  };

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(jsonServerURL + id, {
      method: "DELETE",
    });

    //console.log("delete ", id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder of Class
  const toggleReminder = async (id) => {
    // console.log("toggle ", id);

    const fetchedTask = await fetchSingleTask(id);

    const toggledTask = { ...fetchedTask, reminder: !fetchedTask.reminder };

    await fetch(jsonServerURL + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toggledTask),
    });

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => {
            setshowAddTask(!showAddTask);
          }}
          showAddTask={showAddTask}
        />
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}

              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                <h3>No tasks avialable</h3>
              )}
            </>
          )}
        ></Route>
        <Route path="/about" component={About}></Route>
        <Footer />
      </div>
    </Router>
  );
};

// Class Implementation

// class App extends React.Component {
//   render() {
//     return <h1>Hello from a Class</h1>

//   }
// }

export default App;
