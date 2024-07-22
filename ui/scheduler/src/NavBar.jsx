import { Outlet, Link } from "react-router-dom";

const txtBlanco = "text-white hover:text-zinc-300";

const Navbar = () => {
  return (
    <div>
      <nav className="logo flex justify-between items-center p-4 bg-purple-800 rounded-full fixed top-0 left-0 right-0 z-10">
        <div className="ml-4">
          <Link
            to="/"
            className={txtBlanco + " font-bold text-xl hover:text-red-500"}
          >
            Home
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <input id="buscar"
            type="text"
            placeholder="Search..."
            className="rounded-full p-2"
          />
          <Link to="/materias" className={txtBlanco}>
            Materias
          </Link>
          <Link to="/estudiantes" className={txtBlanco}>
            Estudiantes
          </Link>
          <Link to="/contact" className={txtBlanco}>
            Contacto
          </Link>
          <Link to="/login" children>
            <button className="bg-white text-purple-800 py-2 px-4 rounded-full hover:bg-purple-700 hover:text-white">
              Login
            </button>
          </Link>
        </div>
      </nav>
      <div className="pt-20">
        <Outlet />
      </div>
    </div>
  );
};
export default Navbar;
