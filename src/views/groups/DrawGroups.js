import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';

const DrawGroups = () => {

    const [page, setPage] = React.useState(0);
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
    let nextIndex = 0;
    let currentGroup = 0;
    let titulo = false;

    const loadGroupData = (newPage) => {
        if (values.tournament  && values.category && values.tournament.length > 0 && values.category.length >0 ){

        
        let URL = `/v1/tournament/getteamsbygroup?page=${newPage}&CategoryID=${values.category}&TournamentID=${values.tournament}`
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


    return (
        <div>
            <div class="table-responsive">
                <MainCard title="Despliegue de grupos">
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
                            <Button onClick={()=>loadGroupData(1)}>Buscar Grupos</Button>
                        </Grid>
                    </Grid>
                    <table class="table table-striped table-hover table-bordered table-secondary border-primary table-hover">
                        <tbody>
                            {rows.length > 0 && rows.map((group, index) => {
                                titulo = currentGroup !== group.GroupNumber
                                currentGroup = group.GroupNumber
                                return (
                                    <>
                                        {titulo &&
                                            <tr>
                                                <th colSpan={5} style={{ backgroundColor: '#EF5350' }} class="text-center "> {`Grupo ${group.GroupNumber}`} </th>
                                            </tr>
                                        }
                                        <tr>

                                            <th class='text-center'> {`${group.Name}`}</th>
                                            <td class='text-center'>{`${group.Name1}`}</td>
                                            <td class='text-center'>/</td>
                                            <td class='text-center'>{`${group.Name2}`}</td>
                                            <td class='text-center'>{`${group.TeamRanking}`}</td>
                                        </tr>
                                    </>
                                )

                            })}
                        </tbody>
                    </table>
                </MainCard>
            </div>
        </div>
    )
}

export default DrawGroups

/*

*/