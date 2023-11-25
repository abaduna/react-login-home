import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";
import Sign from "../pages/Sign/Sign";
import Create from "../pages/Create/Create"
import Movies from "../pages/Movies/Movies";
import Login from "../pages/Login/Login";
// soluciones 1) hacer un renderizado condicional 2) armar un layout 3)Armar un Hoc 4) Armar un layout en una ruta privada
  const RoutesPrincial =()=>{
    return(
        <Router>
            <Routes>
                <Route path="/sign" element={<Sign/>}/>
                <Route path="/create" element={<Create/>}/>
                <Route path="/movies" element={<Movies/>}/>
                <Route path="/login" element={<Login/>}/>
                
                
                <Route
                path="*"
                element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    )
  }

export default RoutesPrincial