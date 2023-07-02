import React, {useState, useEffect} from "react";
import {DashBoardLayout} from "../layout/DashBoardLayout";
import {StatisticalGraphsComponent} from "../components/historics/StatisticalGraphsComponent";
import {Grid} from "@mui/material";
import API from "../../API/API_REST";
import swal from "sweetalert2";
import Typography from "@mui/material/Typography";
export const HistoricsPage = () => {

    const [tipoLine] = useState('line');
    const [dataTopic, setDataTopic] = useState([]);


    const onDataSensorsGraf = () => {
        fetch(`${API}/topic/topics`, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((data) => {
                setDataTopic(data.data)
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
        onDataSensorsGraf();
    }, []);

    return (
       <DashBoardLayout title="Historicos de Datos">
           <Grid container>
           {dataTopic.length > 0 ? dataTopic.map((data, index) =>
               <Grid key={index+1}  item xs={12} sm={6} md={12} lg={6} sx={{ mb: 6 }}>
                   <StatisticalGraphsComponent tipoGraf={tipoLine} topic={data._id} name={data.nameTopic}/>
               </Grid>): <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ marginLeft: 8 }}
            >
              Aun no tiene sensores registrados
            </Typography>}
               
           </Grid>
       </DashBoardLayout>
    )
}