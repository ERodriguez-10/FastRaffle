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
        <div>Loading...</div>
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
                        "md:my-8 md:mx-2 w-full md:w-auto px-6 py-2 rounded-md font-bold border border-gray-400"
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
                        date={r.dateEnd}
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
