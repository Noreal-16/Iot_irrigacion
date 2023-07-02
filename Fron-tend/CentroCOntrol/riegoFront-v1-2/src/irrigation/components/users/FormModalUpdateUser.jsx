import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import {ButtonGroup, Grid, TextField} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import API from "../../../API/API_REST";
import swal from "sweetalert2";
import Axios from "axios";

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

export const FormModalUpdateUser = ({idUser}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [getDataUpdate, setDataUpdate] = useState({
        id: '',
        nameU: '',
        lastName: '',
        telephone: '',
        direction: '',
        email: '',
    });
    const {nameU, lastName, telephone, direction, email} = getDataUpdate
    const onUserUpdateList = () => {
        fetch(`${API}/users/updateList/${idUser}`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                setDataUpdate({
                    id: idUser,
                    nameU: data.data.person.nameU,
                    lastName: data.data.person.lastName,
                    telephone: data.data.person.telephone,
                    direction: data.data.person.direction,
                    email: data.data.email,
                })
            }).catch((error) => {
            swal.fire({
                title: 'Error Inesperado',
                text: `${error}`,
                icon: "error",
                timer: 2000
            })
        });
    }

    useEffect(() => {
        onUserUpdateList()
    }, []);

    const onChangeInput = ({target}) => {
        const {name, value} = target;
        setDataUpdate({
            ...getDataUpdate,
            [name]: value
        })
    }
    const onUpdateUser = (e) => {
        e.preventDefault()
        Axios({
            method: 'POST',
            data: getDataUpdate,
            withCredentials: true,
            url: `${API}/users/accountRolUpdate`
        }).then((response) => {
            if (response.data.message) {
                setOpen(false)
                swal.fire({
                    title: 'Registro Actualizado',
                    text: `${response.data.message}`,
                    icon: "success",
                    timer: 2000
                }).then(()=>window.location.href = "/users")
            } else {
                setOpen(false)
                swal.fire({
                    title: 'Error al guardar Registro',
                    text: `${response.data.error}`,
                    icon: "error",
                    timer: 2000
                }).then(()=>window.location.href = "/users")
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
            <Button variant="contained"
                    color="success"
                    onClick={handleOpen}>
                <BorderColorIcon/>
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
                        <form onSubmit={onUpdateUser}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextField label="Nombre"
                                               name='nameU'
                                               type='text'
                                               value={nameU}
                                               onChange={onChangeInput}
                                               placeholder='Juan'
                                               fullWidth/>
                                </Grid>
                                <Grid item xs={12} sx={{mt: 1}}>
                                    <TextField label="Apellido"
                                               name='lastName'
                                               type='text'
                                               value={lastName}
                                               onChange={onChangeInput}
                                               placeholder='Perez'
                                               fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{mt: 1}}>
                                    <TextField label="Teléfono" name='telephone'
                                               type='number'
                                               value={telephone}
                                               onChange={onChangeInput}
                                               placeholder='0999999999'
                                               fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{mt: 1}}>
                                    <TextField label="Dirección"
                                               name='direction'
                                               value={direction}
                                               onChange={onChangeInput}
                                               type='text'
                                               placeholder='Loja-Ecuador'
                                               fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{mt: 1}}>
                                    <TextField label="Correo"
                                               name='email'
                                               type='email'
                                               value={email}
                                               onChange={onChangeInput}
                                               placeholder='demo@demo.com'
                                               fullWidth
                                    />
                                </Grid>

                                <Grid container spacing={2} sx={{mb: 2, mt: 1}} justifyContent='center'
                                      alignItems='center' textAlign='center'>
                                    <Grid item xs={12} sm={12}>
                                        <ButtonGroup
                                            disableElevation
                                            variant="contained"
                                            aria-label="Disabled elevation buttons"
                                        >
                                            <Button type='submit' color="success" variant="contained" fullWidth>
                                                Actualizar
                                            </Button>
                                            <Button onClick={() => setOpen(false)} color="error">Cancelar</Button>
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