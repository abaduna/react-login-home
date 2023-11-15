import {
    Route,
    Navigate,
  } from "react-router-dom";

const PrivateRoute = ({isLoggedIn, component: Component,...rest}) => 
  <Route
    {...rest}
    component={(props)=> 
        isLoggedIn ? <Component {...props} /> : <Navigate to="/login" replace />
    
    }
  />

export default PrivateRoute