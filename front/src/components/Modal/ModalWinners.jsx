import { useState } from "react";
import { toast } from "react-toastify";
import UserCard from "../Card/UserCard";

//TODO:
//-url del fetch
//-estilos
//-setIsOpenModal

function ModalWinners({ setOpenModalFunction }) {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const path = window.location.pathname;
      const params = path.split("/").filter((part) => part !== "");
      const code = params[params.length - 1];

      const response = await fetch(
        `http://localhost:8080/api/raffle/${code}/giveaway`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.json()
        throw new Error(
          `HTTP error! Status: ${response.status} Message: ${data.message}`
        );
      }

      const data = await response.json();

      console.log(data);

      setUsers(data.winners);
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="w-full bg-impresario text-white">
      <div className="space-y-12 p-6">
        <div className="flex justify-between">
          <h1 className="text-center text-xl sm:text-3xl font-bold">
            ¡Realizar Sorteo!
          </h1>
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
        {users.length > 0 && (
          <div className="flex justify-between gap-4">
            {users.slice(1, 2).map((user) => (
              <UserCard
                key={user.user_id}
                u={user}
                position={2}
                className={"mt-3"}
              />
            ))}
            {users.slice(0, 1).map((user) => (
              <UserCard
                key={user.user_id}
                u={user}
                position={1}
                className={"mt-0"}
              />
            ))}
            {users.slice(2, 3).map((user) => (
              <UserCard
                key={user.user_id}
                u={user}
                position={3}
                className={"mt-6"}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalWinners;
