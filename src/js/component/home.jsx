import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
let array = [1,2
]
  const [currentWord, setCurrentWord] = useState("");
  const [wordInList, setWordInList] = useState([]);

  useEffect(() => {
    // fetch de los todos 
    fetch("https://assets.breatheco.de/apis/fake/todos/user/borjamese")
      .then(resp => resp.json())
      .then(data => {
        setWordInList(data.map(todo => todo.label));
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

 // eliminar un todo
  const handleDelete = (itemToDelete) => {
    setWordInList((prevList) => prevList.filter((w) => w !== itemToDelete));

    // Actualizar los items en la API
    fetch("https://assets.breatheco.de/apis/fake/todos/user/borjamese", {
      method: "PUT",
      body: JSON.stringify(
        wordInList.map((w) => ({ label: w, done: false }))
      ),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Failed to update todo list");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  const handleSubmit = () => {
    if (currentWord.trim() !== "") {
      // Añadir un item a la lista
      setWordInList((prevList) => [...prevList, currentWord]);

      // Añaadir un item a la API
      fetch("https://assets.breatheco.de/apis/fake/todos/user/borjamese", {
        method: "PUT",
        body: JSON.stringify([{ label: currentWord, done: false }]),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(resp => {
        if (!resp.ok) {
          throw new Error("Failed to add todo item");
        }
      })
      .catch(error => {
        console.log(error);
      });
      setCurrentWord("");
    }
  };

  return (
    <div className="home-header">
      <h1>Todos</h1>
      <input
        type="text"
        id="myInput"
        onChange={(evento) => setCurrentWord(evento.target.value)}
        value={currentWord}
        placeholder="Type here"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      <br/><br/>
      <ul className="list-group">
        {wordInList.map((w) => (
          <li className="list-group-item" key={w}>
            {w}{" "}
            <button
              aria-label='delete item'
              type='button'
              onClick={() => handleDelete(w)}
            >
              X
            </button>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
