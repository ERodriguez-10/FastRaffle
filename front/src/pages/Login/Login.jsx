import { useState } from "react";
import Button from "../../components/Button/Button.jsx";
import Modal from "../../components/Modal/Modal.jsx";

const Login = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleLogin = async () => {
    window.location.href = "http://localhost:8080/api/auth/discord";
  };

  return (
    <>
      {openModal && (
        <Modal
          formName={"login"}
          isOpen={openModal}
          setOpenModalFunction={() => setOpenModal(false)}
        />
      )}
      <div className="bg-impresario">
        <div className="container mx-auto text-center flex flex-col items-center justify-center h-screen">
          <img
            src="https://media.licdn.com/dms/image/C4E0BAQHZYYIUKBtZNw/company-logo_200_200/0/1677855312170/devtalles_logo?e=1718236800&v=beta&t=Mr5D2UCUBCFCNKu3VsgHf2tjlFbFgUCfrxKJoN4f1NQ"
            className="rounded-full h-20 my-3"
          />
          <h1 className="text-center text-white text-3xl">
            Inicia sesión para continuar!
          </h1>
          <div>
            <Button
              onClickFunction={handleLogin}
              text={"Continuar con Discord"}
              iconName={"ri-discord-fill"}
              bg={"#ffa988"}
              className={"mt-8 mx-6 px-10 py-2 rounded-md font-bold"}
            />
            <Button
              onClickFunction={() => setOpenModal(true)}
              text={"Soy Admin"}
              iconName={"ri-admin-fill"}
              bg={"#ffa988"}
              className={"mt-8 mx-6 px-10 py-2 rounded-md font-bold"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
