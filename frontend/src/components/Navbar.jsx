import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "../hooks/useForm";
import { Link, useNavigate } from "react-router";

export const Navbar = () => {
  const nav = useNavigate();
  //defino los valores del user
  const [user, setUser] = useState({
    id: "07",
    name: "stella",
    lasName: "bernar",
  });
  const getProfile = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/profile", {
        //es un get, no es necesario poner el metodo
        credentials: "include",
      });
      if (respuesta.ok) {
        const data = await respuesta.json();
        //la respuesta debe venir en formato json
        setUser(data.user);
      }
    } catch (error) {
      console.log("error en el fetcht", error);
      console.error("Error al traer los datos del usuario", error);
    }
  };
  const handleLogout = async (e) => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/logout", {
        //aca si va especificado el metodo pq sino haria un get
        method: "POST",
        credentials: "include",
      });
      if (respuesta.ok) {
        console.log("Sesion cerrada con exito");
        navigate("/register");
      }
    } catch (error) {
      console.log("error al hacer el logout", error);
      console.error("Error al cerrar sesion", error);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  // TODO: Obtener datos del usuario desde /api/profile *
  // TODO: Implementar función handleLogout con POST a /api/logout usando credentials: 'include'*
  // TODO: Después del logout exitoso, redireccionar a /login
  // TODO: Manejar errores apropiadamente

  const userName = user.name; // TODO: Reemplazar con el nombre real del usuario obtenido de /api/profile

  return (
    <nav className="bg-gray-900 text-white h-16 left-0 right-0 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="text-2xl font-bold">Superhéroes App</div>

        <div className="hidden md:flex items-center space-x-6">
          <span className="text-gray-300">
            Bienvenido,{""}
            <span className="font-semibold text-white">{userName}</span>
          </span>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors font-medium"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};
