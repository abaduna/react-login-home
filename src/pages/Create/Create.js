import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { createSchema } from "./schemas";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../confic/Firebace"; // Asegúrate de importar la configuración de Firebase correctamente
import {Container,Grid,TextField,Button,Box} from "@mui/material"
const Create = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (values) => {
    try {
      console.log("try");
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      console.log("Usuario creado con éxito!");
      navigate("/movies");
    } catch (error) {
      console.log("catch");
      console.error("Error al iniciar sesión Firebase:", error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    },
    validationSchema: createSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

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
          <Box mt={2}>
          <TextField
              type="password"
              name="confirmPassword"
              label="confirmPassword"
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              fullWidth
            />
            {formik.touched.password && formik.errors.password && (
              <span>{formik.errors.password}</span>
            )}
          </Box>
          <Box mt={3}>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Crear Secion
            </Button>
          </Box>
        </form>
        
      </Grid>

    </Grid>
  </Container>
  );
};

export default Create