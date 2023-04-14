import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import "./home.css";

const Home = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if(!isAuthenticated){
      setTasks([]);
      return;
    }
    axios
      .get("https://task-app-api-iro1.onrender.com/api/v1/task/all", {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.allTasks);
      })
      .catch((error) => {
        toast.error(error.response.data.message)
        setIsAuthenticated(false);
      });
  }, [refresh,isAuthenticated,setIsAuthenticated]);

 
  const addTaskHandler = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const { data } = await axios.post(
        "https://task-app-api-iro1.onrender.com/api/v1/task/new",
        { title, description: desc },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
     
      setIsLoading(false);
      toast.success(data.message);
      setTitle("");
      setDesc("");
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
      setIsAuthenticated(false);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://task-app-api-iro1.onrender.com/api/v1/task/${id}`,
        { withCredentials: true }
      );
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
    }
  };

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `https://task-app-api-iro1.onrender.com/api/v1/task/${id}`,
        {},
        { withCredentials: true }
      );
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
    }
  };

  return (
    <div className="homeContentHeader">
      <form className="addTask" onSubmit={addTaskHandler}>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          type="text"
          required
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
        />
        <button disabled={isLoading}>Add Task</button>
      </form>
      <div className="taskContainer">
        {tasks.map((task) => {
          return (
            <div className="taskWrapper" key={task?._id}>
              <div className="taskContent">
                <span
                  className={
                    task?.isCompleted
                      ? "taskContentTitle taskContentTitleChecked"
                      : "taskContentTitle"
                  }
                >
                  {task?.title}
                </span>
                <span
                  className={
                    task?.isCompleted
                      ? "taskContentDesc taskContentDescChecked"
                      : "taskContentDesc"
                  }
                >
                  {task?.description}
                </span>
              </div>
              <div className="taskHandler">
                <input
                  onChange={updateHandler.bind(this, task?._id)}
                  type="checkbox"
                  checked={task?.isCompleted}
                />
                <button onClick={deleteHandler.bind(this, task?._id)}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
