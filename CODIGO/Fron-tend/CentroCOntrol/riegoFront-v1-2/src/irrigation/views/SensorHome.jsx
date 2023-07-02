import { Grid } from "@mui/material";
import { SoilTipeComponent } from "../components/home/SoilTipeComponent";
import { SensorMeter } from "../components/home/SensorMeditorComponent";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { IrrigationControllerComponent } from "../components/ControlIrrigation/IrrigationControllerComponent";
import { SensorMeterCaudal } from "../components/home/SensorMeditoCaudalCOmponent";
import API from "../../API/API_REST";
import swal from "sweetalert2";

export const SensorHome = () => {
  const [data, setData] = useState([]);
  const [dataTopic, setDataTopic] = useState([]);
 

  const onDataSoilFind = () => {
    fetch(`${API}/soils/soil`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((dataS) => {
        setData(dataS);
      })
      .catch((error) => {
        swal.fire({
          title: "Error de Servidor",
          text: `${error}`,
          icon: "error",
          timer: 2000,
        });
      });
  };




  const onDataTopic = async () => {
    await fetch(`${API}/topic/topics`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((dataS) => {
        const topicSensores = [];
        dataS.data.forEach((data) => {
          if (data.nameTopic !== "caudal") {
            topicSensores.push(data.nameTopic);
          }
        });
        setDataTopic(topicSensores);
      })
      .catch((error) => {
        swal.fire({
          title: "Error de Servidor",
          text: `${error}`,
          icon: "error",
          timer: 2000,
        });
      });
  };

  useEffect(() => {
    onDataSoilFind();
    onDataTopic();
  }, []);
  return (
    <Grid container>
      <Typography variant="h6" noWrap component="div" sx={{ marginLeft: 8 }}>
        Tipos de Suelo
      </Typography>
      <Grid container xs={12}>
        <div className="content">
          {data.data && data.data.length > 0 ? (
            data.data.map((dataSoil, index) => (
              <div
                className="content-card-soil"
                key={index + 1}
                style={{ boxShadow: "3px 4px 13px -1px rgba(0,0,0,0.75)" }}
              >
                <SoilTipeComponent data={dataSoil} />
              </div>
            ))
          ) : (
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ marginLeft: 8 }}
            >
              Aun no tiene tipos de suelo registrados
            </Typography>
          )}
        </div>
      </Grid>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ marginLeft: 8, marginTop: 4, marginBottom: 5 }}
      >
        Datos Sensores
      </Typography>

      <Grid container xs={12}>
        <div className="content">
          {dataTopic && dataTopic.length > 0 ? (
            dataTopic.map((data, index) => (
              <div
                className="content-card-1"
                key={index + 1}
                style={{ boxShadow: "3px 4px 13px -1px rgba(0,0,0,0.75)" }}
              >
                <SensorMeter data={data} />
              </div>
            ))
          ) : (
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ marginLeft: 8 }}
            >
              Aun no tiene sensores registrados
            </Typography>
          )}
        </div>
      </Grid>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ marginLeft: 8, marginTop: 4, marginBottom: 5 }}
      >
        Control de Riego
      </Typography>
      <Grid
        container
        xs={12}
        justifyContent="center"
        textAlign="center"
        alignItems="center"
      >
        <Grid className="content">
          <div
            className="content-card-1"
            style={{ boxShadow: "3px 4px 13px -1px rgba(0,0,0,0.75)" }}
          >
            <IrrigationControllerComponent />
          </div>
        </Grid>
      </Grid>
      <Grid
        container
        xs={12}
        justifyContent="center"
        textAlign="center"
        alignItems="center"
      >
        <Grid
          xs={4}
          justifyContent="center"
          textAlign="center"
          alignItems="center"
        >
          <div
            className="content-card-1"
            style={{ boxShadow: "3px 4px 13px -1px rgba(0,0,0,0.75)" }}
          >
            <SensorMeterCaudal topic='caudal'/>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};
