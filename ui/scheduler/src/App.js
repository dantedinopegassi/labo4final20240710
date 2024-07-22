// import React, { useState, useEffect } from 'react'
// import ReactDOM from 'react-dom/client'
// import './assets/index.css'
// import { RouterProvider, createBrowserRouter } from 'react-router-dom'
// import ErrorPage from './ErrorPage.jsx'
// import ErrorPage2 from './ErrorPage2.jsx'
// import Home from './Home'
// import SignUpForm from './SignUpForm'
// import LoginForm from './LoginForm'
// import Navbar from './NavBar';
// import Materias from './Materias';
// import EstudiantesAdmin from './EstudiantesAdmin.jsx';
// import EstudiantesLista from './EstudiantesLista.jsx'
// import EstudiantesDetail from './EstudiantesDetail.jsx'
// import ContactUsPage from './Components/Contact.jsx'

// const fetchEstudiantes = async () => {
//   const response = await fetch('http://127.0.0.1:8000/estudiantes/'); // Ajusta la URL según tu API
//   const data = await response.json();
//   return data;
// };

// const App = () => {
//   const [estudiantes, setEstudiantes] = useState([]);

//   useEffect(() => {
//     fetchEstudiantes()
//     .then(setEstudiantes)
//     .catch(error =>
//       console.error(error),
//       setEstudiantes(null)
//     );
//   }, []);

//   // Simulación de actualización de datos cada 5 segundos
//   // useEffect(() => {
//   //   const intervalo = setInterval(() => {
//   //     // Simulación de actualización de datos
//   //     fetchEstudiantes().then(setEstudiantes);
//   //   }, 5000);

//   //   return () => clearInterval(intervalo);
//   // }, [estudiantes]);

//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Navbar />,
//       errorElement: <ErrorPage />,
//       children: [
//         { path: "/", element: <Home /> },
//         { path: "/login", element: <LoginForm /> },
//         { path: "/signUp", element: <SignUpForm /> },
//         { path: "/materias", element: <Materias /> },
//         { path: "/estudiantes/admin", element: <EstudiantesAdmin /> },
//         { path: "/estudiantes", element: <EstudiantesLista estudiantes={estudiantes} /> },
//         { path: "/estudiantes/:legajo", element: <EstudiantesDetail estudiantes={estudiantes} /> },
//         { path: "/contact", element: <ContactUsPage /> }
//       ]
//     },
//   ]);

//   return <RouterProvider router={router} />;
// };

// export default App;
import React from 'react';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-500">
        Tailwind CSS está funcionando correctamente!
      </h1>
    </div>
  );
}

export default App;