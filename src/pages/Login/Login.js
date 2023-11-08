
import {useFormik} from "formik"
import { initialValues, validationSchema } from "./schemas"
import {Container,Grid,TextField,Button,Box} from "@mui/material"

const Login =() =>{

  const handleLogin =({userName,password})=>{
    // validados con mi esquema.


  }

  const formik = useFormik({
    initialValues,
    validationSchema,
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
                    label="Usuario"
                    onChange={formik.handleChange}
                    error={formik.errors.userName}
                    fullWidth
                  />

                </Box>
            </form>
          </Grid>

        </Grid>
    </Container>
  )
}

export default Login