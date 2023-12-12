import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const SelectPermissions = (props) => {

    const [rows, setRows] = useState([])

    const loadComboData = () => {
        let myPromises = [
            axios.get('/v1/catalogs/permissions?page=-1'),

        ]
        Promise.all(myPromises)
            .then((responses) => {
                setRows(responses[0].data.data);
            })
            .catch((err) => {
                console.log("Error en PSelect Permisos : ", err)
            })
    }

    useEffect(() => {
        loadComboData();
    }, [])


    return (
        <FormControl size='small' fullWidth sx={{ marginRight: 2 }}>
            <InputLabel id="HorarioL">Permiso</InputLabel>
            <Select
                labelId="HorarioL"
                id={props.name}
                name={props.name}
                value={props.value}
                label="Horario"
                onChange={props.handleupdate}
            >
                <MenuItem value='' key='AllSchedules'>Todos</MenuItem>
                {rows.map((row,index) => (
                    <MenuItem value={row.ID} key={`ss-${index}`}>
                        {row.Description}
                    </MenuItem>
                )
                )}
            </Select>
        </FormControl>
    )
}

export default SelectPermissions