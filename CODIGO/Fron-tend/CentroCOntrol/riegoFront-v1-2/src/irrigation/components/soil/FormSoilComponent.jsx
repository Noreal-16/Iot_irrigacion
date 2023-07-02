import {Button, Grid, TextField} from "@mui/material";

export const FormSoilComponent = () => {
    return (
        <form>
            <Grid container>
                <Grid item xs={12}>
                    <TextField label="Clase Textural"
                               name='texture_class'
                               type='text'
                               placeholder='Franco Limoso'
                               fullWidth/>
                </Grid>
                <Grid item xs={12} sx={{mt: 1}}>
                    <TextField label="(%) Arcilla"
                               name='clay'
                               type='number'
                               placeholder='12.5'
                               fullWidth
                    />
                </Grid>
                <Grid item xs={12} sx={{mt: 1}}>
                    <TextField label="(%)
                    Limo" name='silt'

                               type='number'
                               placeholder='13.5'
                               fullWidth
                    />
                </Grid>
                <Grid item xs={12} sx={{mt: 1}}>
                    <TextField label="(%) Arena"
                               name='sand'

                               type='number'
                               placeholder='15.6'
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