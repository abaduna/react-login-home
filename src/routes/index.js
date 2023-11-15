import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";


// soluciones 1) hacer un renderizado condicional 2) armar un layout 3)Armar un Hoc 4) Armar un layout en una ruta privada
  const RoutesPrincial =()=>{
    return(
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <PrivateRoute
                path="/dashoard"
                element={<Dashboard/>}
                />
                
                <Route
                path="*"
                element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    )
  }

export default RoutesPrincial