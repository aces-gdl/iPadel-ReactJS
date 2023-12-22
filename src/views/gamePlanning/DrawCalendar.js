
import React, { useEffect, useState } from 'react'
import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';



const MyGrid = () => {
    const [timeSlots, setTimeSlots] = useState([]);
    const [games, setGames] = useState([])
    const [courts, setCourts] = useState([]);

    const gamesModel = [
        {
            ID: 1,
            Team1: [
                {
                    ID: 'p1j1',
                    Name: 'Juan Navarro',
                    Ranking: 590
                },
                {
                    ID: 'p1j2',
                    Name: 'Antonio Pimentes',
                    Ranking: 590
                },
            ],
            Team2: [
                {
                    ID: 'p2j1',
                    Name: 'Emilio',
                    Ranking: 570
                },
                {
                    ID: 'p2j1',
                    Name: 'Choche',
                    Ranking: 570
                }
            ],
            Score: {
                Set1: {
                    team1: 6,
                    team2: 4
                },
                Set2: {
                    team1: 6,
                    team2: 4
                },
                Set3: {
                    team1: 6,
                    team2: 4
                }
            }
        },
        {
            ID: 1,
            Team1: [
                {
                    ID: 'p1j1',
                    Name: 'Juan Navarro',
                    Ranking: 590
                },
                {
                    ID: 'p1j2',
                    Name: 'Antonio Pimentes',
                    Ranking: 590
                },
            ],
            Team2: [
                {
                    ID: 'p2j1',
                    Name: 'Emilio',
                    Ranking: 570
                },
                {
                    ID: 'p2j1',
                    Name: 'Choche',
                    Ranking: 570
                }
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
    ]


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
        for (let gameCounter = 1; gameCounter <= GameLimit; gameCounter++) {
            let magicNumber = ((gameCounter - 1) * 4)
            let thisGame = {
                ID: `G-${gameCounter}`,
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
        }
        return Games;
    }


    const GetCourtList = () => {
        return timeSlots.filter((item) => item.Time === '1')
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
        console.log(item);
    }

    const draggingOver = (evt) => {
        evt.preventDefault();
    }

    const onDrop = (evt, target) => {
        const source = evt.dataTransfer.getData('itemID');
        const item = timeSlots.find(item => item.ID == target);
        const sourceGame = games.find((item) => item.ID == source);

        const newTimeSlots = timeSlots.map((ts) => {
            if (ts.ID === target) {
                ts.game = sourceGame;
                return ts;
            }
            return ts;
        })

        
        setTimeSlots(newTimeSlots);

        console.log('Se solto el item ', source, ' en la columna ', target)

    }

    const renderGames = (row) => {
        return (
            <Grid item textAlign={'center'}  xs={12}>
                <Paper  key={`t-${row.ID}`} droppable="true" pading onDragOver={(evt => draggingOver(evt))} onDrop={(evt => onDrop(evt, row.ID))}>
                    <Box draggable onDragStart={(evt) => startDrag(evt, row)} >
                        <Typography >{row.Team1[0].Name}/ {row.Team1[1].Name}</Typography>
                        <Divider />
                        <Typography >{row.Team2[0].Name}/ {row.Team2[1].Name}</Typography>
                    </Box>
                </Paper>
            </Grid>
        )
    }

    const renderTimeSlots = (court) => {
        return (
            <Grid item xs={3} key={`A=-${court.ID}`}>
                <Grid container direction={'column'} spacing={1} >
                    {GetTimeList(court).map((item, index) => (
                        <Grid item key={index}>
                            <Paper>
                                <Box padding={2} droppable="true" onDragOver={(evt => draggingOver(evt))} onDrop={(evt => onDrop(evt, item.ID))}>
                                    <Box textAlign={'center'} minHeight={'75px'} key={item.ID} draggable onDragStart={(evt) => startDrag(evt, item)}>
                                        <Typography variant={'caption'} >{`Cancha: ${item.ID}`}</Typography>
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
                        <Paper  > <Typography variant={'subtitle1'} textAlign={'center'}>Juegos no calendarizados</Typography></Paper>

                    </Grid>

                    <Grid item xs={9}>
                        <Paper  > <Typography variant='subtitle1' textAlign={'center'}>Calendario de juegos 12/22/2023</Typography></Paper>

                    </Grid>
                    <Grid item xs={3} >
                        <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 155px)', overflowX: 'hidden' }}>
                            <Grid container spacing={1}>
                                {games && games.length > 0 && (
                                    <>
                                        {games.map((item) => renderGames(item))}
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