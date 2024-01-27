import { Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useAlert } from 'react-alert';

const CaptureGameResults = (props) => {
    const alert = useAlert();
    let WinnerRef = useRef(0);

    const [values, setValues] = useState({
        Team1Set1: '0',
        Team1Set2: '0',
        Team1Set3: '0',
        Team2Set1: '0',
        Team2Set2: '0',
        Team2Set3: '0',
        WinningReason:'0',
        Comment: ''
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
            "Winner": WinnerRef.current,
            "WinningReason": values.WinningReason,
            "Comments": values.Comment
        }
        axios.post("/v1/tournament/gameresults", payload)
            .then((response) => {
                props.getdata();
                props.handleclose();
                alert.info("Saving results ...")
            })
            .catch((err) => {
                alert.error('Error almacenando resultados del partido...')
            })
    }

    const FindWinner = () =>{
        let Team1Set1 = parseInt(values.Team1Set1);
        let Team1Set2 = parseInt(values.Team1Set2);
        let Team1Set3 = parseInt(values.Team1Set3);
        let Team2Set1 = parseInt(values.Team2Set1);
        let Team2Set2 = parseInt(values.Team2Set2);
        let Team2Set3 = parseInt(values.Team2Set3);

        let ATeam = 0;
        let BTeam = 0;

        if (Team1Set1 >=6 && Team2Set1 < Team1Set1) {  ATeam++}
        if (Team2Set1 >=6 && Team1Set1 < Team2Set1) {  BTeam++}

        if (Team1Set2 >=6 && Team2Set2 < Team1Set2) {  ATeam++}
        if (Team2Set2 >=6 && Team1Set2 < Team2Set2) {  BTeam++}

        if (ATeam === 1 || BTeam === 1 ){
            if (Team1Set3 >=6 && Team2Set3 < Team1Set3) {  ATeam++}
            if (Team2Set3 >=6 && Team1Set3 < Team2Set3) {  BTeam++}    
        }
        if (ATeam + BTeam >= 2){
            if (ATeam > BTeam) {
                WinnerRef.current = 1
                return 1
                
            }
            if (BTeam > ATeam){
                WinnerRef.current = 2
                return 2
            }
        }

        return 0
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
                    <Grid item xs={5.5} style={{ border: "1px solid grey", borderTopLeftRadius: '10px', display: 'flex', alignItems: 'center' }} >
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
                            inputProps={{ tabIndex: "2", min: 0, max: 7, step: 1, maxLength: 1 }}

                            name='Team1Set2'
                            type='number'
                            style={{ paddingRight: '.5rem', paddingBottom: '.5rem' }}
                            value={values.Team1Set2}
                            onChange={handleUpdate}
                        />
                    </Grid>
                    <Grid item xs={1.5} style={{ border: "1px solid grey" }}>
                        <TextField
                            inputProps={{ tabIndex: "4", min: 0, max: 7, step: 1, maxLength: 1 }}
                            name='Team1Set3'
                            type='number'
                            style={{ paddingRight: '.5rem', paddingBottom: '.5rem' }}
                            value={values.Team1Set3}
                            onChange={handleUpdate}
                        />
                    </Grid>
                    <Grid item xs={2} style={{ border: "1px solid grey", borderTopRightRadius: '10px' }}>
                    { FindWinner () === 1 && ( 
                            <Typography variant={'h4'} >Gano</Typography>
                        )}
                    </Grid>

                    <Grid item xs={5.5} style={{ border: "1px solid grey", borderBottomLeftRadius: '10px', display: 'flex', alignItems: 'center' }} >
                        {`${props.game.Team2[0].Name} / ${props.game.Team2[1].Name}`}
                    </Grid>
                    <Grid item xs={1.5} style={{ border: "1px solid grey" }}>
                        <TextField
                            inputProps={{ tabIndex: "1", min: 0, max: 7, step: 1, maxLength: 1 }}
                            name='Team2Set1'
                            type='number'
                            style={{ paddingRight: '.5rem', paddingBottom: '.5rem' }}
                            value={values.Team2Set1}
                            onChange={handleUpdate}
                        />
                    </Grid>
                    <Grid item xs={1.5} style={{ border: "1px solid grey" }}>
                        <TextField
                            inputProps={{ tabIndex: "3", min: 0, max: 7, step: 1, maxLength: 1 }}
                            name='Team2Set2'
                            type='number'
                            style={{ paddingRight: '.5rem', paddingBottom: '.5rem' }}
                            value={values.Team2Set2}
                            onChange={handleUpdate}
                        />
                    </Grid>
                    <Grid item xs={1.5} style={{ border: "1px solid grey" }}>
                        <TextField
                            inputProps={{ tabIndex: "5", min: 0, max: 7, step: 1, maxLength: 1 }}
                            name='Team2Set3'
                            style={{ paddingRight: '.5rem', paddingBottom: '.5rem' }}
                            type='number'
                            value={values.Team2Set3}
                            onChange={handleUpdate}
                        />
                    </Grid>
                    <Grid item xs={2} style={{ border: "1px solid grey", borderBottomRightRadius: '10px' }}>
                        { FindWinner () === 2 && ( 
                            <Typography variant={'h4'} >Gano</Typography>
                        )}
                    </Grid>
                    <Grid item xs={12} >
                        <FormControl size='small' fullWidth sx={{  paddingTop: '5px' }}>
                            <InputLabel id="WinningReasonL">Gano por </InputLabel>
                            <Select
                            inputProps={{ tabIndex: "7" }}
                                labelId="WinningReasonL"
                                id={'WinningReason'}
                                name={'WinningReason'}
                                value={values.WinningReason}
                                onChange={handleUpdate}>
                                <MenuItem value='Indefinido' key='0'>Indefinido</MenuItem>
                                <MenuItem value='Por sets' key='1'>Por sets</MenuItem>
                                <MenuItem value='Default por ausencia' key='2'>Default por ausencia</MenuItem>
                                <MenuItem value='Default por lesion' key='3'>Default por lesion</MenuItem>
                             
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            fullWidth
                            inputProps={{ tabIndex: "8" }}
                            label='Comentarios'
                            name='Comment'
                            value={values.Comment}
                            onChange={handleUpdate}
                        />
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