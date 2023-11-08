import * as  Yup from "yup"


export const initialValues = {
    userName:"",
    password:"",
}
export const validationSchema = {
    userName: Yup.string().required("El campo usuario es obligatorio"),
    password:  Yup.string()
    .min(5,"El campo password debe tener  caracteres")
    .required("El campo password es obligatorio")

}