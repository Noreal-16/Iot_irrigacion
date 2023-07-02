import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export const SoilTipeComponent = ({ data }) => {
  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h6">
            {`Tipo de Suelo: ${data.textureClass} `}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {`Porcentajes Ac(%):${data.arcilla}, L(%):${data.limo}, Ar(%):${data.arena}`}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {`CC: ${parseFloat(data.capacidadCampo).toFixed(2)}`}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {`PMP : ${parseFloat(data.puntoMarchitez).toFixed(2)}`}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};
