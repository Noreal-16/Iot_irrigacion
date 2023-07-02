import React, {useEffect, useState} from "react";
import swal from "sweetalert2";
import API from "../../../API/API_REST";

export const CardSoilTipe = ({suelo}) => {
    const [dataSoil, setDataSoil] = useState({
        name: '',
        cc:'',
        pmp:'',
        datos: ''
    });
    //const [stadoLocal, setStadoLocal] = useState()
    const {name, cc, pmp, datos} = dataSoil;
    const onDataSoilFindId = () => {
        if (suelo){
            fetch(`${API}/soils/soilData/${suelo}`, {
                method: 'GET'
            })
                .then((response) => response.json())
                .then((data) => {
                    setDataSoil({
                        name: data.data.textureClass,
                        cc: data.data.capacidadCampo,
                        pmp: data.data.puntoMarchitez,
                        datos: `Ac: ${data.data.arcilla}% - Limo: ${data.data.limo}% - Ar: ${data.data.arena}%`
                    })
                }).catch((error) => {
                swal.fire({
                    title: 'Error de Servidor',
                    text: `${error}`,
                    icon: "error",
                    timer: 2000
                })
            });
        }else{
            swal.fire({
                title: '¡Seleccionar tipo de suelo! ',
                text: `Por favor seleccione tipo de suelo, de la sección "Control Riego"`,
                icon: "info",
                timer: 2000
            })
        }

    }
    useEffect(()=>{
        onDataSoilFindId()
    },[suelo])
    return (
        <div className='container-card'>
            <h1 className='titulo-card'>{name}</h1>
            <h3 className='titulo-card-1'>{datos}</h3>
            <div className='container-cc'>
                <div className='cc'>
                    <h1 className='h1-title'><strong>CC:</strong></h1>
                    <h2 className='h2-body color-success'>{cc}</h2>
                </div>
                <div className='cc'>
                    <h1 className='h1-title'><strong>PMP:</strong></h1>
                    <h2 className='h2-body color-danger'>{pmp}</h2>
                </div>
            </div>
        </div>
    )
}