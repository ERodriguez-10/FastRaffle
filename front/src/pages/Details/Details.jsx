import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";

const Details = ({ r }) => {
  const { id } = useParams();
  const [raffleData, setRaffleData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const updateRaffles = async () => {
      try {
        const responseRaffle = await fetch(
          `http://localhost:8080/api/raffle/${id}`
        );
        if (!responseRaffle.ok) {
          throw new Error("Error al cargar los datos");
        }
        const dataRaffle = await responseRaffle.json();

        console.log(dataRaffle.data);

        setRaffleData(dataRaffle.data);
      } catch (error) {
        setError(error.message);
      }
    };

    updateRaffles();
  }, []);

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

  return (
    <div className="bg-impresario">
      <div className="container mx-auto my-auto text-start h-screen flex flex-col">
        <div className="grid grid-cols-4 h-1/5 w-full p-5 border-0 border-b-2 border-gray-400">
          {raffleData && (
            <>
              <div className="col-span-2 text-white">
                <h1 className="font-extrabold text-3x1">
                  Titulo: {raffleData.title}
                </h1>
                <p className="text-lg">Descripcion: {raffleData.description}</p>
                <p className="text-lg">
                  Codigo de participación:
                  <span className="text-gray-400">{raffleData.code}</span>
                </p>
                {raffleData.hasMaxSize && (
                  <p className="text-lg">
                    Cantidad máxima de participantes: {raffleData.maxSize}
                  </p>
                )}

                {!raffleData.hasMaxSize && (
                  <p className="text-lg">
                    Cantidad máxima de participantes: Ilimitada
                  </p>
                )}
              </div>
              <div className="col-span-1 text-white">
                <h2>Creador: Admin</h2>
                <p>Fecha inicio: {formatDate(raffleData.dateStart)}</p>
                <p>Fecha final: {formatDate(raffleData.dateEnd)}</p>
              </div>
            </>
          )}
          <div className="col-span-1 flex justify-end">
            <Button
              text={"Sortear"}
              bg={"#ffa988"}
              className={
                "my-8 mx-2 px-6 py-2 rounded-md font-bold text-black w-1/3"
              }
            />
          </div>
        </div>
        <div className="w-full p-5 text-white">
          <h2 className="text-center my-4 font-bold text-2x1">Participantes</h2>
          <div className="flex flex-row gap-4 my-auto overflow-y-auto flex-wrap max-h-[480px]">
            {(() => {
              const images = [];
              for (let i = 0; i < 100; i++) {
                images.push(
                  <img
                    key={i}
                    src={
                      "https://img.freepik.com/free-icon/user_318-286823.jpg"
                    }
                    alt={`Imagen ${i}`}
                    className="m-2 h-16 cursor-pointer"
                    onClick={() => {
                      console.log(`Imagen ${i}`);
                    }}
                  />
                );
              }
              return images;
            })()}
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            text={"Participar"}
            bg={"#ffa988"}
            className={
              "my-8 mx-2 px-6 py-2 rounded-md font-bold text-black w-1/3"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
