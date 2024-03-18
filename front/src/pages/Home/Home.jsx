import Button from "../../components/Button/Button.jsx";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-impresario min-h-full">
      <div className="container px-4 md:mx-auto text-center flex flex-col items-center justify-center h-screen">
        <img src="/ISO_DUO.png" className="rounded-full h-20 my-3" />
        <h1 className="text-center text-white text-4xl">
          Bienvenidos a FastRaffle
        </h1>
        <h2 className="text-center text-white pt-4 text-3xl">
          ¡La app de sorteos de DevTalles!
        </h2>
        <Link to={"/login"}>
          <Button
            text={"Comenzar"}
            bg={"#ffa988"}
            className={"my-8 px-10 py-2 rounded-md font-bold"}
          />
        </Link>
        <div className="text-left border-gray-400 md:w-1/2 lg:w-1/3 border px-3 py-3 rounded-md">
          <h4 className="text-xl text-white pb-6">
            <i className="ri-coupon-fill mr-2"></i>
            Participa, comparte y disfruta!
          </h4>
          <p className="text-gray-400">Gana muchos premios!</p>
          <p className="py-2 text-gray-400">Sorteos de la comunidad</p>
          <p className="text-gray-400" style={{ marginBottom: 0 }}>
            Premios varios...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
