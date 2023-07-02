import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button, ButtonGroup, Grid} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {FormUpdatePasswordComponent} from "./FormUpdatePasswordComponent";
import {FormModalRoleComponent} from "./FormModalRoleComponent";
import API from "../../../API/API_REST";
import swal from "sweetalert2";
import {FormModalUpdateUser} from "./FormModalUpdateUser";
import Axios from "axios";
import { FormRegisterUserComponent } from './FormRegisterUser';

export const TableUserComponent = () => {
    const [dataUsers, setDataUser] = useState([]);
    const URI_User = `${API}/users/data/user`;
    const dataUsersFetch = () => {
        fetch(URI_User, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((data) => {
                const dataU = [];
                data.data.forEach((users) => {
                    if (users.Status) {
                        dataU.push(users)
                    }
                })
                setDataUser(dataU)
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
        dataUsersFetch();
    }, []);

    const onDeleteUsers = (id)=>{
        swal.fire({
            title: '¿Está seguro que desea eliminar El Usuario?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si',
        }).then((result) => {
            if (result.isConfirmed) {
                Axios({
                    method: 'GET',
                    withCredentials: true,
                    url: `${API}/users/delete/${id}`
                }).then((response) => {
                    if (response.data.message){
                        swal.fire(`${response.data.message}`, '', 'success')
                    }else{
                        swal.fire(`${response.data.err}`, '', 'error')
                    }
                }).catch((error) => {
                    swal.fire({
                        title: 'Error de Servidor',
                        text: `${error}`,
                        icon: "error",
                        timer: 2000
                    })
                })
            } else if (result.isDenied) {
                swal.fire('Changes are not saved', '', 'info')
            }
        })
    }
    return (
        <Grid container>
            <FormRegisterUserComponent/>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Nro</TableCell>
                            <TableCell align="right">Nombre</TableCell>
                            <TableCell align="right">Apellidos</TableCell>
                            <TableCell align="center">Correo</TableCell>
                            <TableCell align="center">Dirección</TableCell>
                            <TableCell align="center">Teléfono</TableCell>
                            <TableCell align="center">Rol</TableCell>
                            <TableCell align="right">Contraseña</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataUsers && dataUsers.map((data, index) => (
                            <TableRow
                                key={data._id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">{data.person.nameU}</TableCell>
                                <TableCell align="center">{data.person.lastName}</TableCell>
                                <TableCell align="right">{data.email}</TableCell>
                                <TableCell align="right">{data.person.direction}</TableCell>
                                <TableCell align="right">{data.person.telephone}</TableCell>
                                <TableCell align="center">
                                    <FormModalRoleComponent idRol={data.rol._id} rol={data.rol.nameRol}  user={data._id}
                                                            color={data.rol.nameRol === 'Administrador' ? 'success' : 'info'}/>
                                </TableCell>
                                <TableCell align="right">
                                    <FormUpdatePasswordComponent idUser={data._id}/>
                                </TableCell>
                                <TableCell align="right">
                                    <ButtonGroup
                                        disableElevation
                                        variant="contained"
                                        aria-label="Disabled elevation buttons"
                                    >
                                        <FormModalUpdateUser idUser={data._id}/>
                                        <Button color="error" onClick={()=> onDeleteUsers(data._id)} ><DeleteForeverIcon/></Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}