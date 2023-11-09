
import { useContext } from "react"

function Dashboard() {

  const {getUserInformarion} = useContext(AuthContex)
  const {name}=getUserInformarion()

  return (
    <>
        <h2>Bienvenido: {name}</h2>
        <div>Dashboard</div>
    </>

  )
}

export default Dashboard