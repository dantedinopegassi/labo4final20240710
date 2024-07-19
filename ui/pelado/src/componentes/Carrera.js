import React, { useState } from 'react';
import axios from 'axios';

function Carrera() {
  const [carrera, setCarrera] = useState({ nombre: '' });

  const handleChange = (e) => {
    setCarrera({ ...carrera, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/career', carrera)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('ERROR!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input type="text" name="nombre" value={carrera.nombre} onChange={handleChange} className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}

export default Carrera;
