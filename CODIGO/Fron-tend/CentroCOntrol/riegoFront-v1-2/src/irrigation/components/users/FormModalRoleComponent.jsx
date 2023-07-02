import React, {useEffect, useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import {ButtonGroup, Grid, TextField} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CancelIcon from "@mui/icons-material/Cancel";
import Select from 'react-select';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
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
export const FormModalRoleComponent = ({idRol, color, user, rol}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [defaulValueSelect, setDefaulValueSelect] = useState(undefined);
    const [updateRol, setUpdateRol] = useState({
        rol: idRol
    })
    const [dataRol, setDataRol] = useState({
        idUs: '',
        nameUs: ''
    });
    const [dataRolA, setDataRolA] = useState({
        idA: '',
        nameA: ''
    });
    const onDataRols = () => {
        fetch(`${API}/users/rols`, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((data) => {
                setDataRol({
                    idUs: data.data[0]._id,
                    nameUs: data.data[0].nameRol
                })
                setDataRolA({
                    idA: data.data[1]._id,
                    nameA: data.data[1].nameRol
                })
                data.data.forEach((dataRolId) => {
                    if (dataRolId._id === idRol) {
                        setDefaulValueSelect(dataRolId.nameRol)
                    }
                })
            }).catch((error) => {
            swal.fire({
                title: 'Error Inesperado',
                text: `${error}`,
                icon: "error",
                timer: 2000
            })
        })
    }
    useEffect(() => {
        onDataRols();
    }, []);

    const options = [
        {value: dataRol.idUs, label: dataRol.nameUs},
        {value: dataRolA.idA, label: dataRolA.nameA}
    ]
    const onChangeSelect = (value) => {
        setUpdateRol({
            rol: value.value
        })
    }
    const onUpdateRolUser = (e) => {
        e.preventDefault();
        const cuenta = JSON.parse(localStorage.getItem('user'))
        if (user === cuenta._id) {
            setOpen(false)
            swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se puede cambiar este Rol!',
            })

        } else {
            Axios({
                method: 'POST',
                data: updateRol,
                withCredentials: true,
                url: `${API}/users/update/rol/${user}`
            }).then((response) => {
                if (response.data.message) {
                    setOpen(false)
                    swal.fire({
                        title: 'Rol Actualizado',
                        text: `${response.data.message}`,
                        icon: "success",
                        timer: 2000
                    }).then(() => {
                        window.location.href = "/users";
                    });
                } else {
                    setOpen(false)
                    swal.fire({
                        title: 'Error al actualizar Rol',
                        text: `${response.data.error}`,
                        icon: "error",
                        timer: 2000
                    }).then(() => {
                        window.location.href = "/users";
                    });
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
    }
    return (
        <div>
                <Button variant="contained"
                        color={color}
                        startIcon={<AdminPanelSettingsIcon/>}
                        onClick={handleOpen}>
                    {rol}
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
                        <form onSubmit={onUpdateRolUser}>
                            <Grid container>
                                <Grid item xs={12} sx={{mb: 1}}>
                                    <TextField label="Nombre Rol Actual"
                                               name='nameU'
                                               type='text'
                                               placeholder='Nombre Rol Actual'
                                               value={defaulValueSelect}
                                               disabled
                                               fullWidth/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Select name='rol'  defaultValue={undefined} options={options} onChange={onChangeSelect}></Select>
                                </Grid>
                                <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
                                    <Grid item xs={12} sm={12}>
                                        <ButtonGroup
                                            disableElevation
                                            variant="contained"
                                            aria-label="Disabled elevation buttons"
                                        >
                                            <Button color="success" type='submit' endIcon={<BorderColorIcon/>}>Actualizar</Button>
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