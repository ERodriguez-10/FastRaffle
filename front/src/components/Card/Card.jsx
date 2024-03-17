import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const today = new Date().getTime();
const Card = ({
  title,
  description,
  code,
  isParticipating,
  isActive,
  dateEnd,
  dateStart,
}) => {
  const newDateStart = new Date(dateStart).getTime();
  const newDateEnd = new Date(dateEnd).getTime();
  const { isAdmin } = useContext(AuthContext);

  return (
    <div className="w-full h-full flex justify-between p-3 md:p-6 border border-gray-400 rounded-xl">
      <div className="text-start flex flex-col justify-between">
        <div className="mr-6">
          <h2 className="text-white font-bold text-xl">{title}</h2>
          <p className="text-gray-400 text-sm my-2">{description}</p>
          {isActive && (
            <p className="text-white font-bold">
              Código de participación:{" "}
              <span className="text-gray-400 text-sm">{code}</span>
            </p>
          )}
        </div>
        {isAdmin ? (
          <div className="hidden mt-3 md:max-lg:block">
            {isActive && today < newDateStart && (
              <span className="bg-yellow-400 p-2 rounded-xl">Pendiente</span>
            )}
            {isActive && today >= newDateStart && today <= newDateEnd && (
              <span className="bg-green-600 p-2 rounded-xl">Activo</span>
            )}
            {isActive && today > newDateEnd && (
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
                  {isActive && today < newDateStart && (
                    <span className="bg-yellow-400 p-2 rounded-xl">
                      Pendiente
                    </span>
                  )}
                  {isActive && today >= newDateStart && today <= newDateEnd && (
                    <span className="bg-green-600 p-2 rounded-xl">Activo</span>
                  )}
                  {isActive && today > newDateEnd && (
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
                {isActive && (
                  <p className="text-emerald-400 font-bold pt-3 text-center">
                    ¡Ya estas participando!
                  </p>
                )}
              </>
            ) : (
              <>
                <div className="hidden mt-3 md:max-lg:block">
                  {isActive && today < newDateStart && (
                    <span className="bg-yellow-400 p-2 rounded-xl">
                      Pendiente
                    </span>
                  )}
                  {isActive && today >= newDateStart && today <= newDateEnd && (
                    <span className="bg-green-600 p-2 rounded-xl">Activo</span>
                  )}
                  {isActive && today > newDateEnd && (
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
                {isActive && (
                  <p className="text-customOrange font-bold pt-3 text-center">
                    ¡Todavía puedes ser parte del sorteo!
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </div>
      <div className="md:max-lg:hidden">
        {isActive && today < newDateStart && (
          <span className="bg-yellow-400 p-2 rounded-xl">Pendiente</span>
        )}
        {isActive && today >= newDateStart && today <= newDateEnd && (
          <span className="bg-green-600 p-2 rounded-xl">Activo</span>
        )}
        {isActive && today > newDateEnd && (
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
