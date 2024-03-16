import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const today = Date.now;
const Card = ({
  title,
  description,
  code,
  isParticipating,
  isActive,
  date,
}) => {
  const { isAdmin } = useContext(AuthContext);

  return (
    <div className="w-full h-full flex justify-between p-6 border border-gray-400 rounded-xl">
      <div className="text-start flex flex-col justify-between">
        <div className="mr-6">
          <h2 className="text-white font-bold text-xl">{title}</h2>
          <p className="text-gray-400 text-sm my-2">{description}</p>

          <p className="text-white font-bold">
            Código de participación:{" "}
            <span className="text-gray-400 text-sm">{code}</span>
          </p>
        </div>
        {isAdmin ? (
          <></>
        ) : (
          <div>
            {isParticipating ? (
              <p className="text-emerald-400 font-bold pt-6 text-center">
                ¡Ya estas participando!
              </p>
            ) : (
              <p className="text-customOrange font-bold pt-6 text-center">
                ¡Todavía puedes ser parte del sorteo!
              </p>
            )}
          </div>
        )}
      </div>
      <div>
        {isActive && date > today && (
          <span className="bg-green-600 p-2 rounded-xl">Activo</span>
        )}
        {isActive && date <= today && (
          <span className="bg-yellow-400 p-2 rounded-xl">Pendiente</span>
        )}
        {!isActive && (
          <span className="bg-red-600 p-2 rounded-xl">Finalizado</span>
        )}
      </div>
    </div>
  );
};

export default Card;
