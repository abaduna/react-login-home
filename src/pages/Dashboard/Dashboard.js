
import { useContext } from "react"
import { AuthContex } from '../../contexts/Auth'

import NavBar from "../../components/Navbar"
import whitLayout from "../../components/Lauout/Layout"
function Dashboard() {

  const {getUserInformarion} = useContext(AuthContex)
  const {name}=getUserInformarion()

  return (
    <>
        <h2>Hola mundo desde el Dashboard</h2>


    </>

  )
}
export default Dashboard
// export default whitLayout(Dashboard) 