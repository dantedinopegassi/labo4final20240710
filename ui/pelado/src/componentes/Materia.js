import React, { useState } from 'react';
import axios from 'axios';

function Materia() {
  const [materia, setMateria] = useState({ nombre: '', carrera_id: '' });

  const handleChange = (e) => {
    setMateria({ ...materia, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/subject', materia)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input type="text" name="name" value={materia.name} onChange={handleChange} className="form-control" />
      </div>
      <div className="form-group">
        <label>Career ID</label>
        <input type="text" name="careerId" value={materia.careerId} onChange={handleChange} className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}

export default Materia;
