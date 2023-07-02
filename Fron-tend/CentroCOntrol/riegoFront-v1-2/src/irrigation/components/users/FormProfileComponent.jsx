import {Button, Grid, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import {FormUpdatePasswordComponent} from "./FormUpdatePasswordComponent";
import API from "../../../API/API_REST";
import Axios from "axios";
import swal from "sweetalert2";

export const FormProfileComponent = () => {
    const [idUserPass, setIdUserPass] = useState();
    const [dataUser, setDataUser] = useState({
        id: '',
        nameU: '',
        lastName: '',
        telephone: '',
        direction: '',
        email: '',
    });
    const {id, nameU, lastName, telephone, direction, email} = dataUser;
    const onChangeInput = ({target}) => {
        const {name, value} = target;
        setDataUser({
            ...dataUser,
            [name]: value
        })
    }
    const onInputDataProfileFetch = () => {
        const user = JSON.parse(localStorage.getItem('user'))
        fetch(`${API}/users/updateList/${user._id}`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                setDataUser({
                    id: data.data._id,
                    nameU: data.data.person.nameU,
                    lastName: data.data.person.lastName,
                    telephone: data.data.person.telephone,
                    direction: data.data.person.direction,
                    email: data.data.email
                });
                setIdUserPass(data.data._id);
            }).catch((error) => console.log(error));
    }
    useEffect(() => {
        onInputDataProfileFetch();
    }, []);

    const URL_UPDATE = `${API}/users/updateAccount`;
    const onUpdateUser = (e) => {
        e.preventDefault();
        Axios({
            method: 'POST',
            data: dataUser,
            withCredentials: true,
            url: URL_UPDATE
        }).then((response) => {
            if (!response.data.error){
                swal.fire({
                    title: 'Actualización Correcta',
                    text: response.data.message,
                    icon: "success",
                    timer: 2000
                })
            }else{
                swal.fire({
                    title: 'Actualizacón Correacta',
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
        <form onSubmit={onUpdateUser}>
            <input type="hidden" name='id' value={id}/>
            <Grid container>
                <Grid item xs={12}>
                    <TextField label="Nombre"
                               name='nameU'
                               type='text'
                               onChange={onChangeInput}
                               value={nameU}
                               placeholder='Juan'
                               fullWidth/>
                </Grid>
                <Grid item xs={12} sx={{mt: 1}}>
                    <TextField label="Apellido"
                               name='lastName'
                               type='text'
                               onChange={onChangeInput}
                               value={lastName}
                               placeholder='Perez'
                               fullWidth
                    />
                </Grid>
                <Grid item xs={12} sx={{mt: 1}}>
                    <TextField label="Teléfono" name='telephone'
                               type='number'
                               onChange={onChangeInput}
                               value={telephone}
                               placeholder='0999999999'
                               fullWidth
                    />
                </Grid>
                <Grid item xs={12} sx={{mt: 1}}>
                    <TextField label="Dirección"
                               name='direction'
                               type='text'
                               onChange={onChangeInput}
                               value={direction}
                               placeholder='Loja-Ecuador'
                               fullWidth
                    />
                </Grid>
                <Grid item xs={12} sx={{mt: 1}}>
                    <TextField label="Correo"
                               name='email'
                               type='email'
                               onChange={onChangeInput}
                               value={email}
                               placeholder='demo@demo.com'
                               fullWidth
                    />
                </Grid>
                <Grid item xs={12} sx={{mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                    <h2 style={{ fontSize: '18px' , marginRight:'20px'}}> Contraseña</h2>
                    <FormUpdatePasswordComponent idUser={idUserPass}/>
                </Grid>
                <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
                    <Grid item xs={12} sm={12}>
                        <Button type='submit' variant="contained" fullWidth>
                            Actualizar
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}