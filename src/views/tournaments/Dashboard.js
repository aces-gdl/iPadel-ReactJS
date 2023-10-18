/* eslint-disable react-hooks/exhaustive-deps */
import { Button, FormControl, Grid, Input, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import MainCard from 'ui-component/cards/MainCard'
import { styled } from '@mui/material/styles';
import { useAlert } from 'react-alert';
import axios from 'axios';
import SubCard from 'ui-component/cards/SubCard';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CreateTournament from './CreateTournament';
import { useNavigate } from "react-router-dom";
import TimeSlots from './TimeSlots';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.h1,
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Dashboard = () => {
    const alert = useAlert();
    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = React.useState(null);
    const [values, setValues] = React.useState(
        {
            category: '',
            permission: '',
            tournament: '',
            clubs: '',
            tournamentDescription: '',
            hostClubID: '',
            gameDuration: '60',
            roundRobinCourts: '4'
        }
    )
    const [categories, setCategories] = React.useState([]);
    const [permissions, setPermissions] = React.useState([]);
    const [tournaments, setTournaments] = React.useState([]);
    const [clubs, setClubs] = React.useState([]);


    const SimularInscipciones = () => {

        let payload = {
            "CategoryID": values.category,
            "TournamentID": values.tournament,
            "UserCount": values.userCount

        }
        axios.post('/v1/tournament/simulateenrollment', payload)
            .then((response) => {
                alert.success("Inscripcion completa")
            })
            .catch((error) => {
                alert.error("Error durante la inscripcione")
            })
    }

    const CrearGrupos = () => {
        let payload = {
            "CategoryID": values.category,
            "TournamentID": values.tournament
        }
        axios.post('/v1/tournament/creategroups', payload)
            .then((response) => {
                alert.success("Inscripcion completa")
            })
            .catch((error) => {
                alert.error("Error durante la inscripcione")
            })
    }

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0])
    };


    const onFileUpload = () => {
        const formData = new FormData();
        formData.append(
            "file",
            selectedFile,
            selectedFile.name
        );
        formData.append("CategoryID", values.category)
        formData.append("PermissionID", values.permission)
        axios.post("/v1/utility/loadusers", formData)
            .then((response) => {
                alert.success('Usuarios cargados correctamente')
            })
            .catch((err) => {
                alert.error('Error cargando usuarios' + err)

            })
    };


    const loadData = () => {
        let myPromises = [
            axios.get('/v1/catalogs/categories?limit=-1'),
            axios.get('/v1/catalogs/permissions?limit=-1'),
            axios.get('/v1/catalogs/tournaments?limit=-1'),
            axios.get('/v1/catalogs/clubs?page=-1')

        ]
        Promise.all(myPromises)
            .then((responses) => {
                setCategories(responses[0].data.data);
                setPermissions(responses[1].data.data);
                setTournaments(responses[2].data.data);
                setClubs(responses[3].data.data);
            })
            .catch((err) => {
                alert.error('Error leyendo catalogos')
                if (err.response.status === 401) {
                    navigate('/pages/login/login3')
                }
            })
    }

    useEffect(() => {
        loadData()
    }, [])


    const handleUpdate = (e) => {
        // setHasChanges(true);
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };



    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MainCard title="TORNEOS">
                <Paper>
                    <Grid container xs={12} spacing={2}  >
                        <Grid item xs={6} >
                            <Item>
                                <SubCard title="Carga de Usuarios">
                                    <Grid container xs={12} spacing={2} >
                                        <Grid item xs={12}>
                                            <FormControl fullWidth>
                                                <InputLabel id="Permission">Permisos</InputLabel>
                                                <Select
                                                    labelId="{PermissionL}"
                                                    id="PersmissionL"
                                                    name="permission"
                                                    value={values.permission}
                                                    label="Permisos"
                                                    onChange={handleUpdate}
                                                >
                                                    {permissions.map((row) =>
                                                        <MenuItem value={row.ID}>{row.Description}</MenuItem>
                                                    )}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl fullWidth>
                                                <InputLabel id="Category">Categoria</InputLabel>
                                                <Select
                                                    labelId="Categoryl"
                                                    id="CategoryL"
                                                    name="category"
                                                    value={values.category}
                                                    label="Category"
                                                    onChange={handleUpdate}
                                                >
                                                    {categories.map((row) =>
                                                        <MenuItem value={row.ID}>{row.Description}</MenuItem>
                                                    )}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>

                                            <Input type="file" onChange={onFileChange} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button onClick={onFileUpload}>
                                                Crear Usuarios!
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </Item>
                        </Grid>
                        <Grid item xs={6}>
                            {clubs && clubs.length > 0 &&
                                <CreateTournament clubs={clubs} />
                            }
                        </Grid>
                        <Grid item xs={6}>
                            <Item>
                                <SubCard title="Simular inscripciones" >

                                    <FormControl fullWidth>
                                        <InputLabel id="Tournament">Torneo</InputLabel>
                                        <Select
                                            labelId="Tournamentl"
                                            id="TournamentL"
                                            name="tournament"
                                            value={values.tournament}
                                            label="Torneo"
                                            onChange={handleUpdate}
                                        >
                                            {tournaments.map((row) =>
                                                <MenuItem value={row.ID}>{row.Description}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <InputLabel id="Category">Categoria</InputLabel>
                                        <Select
                                            labelId="Categoryl"
                                            id="CategoryL"
                                            name="category"
                                            value={values.category}
                                            label="Category"
                                            onChange={handleUpdate}
                                        >
                                            {categories.map((row) =>
                                                <MenuItem value={row.ID}>{row.Description}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <TextField

                                            fullWidth
                                            id="UserCount"
                                            label="Cantidad de usuarios"
                                            name="userCount"
                                            value={values.UserCount}
                                            onChange={handleUpdate}

                                        />
                                    </FormControl>

                                    <Button onClick={SimularInscipciones}>1.- Simular inscripciones</Button>
                                </SubCard>

                            </Item>
                        </Grid>
                        <Grid item xs={6}>

                            <Item>
                                <SubCard title="Crear Grupos" >
                                    <FormControl fullWidth>
                                        <InputLabel id="Tournament">Torneo</InputLabel>
                                        <Select
                                            labelId="Tournamentl"
                                            id="TournamentL"
                                            name="tournament"
                                            value={values.tournament}
                                            label="Torneo"
                                            onChange={handleUpdate}
                                        >
                                            {tournaments.map((row) =>
                                                <MenuItem value={row.ID}>{row.Description}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <InputLabel id="Category">Categoria</InputLabel>
                                        <Select
                                            labelId="Categoryl"
                                            id="CategoryL"
                                            name="category"
                                            value={values.category}
                                            label="Category"
                                            onChange={handleUpdate}
                                        >
                                            {categories.map((row) =>
                                                <MenuItem value={row.ID}>{row.Description}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>

                                    <Button onClick={CrearGrupos}>2.- Crear Grupos</Button>
                                </SubCard>

                            </Item>
                        </Grid>
                        <Grid item xs={12} >
                            <Item>
                                <TimeSlots categories={categories} />
                            </Item>
                        </Grid>

                    </Grid>

                </Paper>
            </MainCard>
        </LocalizationProvider>

    )
}

export default Dashboard