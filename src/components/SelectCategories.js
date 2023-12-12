import { Box, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import { IconCircle } from '@tabler/icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const SelectCategories = (props) => {

    const [rows, setRows] = useState([])

    const loadComboData = () => {
        let myPromises = [
            axios.get('/v1/catalogs/categories?page=-1'),

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
            <InputLabel id="CategoryL">Categoria</InputLabel>
            <Select
                labelId="CategoryL"
                id={props.name}
                name={props.name}
                value={props.value}
                label="Category"
                onChange={props.handleupdate}>

                <MenuItem value='' key='AllCategories'>Todos</MenuItem>
                {rows.map((row) => {
                    return <MenuItem value={row.ID} key={row.ID}>
                        {row.Description}
                    </MenuItem>
                })}
            </Select>
        </FormControl>
    )
}

export default SelectCategories