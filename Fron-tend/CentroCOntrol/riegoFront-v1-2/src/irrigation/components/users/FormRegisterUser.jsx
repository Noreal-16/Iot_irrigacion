import React, {useState} from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import { Grid, TextField} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import API from "../../../API/API_REST";
import swal from "sweetalert2";
import Axios from "axios";
import { useForm } from "react-hook-form";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const FormRegisterUserComponent = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();
  const [dataUser, setDataUser] = useState({
    nameU: "",
    lastName: "",
    telephone: "",
    direction: "",
    email: "",
    password: "",
  });
  const { nameU, lastName, telephone, direction, email, password } = dataUser;

  const onChangeInput = ({ target }) => {
    const { name, value } = target;
    setDataUser({
      ...dataUser,
      [name]: value,
    });
  };
  const URL_USER = `${API}/users/signup`;

  const onRegisterUserFeth = () => {
    Axios({
      method: "POST",
      data: dataUser,
      withCredentials: true,
      url: URL_USER,
    })
      .then((response) => {
        if (response.data.message) {
            setOpen(false)
          swal
            .fire({
              title: "Registro Guardado",
              text: `${response.data.message}`,
              icon: "success",
              timer: 2000,
            })
            .then(() => {
                window.location.href = "/users"
            });
        } else {
            setOpen(false)
          swal
            .fire({
              title: "Error al guardar Registro",
              text: `${response.data.error}`,
              icon: "error",
              timer: 2000,
            })
            .then(() => {
                window.location.href = "/users"
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
    <div>
      <Button variant="contained" color="success" onClick={handleOpen}>
        <BorderColorIcon /> Nuevo
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <form onSubmit={handleSubmit(onRegisterUserFeth)}>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    label="Nombre"
                    name="nameU"
                    type="text"
                    {...register("nameU", {required: " El nombre del usuario es requerido"})}
                    value={nameU}
                    onChange={onChangeInput}
                    placeholder="Juan"
                    fullWidth
                    onKeyUp={()=>{trigger("nameU")}}
                  />
                  {errors.nameU && (<small className="text-danger">{errors.nameU.message}</small>)}
                </Grid>
                <Grid item xs={12} sx={{ mt: 1 }}>
                  <TextField
                    label="Apellido"
                    name="lastName"
                    type="text"
                    value={lastName}
                    onChange={onChangeInput}
                    placeholder="Perez"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sx={{ mt: 1 }}>
                  <TextField
                    label="Teléfono"
                    name="telephone"
                    type="number"
                    value={telephone}
                    onChange={onChangeInput}
                    placeholder="0999999999"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sx={{ mt: 1 }}>
                  <TextField
                    label="Dirección"
                    name="direction"
                    value={direction}
                    onChange={onChangeInput}
                    type="text"
                    placeholder="Loja-Ecuador"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sx={{ mt: 1 }}>
                  <TextField
                    label="Correo"
                    name="email"
                    type="email"
                    value={email}
                    onChange={onChangeInput}
                    placeholder="demo@demo.com"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sx={{ mt: 1 }}>
                  <TextField
                    label="Contraseña"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onChangeInput}
                    placeholder="*************"
                    fullWidth
                  />
                </Grid>
                <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                  <Grid item xs={12} sm={12}>
                    <Button type="submit" variant="contained" fullWidth>
                      Registrar
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
