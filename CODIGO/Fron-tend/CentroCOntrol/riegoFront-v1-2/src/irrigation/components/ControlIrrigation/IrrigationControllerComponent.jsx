import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Config_mqtt from "../../../API/config_mqtt";
import mqtt from "mqtt";
import Button from "@mui/material/Button";
import riegoOn from "../../../assets/img/riegoOn.png";
import riegoOff from "../../../assets/img/riegoOff.png";
import swal from "sweetalert2";
import Axios from "axios";
import API from "../../../API/API_REST";

/**
 * Conexion MQTT
 */
const client = mqtt.connect(Config_mqtt.url, {
  username: Config_mqtt.username,
  password: Config_mqtt.password,
});
client.on("connect", () => {
  const topic = ["estadoRiego"];
  client.subscribe(topic, (err) => {
    if (err) console.log("Error de conexion " + err);
  });
});

export const IrrigationControllerComponent = () => {
  const [estadoRiego, setEstadoRiego] = useState(0);
  useEffect(() => {
    client.on("message", (topic, payload) => {
      setEstadoRiego(parseInt(payload.toString(), 10));
    });
  }, [estadoRiego]);

  const onChangeButton = async (e) => {
    e.preventDefault();
    Axios({
      method: "POST",
      data: { message: e.target.value },
      withCredentials: true,
      url: `${API}/riego`,
    })
      .then((response) => {
        console.log(response);
        swal.fire({
            title: "Acción Completada",
            text: `${response.data.message}`,
            icon: "success",
            timer: 2000,
          });
      })
      .catch((error) => {
        swal.fire({
          title: "Error de Servidor",
          text: "Ocurrio un error inesperado, consulte con el desarrollador",
          icon: "error",
          timer: 2000,
        });
      });
  };
  return (
    <Card sx={{ display: "flex" }}>
      {estadoRiego === 0 ? (
        <>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5">
                  Riego 1
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Apagado
                </Typography>
              </CardContent>
              <Button
                value="1"
                type="submit"
                color="success"
                onClick={onChangeButton}
              >
                {" "}
                Encender{" "}
              </Button>
            </Box>
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={riegoOff}
              alt="Live from space album cover"
            />
        </>
      ) : (
        <>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                Riego 1
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Encendido
              </Typography>
            </CardContent>
            <Button
              value="0"
              type="submit"
              color="error"
              onClick={onChangeButton}
            >
              {" "}
              Apagar{" "}
            </Button>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={riegoOn}
            alt="Live from space album cover"
          />
        </>
      )}
    </Card>
  );
};
