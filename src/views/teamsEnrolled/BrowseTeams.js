import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Button, Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { IconEdit, IconEye } from '@tabler/icons';
import SelectTournaments from 'components/SelectTournament';
import SelectCategories from 'components/SelectCategories';
import { Box } from '@mui/system';
import LoadImageFromURL from 'components/LoadImageFromURL';

const columns = [
    { id: 'Name', label: 'Equipo', minWidth: 50 },
    { id: 'Name1', label: 'Jugador A', minWidth: 100 },
    { id: 'Ranking1', label: 'Puntos A', minWidth: 50 },
    { id: 'Name2', label: 'Jugador B', minWidth: 100 },
    { id: 'Ranking2', label: 'PuntosB', minWidth: 50 },
    { id: 'actions', label: 'Acciones', minWidth: 30, FormatDisplay: 'actions', align: 'center' }
];


const BrowseTeams = () => {

    const [rows, setRows] = React.useState([]);
    const [values, setValues] = React.useState(
        {
            CategoryID: '',
            TournamentID: ''
        }
    )
    const [categories, setCategories] = React.useState([]);
    const [tournaments, setTournaments] = React.useState([]);

    const loadGroupData = (newPage) => {
        if (values.TournamentID && values.CategoryID && values.TournamentID.length > 0 && values.CategoryID.length > 0) {


            let URL = `/v1/tournament/enrolledteams?page=-1&CategoryID=${values.CategoryID}&TournamentID=${values.TournamentID}`
            axios.get(URL)
                .then((response) => {
                    setRows(response.data.data)
                })
                .catch((error) => {
                    console.log("Error:", error)
                })
        }
    }

    const handleUpdate = (e) => {
        // setHasChanges(true);
        const { name, value } = e.target;
        if (name && value) {
            setValues({ ...values, [name]: value });
        }
    };


    const formatDataValue = (definition, value) => {
        let result = '';
        switch (definition.FormatDisplay) {
            case 'Text':
                result = value[definition.id];
                break;
            /*         case 'Check':
                       return value[definition.FieldName] === 1 ? (
                         <IconX name="simple-icon-check" />
                       ) : (
                         <IconX name="simple-icon-close" />
                       );
               
              */
            case 'Date':
                const myDate = new Date(value[definition.id]);
                result = myDate.toLocaleDateString();
                // TODO: dd-MMM-YYYY
                break;
            case 'DateTime':
                const myDateTime = new Date(value[definition.id]);
                result = `${myDateTime.toLocaleDateString()} ${myDateTime.toLocaleTimeString()}`;
                break;
            /*        case 'Image':
                        return (
                        
                            <LoadImageFromURL
                            id={`at-row-${value.ID || ''}`}
                            height="100"
                            picurl={`/rest/api/v4/system/general/image?max_age=5&target=${definition.Target}&id=${value[definition.FieldName]}`}
                            alt="blob"
                            />
                        
                        );
              */
            case 'number':
                return <Typography>{value[definition.id]}</Typography>;
            case 'actions':
                return (
                    <div className="d-flex justify-content-around align-items-center">
                        {/*    <IconX name="simple-icon-eye" onClick={() => onViewClick(value)} />{' '} */}
                        <IconEye onClick={() => { console.log("Open View") }} />
                        <IconEdit onClick={() => { console.log("Open Edit") }} />
                    </div>
                );

            default:
                result = value[definition.id];
                break;
        }
        return result;
    };

    const RenderCard = (row) => {

        return (
            <Grid item sm={12} md={6} lg={4} key={row.ID}>
                <Paper elevation={2}>
                    <Box padding={2}>
                        <Typography align='center' variant={'h4'}>{row.Name}</Typography>
                        <Divider />
                        <Box display={'flex'} flexDirection={'column'} paddingTop={2}>
                            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>

                                <LoadImageFromURL id={row.Member1ID} imageid={row.Member1ID } imagename={row.Name1} height='100px' thumbnail />
                                <Typography variant={'body1'}>{row.Name1}</Typography>
                                <Typography variant={'body1'}>{row.Ranking1}</Typography>
                            </Box>

                            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                <LoadImageFromURL id={row.ID} imageid={row.HasPicture >= 1 ? row.ID : '1'} imagename={row.Name} height='100px' thumbnail />

                                <Typography variant={'body1'}>{row.Name2}</Typography>
                                <Typography variant={'body1'}>{row.Ranking2}</Typography>
                            </Box>
                        </Box>

                    </Box>
                </Paper>

            </Grid>
        )
    }


    return (
        <div>
            <div class="table-responsive">
                <MainCard title="Despliegue de equipos inscritos">
                    <Grid container spacing={2}>
                        <Grid item sm={10} md={5}>
                            <SelectTournaments
                                name='TournamentID'
                                value={values.TournamentID}
                                label="Torneos"
                                handleupdate={handleUpdate} />

                        </Grid>
                        <Grid item sm={10} md={5} >
                            <SelectCategories
                                name='CategoryID'
                                value={values.CategoryID}
                                label="Category"
                                handleupdate={handleUpdate} />
                        </Grid>
                        <Grid item sm={2}>
                            <Button variant={'contained'} onClick={() => loadGroupData(1)}>Buscar Equipos</Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} paddingY={2}>
                        {rows.map((row) => RenderCard(row)
                        )}
                    </Grid>
                </MainCard>
            </div>
        </div >
    )
}

export default BrowseTeams
