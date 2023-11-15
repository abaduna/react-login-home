import {
    Route,
    Navigate,
  } from "react-router-dom";
import Layout from "../components/Lauout/Layout";

const PrivateRoute = ({isLoggedIn, element,...rest}) => 
  <>
  <Layout></Layout>
  <Route
    {...rest}
    component={(props)=> 
        isLoggedIn ? <Component {...props} /> : <Navigate to="/login" replace />
    
    }/> 


  </>


export default PrivateRoute