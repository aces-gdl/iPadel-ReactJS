import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import SubCard from 'ui-component/cards/SubCard'

const Update = (props) => {
  const [localData, setLocalData] = useState({})
  const { data, permissions, categories } = props

  useEffect(() => {
    setLocalData(data);
  }, [])

  const handleCategoryChange = (e) => {

  }
  return (
    <SubCard title="Actualizar usuario" >
      <Grid container sm={12} spacing={4}>
        <Grid item sm={6}>
          <TextField id="GivenNamme" label="Nombre(s)" variant='outlined' value={localData.GivenName} />
        </Grid>
        <Grid item sm={6}>
          <TextField id="FamilyName" label="Apellido(s)" variant='outlined' value={localData.FamilyName} />
        </Grid>
        <Grid item sm={6}>
          <FormControl fullWidth>
            <InputLabel id="Category">Categoria</InputLabel>
            <Select
              labelId="Categoryl"
              id="CategoryID"
              value={localData.CategoryID}
              label="Category"
              onChange={handleCategoryChange}
            >
              {categories.map((row) =>
                <MenuItem value={row.ID}>{row.Description}</MenuItem>
              )}
            </Select>
          </FormControl>
      </Grid>
    </Grid>
    </SubCard >
  )
}

export default Update