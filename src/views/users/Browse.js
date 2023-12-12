import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { AppBar, Button, Dialog, Toolbar, Typography } from '@mui/material';
import { IconEdit,IconEye } from '@tabler/icons'; 
import SubCard from 'ui-component/cards/SubCard';
import Update from './Update';
import { useState } from 'react';
import Add from './Add';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const columns = [
    { id: 'GivenName', label: 'Nombre', minWidth: 100 },
    { id: 'FamilyName', label: 'Apellido', minWidth: 100 },
    { id: 'Ranking', label: 'Puntos', minWidth: 50 },
    { id: 'CategoryDescription', label: 'Categoria', minWidth: 100 },
    { id: 'PermissionDescription', label: 'Permisos', minWidth: 100 },
    { id: 'actions', label:'Acciones', minWidth: 30, FormatDisplay:'actions', align:'center'}
];


export default function Browser() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([]);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [user,setUser]= React.useState(null);
    const [permissions, setPermissions]= useState([]);
    const [categories, setCategories]= useState([]);
    const [viewOpen, setViewOpen] = React.useState(false);
    const [addOpen, setAddOpen] = React.useState(false);
    const [updateOpen, setUpdateOpen] = React.useState(false);



    const loadData = (newPage) => {
        axios.get('/v1/catalogs/users?page=' + newPage)
            .then((response) => {
                setRows(response.data.data)
            })
            .catch((error) => {
                console.log("Error:", error)
            })
    }

    const loadCategories = () => {
        let URL = '/v1/catalogs/categories?limit=-1'

        axios.get(URL)
            .then((response) => {
                setCategories(response.data.data);
                console.log('Categories ', response.data.data)
            })
            .catch((err) => {
                console.log('Error : ', err)
            })
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        loadData(newPage + 1)
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(1);
    };

    useEffect(() => {
        loadData(1);
        loadCategories();
    }, [])
    

    const openView = (value) =>{
        console.log ("View " ,value)
    }
    const openAdd = (value) =>{
        console.log ("View " ,value)
    }
    
    const openUpdate = (value) =>{
        console.log ("Update " ,value)
        setUser(value);
        setModalOpen(true);
    }

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
                <IconEye onClick={() => openView(value)}/>
                <IconEdit onClick={() => openUpdate(value)}/>
              </div>
            );
    
          default:
            result = value[definition.id];
            break;
        }
        return result;
      };
    

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant='h3' sx={{ flexGrow: 1 }}>Listado de Usuarios</Typography>
                    <Button color="inherit" variant={'contained'} onClick={() =>setAddOpen(true)}>Cargar Clubs</Button>
                </Toolbar>
            </AppBar>
            <MainCard >

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
                    <TablePagination
                        count={-1}
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </MainCard>
            <Dialog open={addOpen} onClose={() => setAddOpen(false)}>
             <Add  />
            </Dialog>
        </Paper>
        </LocalizationProvider>
    );
}

