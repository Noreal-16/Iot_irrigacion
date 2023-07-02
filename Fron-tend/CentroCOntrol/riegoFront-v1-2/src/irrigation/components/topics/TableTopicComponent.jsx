import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import React, {useState, useEffect} from "react";
import {Button, ButtonGroup, Grid, TextField} from "@mui/material";
import API from "../../../API/API_REST";
import Axios from "axios";
import swal from "sweetalert2";
import {useForm} from "react-hook-form";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";


export const TableTopicComponent = () => {
    const {register, handleSubmit, trigger, formState: {errors}} = useForm();
    const [dataTopic, setDataTopic] = useState([]);
    const [idUpdate, setIdUpdate] = useState();
    const [actualizar, setActualizar] = useState(false);
    const URL_ACTUADOR = `${API}/topicActuador/topicsActuador`;
    const [dataForm, setDataForm] = useState({
        nameTopicActuador: '',
        nameActuador: ''
    });

    const {nameTopicActuador, nameActuador} = dataForm;
    const onChangeInput = ({target}) => {
        const {name, value} = target;
        setDataForm({
            ...dataForm,
            [name]: value
        })
    }
    const findDataTopicActuator = () => {
        fetch(URL_ACTUADOR, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((data) => {
                setDataTopic(data)
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
        findDataTopicActuator()
    }, [dataForm]);

    const onRegisterTopic = () => {
        Axios({
            method: 'POST',
            data: dataForm,
            withCredentials: true,
            url: `${API}/topicActuador/registroTopicActuador`
        }).then((response) => {
            if (response.data.message) {
                swal.fire({
                    title: 'Registro Guardado',
                    text: `${response.data.message}`,
                    icon: "success",
                    timer: 2000
                });
                setDataForm({
                    nameTopicActuador: '',
                    nameActuador: ''
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
    const listDataUpdate = (id) => {
        if (id) {
            fetch(`${API}/topicActuador/list/${id}`, {
                method: 'GET'
            })
                .then((response) => response.json())
                .then((data) => {
                    setDataForm({
                        nameTopicActuador: data.data.nameTopicActuator,
                        nameActuador: data.data.nameActuator
                    });
                    setIdUpdate(data.data._id);
                    setActualizar(true);
                }).catch((error) => console.log('Error al realizar la consulta ', error));
        }
    }

    const onResetInput = () => {
        setDataForm({
            nameTopicActuador: '',
            nameActuador: ''
        });
        setActualizar(false);
    };
    const onUpdateTopic = (e) => {
        e.preventDefault();
        Axios({
            method: 'POST',
            data: dataForm,
            withCredentials: true,
            url: `${API}/topicActuador/updateActuador/${idUpdate}`
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

    const onDeleteActuator = (id) => {
        swal.fire({
            title: '¿Está seguro que desea eliminar el topic de actuador?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si',
        }).then((result) => {
            if (result.isConfirmed) {
                Axios({
                    method: 'DELETE',
                    withCredentials: true,
                    url: `${API}/topicActuador/deletetopic/${id}`
                }).then((response) => {
                    if (response.data.message) {
                        swal.fire(`${response.data.message}`, '', 'success')
                        setDataForm({
                            nameTopicActuador: '',
                            nameActuador: ''
                        });
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
                            <TextField label="Nombre de topic"
                                       name='nameTopicActuador'
                                       type='text'
                                       placeholder='Tema1 '
                                       {...register("nameTopicActuador", {required: " El nombre de Topic es requerido"})}
                                       value={nameTopicActuador}
                                       onChange={onChangeInput}
                                       fullWidth onKeyUp={() => {
                                trigger("nameTopicActuador")
                            }}/>
                            {errors.nameTopicActuador && (
                                <small className="text-danger">{errors.nameTopicActuador.message}</small>)}
                        </Grid>
                        <Grid item xs={12} sx={{mt: 1}}>
                            <TextField label="Nombre de Sensor"
                                       name='nameActuador'
                                       type='text'
                                       placeholder='Descripción de sensor/actuador '
                                       value={nameActuador}
                                       onChange={onChangeInput}
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
                                                onClick={onUpdateTopic} fullWidth>
                                            Actualizar
                                        </Button>
                                        <Button type='button' color="error" variant="contained"
                                                onClick={() => onResetInput()} fullWidth>
                                            Cancelar
                                        </Button>
                                    </ButtonGroup> :
                                    <Button type='submit' onClick={handleSubmit(onRegisterTopic) }variant="contained"
                                            fullWidth>
                                        Registrar
                                    </Button>}
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Nro</TableCell>
                                <TableCell align="center">Nombre Topic</TableCell>
                                <TableCell align="center">Descripción Actuador</TableCell>
                                <TableCell align="center">Acciones </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataTopic.data && dataTopic.data.map((dataTopic, index) =>(
                                <TableRow
                                    key={new Date() + index}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row" align="center">
                                        {index + 1}
                                    </TableCell >
                                    <TableCell align="center">{dataTopic.nameTopicActuator}</TableCell>
                                    <TableCell align="center">{dataTopic.nameActuator}</TableCell>
                                    <TableCell align="center">
                                        <ButtonGroup
                                            disableElevation
                                            variant="contained"
                                            aria-label="Disabled elevation buttons"
                                        >
                                            <Button color="success"
                                                    onClick={() => listDataUpdate(dataTopic._id)}><BorderColorIcon/></Button>
                                            <Button color="error"
                                                    onClick={()=> onDeleteActuator(dataTopic._id)}><DeleteForeverIcon/></Button>
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