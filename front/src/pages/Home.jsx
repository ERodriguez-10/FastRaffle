import React from 'react'
import "./Home.css"
import Button from '../components/Button/Button.jsx'

const Home = () => {
  return (
    <div className='container'>
      <img src='https://media.licdn.com/dms/image/C4E0BAQHZYYIUKBtZNw/company-logo_200_200/0/1677855312170/devtalles_logo?e=1718236800&v=beta&t=Mr5D2UCUBCFCNKu3VsgHf2tjlFbFgUCfrxKJoN4f1NQ' className='logo my-3'/>
      <h1 className='title'>Bienvenidos a FastRaffle, sorteos de DevTalles!</h1>
      <Button text={"Comenzar"} bg={"#ffa988"} className={"my-5"}/>
      <div className='welcomeDiv row'>
        <div className='col-12 col-md-12 rounded-4 border border-4 p-3'>
          <h4 className='welcomeDivSubtitle'>Participa, comparte y disfruta!</h4>
          <p className='welcomeDivText'>Gana muchos premios!</p>
          <p className='welcomeDivText'>Sorteos de la comunidad</p>
          <p className='welcomeDivText' style={{marginBottom: 0}}>Premios varios...</p>
        </div>
      </div>
    </div>
  )
}

export default Home