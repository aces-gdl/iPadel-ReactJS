/* eslint-disable no-unused-expressions,  array-callback-return, no-loop-func*/
import React, { useRef, useState } from 'react'
import { Box, Button, Chip, Grid, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useAlert } from 'react-alert';
import { IconBackspace, IconSearch } from '@tabler/icons';
import SelectTournaments from 'components/SelectTournament';
import axios from 'axios';
import dayjs from 'dayjs';

const MIN_LENGTH_FOR_SEARCH_STRING = 3;

const DrawCuartos = () => {
    const alert = useAlert();
    const [values, setValues] = useState({
        TournamentID: '',
        SearchStr: ''
    });
    const [captureResultOpen, setCaptureResultOpen] = useState(false);
    const [refreshScreen, setRefreshScreen] = useState(false);

    let gamesRef = useRef([]);
    let timeSlotsRef = useRef([]);
    let courtsRef = useRef([]);
    let numberOfCourts = useRef(1);
    let currentRow = useRef({});
    let tournamentDaysRef = useRef([]);
    let filterDateRef = useRef();

    const GetTimeSlots = () => {
        if (values.TournamentID.length === 0) {
            return
        }
        if (!filterDateRef.current) {
            return
        }


        // let FilterDate = values.FilterDate.toJSON().substring(0, 10)
        let FilterDate = filterDateRef.current.toJSON().substring(0, 10)
        let myURL = `/v1/tournament/gettimeslots?TournamentID=${values.TournamentID}&FilterDate=${FilterDate}`;
        axios.get(myURL)
            .then((response) => {
                if (response.data.data) {
                    let slots = response.data.data;

                    let courtTemp = slots.map((item) => {
                        return item.CourtNumber
                    })
                    let myCourts = [...new Set(courtTemp)];
                    courtsRef.current = myCourts;
                    numberOfCourts.current = myCourts.length;
                    timeSlotsRef.current = response.data.data
                    GetGames();
                } else {
                    alert.show("No existen TimeSlots para este dia")
                    courtsRef.current = [];
                    timeSlotsRef.current = [];
                    setRefreshScreen(!refreshScreen);
                }

            })
            .catch((err) => {
                alert.error('Error buscando Timeslots...' + err.message)
                courtsRef.current = [];
                timeSlotsRef.current = [];
            })
    }

    const GetGames = () => {
        if (values.TournamentID.length === 0) {
            return
        }

        let myURL = `/v1/tournament/listgames?TournamentID=${values.TournamentID}`;
        // myURL += `&SearchStr=${values.SearchStr}`

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
                            TournamentTimeSlotsID: item.TournamentTimeSlotsID,
                            GroupNumber: item.GroupNumber,
                            MatchSearch: false,
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
                                    ID: `${item.Team2Member1ID}`,
                                    Name: `${item.Team2Name1}`,
                                    Ranking: item.Team2Ranking1,
                                },
                                {
                                    ID: `${item.Team2Member2ID}`,
                                    Name: `${item.Team2Name2}`,
                                    Ranking: item.Team2Ranking2,
                                },
                            ],
                            GameResultsID: item.GameResultsID,
                            Team1Set1: item.Team1Set1,
                            Team1Set2: item.Team1Set2,
                            Team1Set3: item.Team1Set3,
                            Team2Set1: item.Team2Set1,
                            Team2Set2: item.Team2Set2,
                            Team2Set3: item.Team2Set3,
                        }
                        return thisGame;
                    })
                    gamesRef.current = games;

                    let AssignedGames = gamesRef.current.filter((item) => item.TournamentTimeSlotsID !== '00000000-0000-0000-0000-000000000000')
                    if (AssignedGames && AssignedGames.length > 0) {
                        AssignedGames.map((game) => {
                            AssignGameToTimeSlot(game.ID, game.TournamentTimeSlotsID, true)

                        })
                    }
                    setRefreshScreen(!refreshScreen);

                } else {
                    gamesRef.current = [];
                    setRefreshScreen(!refreshScreen);
                }

            })
            .catch((err) => {
                alert.error('Error buscando Juegos...' + err.message)
                gamesRef.current = [];
            })
    }


    const filterGames = (e) => {
        const { value, name } = e.target;
        if (value.length < MIN_LENGTH_FOR_SEARCH_STRING) {
            alert.error(`Un minimo de ${MIN_LENGTH_FOR_SEARCH_STRING} caracteres son necesarios para la busqueda...`)
        }
        let myGames = gamesRef.current.map((game) => {
            game.MatchSearch = (game.Team1[0].Name.toUpperCase().includes(value.toUpperCase())) ||
                (game.Team1[1].Name.toUpperCase().includes(value.toUpperCase())) ||
                (game.Team2[0].Name.toUpperCase().includes(value.toUpperCase())) ||
                (game.Team2[1].Name.toUpperCase().includes(value.toUpperCase()));
            return game
        })
        gamesRef.current = myGames;
        setValues({ ...values, [name]: value });
    }

    const getData = () => {
        if (values.TournamentID && values.TournamentID.length > 0 && filterDateRef.current) {
            gamesRef.current = [];
            timeSlotsRef.current = [];
            courtsRef.current = [];
            GetTimeSlots();
        }
    }

    const GetTimeList = (court) => {
        return timeSlotsRef.current.filter((item) => item.CourtNumber === court)
    }

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

    const AssignGameToTimeSlot = (GameID, TimeSlotID, FromDB) => {
        const gameAlreadyExists = timeSlotsRef.current.find(item => item.game && item.game.ID === GameID);
        const TimeSlot = timeSlotsRef.current.find(item => item.ID === TimeSlotID);
        if (!TimeSlot) {
            return
        }

        if (gameAlreadyExists) {
            alert.info('Operación invalida...')
            return
        }

        if (TimeSlot.game && TimeSlot.game.ID.length > 0) {
            alert.info('Horario ocupado...')
            return
        }
        const sourceGame = gamesRef.current.find((item) => item.ID === GameID);

        if (!FromDB) {
            PostAssignGameToTimeSlot(values.TournamentID, GameID, TimeSlot.ID)

        }

        const newTimeSlots = timeSlotsRef.current.map((ts) => {
            if (ts.ID === TimeSlot.ID) {
                ts.game = sourceGame;
                return ts;
            }
            return ts;
        })

        timeSlotsRef.current = newTimeSlots;
        const newGames = gamesRef.current.map((game) => {
            if (game.ID === GameID) {
                game.scheduled = true
                game.TournamentTimeSlotsID = TimeSlot.ID;
                return game
            }
            return game
        })

        gamesRef.current = newGames;
        setRefreshScreen(!refreshScreen);

    }


    const onDrop = (evt, target) => {
        const GameID = evt.dataTransfer.getData('itemID');
        const GameDropped = gamesRef.current.find((game) => game.ID === GameID);
        if (!GameDropped) {
            alert('Error al seleccionar juego');
            return
        }

        const TimeSlot = timeSlotsRef.current.find(item => item.ID === target);

        let Pareja1Found = false
        let Pareja2Found = false
        const TeamPlayingAtTheSameTime = timeSlotsRef.current.find((timeSlot) => {
            if (timeSlot.StartTime === TimeSlot.StartTime && timeSlot.game) {
                Pareja1Found =
                    timeSlot.game.Team1[0].ID === GameDropped.Team1[0].ID ||
                    timeSlot.game.Team1[1].ID === GameDropped.Team1[0].ID ||
                    timeSlot.game.Team2[0].ID === GameDropped.Team1[0].ID ||
                    timeSlot.game.Team2[1].ID === GameDropped.Team1[0].ID;

                Pareja2Found =
                    timeSlot.game.Team1[0].ID === GameDropped.Team2[0].ID ||
                    timeSlot.game.Team1[1].ID === GameDropped.Team2[0].ID ||
                    timeSlot.game.Team2[0].ID === GameDropped.Team2[0].ID ||
                    timeSlot.game.Team2[1].ID === GameDropped.Team2[0].ID;

                if (Pareja1Found) {
                    console.log('Equipo 1 encontrado');
                }
                if (Pareja2Found) {
                    console.log('firstPareja 2 Encontrada ....');
                }
            }

            return (
                timeSlot.StartTime === TimeSlot.StartTime
                && timeSlot.game
                && (Pareja1Found || Pareja2Found)
            )
        })
        if (TeamPlayingAtTheSameTime) {
            if (Pareja1Found) {
                alert.error(`La pareja ${GameDropped.Team1[0].Name} / ${GameDropped.Team1[1].Name} tiene calendarizado un partido a esta hora...`)
            }
            if (Pareja2Found) {
                alert.error(`La pareja ${GameDropped.Team2[0].Name} / ${GameDropped.Team2[1].Name} tiene calendarizado un partido a esta hora...`)
            }
            return
        }
        AssignGameToTimeSlot(GameID, TimeSlot.ID, false);
    }


    const DeleteAssignGameToTimeSlot = (TournamentID, GameID, TimeSlotID) => {
        let payload = {
            "TournamentID": TournamentID,
            "GameID": GameID,
            "TimeSlotID": TimeSlotID
        }

        axios.delete('/v1/tournament/deleteassigngamestotimeslots', { data: payload })
            .then((response) => {
                alert.success("Asignación eliminada exitosamente...");
                setRefreshScreen(!refreshScreen);

            })
            .catch((err) => {
                alert.error("Error durante la remoción de la asignación" + err.message);
            })
    }


    const removeFromSchedule = (item) => {
        if (!item.game) {
            return
        }

        const gameToRemove = gamesRef.current.find(i => i.ID === item.game.ID);
        if (gameToRemove.GameResultsID !== '00000000-0000-0000-0000-000000000000') {
            // Partido tiene resultados no deberia de poderse borrar
            alert.error('Partido ya ha sido jugado no puede quitarse del calendario...');
            return
        }

        const newGames = gamesRef.current.map((game) => {
            if (game.ID === gameToRemove.ID) {
                game.TournamentTimeSlotsID = '00000000-0000-0000-0000-000000000000'
                game.scheduled = false;
                return game;
            }
            return game
        })
        gamesRef.current = newGames;

        const newTimeSlots = timeSlotsRef.current.map((item) => {
            if (item.game && item.game.ID === gameToRemove.ID) {
                delete item.game
                return item;
            }
            return item;
        })

        timeSlotsRef.current = newTimeSlots;
        DeleteAssignGameToTimeSlot(values.TournamentID, gameToRemove.ID, item.ID)

    }

    const FormatDate = (myDate) => {
        //   return `${myDate.$D}-${myDate.$M + 1}-${myDate.$y}`
        //   let d = new Date(myDate);
        return `${myDate.getMonth() + 1}-${myDate.getDate()}`
    }

    const renderGames = (row, visibleInGameList) => {
        if (visibleInGameList && values.SearchStr.length >= MIN_LENGTH_FOR_SEARCH_STRING) {
            if (!row.MatchSearch) {
                return
            }
        }
        return (
            <Grid item textAlign={'center'} xs={12}>
                <Paper key={`t-${row.ID}`}  >
                    <Box draggable onDragStart={(evt) => startDrag(evt, row)} minHeight={'135px'}  >
                        <Box backgroundColor={row.CategoryColor}>
                            <Typography variant={'caption'}  >{row.CategoryDescription}-G{row.GroupNumber}</Typography>
                        </Box>
                        <Typography variant={'subtitle2'} style={{ color: 'black' }} >{row.Team1[0].Name} / {row.Team1[1].Name}</Typography>
                        <Typography variant={'caption'} >vs</Typography>
                        <Typography variant={'subtitle2'} style={{ color: 'steelblue' }}>{row.Team2[0].Name} / {row.Team2[1].Name}</Typography>
                        {row.TournamentTimeSlotsID
                            && row.TournamentTimeSlotsID !== '00000000-0000-0000-0000-000000000000'
                            && row.GameResultsID
                            && row.GameResultsID === '00000000-0000-0000-0000-000000000000'
                            && (
                                <Typography paddingTop={1} variant={'caption'} onClick={() => CaptureResultOpen(row)}>Resultados</Typography>
                            )}
                        {row.TournamentTimeSlotsID
                            && row.TournamentTimeSlotsID !== '00000000-0000-0000-0000-000000000000'
                            && row.GameResultsID
                            && row.GameResultsID !== '00000000-0000-0000-0000-000000000000'
                            && (
                                <Typography paddingTop={1} variant={'caption'} >{`${row.Team1Set1}/${row.Team2Set1} , ${row.Team1Set2}/${row.Team2Set2} , ${row.Team1Set3}/${row.Team2Set3}`}</Typography>
                            )}

                    </Box>
                </Paper>
            </Grid>
        )
    }

    const renderTimeSlots = (court) => {
        return (
            <Grid item xs={12 / numberOfCourts.current} key={`A=-${court}`}>
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
                                            renderGames(item.game, false)
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

    const GetDateChips = (TournamentID) => {
        const myURL = `/v1/catalogs/tournament?TournamentID=${TournamentID}`;
        axios.get(myURL)
            .then((response) => {
                const myDates = [];
                let currentDate = new Date(response.data.data.StartDate)
                let lastDate = new Date(response.data.data.EndDate)
                let mycd = currentDate;
                while (mycd < lastDate) {
                    myDates.push(mycd)
                    let ms = mycd.getTime() + 86400000;
                    mycd = new Date(ms);
                }
                tournamentDaysRef.current = myDates
                setRefreshScreen(!refreshScreen);
            })
            .catch((err) => {
                return (
                    alert.error("Tournament Days missing")
                )
            })
    }

    const handleUpdate = (e) => {
        // setHasChanges(true);
        const { name, value } = e.target;
        if (name && value) {
            setValues({ ...values, [name]: value });
            if (name === 'TournamentID' && value !== '') {
                // create date chips
                GetDateChips(value);
            }
        }
    };


    const handleDateUpdate = (newValue, name) => {
        // setHasChanges(true);
        if (name && newValue) {
            //  setValues({ ...values, [name]: dayjs(newValue) });
            let d = dayjs(newValue.toDateString());
            filterDateRef.current = d
            getData();
        }
    };


    const CaptureResultOpen = (row) => {
        currentRow.current = row;
        setCaptureResultOpen(true);
    }

    const handleClose = () => {
        setCaptureResultOpen(false);
    }
    console.log("==========================================")
    console.log("Games totales : ", gamesRef.current.length)
    console.log("Games asignados : ", gamesRef.current.filter(games => games.TournamentTimeSlotsID !== '00000000-0000-0000-0000-000000000000').length)
    console.log("Games sin Asignar : ", gamesRef.current.filter(games => games.TournamentTimeSlotsID === '00000000-0000-0000-0000-000000000000').length)
    console.log("TimeSlots : ", timeSlotsRef.current.length)
    console.log("GameResults : ", timeSlotsRef.current.filter(games => games.GameResultsID !== '00000000-0000-0000-0000-000000000000').length)
    console.log("TournamentsDay : ", tournamentDaysRef.current.length)

    const drawSelectors = () => {
        return (
            <>
                <Grid item xs={4} display={'flex'} >
                    <SelectTournaments
                        name='TournamentID'
                        value={values.TournamentID}
                        label="Torneo"
                        handleupdate={handleUpdate} />
                </Grid>
                <Grid item xs={6} display={'flex'} >
                    <Stack direction="row" spacing={1}>      {
                        tournamentDaysRef.current.map((mydate) => <Chip color={'primary'} label={FormatDate(mydate)} onClick={() => handleDateUpdate(mydate, 'FilterDate')} />)
                    }
                    </Stack>
                </Grid>
                <Grid item xs={2} display={'flex'} justifyContent={'end'}>

                    <Button variant='contained' color={'error'} onClick={getData}>Buscar</Button>
                </Grid>

                <Grid item xs={2}>
                    <Paper  > <Typography variant={'subtitle1'} textAlign={'center'} color={'GrayText'} >Juegos no calendarizados</Typography></Paper>

                </Grid>

                <Grid item xs={10}>
                    <Paper  > <Typography variant='subtitle1' textAlign={'center'} color={'GrayText'}   >{filterDateRef.current ? filterDateRef.current.toJSON().substring(0, 10) : 'Sin Resultados...'}</Typography></Paper>

                </Grid>
            </>
        )
    }

    const drawGameList = () => {
        return (
            <>
                <Grid item xs={2} >
                    <TextField
                        size='small'
                        fullWidth
                        sx={{ paddingBottom: '5px' }}
                        label='Buscar'
                        name='SearchStr'

                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconSearch />
                                </InputAdornment>
                            )
                        }}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                //e.preventDefault();
                                filterGames(e)
                            }
                        }}
                    />
                    <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 155px)', overflowX: 'hidden' }}>
                        <Grid container spacing={1}>
                            {gamesRef.current && gamesRef.current.length > 0 && (
                                <>
                                    {gamesRef.current.filter(games => games.TournamentTimeSlotsID === '00000000-0000-0000-0000-000000000000').map((item) => renderGames(item, true))}
                                </>
                            )}
                        </Grid>
                    </PerfectScrollbar>
                </Grid>
            </>
        )
    }

    const DrawEmptyItem = (counter, row) => {
        let results = [];
        for (let i = 0; i < counter; i++) {
            results.push(<Grid item xs={2} >&nbsp;</Grid>)
        }
        return results
    }


    const draw4Brackets = () => {
        return (
            <>
                <Box>
                    <Grid container padding={3} >
                        {/* ============ Game 1 =============*/}
                        <Grid item xs={2} className="BoxTop" id='G1T1'>
                            <Typography variant={'subtitle2'} >
                                Game1 Team1
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className="BoxTop">
                            <Typography variant={'subtitle2'}>
                                Game1 Team1 
                            </Typography>
                        </Grid>
                        {DrawEmptyItem(4, 1)}

                        <Grid item xs={2} id='G1T2'>
                            <Typography variant={'subtitle2'}>
                                Game2 Team2
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className='RightLine'>
                            <Typography variant={'subtitle2'}>
                                &nbsp;
                            </Typography>
                        </Grid>
                        {DrawEmptyItem(4, 2)}

                        {DrawEmptyItem(1, 3)}
                        <Grid item xs={2} className='RightLine'>
                            <Typography variant={'subtitle2'}>

                            </Typography>
                        </Grid>
                        <Grid item xs={2} id='G13T1'>
                            <Typography variant={'subtitle2'}>
                                Game 13 Team1
                            </Typography>
                        </Grid>
                        {DrawEmptyItem(3, 3)}


                        {/* ============ Game 2 =============*/}
                        <Grid item xs={2} className="BoxTop" id='G2T1'>
                            <Typography variant={'subtitle2'}>
                                Game 2 Team 1
                            </Typography>
                        </Grid>

                        <Grid item xs={2} className='BottomLine RightLine'>
                            <Typography variant={'subtitle2'}>
                                &nbsp;
                            </Typography>
                        </Grid>

                        <Grid item xs={2} className='TopLine RightLine'>
                            &nbsp;
                        </Grid>
                        {DrawEmptyItem(3, 4)}


                        <Grid item xs={2} className="BoxBottom" id='G2T2'>
                            <Typography variant={'subtitle2'}>
                                Game 2 Team 2
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className="BoxBottom">
                            <Typography variant={'subtitle2'}>
                                Game 9 Team 2
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className="RightLine">
                            <Typography variant={'subtitle2'}>
                            </Typography>
                        </Grid>
                        {DrawEmptyItem(3, 5)}


                        {DrawEmptyItem(2, 50)}
                        <Grid item xs={2} className="RightLine">
                            <Typography variant={'subtitle2'}>
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className="BottomLine">
                            <Typography variant={'subtitle2'}>
                                Game 15 Team 1
                            </Typography>
                        </Grid>
                        {DrawEmptyItem(2, 50)}

                        {/* ============ Game 3 =============*/}
                        <Grid item xs={2} className="BoxTop">
                            <Typography variant={'subtitle2'}>
                                Game 3 Team 1
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className="BoxTop">
                            <Typography variant={'subtitle2'}>
                                Game 10 Team 1
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className="RightLine">
                            <Typography variant={'subtitle2'}>
                                &nbsp;
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className='RightLine'>
                            <Typography variant={'subtitle2'}>
                                &nbsp;
                            </Typography>
                        </Grid>
                        {DrawEmptyItem(2, 6)}

                        <Grid item xs={2} >
                            <Typography variant={'subtitle2'}>
                                Game 3 Team 2
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className='RightLine' >
                            <Typography variant={'subtitle2'}>
                                &nbsp;
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className='RightLine'>
                            <Typography variant={'subtitle2'}>
                                &nbsp;
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className='RightLine'>
                            <Typography variant={'subtitle2'}>
                                &nbsp;
                            </Typography>
                        </Grid>
                        {DrawEmptyItem(2, 7)}


                        {DrawEmptyItem(1, 8)}
                        <Grid item xs={2} className='RightLine'>
                            <Typography variant={'subtitle2'}>

                            </Typography>
                        </Grid>
                        <Grid item xs={2} className='RightLine'>
                            <Typography variant={'subtitle2'}>
                                &nbsp;
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className='RightLine'>
                            <Typography variant={'subtitle2'}>

                            </Typography>
                        </Grid>
                        {DrawEmptyItem(2, 9)}


                        {/* ============ Game 4 =============*/}
                        <Grid item xs={2} className="BoxTop">
                            <Typography variant={'subtitle2'}>
                                Game 4 Team 1
                            </Typography>
                        </Grid>

                        <Grid item xs={2} className='BottomLine RightLine'>
                            &nbsp;
                        </Grid>

                        <Grid item xs={2} className='TopLine '>
                            <Typography variant={'subtitle2'}>
                                Game 13 Team 2
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className='RightLine'>
                            <Typography variant={'subtitle2'}>
                                &nbsp;
                            </Typography>
                        </Grid>
                        {DrawEmptyItem(2, 10)}

                        <Grid item xs={2} >
                            <Typography variant={'subtitle2'}>
                                Game 4 Team 2
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className="BoxBottom">
                            <Typography variant={'subtitle2'}>
                                Game 10 Team 2
                            </Typography>
                        </Grid>
                        <Grid item xs={2} >
                            <Typography variant={'subtitle2'}>
                                &nbsp;
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className='RightLine'>
                            <Typography variant={'subtitle2'}>
                                &nbsp;
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className='BoxBottom'>
                            <Typography variant={'subtitle2'}>
                                &nbsp;
                            </Typography>
                        </Grid>

                        <Grid item xs={2} >
                            <Typography variant={'subtitle2'}>
                                &nbsp;
                            </Typography>
                        </Grid>
                        {DrawEmptyItem(3, 10)}
                        <Grid item xs={2} className='RightLine'>
                            <Typography variant={'subtitle2'}>
                                &nbsp;
                            </Typography>
                        </Grid>
                        {DrawEmptyItem(2, 10)}

                        {DrawEmptyItem(3, 10)}
                        <Grid item xs={2} className='RightLine'>
                            <Typography variant={'subtitle2'}>
                                &nbsp;
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className='BottomLine'>
                            <Typography variant={'subtitle2'}>
                                &nbsp;Game 16 Team 1
                            </Typography>
                        </Grid>
                        {DrawEmptyItem(1, 10)}


                        {/* ============ Game 5 =============*/}
                        <Grid item xs={2} className="BoxTop">
                            <Typography variant={'subtitle2'}>
                                Game 5 Team 1
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className="BoxTop">
                            <Typography variant={'subtitle2'}>
                                Game 11 Team 1
                            </Typography>
                        </Grid>
                        {DrawEmptyItem(1, 1)}
                        <Grid item xs={2} className='RightLine'>
                            <Typography variant={'subtitle2'}>
                                &nbsp;
                            </Typography>
                        </Grid>
                        <Grid item xs={2} >
                            <Typography variant={'subtitle2'}>
                                Game 16 Team 2
                            </Typography>
                        </Grid>
                        {DrawEmptyItem(1, 1)}

                        <Grid item xs={2} >
                            <Typography variant={'subtitle2'}>
                                Game 5 Team 2
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className='RightLine'>
                            <Typography variant={'subtitle2'}>
                                &nbsp;
                            </Typography>
                        </Grid>
                        {DrawEmptyItem(1, 2)}
                        <Grid item xs={2} className='RightLine'>
                            <Typography variant={'subtitle2'}>
                                &nbsp;
                            </Typography>
                        </Grid>
                        {DrawEmptyItem(2, 2)}

                        {DrawEmptyItem(1, 3)}
                        <Grid item xs={2} className='RightLine'>
                            <Typography variant={'subtitle2'}>

                            </Typography>
                        </Grid>
                        <Grid item xs={2} >
                            <Typography variant={'subtitle2'}>
                                Game 14 Team 1
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className='RightLine'>
                            <Typography variant={'subtitle2'}>
                                &nbsp;
                            </Typography>
                        </Grid>
                        {DrawEmptyItem(2, 3)}


                        {/* ============ Game 6 =============*/}
                        <Grid item xs={2} className="BoxTop">
                            <Typography variant={'subtitle2'}>
                                Game 6 Team 1
                            </Typography>
                        </Grid>

                        <Grid item xs={2} className='BottomLine RightLine'>
                            <Typography variant={'subtitle2'}>
                                &nbsp;
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className='TopLine RightLine'>
                            &nbsp;
                        </Grid>
                        <Grid item xs={2} className='TopLine'>
                            <Typography variant={'subtitle2'}>
                                Game 15 Team 2
                            </Typography>
                        </Grid>
                        {DrawEmptyItem(2, 4)}


                        <Grid item xs={2} className="BoxBottom">
                            <Typography variant={'subtitle2'}>
                                Game 6 Team 2
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className="BoxBottom">
                            <Typography variant={'subtitle2'}>
                                Game 11 Team 2
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className="RightLine">
                            <Typography variant={'subtitle2'}>
                            </Typography>
                        </Grid>
                        <Grid item xs={2} >
                            &nbsp;
                        </Grid>
                        {DrawEmptyItem(2, 5)}


                        {DrawEmptyItem(2, 50)}
                        <Grid item xs={2} className="RightLine">
                            <Typography variant={'subtitle2'}>

                            </Typography>
                        </Grid>
                        <Grid item xs={2} >
                            <Typography variant={'subtitle2'}>

                            </Typography>
                        </Grid>
                        {DrawEmptyItem(2, 50)}

                        {/* ============ Game 7 =============*/}
                        <Grid item xs={2} className="BoxTop">
                            <Typography variant={'subtitle2'}>
                                Game 7 Team 1
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className="BoxTop">
                            <Typography variant={'subtitle2'}>
                                Game 12 Team 1
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className="RightLine">
                            <Typography variant={'subtitle2'}>
                                &nbsp;
                            </Typography>
                        </Grid>
                        <Grid item xs={2} >
                            <Typography variant={'subtitle2'}>
                                &nbsp;
                            </Typography>
                        </Grid>
                        {DrawEmptyItem(2, 50)}

                        <Grid item xs={2} >
                            <Typography variant={'subtitle2'}>
                                Game 7 Team 2
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className='RightLine' >
                            <Typography variant={'subtitle2'}>
                                &nbsp;
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className='RightLine'>
                            <Typography variant={'subtitle2'}>
                                &nbsp;
                            </Typography>
                        </Grid>
                        <Grid item xs={2} >
                            <Typography variant={'subtitle2'}>
                                &nbsp;
                            </Typography>
                        </Grid>
                        {DrawEmptyItem(2, 50)}


                        {DrawEmptyItem(1, 8)}
                        <Grid item xs={2} className='RightLine'>
                            <Typography variant={'subtitle2'}>

                            </Typography>
                        </Grid>
                        <Grid item xs={2} className='RightLine'>
                            <Typography variant={'subtitle2'}>
                                &nbsp;
                            </Typography>
                        </Grid>
                        <Grid item xs={2} >
                            <Typography variant={'subtitle2'}>

                            </Typography>
                        </Grid>
                        {DrawEmptyItem(2, 50)}


                        {/* ============ Game 8 =============*/}
                        <Grid item xs={2} className="BoxTop">
                            <Typography variant={'subtitle2'}>
                                Game 8 Team 1
                            </Typography>
                        </Grid>

                        <Grid item xs={2} className='BottomLine RightLine'>
                            &nbsp;
                        </Grid>

                        <Grid item xs={2} className='TopLine '>
                            <Typography variant={'subtitle2'}>
                                Game 14 Team 2
                            </Typography>
                        </Grid>
                        <Grid item xs={2} >
                            <Typography variant={'subtitle2'}>
                                &nbsp;
                            </Typography>
                        </Grid>
                        {DrawEmptyItem(2, 50)}

                        <Grid item xs={2} >
                            <Typography variant={'subtitle2'}>
                                Game 8 Team 2
                            </Typography>
                        </Grid>

                        <Grid item xs={2} className="BoxBottom">
                            <Typography variant={'subtitle2'}>
                                Game 12 Team 2
                            </Typography>
                        </Grid>
                        {DrawEmptyItem(1, 10)}
                        <Grid item xs={2} >
                            <Typography variant={'subtitle2'}>
                                &nbsp;
                            </Typography>
                        </Grid>
                        {DrawEmptyItem(2, 50)}

                    </Grid>
                </Box>
            </>
        )
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box >
                <Grid container spacing={1} >
                    {drawSelectors()}
                    {drawGameList()}
                    {/* La busqueda solo deberia de ocultar los juegos que no hagan match con la busqueda */}

                    <Grid item xs={10} >
                        <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 155px)', overflowX: 'hidden' }}>
                            {draw4Brackets()}
                        </PerfectScrollbar>
                    </Grid>
                </Grid>
            </Box>


        </LocalizationProvider>
    )
}

export default DrawCuartos;