import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './Front/ErrorPage.jsx'
import ErrorPage2 from './Front/ErrorPage2.jsx'
import Home from './Front/Home'
import SignUpForm from './Front/SignUpForm'
import LoginForm from './Front/LoginForm'
import Navbar from './Front/NavBar';
import Materias from './Front/Materias';
import EstudiantesAdmin from './Front/EstudiantesAdmin.jsx';
import EstudiantesLista from './Front/EstudiantesLista.jsx'
import EstudiantesDetail from './Front/EstudiantesDetail.jsx'
import ContactUsPage from './Front/Components/Contact.jsx'

const fetchEstudiantes = async () => {
  const response = await fetch('http://127.0.0.1:8000/estudiantes/'); // Ajusta la URL según tu API
  const data = await response.json();
  return data;
};

const App = () => {
  const [estudiantes, setEstudiantes] = useState([]);

  useEffect(() => {
    fetchEstudiantes()
    .then(setEstudiantes)
    .catch(error =>
      console.error(error),
      setEstudiantes(null)
    );
  }, []);

  // Simulación de actualización de datos cada 5 segundos
  // useEffect(() => {
  //   const intervalo = setInterval(() => {
  //     // Simulación de actualización de datos
  //     fetchEstudiantes().then(setEstudiantes);
  //   }, 5000);

  //   return () => clearInterval(intervalo);
  // }, [estudiantes]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <LoginForm /> },
        { path: "/signUp", element: <SignUpForm /> },
        { path: "/materias", element: <Materias /> },
        { path: "/estudiantes/admin", element: <EstudiantesAdmin /> },
        { path: "/estudiantes", element: <EstudiantesLista estudiantes={estudiantes} /> },
        { path: "/estudiantes/:legajo", element: <EstudiantesDetail estudiantes={estudiantes} /> },
        { path: "/contact", element: <ContactUsPage /> }
      ]
    },
  ]);

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

{/*  Esta era la anterior forma que tenia configurado la App.jsx 
  <>
    <Routes>
      <Route path="/" element={<Home />}  ErrorBoundary={<ErrorPage />} errorElement={<ErrorPage />} />
      <Route path="/signUp" element={<SignUpForm />} />
      <Route path="/logIn" element={<LoginForm />} />
      <Route path="/materias" element={<Materias />} />
    </Routes>
  </> 
*/}