import Button from "../../components/Button/Button.jsx";
import "./Login.css";

const Login = () => {
  const handleLogin = async () => {
    window.location.href = "http://localhost:8080/api/auth/discord";
  };
  return (
    <div className="container">
      <img
        src="https://media.licdn.com/dms/image/C4E0BAQHZYYIUKBtZNw/company-logo_200_200/0/1677855312170/devtalles_logo?e=1718236800&v=beta&t=Mr5D2UCUBCFCNKu3VsgHf2tjlFbFgUCfrxKJoN4f1NQ"
        className="logo my-3"
      />
      <h1 className="title">Inicia sesión para continuar!</h1>
      <Button
        onClickFunction={handleLogin}
        text={
          "<i style='background: rgb(255, 169, 136); font-size: 50px;' class='ri-discord-fill'><p style='background: rgb(255, 169, 136); display: inline-block; font-size: 20px'>Continuar con Discord</p></i>"
        }
        bg={"#ffa988"}
        className={"my-5"}
      />
    </div>
  );
};

export default Login;
