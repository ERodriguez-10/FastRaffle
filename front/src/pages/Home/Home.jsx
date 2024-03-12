import "./Home.css";
import Button from "../../components/Button/Button.jsx";

const Home = () => {
  const handleNavegation = () => {
    window.location.href = "/login";
  };

  return (
    <div className="container mx-auto">
      <img
        src="https://media.licdn.com/dms/image/C4E0BAQHZYYIUKBtZNw/company-logo_200_200/0/1677855312170/devtalles_logo?e=1718236800&v=beta&t=Mr5D2UCUBCFCNKu3VsgHf2tjlFbFgUCfrxKJoN4f1NQ"
        className="logo my-3"
      />
      <h1 className="text-center text-white text-4xl">
        Bienvenidos a FastRaffle
      </h1>
      <h2 className="text-center text-white text-3xl">
        ¡La app de sorteos de DevTalles!
      </h2>
      <Button
        text={"Comenzar"}
        bg={"#ffa988"}
        className={"my-8 px-10 py-2 rounded-md font-bold"}
        onClickFunction={handleNavegation}
      />
      <div className="text-left border-gray-400 w-1/3 border px-3 py-3 rounded-md">
        <h4 className="text-xl text-white pb-6">
          Participa, comparte y disfruta!
        </h4>
        <p className="welcomeDivText">Gana muchos premios!</p>
        <p className="welcomeDivText py-2">Sorteos de la comunidad</p>
        <p className="welcomeDivText" style={{ marginBottom: 0 }}>
          Premios varios...
        </p>
      </div>
    </div>
  );
};

export default Home;
