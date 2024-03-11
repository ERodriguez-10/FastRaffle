import { useState } from 'react'
import Home from './pages/Home/Home.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Home/>
    </>
  )
}

export default App
