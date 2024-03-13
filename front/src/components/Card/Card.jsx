const Card = ({ title, description, code }) => {
  return (
    <div className="w-full p-6 pr-12 text-start border border-gray-400 rounded-xl">
      <h2 className="text-white font-bold text-xl">{title}</h2>
      <p className="text-gray-400 text-sm my-2">{description}</p>

      <p className="text-white font-bold">
        Participation Code:{" "}
        <span className="text-gray-400 text-sm">{code}</span>
      </p>
    </div>
  );
};

export default Card;
