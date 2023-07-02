import React, {useEffect, useState} from 'react';
import 'chart.js/auto';
import {Chart} from 'react-chartjs-2';
import swal from "sweetalert2";
import API from '../../../API/API_REST';

export const StatisticalGraphsComponent = ({tipoGraf, name, topic}) => {
    const [dataSensor, setDataSensor] = useState({
        labels: [],
        datasets: [
            {
                fill: true,
                label: name === 'caudal' ? `${name} /ml` : `${name} %`,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                data: []
            }
        ]
    });
    const onDataSensorsGraf = () => {
        const URL = `${API}/sensors/dato/${topic}`;
        fetch(URL, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((data) => {
                const fecha = [];
                const dataSensores = [];
                data.result.forEach((dataS) => {
                    fecha.push(new Date(dataS.Date).toDateString());
                    dataSensores.push(dataS.message)
                })
                setDataSensor({
                    labels: fecha,
                    datasets: [
                        {
                            fill: true,
                            label: ` En porcentaje(%) ${name}`,
                            borderColor: name === 'caudal' ? 'rgba(40, 50, 49, 0.93)' : 'rgb(53, 162, 235)',
                            backgroundColor: name === 'caudal' ? 'rgba(40, 50, 49, 0.8)' : 'rgba(53, 162, 235, 0.5)',
                            data: dataSensores
                        }
                    ]
                })
            }).catch((error) => {
            swal.fire({
                title: 'Error de Servidor',
                text: `${error}`,
                icon: "error",
                timer: 2000
            })
        });
    }

    useEffect(() => {
        onDataSensorsGraf()
    }, [])
    return (
        <div>
            <Chart type={tipoGraf}
                   data={dataSensor}
                   options={{
                       title: {
                           display: true,
                           text: 'Average Employee Salary According to the Department',
                           fontSize: 20
                       },
                       legend: {
                           display: true,
                           position: 'right'
                       }
                   }}
            />
        </div>
    );
}
