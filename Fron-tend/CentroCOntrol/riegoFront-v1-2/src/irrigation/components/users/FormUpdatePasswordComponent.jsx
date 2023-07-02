import React, {useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import PasswordIcon from "@mui/icons-material/Password";
import {ButtonGroup, Grid, TextField} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CancelIcon from "@mui/icons-material/Cancel";
import Axios from "axios";
import swal from "sweetalert2";
import API from "../../../API/API_REST";

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
const user = JSON.parse(localStorage.getItem('user'))
export const FormUpdatePasswordComponent = ({idUser}) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [dataPassword, setDataPassword] = useState({
        password: '',
        passwordUpdate: ''
    });
    const {password, passwordUpdate} = dataPassword;
    const onChangeInput = ({target}) => {
        const {name, value} = target;
        setDataPassword({
            ...dataPassword,
            [name]: value
        });
    }
    const onUpdatePasswordUser = (e) => {
        e.preventDefault();
        Axios({
            method: 'POST',
            data: dataPassword,
            withCredentials: true,
            url: `${API}/users/password/${idUser}`
        }).then((response) => {
            if (!response.data.error) {
                if (idUser === user._id) {
                    localStorage.removeItem('user')
                    window.location.href = "/";
                }
                setOpen(false)
                swal.fire({
                    title: 'Actualización Correcta',
                    text: response.data.message,
                    icon: "success",
                    timer: 2000
                })
                setDataPassword({
                    password: '',
                    passwordUpdate: ''
                })
            } else {
                setOpen(false)
                swal.fire({
                    title: 'Actualizacón Incorreacta',
                    text: response.data.message,
                    icon: "info",
                    timer: 2000
                })

            }
        }).catch((error) => {
            swal.fire({
                title: 'Error de Servidor',
                text: 'Ocurrio un error inesperado, consulte con el desarrollador',
                icon: "error",
                timer: 2000
            })
        })
    }
    return (
        <div>
            <Button variant="outlined"
                    color="primary"
                    onClick={handleOpen}>
                <PasswordIcon/>
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <form onSubmit={onUpdatePasswordUser}>
                            <Grid container>
                                <Grid item xs={12} sx={{mb: 1}}>
                                    <TextField label="Contraseña Actual"
                                               name='password'
                                               type='password'
                                               onChange={onChangeInput}
                                               value={password}
                                               placeholder='*************'
                                               fullWidth/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label="Contraseña Nueva"
                                               name='passwordUpdate'
                                               type='password'
                                               onChange={onChangeInput}
                                               value={passwordUpdate}
                                               placeholder='*************'
                                               fullWidth/>
                                </Grid>
                                <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
                                    <Grid item xs={12} sm={12}>
                                        <ButtonGroup
                                            disableElevation
                                            variant="contained"
                                            aria-label="Disabled elevation buttons"
                                        >
                                            <Button color="success" type='submit'
                                                    endIcon={<BorderColorIcon/>}>Actualizar</Button>
                                            <Button color="error" endIcon={<CancelIcon/>}
                                                    onClick={() => setOpen(false)}>Cancelar</Button>
                                        </ButtonGroup>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}