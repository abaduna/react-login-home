import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoute from "../routes/PrivateRoute";



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