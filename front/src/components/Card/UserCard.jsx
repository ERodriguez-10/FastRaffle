const UserCard = ({ u, position, className }) => {
  return (
    <div
      key={position}
      className={`p-5 my-2 border border-gray-400 rounded-md ${className} flex flex-col justify-between`}
    >
      <div className="flex flex-col items-center justify-center">
        <img
          src={`https://cdn.discordapp.com/avatars/${u.user_id}/${u.avatar_id}.png`}
          alt={`Avatar de ${u.globalname}`}
          className="rounded-full h-8 w-8"
        />
        <h2 className="text-center">{u.globalname}</h2>
      </div>
      <h2 className="text-center font-bold">{position}° Puesto</h2>
    </div>
  );
};

export default UserCard;
