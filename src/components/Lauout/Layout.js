
import NavBar from "../Navbar"


// HoC => empiezan con withAlgo... es una funcion
/*
HoC: es una funcion que recibe un componente y retorna un componente modificado

*/
const Layout=({children})  =>(props)=> {
  return (
    <>
        <NavBar></NavBar>
        {children}
    </>
  )
}

export default Layout