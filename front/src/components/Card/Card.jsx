const Card = ({ title, description, code, isParticipating }) => {
  return (
    <div className="w-full h-full p-6 pr-12 text-start border border-gray-400 rounded-xl">
      <h2 className="text-white font-bold text-xl">{title}</h2>
      <p className="text-gray-400 text-sm my-2">{description}</p>

      <p className="text-white font-bold">
        Código de participación:{" "}
        <span className="text-gray-400 text-sm">{code}</span>
      </p>
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
  );
};

export default Card;
