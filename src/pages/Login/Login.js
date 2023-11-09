
import {useFormik} from "formik"
import { initialValues, validationSchema } from "./schemas"
import {Container,Grid,TextField,Button,Box} from "@mui/material"
import * as  Yup from "yup"
import { useContext, useState } from "react"
import { AuthContex, useAuth } from "../../contexts/Auth"

const Login =() =>{
  const history = useHistory()
  const [wrrongPassword,setWrrongPassword] = useState(false)

  const {login} = useAuth()

  const handleLogin =({userName,password})=>{
    // validados con mi esquema.
    console.log(userName,password);
    const jkt = login({userName,password})
    if (!jkt) return   setWrrongPassword(true)
    setWrrongPassword(false)
  history.push("/dasboard")


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