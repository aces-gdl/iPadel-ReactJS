import React from 'react'
import axios from 'axios';
import MainCard from 'ui-component/cards/MainCard';
import { Button, Grid } from '@mui/material';
import SelectTournaments from 'components/SelectTournament';
import SelectCategories from 'components/SelectCategories';

const DrawGroups = () => {
    const [page, setPage] = React.useState(0);
    const [rows, setRows] = React.useState([]);
    const [values, setValues] = React.useState(
        {
            CategoryID: '',
            TournamentID: ''
        }
    )
    let nextIndex = 0;
    let currentGroup = 0;
    let titulo = false;

    const loadGroupData = (newPage) => {
        if (values.TournamentID && values.CategoryID && values.TournamentID.length > 0 && values.CategoryID.length > 0) {
            let URL = `/v1/tournament/getteamsbygroup?page=${newPage}&CategoryID=${values.CategoryID}&TournamentID=${values.TournamentID}`
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


    return (
        <div>
            <div class="table-responsive">
                <MainCard title="Despliegue de grupos">
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <SelectTournaments
                                name='TournamentID'
                                value={values.TournamentID}
                                label="Torneos"
                                handleupdate={handleUpdate} />


                        </Grid>
                        <Grid item xs={5}>
                            <SelectCategories
                                name='CategoryID'
                                value={values.CategoryID}
                                label="Category"
                                handleupdate={handleUpdate} />
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant={'contained'}  onClick={() => loadGroupData(1)}>Buscar Grupos</Button>
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