import React, { useState } from 'react';
import UserCard from '../Card/UserCard';

//TODO: 
//-url del fetch
//-estilos
//-setIsOpenModal

function FetchUsersModal() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const codigo = 'codigo_aqui';
      const response = await fetch(`URL/${codigo}`)
      if (!response.ok) {
        throw new Error('La respuesta no fue exitosa')
      }
      
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error)
    }
  }

  return (
    <div className="modal">
      <button onClick={fetchUsers}>Traer Usuarios</button>
      <div className="user-cards">
        {users.map(user => (
          <UserCard key={user.user_id} user={user} />
        ))}
      </div>
    </div>
  )
}

export default FetchUsersModal;