const UserCard = ({ user, position, className }) => {
  return (
    <div className={`p-5 my-2 border border-gray-400 rounded-md ${className} flex flex-col justify-between`}>
			<div>
				<img src={user.avatar_id} alt={`Avatar de ${user.globalname}`} />
				<h2 className="text-center">{user.globalname}</h2>
			</div>
			<h2 className="text-center">{position}° Puesto</h2>
    </div>
  );
};

export default UserCard;
