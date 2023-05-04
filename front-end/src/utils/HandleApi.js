import axios from "axios";

const baseUrl = "http://localhost:5000";

const getAllToDo = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const addToDo = (text, priority, setText, setToDo, setPriority) => {
  axios
    .post(`${baseUrl}/save`, { text, priority })
    .then((data) => {
      console.log(data);
      setText("");
      setPriority(""); // réinitialiser la priorité après avoir ajouté une tâche
      getAllToDo(setToDo);
    })
    .catch((error) => {
      console.log(error);
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        // Afficher les erreurs à l'utilisateur, par exemple :
        console.log(errors.priority.message);
      }
    });
};

const updateToDo = (
  toDoId,
  text,
  priority,
  setToDo,
  setText,
  setIsUpdating
) => {
  axios
    .post(`${baseUrl}/update`, { _id: toDoId, text, priority })
    .then((data) => {
      console.log(data);
      setText("");
      setIsUpdating(false);
      getAllToDo(setToDo);
    })
    .catch((err) => console.log(err));
};

const deleteToDo = (_id, setToDo) => {
  axios
    .post(`${baseUrl}/delete`, { _id })
    .then((data) => {
      console.log(data);

      getAllToDo(setToDo);
    })
    .catch((err) => console.log(err));
};

export { getAllToDo, addToDo, updateToDo, deleteToDo };
