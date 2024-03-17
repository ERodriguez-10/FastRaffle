import { useContext, useEffect, useState } from "react";
import Button from "../../components/Button/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";

const Dashboard = () => {
  const { user, loading, logout, isAdmin } = useContext(AuthContext);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [codeModalOpen, setCodeModalOpen] = useState(false);

  const [raffles, setRaffles] = useState([]);

  const updateRaffles = async () => {
    const responseRaffle = await fetch("http://localhost:8080/api/raffle");
    const dataRaffle = await responseRaffle.json();

    setRaffles(dataRaffle.raffleList);
  };

  useEffect(() => {
    updateRaffles();
  }, [isOpenModal, codeModalOpen]);

  return (
    <>
      {loading || user === null ? (
        <div className="bg-impresario w-screen h-screen flex justify-center items-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {isOpenModal ? (
            <Modal
              setOpenModalFunction={() => setIsOpenModal(!isOpenModal)}
              isOpen={isOpenModal}
              formName={"raffle"}
            />
          ) : (
            <></>
          )}
          {codeModalOpen ? (
            <Modal
              setOpenModalFunction={() => setCodeModalOpen(!codeModalOpen)}
              isOpen={codeModalOpen}
              formName={"code"}
              user={user.id}
            />
          ) : (
            <></>
          )}
          <div className="bg-impresario">
            <div className="container mx-auto min-h-screen">
              <div className="flex flex-col md:flex-row justify-between text-white w-full">
                <h1 className="my-auto font-bold text-4xl p-8">
                  Panel Principal
                </h1>
                <div className="mx-10 md:flex md:justify-between md:mx-0 md:px-4">
                  {isAdmin && (
                    <Button
                      text={"Nuevo sorteo"}
                      bg={"transparent"}
                      iconName={"ri-admin-line"}
                      onClickFunction={() => setIsOpenModal(true)}
                      className={
                        "mb-4 md:my-8 md:mx-2 w-full md:w-auto px-6 py-2 rounded-md font-bold border border-gray-400"
                      }
                    />
                  )}
                  {isAdmin ? (
                    <></>
                  ) : (
                    <Button
                      text={"Ingresar código"}
                      bg={"#ffa988"}
                      iconName={"ri-add-circle-line"}
                      onClickFunction={() => setCodeModalOpen(true)}
                      className={
                        "mt-4 mb-8 md:my-8 md:mx-2 w-full md:w-auto px-6 py-2 rounded-md font-bold text-black"
                      }
                    />
                  )}
                  <Button
                    text={"Salir"}
                    bg={"transparent"}
                    iconName={"ri-logout-box-line"}
                    onClickFunction={logout}
                    className={
                      "md:my-8 md:mx-2 w-full md:w-auto px-6 py-2 rounded-md font-bold border border-gray-400"
                    }
                  />
                </div>
              </div>
              {/*<div className="w-full px-4">
            <input
              className="w-full p-2 border rounded-lg text-white"
              type="text"
              placeholder="Buscar..."
            />
          </div>*/}
              <div className="h-full w-full px-4 my-10 grid md:grid-cols-3 gap-8">
                {raffles.map((r) => {
                  const isParticipating = r.participants.some(
                    (p) => p.user_id === user.id
                  );

                  return (
                    <Link to={`/details/${r.code}`} key={r._id}>
                      <Card
                        title={r.title}
                        description={r.description}
                        code={r.code}
                        isParticipating={isParticipating}
                        userId={user.id}
                        updateRaffles={updateRaffles}
                        isActive={r.isActive}
                        dateEnd={r.dateEnd}
                        dateStart={r.dateStart}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
