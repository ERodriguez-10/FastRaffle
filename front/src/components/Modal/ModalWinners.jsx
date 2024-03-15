import React, { useState } from "react";
import UserCard from "../Card/UserCard";

//TODO:
//-url del fetch
//-estilos
//-setIsOpenModal

function ModalWinners({ setOpenModalFunction }) {
  const [users, setUsers] = useState([
    {
      user_id: "asdq",
      globalname: "Mariano",
      avatar_id: "Hola",
    },
    {
      user_id: "asdq",
      globalname: "Lucero",
      avatar_id: "Hola",
    },
    {
      user_id: "asdq",
      globalname: "Keito",
      avatar_id: "Hola",
    },
  ]);

  const fetchUsers = async () => {
    try {
      const codigo = "codigo_aqui";
      const response = await fetch(`/${codigo}/giveaway`);
      if (!response.ok) {
        throw new Error("La respuesta no fue exitosa");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  return (
    <div className="w-full bg-impresario text-white">
      <div className="space-y-12 p-6">
        <div className="flex justify-between">
          <h1 className="text-center text-3xl font-bold">¡Realizar Sorteo!</h1>
          <div className="flex justify-center">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-white mx-5"
              onClick={setOpenModalFunction}
            >
              Cerrar
            </button>
            <button
              type="submit"
              className="rounded-md bg-customOrange px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={fetchUsers}
            >
              Sortear
            </button>
          </div>
        </div>
        <div className="flex justify-between gap-4">
          {users.slice(1, 2).map((user, index) => (
            <UserCard key={user.user_id} user={user} position={2} className={"mt-3"}/>
          ))}
          {users.slice(0, 1).map((user, index) => (
            <UserCard key={user.user_id} user={user} position={1} className={"mt-0"}/>
          ))}
          {users.slice(2, 3).map((user, index) => (
            <UserCard key={user.user_id} user={user} position={3} className={"mt-6"}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ModalWinners;
