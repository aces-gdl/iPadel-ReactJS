/* eslint-disable array-callback-return, no-loop-func */
import { Button, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useAlert } from 'react-alert';
import './styles.css';
import SelectTournaments from 'components/SelectTournament';
import SelectCategories from 'components/SelectCategories';

const DrawGroupResults = () => {
    const alert = useAlert();

    const [refreshScreen, setRefreshScreen] = useState(false);
    const [values, setValues] = useState({
        TournamentID: '',
        CategoryID: ''
    });
    var groupsRef = useRef([]);

    const handleUpdate = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const gameWinner = (gameP) => {
        let game = gameP
        let Team1 = {
            SetsGanados: 0,
            PuntosPorSetsGanados: 0,
            Winner: false
        };
        let Team2 = {
            SetsGanados: 0,
            PuntosPorSetsGanados: 0,
            Winner: false
        }
        Team1.SetsGanados += game.Team1Set1 > game.Team2Set1 ? 1 : 0;
        Team2.SetsGanados += game.Team1Set1 < game.Team2Set1 ? 1 : 0;

        Team1.SetsGanados += game.Team1Set2 > game.Team2Set2 ? 1 : 0;
        Team2.SetsGanados += game.Team1Set2 < game.Team2Set2 ? 1 : 0;

        Team1.SetsGanados += game.Team1Set3 > game.Team2Set3 ? 1 : 0;
        Team2.SetsGanados += game.Team1Set3 < game.Team2Set3 ? 1 : 0;

        // Gana Team 1
        if (Team1.SetsGanados > Team2.SetsGanados) {
            Team1.Winner = true;
            Team1.PuntosPorSetsGanados = Team2.SetsGanados === 1 ? 2 : 3;
            Team2.PuntosPorSetsGanados = Team2.SetsGanados === 1 ? 1 : 0;
        }
        // Gana Team 2
        if (Team1.SetsGanados < Team2.SetsGanados) {
            Team2.Winner = true;
            Team2.PuntosPorSetsGanados = Team2.SetsGanados === 2 ? 2 : 3;
            Team1.PuntosPorSetsGanados = Team1.SetsGanados === 1 ? 1 : 0;
        }
        game.Team1 = Team1;
        game.Team2 = Team2;

        if (game.Team1.Winner || game.Team2.Winner) {
            game.Winner = Team1.Winner ? 1 : 2;
        } else {
            game.Winner = 0
        }

        return game
    }


    const LoadData = () => {

        if ( (values.TournamentID && values.TournamentID === '') || (values.CategoryID && values.CategoryID === '')){
            alert.error( 'Torneo y categoria son requeridos');
            return
        }
        axios.get(`/v1/tournament/getroundrobinwinner?TournamentID=${values.TournamentID}&CategoryID=${values.CategoryID}`)
            .then((response) => {
                let groups = [];
                let group = [];
                let lastGroupNumber = ''

                response.data.data.map(game => {
                    if (game.GroupID === lastGroupNumber || lastGroupNumber === '') {
                        group.push(gameWinner(game))
                    } else {
                        groups.push(group);
                        group = [];
                        group.push(gameWinner(game));
                    }
                    lastGroupNumber = game.GroupID
                });

                if (group.length > 0) {
                    groups.push(group)
                }
                groupsRef.current = groups;
                //  groupResultsRef = calculateGroupResults()
                setRefreshScreen(!refreshScreen);

            })
            .catch((err) => {
                alert.error('Error Cargando Rounrobin winner: ' + err.message)
            })
    }

    

    const displayGames = (gameParemeter, gameCounter) => {
        let game = gameParemeter;

        return (
            <Paper  >
                <Grid container padding={2} spacing={1} textAlign={'center'} minHeight={'150px'}>
                    <Grid item xs={8} >
                        Partido : {gameCounter}
                    </Grid>
                    <Grid item xs={4}   >
                        <Grid container>
                            <Grid item xs={4}>
                                1
                            </Grid>
                            <Grid item xs={4}>
                                2
                            </Grid>
                            <Grid item xs={4}>
                                3
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item xs={8} className={`TopLine ${game.Winner === 1 ? 'WinnerBackGround' : ''}`}>
                        {`1 ${game.Team1Member1} / ${game.Team1Member2}`}
                    </Grid>
                    <Grid item xs={4} className={`TopLine ${game.Winner === 1 ? 'WinnerBackGround' : ''}`}>
                        <Grid container>
                            <Grid item xs={4} className='RightLine'>
                                {game.Team1Set1}
                            </Grid>
                            <Grid item xs={4} className='RightLine'>
                                {game.Team1Set2}
                            </Grid>
                            <Grid item xs={4}>
                                {game.Team1Set3}
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item xs={8} className={`${game.Winner === 2 ? 'WinnerBackGround' : ''}`}>
                        {`2 ${game.Team2Member1} / ${game.Team2Member2}`}
                    </Grid>
                    <Grid item xs={4} className={`${game.Winner === 2 ? 'WinnerBackGround' : ''}`}>
                        <Grid container>
                            <Grid item xs={4} className='RightLine'>
                                {game.Team2Set1}
                            </Grid>
                            <Grid item xs={4} className='RightLine'>
                                {game.Team2Set2}
                            </Grid>
                            <Grid item xs={4}>
                                {game.Team2Set3}
                            </Grid>

                        </Grid>
                    </Grid>

                </Grid>
            </Paper>
        )
    }



    const displayGroupResults = (group) => {
        let results = [];
        group.map(game => {
            if (!results.find((item) => item.TeamID === game.Team1ID)) {
                let myGame = {};
                myGame.TeamID = game.Team1ID;
                myGame.Member1 = game.Team1Member1;
                myGame.Member2 = game.Team1Member2;
                results.push(myGame)
            }
            if (!results.find((item) => item.TeamID === game.Team2ID)) {
                let myGame = {};
                myGame.TeamID = game.Team2ID
                myGame.Member1 = game.Team2Member1;
                myGame.Member2 = game.Team2Member2;
                results.push(myGame)
            }

        });

        for (let i = 0; i < results.length; i++) {
            let JuegosJugados = group.filter((game) => game.Team1ID === results[i].TeamID || game.Team2ID === results[i].TeamID)
            let JuegosGanados = JuegosJugados.filter((game) => (game.Team1ID === results[i].TeamID && game.Winner === 1) || (game.Team2ID === results[i].TeamID && game.Winner === 2))
            results[i].PuntosPorSetsGanados = 0;
            results[i].PuntosGanados = 0;
            JuegosJugados.map((game) => {

                if (results[i].TeamID === game.Team1ID) {
                    results[i].PuntosPorSetsGanados = results[i].PuntosPorSetsGanados + game.Team1.PuntosPorSetsGanados
                    results[i].PuntosGanados = results[i].PuntosGanados + (game.Team1Set1 - game.Team2Set1) + (game.Team1Set2 - game.Team2Set2) + (game.Team1Set3 - game.Team2Set3)
                }
                if (results[i].TeamID === game.Team2ID) {
                    results[i].PuntosPorSetsGanados = results[i].PuntosPorSetsGanados + game.Team2.PuntosPorSetsGanados
                    results[i].PuntosGanados = results[i].PuntosGanados + (game.Team2Set1 - game.Team1Set1) + (game.Team2Set2 - game.Team1Set2) + (game.Team2Set3 - game.Team1Set3)

                }

            })
            results[i].JuegosJugados = JuegosJugados.length;
            results[i].JuegosGanados = JuegosGanados.length;
        }

        //sort results by Juegos Ganados y Puntos Por Set Ganados
        results = results.sort((a, b) => a.JuegosGanados > b.JuegosGanados ? -1 : 1).sort((a, b) => a.PuntosPorSetsGanados > b.PuntosPorSetsGanados ? -1 : 1).sort((a, b) => a.PuntosGanados > b.PuntosGanados ? -1 : 1);
        return (
            <>
                <Grid container spacing={2} padding={1}>
                    <Grid item xs={12} textAlign={'center'}>
                        <Typography variant={'h4'} >
                            {`${group[0].GroupName}`}
                        </Typography>
                    </Grid>

                    {group.map((game, index) => (
                        <Grid item xs={12} md={6} lg={4}>
                            {displayGames(game, index + 1)}
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Paper >
                            <Grid container spacing={1} padding={2} >
                                <Grid item xs={4} className='BottomLine'>
                                    <Typography >Equipo </Typography>
                                </Grid>
                                <Grid xs={2} textAlign={'center'} className='BottomLine'>
                                    JJ
                                </Grid>
                                <Grid xs={2} textAlign={'center'} className='BottomLine'>
                                    JG
                                </Grid>
                                <Grid xs={2} textAlign={'center'} className='BottomLine' >
                                    PPS
                                </Grid>
                                <Grid xs={2} textAlign={'center'} className='BottomLine' >
                                    PG
                                </Grid>
                                {results.map((team) =>
                                    <>

                                        <Grid item xs={4}>
                                            <Typography >{team.Member1} / {team.Member2}</Typography>
                                        </Grid>
                                        <Grid xs={2} textAlign={'center'}>
                                            {team.JuegosJugados}
                                        </Grid>
                                        <Grid xs={2} textAlign={'center'}>
                                            {team.JuegosGanados}
                                        </Grid>
                                        <Grid xs={2} textAlign={'center'}>
                                            {team.PuntosPorSetsGanados}
                                        </Grid>
                                        <Grid xs={2} textAlign={'center'}>
                                            {team.PuntosGanados}
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </>
        )
    }

    return (
        <Box>
            <Typography variant='h2'>
                Resultados por Grupo

            </Typography>
            <Box >
                <Grid container spacing={1} padding={1}>
                    <Grid item xs={5}>
                        <SelectTournaments
                            name='TournamentID'
                            label='Torneo'
                            handleupdate={handleUpdate}
                            value={values.TournamentID}
                        />

                    </Grid>
                    <Grid item xs={5}>
                        <SelectCategories
                            name='CategoryID'
                            value={values.CategoryID}
                            label="Category"
                            handleupdate={handleUpdate} />

                    </Grid>
                    <Grid item xs={2} textAlign={'end'}>
                        <Button variant={'contained'} onClick={LoadData}>Buscar</Button>
                    </Grid>
                </Grid>
            </Box>
            {groupsRef.current.map((group) => displayGroupResults(group))}
        </Box>
    )
}

export default DrawGroupResults