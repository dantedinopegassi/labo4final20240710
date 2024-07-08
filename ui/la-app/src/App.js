import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/materias/")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => setError(error));
  }, []);

  return (
    <div className="App">
      <h1>Data from FastAPI</h1>
      {error && <p>{error.message}</p>}
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
}

export default App;
