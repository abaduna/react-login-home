
import * as  Yup from "yup"


export const createSchema = Yup.object({
    email: Yup.string().email('Correo electrónico no válido').required('Campo requerido'),
    password: Yup.string()
      .required('La contraseña es requerida')
      .min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
      .required('La confirmación de la contraseña es requerida'),
  });