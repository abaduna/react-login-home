import {
    Route,
    Navigate,
  } from "react-router-dom";
import Layout from "../components/Lauout/Layout";
import { useAuth } from "../contexts/Auth";

const PrivateRoute = ({ element,...rest}) => {
    const {isLoggedIn} = useAuth()
  return(
  <>
  <Layout></Layout>
  <Route
    {...rest}
    component={(props)=> 
        isLoggedIn ? <Component {...props} /> : <Navigate to="/login" replace />
    
    }/> 


  </>


  )    
}


export default PrivateRoute