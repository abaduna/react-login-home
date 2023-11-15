
import NavBar from "../Navbar"


// HoC => empiezan con withAlgo... es una funcion
/*
HoC: es una funcion que recibe un componente y retorna un componente modificado

*/
const whitLayout=(Component)  =>(props)=> {
  return (
    <>
        <NavBar></NavBar>
        <Component {...props}></Component>
    </>
  )
}

export default whitLayout