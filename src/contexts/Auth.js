import {createContext, useContext,useRedecer} from "react"

import {LOGOUT, SET_AUTH} from "../action/auth"
import { authReducer, initialState } from "../reducers/AUTH.JS"


import {jwt_decode} from "jwt-decode"
import { API } from "../API"

export const AuthContex = createContext()

//provaider
 const {Provider} = AuthContex


 export const AuthProvider =({children})=>{
    const [state,dispatch] = useRedecer(authReducer,initialState)

    const logout =({userName,password})=>{
        //PECION 
        dispatch({type:LOGOUT})
        localStorage.removeItem("auth")
    }

    const getUserInformarion =()=>jwt_decode(state.jwt)
        
    

    const login=()=>{
        //PETICION HTTP axios.post({userName,password}) el server respode un token
        // una vez que se ejecuta el metodo login
        //bakend verifica el user password enviado
        //si el user y pass es correcto crear un JWT 
        API.post("/auth", {userName, password},{headers:{Authorization: localStorage.getItem("auth")}})
        if (userName ==="admin" && password ==="1234"){
          const {jkt}={
            jkt:"sfdgkusdghsdghisdgkhusdgh"
        };  
            setAuth({jkt})
            localStorage.setItem("auth",jkt)
            return jkt 
        }else{
            return null
        }
        
        
        return jwt

    }

    const setAuth =()=>{
        dispatch({type:SET_AUTH,payload:{jkt}})
    }
    return (
        <Provider value={{state,setAuth,logout,login,getUserInformarion}}>
           {children} 
        </Provider>
    ) 
    
 }


 export const useAuth =()=>{
    const contex = useContext(AuthContex)
    if(!contex) throw new Error("useAuth must be wrapped witn Authprovider")
    return contex
 }