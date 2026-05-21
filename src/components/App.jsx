import { useEffect, useState } from "react";
import ToyCard from "./ToyCard";
import ToyForm from "./ToyForm";

function App() {
  const [toys, setToys] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // FETCH TOYS ON LOAD
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((r) => r.json())
      .then((data) => setToys(data));
  }, []);

  // ADD TOY
  function addToy(newToy) {
    setToys([...toys, newToy]);
  }

  // DELETE TOY
  function handleDelete(id) {
    const updatedToys = toys.filter((toy) => toy.id !== id);
    setToys(updatedToys);
  }

  // LIKE TOY
  function handleLike(updatedToy) {
    const updatedToys = toys.map((toy) =>
      toy.id === updatedToy.id ? updatedToy : toy
    );

    setToys(updatedToys);
  }

  return (
    <div>
      <div id="toy-header">
        <img
          src="https://fontmeme.com/permalink/180719/67429e6afec53d21d64643101c43f029.png"
          alt="toy header"
        />
      </div>

      {showForm ? <ToyForm addToy={addToy} /> : null}

      <div className="buttonContainer">
        <button onClick={() => setShowForm(!showForm)}>
          Add a Toy
        </button>
      </div>

      <div id="toy-collection">
        {toys.map((toy) => (
          <ToyCard
            key={toy.id}
            toy={toy}
            onDelete={handleDelete}
            onLike={handleLike}
          />
        ))}
      </div>
    </div>
  );
}

export default App;