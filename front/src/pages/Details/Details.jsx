import Button from "../../components/Button/Button";

const Details = ({ r }) => {
  return (
    <div className="bg-impresario">
      <div className="container mx-auto my-auto text-start">
        <div className="grid grid-cols-2 h-1/5 w-full p-5 border-0 border-b-2 border-gray-400">
          <div className="col-start-1 text-white">
            <h1>Titulo: </h1>
            <p>Descripcion: </p>
            <p>Codigo: </p>
          </div>
          <div className="col-start-2 text-white">
            <h2>Creador: </h2>
            <p>Fecha inicio: </p>
            <p>Fecha limite: </p>
            <p>Termina en: ...</p>
          </div>
        </div>
        <div className="h-1/2 w-full p-5 text-white">
          <h2>Participantes</h2>
          <div className="flex flex-row flex-wrap">
            {(() => {
              const images = [];
              for (let i = 0; i < 100; i++) {
                images.push(
                  <img
                    height="64px"
                    width={"64px"}
                    key={i}
                    src={
                      "https://img.freepik.com/free-icon/user_318-286823.jpg"
                    }
                    alt={`Imagen ${i}`}
                    className="m-2"
                  />
                );
              }
              return images;
            })()}
          </div>
        </div>
        <Button
          text={"Participar"}
          bg={"#ffa988"}
          className={"my-8 mx-2 px-6 py-2 rounded-md font-bold text-black"}
        />
      </div>
    </div>
  );
};

export default Details;
