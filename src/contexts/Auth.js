
import {createContext, useContext,useRedecer} from "react"

import {LOGOUT, SET_AUTH} from "../action/auth"
import { authReducer, initialState } from "../reducers/auth"


import { jwtDecode } from "jwt-decode"; // Cambio aquí
import { API } from "../API"

export const AuthContex = createContext()

//provaider
 const {Provider} = AuthContex


 export const AuthProvider =({children})=>{
    const [state, dispatch] = useRedecer(authReducer, initialState); // Cambio aquí

    const logout =({userName,password})=>{
        //PECION 
        dispatch({type:LOGOUT})
        localStorage.removeItem("auth")
        window.location.href ="/login"
    }

    const getUserInformation = () => jwtDecode(state.jwt); // Cambio aquí
        
    

    const login= async ({userName,password})=>{
        //PETICION HTTP axios.post({userName,password}) el server respode un token
        // una vez que se ejecuta el metodo login
        //bakend verifica el user password enviado
        //si el user y pass es correcto crear un JWT 
        try {
            const { data: { jwt } } = await API.post("auth", { userName, password });
            if (jwt) {
              setAuth({ jwt }); // Cambio aquí
              localStorage.setItem("auth", jwt);
              return jwt;
            } else {
              return null;
            }
          } catch (error) {
            console.error("Error during login:", error);
            return null;
          }
        
        // if (userName ==="admin" && password ==="1234"){
        //   const {jkt}={
        //     jkt:"sfdgkusdghsdghisdgkhusdgh"
        // };  
        //     setAuth({jkt})
        //     localStorage.setItem("auth",jkt)
        //     return jkt 
        // }else{

        // }
         }

    const setAuth =({jkt})=>{
        dispatch({type:SET_AUTH,payload:{jkt}})
    }
    return (
        <Provider value={{state,setAuth,logout,login,getUserInformation}}>
           {children} 
        </Provider>
    ) 
    
 }


 export const useAuth =()=>{
    const contex = useContext(AuthContex)
    if(!contex) throw new Error("useAuth must be wrapped witn Authprovider")
    return contex
 }