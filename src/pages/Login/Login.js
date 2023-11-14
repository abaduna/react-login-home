
import {useFormik} from "formik"
import { initialValues, validationSchema } from "./schemas"
import {Container,Grid,TextField,Button,Box} from "@mui/material"
import * as  Yup from "yup"
import {  useState } from "react"
import {  useAuth } from "../../contexts/Auth"

import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login =() =>{
  const navigate = useNavigate()
  const [wrrongPassword,setWrrongPassword] = useState(false)

  const {login} = useAuth()

  const handleLogin = async ({userName,password})=>{
    // validados con mi esquema.
    console.log(userName,password);
    const jwt = await login({ userName, password }); // Espera a que se complete la llamada a la función login
    if (!jwt) return   setWrrongPassword(true)
    setWrrongPassword(false)
    navigate("/dasboard"); // Redirige a "/dashboard" después de un inicio de sesión exitoso


  }

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema(),

    onSubmit: (obj)=> {
      handleLogin(obj)
    }
  })

  return (
    <Container>
        <Grid container="row" justifyContent={"center"} alignContent={"center"}>
          <Grid item xs={12} md={4}>
            <form onSubmit={formik.handleSubmit}>
                <Box mt={2}>
                  <TextField
                    type="text"
                    name="userName"
                    label="UserName"
                    onChange={formik.handleChange}
                    error={formik.touched.userName && Boolean(formik.errors.userName)}
                    fullWidth
                  />
                  {formik.touched.userName && formik.errors.userName && (
                     <span>{formik.errors.userName}</span>
                   )}

                </Box>
                <Box mt={2}>
                  <TextField
                    type="password"
                    name="password"
                    label="Password"
                    onChange={formik.handleChange}
                    error={formik.errors.password}
                    fullWidth
                  />
                  {formik?.errors?.userName && <span>{formik.errors.password}</span>}

                </Box>
                <Box mt={3}>
                  <Button fullWidth type="submit" variant="contained" color="primary">Registrarse</Button>
                </Box>
                

          
            </form>
            {wrrongPassword && <span> Usuario o Contraseña incorecta</span>}
          </Grid>

        </Grid>
    </Container>
  )
}

export default Login