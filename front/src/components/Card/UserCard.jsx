

const UserCard = ({user})=>{
    return(
        <div>
            <img src={user.avatar_id} alt={`Avatar de ${user.globalname}`} />
            <b>{user.globalname}</b>
        </div>
    )
}

export default UserCard;