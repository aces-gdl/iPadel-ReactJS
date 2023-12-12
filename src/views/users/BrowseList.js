import * as React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Box, Button, Dialog, Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { useAlert } from 'react-alert';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import LoadImageFromURL from 'components/LoadImageFromURL';
import './styles.css';
import { useState } from 'react';
import { IconCircle, IconPencil } from '@tabler/icons';
import Add from './Add';
import View from './View';
import SelectCategories from 'components/SelectCategories';
import SelectSchedules from 'components/SelectSchedules';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Update from './Update';


export default function BrowserList() {
    const navigate = useNavigate();
    const alert = useAlert();

    const [rows, setRows] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [schedules, setSchedules] = React.useState([]);
    const [currentRow, setCurrenRow] = React.useState({});
    const [viewOpen, setViewOpen] = React.useState(false);
    const [addOpen, setAddOpen] = React.useState(false);
    const [updateOpen, setUpdateOpen] = React.useState(false);
    const [values, setValues] = useState({
        CategoryID: '',
        ScheduleID: ''
    });

    const loadComboData = () => {
        let myPromises = [
            axios.get('/v1/catalogs/category?page=-1'),
            axios.get('/v1/catalogs/schedule?page=-1'),

        ]
        Promise.all(myPromises)
            .then((responses) => {
                setCategories(responses[0].data.data);
                setSchedules(responses[1].data.data);
            })
            .catch((err) => {
                console.log("Error : ", err)
            })
    }
    const loadMainData = () => {

        axios.get('/v1/catalogs/users?limit=-1')
            .then((response) => {
                setRows(response.data.data)
            })
            .catch((error) => {
                alert.error('Error leyendo usuarios')
                if (error.response.status === 401) {
                    navigate('/pages/login/login3')
                }
            })
    }

    useEffect(() => {
        loadMainData(1);
        loadComboData();
    }, [])

    const formatDate = (myDate) => {
        let d = new Date(myDate);
        return `${d.getDay() + 1}/${d.getMonth() + 1}/${d.getFullYear()}`
    }

    const handleUpdate = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const openAdd = (row) => {
        setCurrenRow(row);
        setAddOpen(true);
    }

    const openView = (row) => {
        setCurrenRow(row);
        setViewOpen(true);
    }
    const openUpdate = (row) => {
        setCurrenRow(row);
        setUpdateOpen(true);
    }
    const handleClose = () => {
        setAddOpen(false);
        setUpdateOpen(false);
        setViewOpen(false);
    }

    const handleClickOnSearch = () => {
        let myURL = "/v1/catalogs/users?a=1";
        myURL += values.CategoryID && values.CategoryID.length > 0 ? `&CategoryID=${values.CategoryID}` : '';
        myURL += values.ScheduleID && values.ScheduleID.length > 0 ? `&ScheduleID=${values.ScheduleID}` : '';

        axios.get(myURL)
            .then((response) => {
                setRows(response.data.data)
            })
            .catch((error) => {
                alert.error('Error leyendo usuarios')
                if (error.response.status === 401) {
                    navigate('/pages/login/login3')
                }
            })
    }

    const RenderCard = (row) => {
        return (
            <Grid item sm={12} md={6} lg={4} key={row.ID} >
                <Paper elevation={2} >
                    <Box paddingX={2} paddingTop={2} paddingBottom={1} display={'flex'} alignItems={'center'}>
                        <LoadImageFromURL id={row.ID} imageid={row.HasPicture >= 1 ? row.ID : '1'} imagename={row.Name} height='100px' thumbnail />
                        <Typography variant='h4' marginLeft={1.5} component={'h2'}> {row.Name} </Typography>
                    </Box>
                    <Divider variant={'fullWidth'} />

                    <Box display={'flex'} alignItems='center' justifyContent='space-between' paddingTop={2} >

                        <Box paddingX={2} display={'flex'} alignItems='center'  >
                            <Typography variant='subtitle1' component='p'>Alumno desde :</Typography>
                            <Typography variant='subtitle2' component='p' paddingLeft={0.5}>02/10/2022</Typography>

                        </Box>

                        <Box paddingX={2} display={'flex'} alignItems='center'  >
                            <Typography variant='subtitle1' component='p'>Cinta :</Typography>
                            <Typography variant='subtitle2' component='p' paddingLeft={0.5}>{row.CategoryDescription}</Typography>

                        </Box>
                    </Box>
                    <Box display={'flex'} alignItems='center' justifyContent='space-between' >
                        <Box paddingX={2} display={'flex'} alignItems='center'  >

                            <Typography variant='subtitle1' component='p'>Nacio el :</Typography>
                            <Typography variant='subtitle2' component='p' paddingLeft={0.5}>{formatDate(row.Birthday)}</Typography>

                        </Box>
                        <Box paddingX={2} display={'flex'} alignItems='center'  >

                            <Typography variant='subtitle1' component='p'>Seleccion:</Typography>
                            <Typography variant='subtitle2' component='p' paddingLeft={0.5}>CODE</Typography>

                        </Box>
                    </Box>
                    <Box display={'flex'} alignItems='center' justifyContent='space-between' paddingBottom={3}>
                        <Box paddingX={2} display={'flex'} alignItems='center'  >

                            <Typography variant='subtitle1' component='p'>Responsable :</Typography>
                            <Typography variant='subtitle2' component='p' paddingLeft={0.5}>{row.ContactName ? row.ContactName : 'N/A'}</Typography>

                        </Box>
                        <Box paddingX={2} display={'flex'} alignItems='center'  >

                            <Typography variant='subtitle1' component='p'>Telefono :</Typography>
                            <Typography variant='subtitle2' component='p' paddingLeft={0.5}>{row.ContactPhone}</Typography>

                        </Box>

                    </Box>
                    <Box display={'flex'} justifyContent={'end'}>
                        <Button variant={'contained'} onClick={() => openUpdate(row)}><IconPencil size={'20'} /></Button>
                    </Box>
                </Paper>
            </Grid>
        )
    }
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box display={'flex'} justifyContent={'center'} paddingY={2}>
                <Typography variant='h2'>Catalogo de alumnos</Typography>
            </Box>
            <Box display={'flex'} justifyContent={'space-between'} paddingBottom={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={5} >
                        <SelectCategories name='CategoryID' value={values.CategoryID} handleupdate={handleUpdate} />
                    </Grid>
                    <Grid item xs={12} md={5} >
                        <SelectSchedules name='ScheduleID' value={values.ScheduleID} handleupdate={handleUpdate} />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Button variant={'contained'} sx={{ marginRight: 2 }} onClick={handleClickOnSearch}>Buscar</Button>
                            <Button variant={'contained'} sx={{ marginLeft: 2 }} color={'secondary'} onClick={openAdd}>Nuevo</Button>
                        </Box>
                    </Grid>
                </Grid>

            </Box>
            <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 205px)', overflowX: 'hidden' }}>

                <Grid container spacing={2} paddingY={2}>
                    {rows && rows.length > 0 && (
                        rows.map((row) => RenderCard(row))
                    )}
                    {rows && rows.length === 0 && (
                        <>Sin resultados ...</>
                    )}
                </Grid>
            </PerfectScrollbar >

            <Dialog open={addOpen} onClose={handleClose} size={'lg'}>
                <Add handleClose={handleClose} />
            </Dialog>
            <Dialog open={updateOpen} onClose={handleClose} size={'lg'}>
                <Update handleClose={handleClose} row={currentRow} />
            </Dialog>
            <Dialog open={viewOpen} onClose={handleClose} >
                <View handleClose={handleClose} row={currentRow} />
            </Dialog>

        </LocalizationProvider>
    )
}

