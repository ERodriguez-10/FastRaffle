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
  const { user, loading, isAdmin } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        <div>Cargando</div>
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
