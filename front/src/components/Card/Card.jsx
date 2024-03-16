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
    <div className="w-full h-full flex justify-between p-3 md:p-6 border border-gray-400 rounded-xl">
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
          <div className="hidden mt-3 md:max-lg:block">
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
        ) : (
          <div>
            {isParticipating ? (
              <>
                <div className="hidden mt-3 md:max-lg:block">
                  {isActive && date > today && (
                    <span className="bg-green-600 p-2 rounded-xl">Activo</span>
                  )}
                  {isActive && date <= today && (
                    <span className="bg-yellow-400 p-2 rounded-xl">
                      Pendiente
                    </span>
                  )}
                  {!isActive && (
                    <span className="bg-red-600 p-2 rounded-xl">
                      Finalizado
                    </span>
                  )}
                </div>
                <p className="text-emerald-400 font-bold pt-3 text-center">
                  ¡Ya estas participando!
                </p>
              </>
            ) : (
              <>
                <div className="hidden mt-3 md:max-lg:block">
                  {isActive && date > today && (
                    <span className="bg-green-600 p-2 rounded-xl">Activo</span>
                  )}
                  {isActive && date <= today && (
                    <span className="bg-yellow-400 p-2 rounded-xl">
                      Pendiente
                    </span>
                  )}
                  {!isActive && (
                    <span className="bg-red-600 p-2 rounded-xl">
                      Finalizado
                    </span>
                  )}
                </div>
                <p className="text-customOrange font-bold pt-3 text-center">
                  ¡Todavía puedes ser parte del sorteo!
                </p>
              </>
            )}
          </div>
        )}
      </div>
      <div className="md:max-lg:hidden">
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
