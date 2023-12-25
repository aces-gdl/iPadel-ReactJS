
import React, { useEffect, useState } from 'react'
import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useAlert } from 'react-alert';
import { IconBackspace } from '@tabler/icons';



const MyGrid = () => {
    const alert = useAlert();
    const [timeSlots, setTimeSlots] = useState([]);
    const [games, setGames] = useState([])
    const [courts, setCourts] = useState([]);


    const CreateTimeSlots = (courts, times) => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

        let Slots = [];
        for (let courtCounter = 1; courtCounter <= courts; courtCounter++) {
            for (let timeCounter = 1; timeCounter <= times; timeCounter++) {
                let timeSlot = {
                    ID: `${alphabet[courtCounter - 1]}${timeCounter}`,
                    Court: `${alphabet[courtCounter - 1]}`,
                    Time: `${timeCounter}`,
                    GameID: ''
                }
                Slots.push(timeSlot);
            }
        }
        return Slots;
    }

    const CreateGames = (GameLimit) => {
        let Games = [];
        const Categories = ['Open', 'Primera', 'Segunda', 'Tercera', 'Cuarta', 'Quinta', 'Sexta', 'Femenil'];
        let categorySelector = 0;
        for (let gameCounter = 1; gameCounter <= GameLimit; gameCounter++) {
            let magicNumber = ((gameCounter - 1) * 4)
            let thisGame = {
                ID: `G-${gameCounter}`,
                CategoryID:'1',
                CategoryDescription: Categories[categorySelector],   
                Team1: [
                    {
                        ID: `p${gameCounter}j${magicNumber + 1}`,
                        Name: `Jugador ${magicNumber + 1}`,
                        Ranking: Math.floor(Math.random() * 1000),
                    },
                    {
                        ID: `p${gameCounter}j${magicNumber + 2}`,
                        Name: `Jugador ${magicNumber + 2}`,
                        Ranking: Math.floor(Math.random() * 1000),
                    },
                ],
                Team2: [
                    {
                        ID: `p${gameCounter}j${magicNumber + 3}`,
                        Name: `Jugador ${magicNumber + 3}`,
                        Ranking: Math.floor(Math.random() * 1000),
                    },
                    {
                        ID: `p${gameCounter}j${magicNumber + 4}`,
                        Name: `Jugador ${magicNumber + 4}`,
                        Ranking: Math.floor(Math.random() * 1000),
                    },
                ],
                Score: {
                    Set1: {
                        team1: 3,
                        team2: 6
                    },
                    Set2: {
                        team1: 6,
                        team2: 4
                    },
                    Set3: {
                        team1: 7,
                        team2: 6
                    }
                }
            }
            Games.push(thisGame);
            categorySelector++;
            if (categorySelector > Categories.length -1) {
                categorySelector =0;
            }
        }
        return Games;
    }



    const GetTimeList = (court) => {
        return timeSlots.filter((item) => item.Court === court.Court)
    }

    useEffect(() => {
        let slots = CreateTimeSlots(4, 5);
        setTimeSlots(slots);
        setCourts(slots.filter((item) => item.Time === '1'));
        setGames(CreateGames(20));
    }, [])



    const startDrag = (evt, item) => {
        evt.dataTransfer.setData('itemID', item.ID)
    }

    const draggingOver = (evt) => {
        evt.preventDefault();
    }

    const onDrop = (evt, target) => {
        const source = evt.dataTransfer.getData('itemID');
        const item = timeSlots.find(item => item.ID === target);
        const gameAlreadyExists = timeSlots.find(item => item.game && item.game.ID === source);

        if (gameAlreadyExists) {
            alert.info('Operación invalida...')
            return
        }

        if (item.game && item.game.ID.length > 0) {
            alert.info('Horario ocupado...')
            return
        }
        const sourceGame = games.find((item) => item.ID === source);


        const newTimeSlots = timeSlots.map((ts) => {
            if (ts.ID === target) {
                ts.game = sourceGame;
                return ts;
            }
            return ts;
        })

        setTimeSlots(newTimeSlots);

        const newGames = games.map((game) => {
            if (game.ID === source) {
                game.scheduled = true
                return game
            }
            return game
        })

        setGames(newGames);
    }

    const renderGames = (row) => {
        return (
            <Grid item textAlign={'center'} xs={12}>
                <Paper key={`t-${row.ID}`}  >
                    <Box draggable onDragStart={(evt) => startDrag(evt, row)} >
                        <Typography variant={'caption'} >{row.CategoryDescription}</Typography>
                        <Typography >{row.Team1[0].Name}/ {row.Team1[1].Name}</Typography>
                        <Divider />
                        <Typography >{row.Team2[0].Name}/ {row.Team2[1].Name}</Typography>
                        <Typography variant={'caption'} >6-2, 2-6, 4-6</Typography>
                        
                    </Box>
                </Paper>
            </Grid>
        )
    }

    const removeFromSchedule = (item) => {
        if (!item.game) {
            return
        }

        const gameToRemove = games.find(i => i.ID === item.game.ID);

        const newGames = games.map((game) => {
            if (game.ID === gameToRemove.ID) {
                game.scheduled = false;
                return game;
            }
            return game
        })
        setGames(newGames)

        const newTimeSlots = timeSlots.map((item) => {
            if (item.game && item.game.ID === gameToRemove.ID) {
                delete item.game
                return item;
            }
            return item;
        })

        setTimeSlots(newTimeSlots);
    }

    const renderTimeSlots = (court) => {
        return (
            <Grid item xs={3} key={`A=-${court.ID}`}>
                <Grid container direction={'column'} spacing={1} >
                    {GetTimeList(court).map((item, index) => (
                        <Grid item key={index}>
                            <Paper>
                                <Box display={'flex'} justifyContent={'space-between'} style={{ backgroundColor: '#9fa7cf', padding: ' 3px 3px' }} >
                                    <Typography component={'p'} variant={'button'} >{`${item.ID}`}</Typography>
                                    <IconBackspace size={'25'} onClick={() => removeFromSchedule(item)} />
                                </Box>
                                <Box padding={1} droppable="true" onDragOver={(evt => draggingOver(evt))} onDrop={(evt => onDrop(evt, item.ID))}>
                                    <Box textAlign={'center'} minHeight={'80px'} key={item.ID}  >
                                        {item && item.game && (
                                            renderGames(item.game)
                                        )}
                                    </Box>

                                </Box>
                            </Paper>
                        </Grid>

                    ))}
                </Grid>
            </Grid>

        );
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box >
                <Grid container spacing={1} >
                    <Grid item xs={3}>
                        <Paper  > <Typography variant={'subtitle1'} textAlign={'center'} color={'GrayText'} >Juegos no calendarizados</Typography></Paper>

                    </Grid>

                    <Grid item xs={9}>
                        <Paper  > <Typography variant='subtitle1' textAlign={'center'} color={'GrayText'}   >Calendario de juegos 12/22/2023</Typography></Paper>

                    </Grid>
                    <Grid item xs={3} >
                        <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 155px)', overflowX: 'hidden' }}>
                            <Grid container spacing={1}>
                                {games && games.length > 0 && (
                                    <>
                                        {games.filter(game => !game.scheduled).map((item) => renderGames(item))}
                                    </>
                                )}
                            </Grid>
                        </PerfectScrollbar>
                    </Grid>
                    <Grid item xs={9} >
                        <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 155px)', overflowX: 'hidden' }}>
                            {courts && courts.length > 0 && (
                                <Grid container spacing={1}>
                                    {courts.map((court) => renderTimeSlots(court))}
                                </Grid>
                            )}
                        </PerfectScrollbar>
                    </Grid>
                </Grid>
            </Box>
        </LocalizationProvider>
    )
}

export default MyGrid