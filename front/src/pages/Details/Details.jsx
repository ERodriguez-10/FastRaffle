import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import UserCard from "../../components/Card/UserCard.jsx";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { AuthContext } from "../../context/AuthContext.jsx";

const Details = () => {
  const { id } = useParams();
  const { user, isAdmin } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [raffleData, setRaffleData] = useState(null);
  const [isParticipating, setIsParticipating] = useState(false);

  const updateRaffles = async () => {
    try {
      const responseRaffle = await fetch(
        `http://localhost:8080/api/raffle/${id}`
      );
      if (!responseRaffle.ok) {
        throw new Error("Error al cargar los datos");
      }
      const dataRaffle = await responseRaffle.json();

      setRaffleData(dataRaffle.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateRaffles();
  }, [id]);

  useEffect(() => {
    if (raffleData && !loading && user !== null) {
      setIsParticipating(
        raffleData.participants.some((ob) => ob.user_id === user.id)
      );
    }
  }, [raffleData]);

  const formatDate = (date) => {
    let fecha = new Date(date);

    let dia = fecha.getUTCDate();
    let mes = fecha.getUTCMonth() + 1; // Los meses en JavaScript van de 0 a 11
    let año = fecha.getUTCFullYear();

    // Asegúrate de que el día y el mes siempre tengan dos dígitos
    if (dia < 10) dia = "0" + dia;
    if (mes < 10) mes = "0" + mes;

    let fechaFormateada = `${dia}-${mes}-${año}`;

    return fechaFormateada; // Debería imprimir "17-03-2024"
  };

  const handleParticipate = async (uId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/raffle/${id}/user/${uId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();

      if (!responseData.error) {
        toast.success("¡Tu participación se ha registrado correctamente!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setIsParticipating(true);

        await updateRaffles();
      } else {
        toast.error(`${responseData.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      {loading || user === null ? (
        <div className="bg-impresario w-screen h-screen flex justify-center items-center">
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
        </div>
      ) : (
        <div className="bg-impresario">
          <div className="container mx-auto my-auto text-start flex flex-col justify-between lg:h-screen md:h-screen">
            <div>
              <div className="grid grid-cols-12 p-5 border-0 border-b-2 border-gray-400 pt-8">
                <div className="col-span-full text-white sm:col-span-1">
                  <Link to={"/dashboard"}>
                    <i className="ri-arrow-left-line text-4xl"></i>
                  </Link>
                </div>
                <div className="col-span-full text-white sm:col-span-5">
                  <h1 className="font-bold text-lg py-1">
                    Titulo:{" "}
                    <span className="text-base font-normal">
                      {raffleData && raffleData.title}
                    </span>
                  </h1>
                  <p className="text-lg font-bold py-1">
                    Descripcion:{" "}
                    <span className="text-base font-normal">
                      {raffleData && raffleData.description}
                    </span>
                  </p>
                  <p className="text-lg font-bold py-1">
                    Codigo de participación:{" "}
                    <span className="text-base font-normal">
                      {raffleData && raffleData.code}
                    </span>
                  </p>
                  {raffleData && raffleData.hasMaxSize && (
                    <p className="text-lg font-bold">
                      Cantidad máxima de participantes:{" "}
                      <span className="text-base font-normal">
                        {raffleData && raffleData.maxSize}
                      </span>
                    </p>
                  )}

                  {raffleData && !raffleData.hasMaxSize && (
                    <p className="text-lg font-bold py-2">
                      Cantidad máxima de participantes:{" "}
                      <span className="text-base font-normal">Ilimitada</span>
                    </p>
                  )}
                </div>

                <div className="col-span-full text-white sm:col-span-5">
                  <p className="text-lg font-bold py-1">
                    Creador:{" "}
                    <span className="text-base font-normal">Admin</span>
                  </p>
                  <p className="text-lg font-bold py-1">
                    Fecha inicio:{" "}
                    <span className="text-base font-normal">
                      {raffleData && formatDate(raffleData.dateStart)}
                    </span>
                  </p>
                  <p className="text-lg font-bold py-1">
                    Fecha final:{" "}
                    <span className="text-base font-normal">
                      {raffleData && formatDate(raffleData.dateEnd)}
                    </span>
                  </p>
                </div>

                {isAdmin && raffleData && raffleData.isActive ? (
                  <div className="col-span-full flex justify-end items-start sm:col-span-1">
                    <Button
                      onClickFunction={() => {
                        setIsModalOpen(true);
                      }}
                      text={"Sortear"}
                      bg={"#ffa988"}
                      className={"px-6 py-2 rounded-md font-bold text-black"}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>

              {raffleData && raffleData.isActive ? (
                <div>
                  <h2 className="text-center my-8 font-bold text-4xl text-white">
                    Participantes
                  </h2>

                  <div className="flex flex-row gap-4 items-start overflow-x-auto flex-wrap p-5">
                    {raffleData &&
                      raffleData.participants.map((p) => {
                        return (
                          <div className="flex flex-col px-3" key={p._id}>
                            <img
                              src={`https://cdn.discordapp.com/avatars/${p.user_id}/${p.avatar_id}.png`}
                              width={64}
                              height={64}
                              className="rounded-full mx-auto"
                            />
                            <p className="text-white text-center pt-4">
                              {p.globalname}
                            </p>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-center my-8 font-bold text-4xl text-white">
                    Resultados
                  </h2>
                  <div className="flex flex-row gap-4 items-center justify-center overflow-x-auto flex-wrap p-5">
                    {raffleData &&
                      raffleData.winners.map((p, index) => {
                        return (
                          <UserCard
                            key={p._id}
                            position={index + 1}
                            u={p}
                            className={"text-white"}
                          />
                        );
                      })}
                  </div>
                </div>
              )}
            </div>

            {isModalOpen && (
              <Modal
                formName={"winners"}
                isOpen={isModalOpen}
                setOpenModalFunction={() => setIsModalOpen(false)}
              />
            )}

            {isAdmin ? (
              <></>
            ) : (
              raffleData &&
              raffleData.isActive && (
                <>
                  {isParticipating ? (
                    <Button
                      text={"¡Ya estás participando!"}
                      className={
                        "my-14 px-6 py-2 rounded-md font-bold text-black w-1/2 sm:w-1/3 mx-auto bg-green-400"
                      }
                    />
                  ) : (
                    <Button
                      text={"Participar"}
                      bg={"#ffa988"}
                      className={
                        "my-14 px-6 py-2 rounded-md font-bold text-black w-1/3 mx-auto"
                      }
                      onClickFunction={() => handleParticipate(user.id)}
                    />
                  )}
                </>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
