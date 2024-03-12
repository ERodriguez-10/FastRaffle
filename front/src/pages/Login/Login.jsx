import Button from "../../components/Button/Button.jsx";
import "./Login.css";

const Login = () => {
  const handleLogin = async () => {
    window.location.href = "http://localhost:8080/api/auth/discord";
  };
  return (
    <div className="container mx-auto">
      <img
        src="https://media.licdn.com/dms/image/C4E0BAQHZYYIUKBtZNw/company-logo_200_200/0/1677855312170/devtalles_logo?e=1718236800&v=beta&t=Mr5D2UCUBCFCNKu3VsgHf2tjlFbFgUCfrxKJoN4f1NQ"
        className="logo my-3"
      />
      <h1 className="text-center text-white text-3xl">
        Inicia sesión para continuar!
      </h1>
      <Button
        onClickFunction={handleLogin}
        text={"Continuar con Discord"}
        iconName={"ri-discord-fill"}
        bg={"#ffa988"}
        className={"my-8 px-10 py-2 rounded-md font-bold"}
      />
    </div>
  );
};

export default Login;
