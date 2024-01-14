import { Box, Button, Divider, Grid, Paper, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useAlert } from 'react-alert';

const CaptureGameResults = (props) => {
    const alert = useAlert();

    const [values, setValues] = useState({
        Team1Set1: '0',
        Team1Set2: '0',
        Team1Set3: '0',
        Team2Set1: '0',
        Team2Set2: '0',
        Team2Set3: '0'
    });

    const handleUpdate = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };


    const PostGameResults = () => {
        let payload = {
            "GameID": props.game.ID,
            "Team1Set1": parseInt(values.Team1Set1),
            "Team1Set2": parseInt(values.Team1Set2),
            "Team1Set3": parseInt(values.Team1Set3),
            "Team2Set1": parseInt(values.Team2Set1),
            "Team2Set2": parseInt(values.Team2Set2),
            "Team2Set3": parseInt(values.Team2Set3),
            "Winner": 1,
            "WinningReason": "Puntaje",
            "Comments": "Buen Partido"
        }
    axios.post("/v1/tournament/gameresults", payload)
    .then ((response) => {
        props.getdata();
        props.handleclose();
        alert.info("Saving results ...")
    })
    .catch ((err) => {
        alert.error('Error almacenando resultados del partido...')
    })
}

return (
    <Paper>
        <Box padding={'1rem'}>
            <Grid container spacing={1} >
                <Grid item xs={12} textAlign={'center'}>
                    <Typography variant='h3' >
                        Captura de Resultados
                    </Typography>
                </Grid>
                <Grid item xs={6.5} style={{ border: "1px solid grey", borderTopLeftRadius: '10px', display: 'flex', alignItems: 'center' }} >
                    <Typography variant={'body2'} >
                        {`${props.game.Team1[0].Name} / ${props.game.Team1[1].Name}`}
                    </Typography>
                </Grid>
                <Grid item xs={1.5} style={{ border: "1px solid grey" }}>
                    <TextField
                        inputProps={{ tabIndex: "0", min: 0, max: 7, step: 1, maxLength: 1 }}
                        name='Team1Set1'
                        variant={'outlined'}
                        type='number'

                        style={{ paddingRight: '.5rem', paddingBottom: '.5rem' }}
                        value={values.Team1Set1}
                        onChange={handleUpdate}
                    />
                </Grid>
                <Grid item xs={1.5} style={{ border: "1px solid grey" }}>
                    <TextField
                        inputProps={{ tabIndex: "2" }}
                        name='Team1Set2'
                        style={{ paddingRight: '.5rem', paddingBottom: '.5rem' }}
                        value={values.Team1Set2}
                        onChange={handleUpdate}
                    />
                </Grid>
                <Grid item xs={1.5} style={{ border: "1px solid grey" }}>
                    <TextField
                        inputProps={{ tabIndex: "4" }}
                        name='Team1Set3'
                        style={{ paddingRight: '.5rem', paddingBottom: '.5rem' }}
                        value={values.Team1Set3}
                        onChange={handleUpdate}
                    />
                </Grid>
                <Grid item xs={1} style={{ border: "1px solid grey", borderTopRightRadius: '10px' }}>
                    Gano
                </Grid>

                <Grid item xs={6.5} style={{ border: "1px solid grey", borderBottomLeftRadius: '10px', display: 'flex', alignItems: 'center' }} >
                    {`${props.game.Team2[0].Name} / ${props.game.Team2[1].Name}`}
                </Grid>
                <Grid item xs={1.5} style={{ border: "1px solid grey" }}>
                    <TextField
                        inputProps={{ tabIndex: "1" }}
                        name='Team2Set1'
                        style={{ paddingRight: '.5rem', paddingBottom: '.5rem' }}
                        value={values.Team2Set1}
                        onChange={handleUpdate}
                    />
                </Grid>
                <Grid item xs={1.5} style={{ border: "1px solid grey" }}>
                    <TextField
                        inputProps={{ tabIndex: "3" }}
                        name='Team2Set2'
                        style={{ paddingRight: '.5rem', paddingBottom: '.5rem' }}
                        value={values.Team2Set2}
                        onChange={handleUpdate}
                    />
                </Grid>
                <Grid item xs={1.5} style={{ border: "1px solid grey" }}>
                    <TextField
                        inputProps={{ tabIndex: "5" }}
                        name='Team2Set3'
                        style={{ paddingRight: '.5rem', paddingBottom: '.5rem' }}
                        value={values.Team2Set3}
                        onChange={handleUpdate}
                    />
                </Grid>
                <Grid item xs={1} style={{ border: "1px solid grey", borderBottomRightRadius: '10px' }}>
                    Perdio
                </Grid>
                <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
                    <Button variant={'contained'} color={'secondary'} tabIndex={6} onClick={props.handleclose}>Cancelar</Button>
                    <Button variant={'contained'} color={'primary'} tabIndex={7} onClick={PostGameResults}>Aceptar</Button>
                </Grid>
            </Grid>

        </Box>
    </Paper>
)
}

export default CaptureGameResults