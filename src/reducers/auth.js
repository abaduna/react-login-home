import {LOGOUT, SET_AUTH} from "../action/auth"
export const initialState = {
    isLoggeIn: false,
    jwt: null, //enviar en cada request HTTP cabecera + localStorage
    loading: true,
    error: false,
    data:[]
}
// {payload: {jkt: sdfkuzsdfhkfsda}}
export const authReducer =(state,action)=> {
    switch(action.type){
        case SET_AUTH:{
            const {jkt} = action.payload
            return {
                isLoggeIn: true,
                jkt,
                loading: false,
                error: false
            }
        }
        case LOGOUT:{
            // const {jkt} = action.payload
            return {
                ...initialState,
                loading: false,
            } 
        }
        default:
          return  state

            
    }

}