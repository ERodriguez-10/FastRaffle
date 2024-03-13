import { useEffect, useState } from "react";
import Button from "../../components/Button/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import Modal from "../../components/Modal/Modal.jsx";

const Dashboard = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [raffles, setRaffles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const responseRaffle = await fetch("http://localhost:8080/api/raffle");
      const dataRaffle = await responseRaffle.json();

      setRaffles(dataRaffle.data);
    }

    fetchData();
  }, []);

  return (
    <>
      {isOpenModal ? (
        <Modal
          setOpenModalFunction={() => setIsOpenModal(!isOpenModal)}
          isOpen={isOpenModal}
        />
      ) : (
        <></>
      )}
      <div className="bg-impresario">
        <div className="container mx-auto">
          <div
            className="flex justify-between text-white"
            style={{ width: "100%" }}
          >
            <h1
              className="my-auto font-bold text-2xl"
              style={{ background: "transparent", display: "inline" }}
            >
              Panel Principal
            </h1>
            <div className="">
              <Button
                text={"Vista de Creador"}
                bg={"transparent"}
                iconName={"ri-admin-line"}
                onClickFunction={() => setIsOpenModal(true)}
                className={
                  "my-8 mx-2 px-6 py-2 rounded-md font-bold border border-gray-400"
                }
              />
              <Button
                text={"Ingresa Código"}
                bg={"#ffa988"}
                iconName={"ri-add-circle-line"}
                className={
                  "my-8 mx-2 px-6 py-2 rounded-md font-bold text-black"
                }
              />
            </div>
          </div>
          <div className="w-full">
            <input
              className="w-full p-2 border rounded-lg text-white"
              type="text"
              placeholder="Buscar..."
            />
          </div>
          <div className="h-full w-full">
            <div className="w-full my-10 grid grid-cols-3 gap-8">
              {raffles.map((r) => {
                return (
                  <Card
                    key={r.raffle_id}
                    title={r.title}
                    description={r.description}
                    code={r.code}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
