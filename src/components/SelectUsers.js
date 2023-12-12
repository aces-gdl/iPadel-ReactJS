import { Box, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import { IconCircle } from '@tabler/icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const SelectUsers = (props) => {
    const {filter } = props;
    const [rows, setRows] = useState([])

    const loadComboData = () => {
        let myURL = '/v1/catalogs/users?page=-1'
        myURL += filter && filter.length > 0 ? `&filter=${filter}`: '';
        let myPromises = [
            axios.get(myURL),

        ]
        Promise.all(myPromises)
            .then((responses) => {
                setRows(responses[0].data.data);
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
                <InputLabel id="UsersL">Usuario</InputLabel>
                <Select
                 labelId="UsersL"
                 id={props.name}
                 name={props.name}
                 value={props.value}
                 label="Users"
                 onChange={props.handleupdate}>

                <MenuItem value='' key='All'>Todos</MenuItem>
                {rows.map((row) => {
                    return <MenuItem value={row.ID} key={row.ID}>
                           {row.Name}
                    </MenuItem>
                })}
            </Select>
        </FormControl>
    )
}

export default SelectUsers