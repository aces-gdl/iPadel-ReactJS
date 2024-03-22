import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';
import { useAlert } from 'react-alert';
import axios from 'axios';
import SubCard from 'ui-component/cards/SubCard';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import SelectClubs from 'components/SelectClubs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.h1,
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const CreateTournament = (props) => {
    const alert = useAlert();
    const sixAM = dayjs().set('hour', 6).startOf('hour');

    const [values, setValues] = React.useState(
        {
            CategoryID: '',
            PermissionID: '',
            TournamentID: '',
            clubs: '',
            tournamentDescription: '',
            ClubID: '',
            gameDuration: '60',
            roundRobinCourts: '4',
            playOffCourts: '4',
            roundRobinDays: '3',
            playOffDays: '2',
            startTime: sixAM,
            EndTime: sixAM
        }
    )



    const CrearTorneo = () => {


        const ParseDate = (myDate) => {
            let month = myDate.$M < 10 ? `0${myDate.$M}` : `${myDate.$M}`;
            let day = myDate.$D < 10 ? `0${myDate.$D}` : `${myDate.$D}`;

            return `${myDate.$y}-${month}-${day}`
        }


        let startDate = ParseDate(values.startDate);
        let endDate = ParseDate(values.endDate);


        let payload = {
            "Description": values.tournamentDescription,
            "StartDate": startDate,
            "EndDate": endDate,
            "StartTime": `${values.startTime.$H}:${values.startTime.$m}`,
            "EndTime": `${values.endTime.$H}:${values.endTime.$m}`,
            "HostClubID": values.ClubID,
            "GameDuration": values.gameDuration,
            "RoundRobinDays": values.roundRobinDays,
            "PlayOffDays": values.playOffDays,
            "RoundRobinCourts": values.roundRobinCourts,
            "PlayOffCourts": values.playOffCourts,
            "Active": true
        }
        axios.post('/v1/catalogs/tournaments', payload)
            .then((response) => {
                alert.success("Torneo creado")
            })
            .catch((error) => {
                alert.error("Error durante la creacion del torneo: ", error)
            })
    }

    const handleUpdate = (e) => {
        // setHasChanges(true);
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleDateUpdate = (newValue, name) => {
        // setHasChanges(true);
        if (name && newValue) {
            setValues({ ...values, [name]: newValue });
        }
    };


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid item xs={12}>{/*  Crear Torneo */}
            <Item>
                <SubCard title="Crear Torneo">
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Descripción"
                                name="tournamentDescription"
                                value={values.tournamentDescription}
                                onChange={handleUpdate}

                            />
                        </Grid>
                        <Grid item xs={12}>
                         <SelectClubs 
                            name='ClubID'
                            value={values.ClubID}
                            label="Club Sede"
                            handleupdate={handleUpdate} 
                         />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <DatePicker
                                    label="Fecha de inicio"
                                    name="startDate"
                                    value={values.startDate}
                                    onChange={(newValue) => handleDateUpdate(newValue, "startDate")}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <DatePicker
                                    label="Fecha final"
                                    name="endDate"
                                    value={values.endDate}
                                    onChange={(newValue) => handleDateUpdate(newValue, "endDate")}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <TimePicker
                                    minTime={sixAM}
                                    defaultValue={sixAM}
                                    label="Hora de inicio"
                                    name="startTime"
                                    value={values.startTime}
                                    onChange={(newValue) => handleDateUpdate(newValue, "startTime")}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <TimePicker
                                    defaultValue={sixAM}
                                    minTime={sixAM}
                                    name="endTime"
                                    value={values.endTime}
                                    onChange={(newValue) => handleDateUpdate(newValue, "endTime")}
                                    label="Hora de termino"

                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Canchas disponibles por Grupos "
                                name="roundRobinCourts"
                                value={values.roundRobinCourts}
                                onChange={handleUpdate}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Canchas disponibles Eliminatorias"
                                name="playOffCourts"
                                value={values.playOffCourts}
                                onChange={handleUpdate}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Dias disponibles por Grupos "
                                name="roundRobinDays"
                                value={values.roundRobinDays}
                                onChange={handleUpdate}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Dias disponibles Eliminatorias"
                                name="playOffDays"
                                value={values.playOffDays}
                                onChange={handleUpdate}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Duración de los juegos"
                                name="gameDuration"
                                value={values.gameDuration}
                                onChange={handleUpdate}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={() => CrearTorneo()} variant='outlined'>
                                Crear Torneo!
                            </Button>
                        </Grid>
                    </Grid>
                </SubCard>
            </Item>
        </Grid>

        </LocalizationProvider>
    )
}

export default CreateTournament