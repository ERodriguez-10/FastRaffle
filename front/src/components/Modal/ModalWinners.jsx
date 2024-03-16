import { useState } from "react";
import { toast } from "react-toastify";
import UserCard from "../Card/UserCard";

//TODO:
//-url del fetch
//-estilos
//-setIsOpenModal

function ModalWinners({ setOpenModalFunction }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
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
        const data = await response.json();
        setLoading(false);
        throw new Error(
          `HTTP error! Status: ${response.status} Message: ${data.message}`
        );
      }

      const data = await response.json();

      setUsers(data.winners);
      setLoading(false);
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
        <div className="flex justify-center items-center">
          {loading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
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
    </div>
  );
}

export default ModalWinners;
