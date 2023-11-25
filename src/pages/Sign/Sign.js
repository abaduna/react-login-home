
import {useFormik} from "formik"
import { initialValues, validationSchema } from "./schemas"
import {Container,Grid,TextField,Button,Box} from "@mui/material"



import  { useState } from "react";
import { useNavigate } from "react-router-dom";

import {loginSchema } from "./schemas"
import { signInWithEmailAndPassword,signInWithPopup,signOut } from "firebase/auth"
import { auth,googleProvider  } from "../../confic/Firebace";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);

  const handleLogin = async (values) => {
    console.log(`handleLogin ${values}`);
    console.log(values);
    try {
      console.log(`try`);
      await signInWithEmailAndPassword(auth, values.email, values.password);

      console.log("Usuario creado con éxito!");
      navigate("/movies");
    } catch (error) {
      console.log(`catch`);
      console.error("Error al iniciar sesión Firebase:", error.message);
      if (error.code === "auth/invalid-email") {
        setWrongPassword(true);
        console.log("auth/invalid-email");
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      email: email,
      password: password,
    },
    validationSchema: loginSchema,
   onSubmit: (values) => {
      console.log(`onSubmit`);
      console.log(values);
      handleLogin(values);
    },
  });
  const signWithGoogle = async()=>{
    try {
        await signInWithPopup(auth,googleProvider);
        console.log("Usuario creado con éxito!");
        navigate("/movies");
      } catch (error) {
        console.error("Error al crear el usuario", error.message);
      }
}
  return (
    <Container>
      <Grid container="row" justifyContent={"center"} alignContent={"center"}>
        <Grid item xs={12} md={4}>
          <form onSubmit={formik.handleSubmit}>
            <Box mt={2}>
              <TextField
                type="text"
                name="email"
                label="email"
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                fullWidth
              />
              {formik.touched.email && formik.errors.email && (
                <span>{formik.errors.email}</span>
              )}
            </Box>
            <Box mt={2}>
              <TextField
                type="password"
                name="password"
                label="password"
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                fullWidth
              />
              {formik.touched.password && formik.errors.password && (
                <span>{formik.errors.password}</span>
              )}
            </Box>
            <Box mt={3}>
              <Button fullWidth type="submit" variant="contained" color="primary">
                Iniciar Sesión
              </Button>
            </Box>
          </form>
          {wrongPassword && <span> Usuario o Contraseña incorrecta</span>}
         <Grid container="row" pt={2} justifyContent={"center"} alignContent={"center"} >
        <Button fullWidth onClick={signWithGoogle} variant="contained" >
                Iniciar Sesión con google
              </Button>
        </Grid>  
        </Grid>
       
      </Grid>
    </Container>
  );
};

export default Login