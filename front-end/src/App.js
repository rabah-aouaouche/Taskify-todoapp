import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/HandleApi";

function App() {
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [fetch, setFetch] = useState(true);
  const [loading, setLoading] = useState(true);
  const getUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllToDo();
      setToDo(data);
    } catch (error) {
      console.log(error.message ? error.message : error);
    } finally {
      setLoading(false);
      console.log("hfldjfdjf");
    }
  };
  useEffect(() => {
    getUsers();
  }, [fetch]);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  };
  if (loading) return <h1 className="loading">Loading...</h1>;
  return (
    <div className="App">
      <div className="container">
        <div className="nav">
          <button className="navbut" onClick={() => setPriorityFilter()}>
            All ({toDo.length})
          </button>
          <button
            className="navbut"
            onClick={() => setPriorityFilter("Medium")}
          >
            Medium ({toDo.filter((item) => item.priority === "Medium").length})
          </button>
          <button className="navbut" onClick={() => setPriorityFilter("High")}>
            High ({toDo.filter((item) => item.priority === "High").length})
          </button>
          <button className="navbut" onClick={() => setPriorityFilter("Low")}>
            Low ({toDo.filter((item) => item.priority === "Low").length})
          </button>
        </div>

        <h1>T A S K I F Y</h1>

        <div className="top">
          <form
            onSubmit={
              isUpdating
                ? (e) => {
                    e.preventDefault();
                    updateToDo(
                      toDoId,
                      text,
                      priority,
                      setToDo,
                      setText,
                      setIsUpdating
                    );
                    setFetch(!fetch);
                  }
                : (e) => {
                    e.preventDefault();
                    addToDo(text, priority, setText, setToDo);
                    // setFetch(!fetch);
                    window.location.reload();
                  }
            }
          >
            <input
              type="text"
              placeholder="Entrez une tâche"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
              defaultValue=""
            >
              <option value="" hidden>
                Select a priority
              </option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <button className="add">{isUpdating ? "Update" : "Add"}</button>
          </form>
        </div>

        <div className="list">
          {toDo
            .filter((item) =>
              priorityFilter ? item.priority === priorityFilter : true
            )
            .map((item) => (
              <ToDo
                key={item._id}
                text={item.text}
                updateMode={() => {
                  updateMode(item._id, item.text);
                }}
                deleteToDo={() => {
                  deleteToDo(item._id, setToDo);
                  window.location.reload();
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
