import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import swal from "sweetalert2";
import Axios from "axios";
import API from "../../../API/API_REST";
import {useForm} from "react-hook-form";
import {Button, ButtonGroup, Grid, TextField} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from '@mui/icons-material/BorderColor';

export const TableSoilComponent = () => {
    const {register, handleSubmit, trigger, formState: {errors}} = useForm();
    const [dataSolil, setDataSoil] = useState([]);
    const [soilForm, setSoilForm] = useState({
        textureClass: '',
        ac: '',
        limo: '',
        ar: ''
    });
    const [idUpdate, setIdUpdate] = useState();
    const [actualizar, setActualizar] = useState(false);
    const {textureClass, ac, limo, ar} = soilForm;

    const onChangeInput = ({target}) => {
        const {name, value} = target;
        setSoilForm({
            ...soilForm,
            [name]: value
        })
    }

    const URI_Soil = `${API}/soils/soil`;

    const dataSolidFetch = () => {
        fetch(URI_Soil, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((data) => {
                setDataSoil(data);
            }).catch((error) => {
            swal.fire({
                title: 'Error Inesperado',
                text: `${error}`,
                icon: "error",
                timer: 2000
            })
        })
    }
    const onRegisterSoil = () => {
        Axios({
            method: 'POST',
            data: soilForm,
            withCredentials: true,
            url: URI_Soil
        }).then((response) => {
            if (response.data.message) {
                swal.fire({
                    title: 'Registro Guardado',
                    text: `${response.data.message}`,
                    icon: "success",
                    timer: 2000
                });
                setSoilForm({
                    textureClass: '',
                    ac: '',
                    limo: '',
                    ar: ''
                })
            } else {
                swal.fire({
                    title: 'Error al guardar Registro',
                    text: `${response.data.error}`,
                    icon: "error",
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
    const onResetInput = () => {
        setSoilForm({
            textureClass: '',
            ac: '',
            limo: '',
            ar: ''
        });
        setActualizar(false);
    };

    useEffect(() => {
        dataSolidFetch();
    }, [soilForm]);

    const listDataUpdate = (id) => {
        if (id) {
            fetch(`${API}/soils/soilData/${id}`, {
                method: 'GET'
            })
                .then((response) => response.json())
                .then((data) => {
                    setSoilForm({
                        textureClass: data.data.textureClass,
                        ac: data.data.arcilla,
                        limo: data.data.limo,
                        ar: data.data.arena
                    });
                    setIdUpdate(data.data._id);
                    setActualizar(true);
                }).catch((error) => console.log('Error al realizar la consulta ', error));
        }
    }

    const onUpdateSoil = () => {
        Axios({
            method: 'POST',
            data: soilForm,
            withCredentials: true,
            url: `${API}/soils/updateSoil/${idUpdate}`
        }).then((response) => {
            if (response.data.message) {
                swal.fire({
                    title: 'Registro Guardado',
                    text: `${response.data.message}`,
                    icon: "success",
                    timer: 2000
                })
                onResetInput();
            } else {
                swal.fire({
                    title: 'Error al guardar Registro',
                    text: `${response.data.error}`,
                    icon: "error",
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

    const onDeleteSoil = (id) => {
        swal.fire({
            title: '¿Está seguro que desea eliminar el tipo de suelo?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si',
        }).then((result) => {
            if (result.isConfirmed) {
                Axios({
                    method: 'DELETE',
                    withCredentials: true,
                    url: `${API}/soils/deleteSoil/${id}`
                }).then((response) => {
                    if (response.data.message) {
                        swal.fire(`${response.data.message}`, '', 'success')
                        setSoilForm({
                            textureClass: '',
                            ac: '',
                            limo: '',
                            ar: ''
                        })
                    } else {
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
        <Grid container direction="column"
              spacing={0}
              alignItems='center'
              sx={{
                  minHeight: '100vh',
                  borderRadius: 3,
                  width: '98%',
                  ml: 1,
                  mr: 1,
                  mb: 2,
                  mt:2
              }}>
            <Grid item xs={6} alignItems="center" justifyContent="center">
                <form>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField label="Clase Textural"
                                       name='texture_class'
                                       type='text'
                                       {...register("textureClass", {required: " La clase de textura es requerida"})}
                                       onChange={onChangeInput}
                                       value={textureClass}
                                       placeholder='Franco Limoso'
                                       fullWidth
                                       onKeyUp={() => {
                                           trigger("textureClass")
                                       }}
                            />
                            {errors.textureClass && (<small className="text-danger">{errors.textureClass.message}</small>)}
                        </Grid>
                        <Grid item xs={12} sx={{mt: 1}}>
                            <TextField label="(%) Arcilla"
                                       name='ac'
                                       type='number'
                                       onChange={onChangeInput}
                                       value={ac}
                                       placeholder='12.5'
                                       fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sx={{mt: 1}}>
                            <TextField label="(%)
                                        Limo"
                                       name='limo'
                                       type='number'
                                       onChange={onChangeInput}
                                       value={limo}
                                       placeholder='13.5'
                                       fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sx={{mt: 1}}>
                            <TextField label="(%) Arena"
                                       name='ar'
                                       onChange={onChangeInput}
                                       value={ar}
                                       type='number'
                                       placeholder='15.6'
                                       fullWidth
                            />
                        </Grid>
                        <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
                            <Grid item xs={12} sm={12}>
                                {actualizar ?
                                    <ButtonGroup
                                        disableElevation
                                        variant="contained"
                                        aria-label="Disabled elevation buttons"
                                    >
                                        <Button type='submit' color="success" variant="contained"
                                                onClick={handleSubmit(onUpdateSoil)} fullWidth>
                                            Actualizar
                                        </Button>
                                        <Button type='button' color="error" variant="contained"
                                                onClick={() => onResetInput()} fullWidth>
                                            Cancelar
                                        </Button>
                                    </ButtonGroup>
                                    :
                                    <Button type='submit' color="primary" onClick={handleSubmit(onRegisterSoil)}
                                            variant="contained" fullWidth>
                                        Registrar
                                    </Button>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Nro</TableCell>
                                <TableCell align="center">CLase Textural</TableCell>
                                <TableCell align="center">Arcilla &nbsp;(%)</TableCell>
                                <TableCell align="center">Limo &nbsp;(%)</TableCell>
                                <TableCell align="center">Arena&nbsp;(%)</TableCell>
                                <TableCell align="center">CC</TableCell>
                                <TableCell align="center">PMP</TableCell>
                                <TableCell align="center" >Acciones </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataSolil.data && dataSolil.data.map((data, index) => (
                                <TableRow
                                    key={new Date() + index}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center">{data.textureClass}</TableCell>
                                    <TableCell align="center">{data.arcilla}</TableCell>
                                    <TableCell align="center">{data.limo}</TableCell>
                                    <TableCell align="center">{data.arena}</TableCell>
                                    <TableCell align="center">{parseFloat(data.capacidadCampo).toFixed(2)}</TableCell>
                                    <TableCell align="center">{parseFloat(data.puntoMarchitez).toFixed(2)}</TableCell>
                                    <TableCell align="center">
                                        <ButtonGroup
                                            disableElevation
                                            variant="contained"
                                            aria-label="Disabled elevation buttons"
                                        >
                                            <Button color="success"
                                                    onClick={() => listDataUpdate(data._id)}><BorderColorIcon/></Button>
                                            <Button color="error"
                                                    onClick={() => onDeleteSoil(data._id)}><DeleteForeverIcon/></Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}