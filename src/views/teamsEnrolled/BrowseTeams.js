import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { IconEdit, IconEye } from '@tabler/icons';

const columns = [
    { id: 'Name', label: 'Equipo', minWidth: 50 },
    { id: 'Name1', label: 'Jugador A', minWidth: 100 },
    { id: 'Ranking1', label: 'Puntos A', minWidth: 50 },
    { id: 'Name2', label: 'Jugador B', minWidth:100 },
    { id: 'Ranking2', label: 'PuntosB', minWidth: 50 },
    { id: 'actions', label:'Acciones', minWidth: 30, FormatDisplay:'actions', align:'center'}
];


const BrowseTeams = () => {

    const [rows, setRows] = React.useState([]);
    const [values, setValues] = React.useState(
        {
            categories: '',
            permission: '',
            tournament: ''
        }
    )
    const [categories, setCategories] = React.useState([]);
    const [tournaments, setTournaments] = React.useState([]);


    const loadData = () => {
        let myPromises = [
            axios.get('/v1/catalogs/categories?limit=-1'),
            axios.get('/v1/catalogs/tournaments?limit=-1'),
        ]
        Promise.all(myPromises)
            .then((responses) => {
                setCategories(responses[0].data.data);
                setTournaments(responses[1].data.data)
            })
            .catch((err) => {
                console.log('Error : ', err)
            })
    }
 
    const loadGroupData = (newPage) => {
        if (values.tournament  && values.category && values.tournament.length > 0 && values.category.length >0 ){

        
        let URL = `/v1/tournament/enrolledteams?page=${newPage}&CategoryID=${values.category}&TournamentID=${values.tournament}`
        axios.get(URL)
            .then((response) => {
                setRows(response.data.data)
            })
            .catch((error) => {
                console.log("Error:", error)
            })
        }
    }


    useEffect(() => {
        loadData()
    }, [])

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
                <IconEye onClick={() => {console.log("Open View")}}/>
                <IconEdit onClick={() => {console.log("Open Edit")}}/>
              </div>
            );
    
          default:
            result = value[definition.id];
            break;
        }
        return result;
      };
    

    return (
        <div>
            <div class="table-responsive">
                <MainCard title="Despliegue de equipos inscritos">
                    <Grid container xs={12} spacing={2}>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="TournamentL">Torneo</InputLabel>
                                <Select
                                    id="Torurnament"
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
                        </Grid>
                        <Grid item xs={6}>
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
                        <Grid>
                            <Button onClick={()=>loadGroupData(1)}>Buscar Equipos</Button>
                        </Grid>
                    </Grid>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: '85%' }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.ID}>
                                                {columns.map((column) => {
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                          {formatDataValue(column,row)}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
              
                </Paper>
                </MainCard>
            </div>
        </div>
    )
}

export default BrowseTeams
