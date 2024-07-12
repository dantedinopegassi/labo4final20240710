import React, { useState, useEffect } from "react";
import api from "./api";
import "./App.css";

const App = () => {
  const [materias, setMaterias] = useState([]);
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    is_income: false,
    date: "",
  });

  const fetchMaterias = async () => {
    const response = await api.get("/materias/");
    setMaterias(response.data);
  };

  useEffect(() => {
    fetchMaterias();
  }, []);

  const handleInputChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await api.post("/materias/", formData);
    fetchMaterias();
    setFormData({
      amount: "",
      category: "",
      description: "",
      is_income: false,
      date: "",
    });
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            App pelado
          </a>
        </div>
      </nav>
    </div>
  );
};

export default App;
