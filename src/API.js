import axios from "axios"

export const API = axios.create({
    baseURL:"rsgoufsdgjhsdgh",

})
//request  =>   enviar info
//response =>   recibir informacion
API.interceptors.request.use((config)=>{
    const jwt = localStorage.getItem("auth") ?? ""
    config.headers[Authorization] = jwt
    return config
})

API.interceptors.response.use((response)=>response,(error)=> {
    if (error.response.status === 401) {
        localStorage.removeItem("auth")
        window.localStorage.href ="/loging"
        return
        
    }
})