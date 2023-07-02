import React from "react";
import logo from "../../assets/cis.jpg";
import { Grid, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import Axios from "axios";
import swal from "sweetalert2";
import API from "../../API/API_REST";
import Footer from "../../irrigation/components/autors/DerechosA";

export const LoginPage = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formState;
  const onChangeInput = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const useFetchLogin = (e) => {
    e.preventDefault();
    const URL_API = `${API}/users/login`;
    Axios({
      method: "POST",
      data: formState,
      withCredentials: true,
      url: URL_API,
    })
      .then((response) => {
        if (response.status) {
          return response.data;
        }
      })
      .then((result) => {
        if (result.data) {
          localStorage.setItem("user", JSON.stringify(result.data));
          swal
            .fire({
              title: "Bienvenido",
              text: `${result.message}`,
              icon: "success",
              timer: 1000,
            })
            .then(() => {
              window.location.href = "/";
            });
        } else {
          swal.fire({
            title: "Error al iniciar sesión",
            text: `${result.message}`,
            icon: "info",
            timer: 2000,
          });
        }
      })
      .catch((error) => {
        swal.fire({
          title: "Error de Servidor",
          text: "Ocurrio un error inesperado, consulte con el desarrollador",
          icon: "error",
          timer: 2000,
        });
      });
  };
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100vh",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        elevation: 2,
      }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <img alt="" className="img-fluid img-logo" src={logo} />
        <div className="container-form">
          <h1>Inicio Sesión</h1>
          <div className="login-user">
            <form onSubmit={useFetchLogin}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Correo"
                    type="email"
                    name="email"
                    onChange={onChangeInput}
                    value={email}
                    placeholder="demo@demo.com"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Contraseña"
                    type="password"
                    name="password"
                    onChange={onChangeInput}
                    value={password}
                    placeholder="**********"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" fullWidth>
                    Iniciar Sesión
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </div>
      </Grid>
      <Grid
        container
        xs={12}
        justifyContent="center"
        textAlign="center"
        alignItems="center"
      >
        <Footer />
      </Grid>
    </Grid>
  );
};
