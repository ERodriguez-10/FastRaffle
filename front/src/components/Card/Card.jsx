import Button from "../Button/Button";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Card = ({
  title,
  description,
  code,
  isParticipating,
  userId,
  updateRaffles,
}) => {
  const handleParticipate = async (rCode, user) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/raffle/${rCode}/user/${user}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);

      if (!responseData.error) {
        toast.success("¡Tu participación se ha registrado correctamente!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        updateRaffles();
      } else {
        toast.error(`${responseData.message}`, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="w-full p-6 pr-12 text-start border border-gray-400 rounded-xl">
      <h2 className="text-white font-bold text-xl">{title}</h2>
      <p className="text-gray-400 text-sm my-2">{description}</p>

      <p className="text-white font-bold">
        Código de participación:{" "}
        <span className="text-gray-400 text-sm">{code}</span>
      </p>
      {isParticipating && (
        <p className="text-emerald-400 font-bold pt-6 text-center">
          ¡Ya estas participando!
        </p>
      )}
      {!isParticipating && (
        <div className="flex justify-center">
          <Button
            text={"Participar"}
            bg={"#ffa988"}
            iconName={"ri-gift-fill"}
            onClickFunction={() => handleParticipate(code, userId)}
            className={"mt-6 px-6 py-1 rounded-md font-bold text-black"}
          />
        </div>
      )}
    </div>
  );
};

export default Card;
