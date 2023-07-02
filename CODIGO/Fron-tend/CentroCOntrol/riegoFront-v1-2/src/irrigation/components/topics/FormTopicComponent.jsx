import {Button, Grid, TextField} from "@mui/material";
import React from "react";

export const FormTopicComponent = () => {
    return (
        <form>
            <Grid container>
                <Grid item xs={12}>
                    <TextField label="Nombre de topic"
                               name='texture_class'
                               type='text'
                               placeholder='Tema1 '
                               fullWidth/>
                </Grid>
                <Grid item xs={12} sx={{mt: 1}}>
                    <TextField label="Nombre de Sensor"
                               name='clay'
                               type='text'
                               placeholder='Descripción de sensor/actuador '
                               fullWidth
                    />
                </Grid>
                <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
                    <Grid item xs={12} sm={12}>
                        <Button type='submit' variant="contained" fullWidth>
                            Registrar
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}