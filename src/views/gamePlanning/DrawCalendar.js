
import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, Grid, Paper, Typography } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useAlert } from 'react-alert';
import { IconBackspace } from '@tabler/icons';
import SelectTournaments from 'components/SelectTournament';
import axios from 'axios';



const MyGrid = () => {
    const alert = useAlert();
    const [timeSlots, setTimeSlots] = useState([]);
    const [games, setGames] = useState([])
    const [courts, setCourts] = useState([]);
    const [values, setValues] = useState({
        TournamentID: '',
        FilterDate: null,
    });


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

    const GetTimeSlots = () => {
        if (values.TournamentID.length === 0) {
            return
        }
        if (values.FilterDate.length === 0) {
            return
        }
        let FilterDate = values.FilterDate.toJSON().substring(0, 10)
        let myURL = `/v1/tournament/gettimeslots?TournamentID=${values.TournamentID}&FilterDate=${FilterDate}`;
        axios.get(myURL)
            .then((response) => {
                if (response.data.data) {
                    let slots = response.data.data;

                    let courtTemp = slots.map((item) => {
                        return item.CourtNumber
                    })
                    let myCourts = [...new Set(courtTemp)];
                    setCourts(myCourts);
                    setTimeSlots(slots);
                } else {
                    setCourts([]);
                    setTimeSlots([]);
                }

            })
            .catch((err) => {
                alert.error('Error buscando Timeslots...' + err.message)
                setCourts([]);
                setTimeSlots([]);
            })
    }

    const CreateGames = (GameLimit) => {
        let Games = [];
        const Categories = ['Open', 'Primera', 'Segunda', 'Tercera', 'Cuarta', 'Quinta', 'Sexta', 'Femenil'];
        let categorySelector = 0;
        for (let gameCounter = 1; gameCounter <= GameLimit; gameCounter++) {
            let magicNumber = ((gameCounter - 1) * 4)
            let thisGame = {
                ID: `${gameCounter}`,
                CategoryID: `${categorySelector + 1}`,
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
            if (categorySelector > Categories.length - 1) {
                categorySelector = 0;
            }
        }
        return Games;
    }

    const GetGames = () => {
        if (values.TournamentID.length === 0) {
            return
        }

        let myURL = `/v1/tournament/listgames?TournamentID=${values.TournamentID}`;
        axios.get(myURL)
            .then((response) => {
                if (response.data.data) {
                    let _games = response.data.data
                    let games = _games.map((item) => {
                        let thisGame = {
                            ID: `${item.GameID}`,
                            CategoryID: `${item.CategoryID}`,
                            CategoryDescription: `${item.CategoryDescription}`,
                            CategoryColor: item.CategoryColor,
                            Team1: [
                                {
                                    ID: `${item.Team1Member1ID}`,
                                    Name: `${item.Team1Name1}`,
                                    Ranking: item.Team1Ranking1,
                                },
                                {
                                    ID: `${item.Team1Member2ID}`,
                                    Name: `${item.Team1Name2}`,
                                    Ranking: item.Team1Ranking2,
                                },
                            ],
                            Team2: [
                                {
                                    ID: `${item.Team12Member1ID}`,
                                    Name: `${item.Team2Name1}`,
                                    Ranking: item.Team2Ranking1,
                                },
                                {
                                    ID: `${item.Team2Member2ID}`,
                                    Name: `${item.Team2Name2}`,
                                    Ranking: item.Team2Ranking2,
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
                        return thisGame;
                    })
                    setGames(games);
                } else {
                    setGames([]);
                }

            })
            .catch((err) => {
                alert.error('Error buscando Juegos...' + err.message)
                setCourts([]);
                setTimeSlots([]);
            })
    }

    const getData = () => {
        GetTimeSlots();
        GetGames();
    }

    const GetTimeList = (court) => {
        return timeSlots.filter((item) => item.CourtNumber === court)
    }

    useEffect(() => {
        //let slots = CreateTimeSlots(5, 5);
        // setTimeSlots(slots);
        //GetTimeSlots();

        // setGames(CreateGames(20));
    }, [])



    const startDrag = (evt, item) => {
        evt.dataTransfer.setData('itemID', item.ID)
    }

    const draggingOver = (evt) => {
        evt.preventDefault();
    }

    const PostAssignGameToTimeSlot = (TournamentID, GameID, TimeSlotID) => {
        let payload = {
            "TournamentID": TournamentID,
            "GameID": GameID,
            "TimeSlotID": TimeSlotID
        }

        axios.put('/v1/tournament/assigngamestotimeslots', payload)
            .then((response) => {
                alert.success("Assignación exitosa...");
            })
            .catch((err) => {
                alert.error("Error durante la asignación" + err.message);
                // hacer reversa a la asignacion
                let item = {};
                item.game = {};
                item.game.ID = GameID;
                removeFromSchedule(item)
            })
    }

    const DeleteAssignGameToTimeSlot = (TournamentID, GameID, TimeSlotID) => {
        let payload = {
            "TournamentID": TournamentID,
            "GameID": GameID,
            "TimeSlotID": TimeSlotID
        }

        axios.delete('/v1/tournament/deleteassigngamestotimeslots', {data: payload})
            .then((response) => {
                alert.success("Asignación eliminada exitosamente...");
            })
            .catch((err) => {
                alert.error("Error durante la remoción de la asignación" + err.message);
            })
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

        PostAssignGameToTimeSlot(values.TournamentID, source, item.ID)

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

        let TimeSlotID = item.ID
        const newTimeSlots = timeSlots.map((item) => {
            if (item.game && item.game.ID === gameToRemove.ID) {
                delete item.game
                return item;
            }
            return item;
        })

        setTimeSlots(newTimeSlots);
        DeleteAssignGameToTimeSlot (values.TournamentID,gameToRemove.ID, item.ID )
    }

    const FormatDate = (myDate) => {
        return `${myDate.$D}-${myDate.$M + 1}-${myDate.$y}`
    }

    const renderGames = (row) => {
        return (
            <Grid item textAlign={'center'} xs={12}>
                <Paper key={`t-${row.ID}`}  >
                    <Box draggable onDragStart={(evt) => startDrag(evt, row)} minHeight={'135px'}  >
                        <Box backgroundColor={row.CategoryColor}>
                            <Typography variant={'caption'}  >{row.CategoryDescription}</Typography>
                        </Box>
                        <Typography variant={'subtitle2'} style={{ color: 'black' }} >{row.Team1[0].Name} / {row.Team1[1].Name}</Typography>
                        <Typography variant={'caption'} >vs</Typography>
                        <Typography variant={'subtitle2'} style={{ color: 'steelblue' }}>{row.Team2[0].Name} / {row.Team2[1].Name}</Typography>
                        <Typography paddingTop={1} variant={'caption'} >6-2, 2-6, 4-6</Typography>

                    </Box>
                </Paper>
            </Grid>
        )
    }

    const renderTimeSlots = (court) => {
        return (
            <Grid item xs={2} key={`A=-${court}`}>
                <Grid container direction={'column'} spacing={1} >
                    {GetTimeList(court).map((item, index) => (
                        <Grid item key={index}>
                            <Paper>
                                <Box display={'flex'} justifyContent={'space-between'} style={{ backgroundColor: '#9fa7cf' }} >
                                    <Typography component={'p'} variant={'button'} paddingLeft={1}>{`${item.StartTime.substring(11, 16)}`}</Typography>
                                    <IconBackspace size={'25'} onClick={() => removeFromSchedule(item)} />
                                </Box>
                                <Box padding={1} droppable="true" onDragOver={(evt => draggingOver(evt))} onDrop={(evt => onDrop(evt, item.ID))}>
                                    <Box textAlign={'center'} minHeight={'135px'} key={item.ID}  >
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

    const handleUpdate = (e) => {
        // setHasChanges(true);
        const { name, value } = e.target;
        if (name && value) {
            setValues({ ...values, [name]: value });
        }
    };


    const handleDateUpdate = (newValue, name) => {
        // setHasChanges(true);
        if (name && newValue) {
            setValues({ ...values, [name]: newValue });
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box >
                <Grid container spacing={1} >
                    <Grid item xs={5} display={'flex'} >
                        <SelectTournaments
                            name='TournamentID'
                            value={values.TournamentID}
                            label="Torneo"
                            handleupdate={handleUpdate} />
                    </Grid>
                    <Grid item xs={5} display={'flex'} >
                        <FormControl fullWidth>
                            <DatePicker
                                size={'small'}
                                label="Fecha"
                                name="FilterDate"
                                value={values.FilterDate}
                                onChange={(newValue) => handleDateUpdate(newValue, "FilterDate")}
                                format='DD-MM-YYYY'
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={2} display={'flex'} justifyContent={'end'}>

                        <Button variant='contained' color={'error'} onClick={getData}>Buscar</Button>
                    </Grid>

                    <Grid item xs={2}>
                        <Paper  > <Typography variant={'subtitle1'} textAlign={'center'} color={'GrayText'} >Juegos no calendarizados</Typography></Paper>

                    </Grid>

                    <Grid item xs={10}>
                        <Paper  > <Typography variant='subtitle1' textAlign={'center'} color={'GrayText'}   >{`${values.FilterDate ? FormatDate(values.FilterDate) : 'Sin Resultados...'} `}</Typography></Paper>

                    </Grid>
                    <Grid item xs={2} >
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
                    <Grid item xs={10} >
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