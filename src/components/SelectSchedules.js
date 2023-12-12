import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const SelectSchedules = (props) => {

    const [schedules, setSchedules] = useState([])

    const loadComboData = () => {
        let myPromises = [
            axios.get('/v1/catalogs/schedule?page=-1'),

        ]
        Promise.all(myPromises)
            .then((responses) => {
                setSchedules(responses[0].data.data);
            })
            .catch((err) => {
                console.log("Error : ", err)
            })
    }

    useEffect(() => {
        loadComboData();
    }, [])


    return (
        <FormControl size='small' fullWidth sx={{ marginRight: 2 }}>
            <InputLabel id="HorarioL">Horario</InputLabel>
            <Select
                labelId="HorarioL"
                id={props.name}
                name={props.name}
                value={props.value}
                label="Horario"
                onChange={props.handleupdate}
            >
                <MenuItem value='' key='AllSchedules'>Todos</MenuItem>
                {schedules.map((row,index) => (
                    <MenuItem value={row.ID} key={`ss-${index}`}>
                        {row.Description}
                    </MenuItem>
                )
                )}
            </Select>
        </FormControl>
    )
}

export default SelectSchedules