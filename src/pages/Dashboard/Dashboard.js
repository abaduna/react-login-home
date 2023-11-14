
import { useContext } from "react"
import { AuthContex } from '../../contexts/Auth'

import NavBar from "../../components/Navbar"
function Dashboard() {

  const {getUserInformarion} = useContext(AuthContex)
  const {name}=getUserInformarion()

  return (
    <>
        <NavBar></NavBar>    
        <h2>Bienvenido: {name}</h2>

    </>

  )
}

export default Dashboard 