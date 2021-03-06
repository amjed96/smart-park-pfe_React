import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import AjoutFlotte from '../../components/AddFlotteForm'
import { useState, useEffect } from 'react'
import {Link, useRouteMatch} from "react-router-dom";
import AjoutPasseport from "../../components/AddPasseportForm";
import {
    Button,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import { baseURL, headers } from '../../services/service'
import axios from 'axios'
import EditPasseport from '../../components/AddPasseportForm/edit'
import DeleteDialog from '../../components/DeleteDialog'

const Container = styled.div`
  margin: 0px;
  padding: 0px;
`

/* START MUI */

const AddBtn = styled(Button)`
  margin: 15px;
  cursor: pointer;
`

const StyledTableCell = styled(TableCell)`
  background-color: darkblue;
  span {
    color: white;
  }
`
const RowTableCell = styled(TableCell)`
  .etat {
    padding: 5px 10px !important;
    border-radius: 15px !important;
    font-weight: bold !important;
  }

  .dispo {
    background-color: #e5fdf4 !important;
    color: #00ed96 !important;
  }

  .panne {
    background-color: #fde9ee;
    color: #f12559;
  }

  .occupe {
    background-color: #fdf8e9;
    color: #f1be25;
  }

  .action-btns {
    display: flex;
    justify-content: space-evenly;
  }
  
  .matricule {
    color: darkblue;
  }
`
const ActionButtonEdit = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid #2cd2f6;
  background-color: #e9fafe;
  cursor: pointer;
  &:hover {
    background-color: #2cd2f6;
    .btn-edit {
      color: #FFF;
    }
  }
  .btn-edit {
    color: #2cd2f6;
  }
`

const ActionButtonDelete = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid #f12559;
  background-color: #fde9ee;
  cursor: pointer;
  &:hover {
    background-color: #f12559;
    .btn-delete {
      color: #FFF;
    }
  }
  .btn-delete {
    color: #f12559;
  }
`

/* END MUI */

function Passeports() {
    const [ open, setOpen ] = useState(false)
    const [ openedit, setOpenedit ] = useState(false)
    const [ opendelete, setOpendelete ] = useState(false)

    /* Start API */
    const [ data, setData ] = useState([])
    const [ id, setId ] = useState(0)
    /* End API */

    const { url } = useRouteMatch()

    /* Start API */

    useEffect(() => {
      retrieveAllData()
    },[open,openedit])

    const retrieveAllData = () => {
        axios
            .get(`${baseURL}/passeport-get/`, {
            /*headers: {
                headers,
            },*/
            })
            .then((response) => {
                setData(response.data)
            })
            .catch((e) => {
                console.error(e)
            })
    }

    const deleteData = (id) => {
        axios
            .delete(`${baseURL}/passeport/${id}/`, {
                /*headers: {
                    headers,
                },*/
            })
            .then((response) => {
                /*setDeleted(true);*/
                retrieveAllData();
            })
            .catch((e) => {
                console.error(e);
            });
    };

    /* End API */

    return (
        <Container>

            {/* START MUI */}

            <TableContainer
                sx={{width: 1155}}
                component={Paper}
            >
                <Typography
                    sx={{ flex: '1 1 100%', margin: '20px', position: 'relative' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Liste des passeports
                    <AddBtn
                        sx={{ position: 'sticky', marginLeft: '300px'  }}
                        variant="outlined"
                        size={"small"}
                        onClick={() => setOpen(true)}
                    >
                        Ajouter +
                    </AddBtn>
                </Typography>

                <TextField
                    sx={{ margin: '5px 20px', width: '50%' }}
                    id={'search'}
                    label={'Rechercher ...'}
                    variant={'outlined'}
                    size={'small'}
                >

                </TextField>

                <Table sx={{ width: '96%', margin: '20px' }} size={'small'}>
                    <TableHead>
                        <TableRow>

                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell><span>Num</span></StyledTableCell>
                            <StyledTableCell><span>Type</span></StyledTableCell>
                            <StyledTableCell><span>Nom</span></StyledTableCell>
                            <StyledTableCell><span>Pr??nom</span></StyledTableCell>
                            <StyledTableCell><span>Nationalit??</span></StyledTableCell>
                            <StyledTableCell><span>DateNaissance</span></StyledTableCell>
                            <StyledTableCell><span>AdresseNaissance</span></StyledTableCell>
                            <StyledTableCell><span>Profession</span></StyledTableCell>
                            <StyledTableCell><span>N??National</span></StyledTableCell>
                            <StyledTableCell><span>Sexe</span></StyledTableCell>
                            <StyledTableCell><span>Date_??dit</span></StyledTableCell>
                            <StyledTableCell><span>Date_exp</span></StyledTableCell>

                            <StyledTableCell><span>Details</span></StyledTableCell>
                            <StyledTableCell><span>Actions</span></StyledTableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.map((row) =>(
                            <TableRow hover={true}>
                                <RowTableCell><input type='checkbox' /></RowTableCell>
                                <RowTableCell>{row.numero}</RowTableCell>
                                <RowTableCell>{row.type}</RowTableCell>
                                <RowTableCell>{row.personnel !== null ? row.personnel.last_name : 'N.D'}</RowTableCell>
                                <RowTableCell>{row.personnel !== null ? row.personnel.first_name : 'N.D'}</RowTableCell>
                                <RowTableCell>{row.nationalite}</RowTableCell>
                                <RowTableCell>{row.personnel !== null ? row.personnel.date_naissance : 'N.D'}</RowTableCell>
                                <RowTableCell>{row.personnel.adresse_naissance}</RowTableCell>
                                <RowTableCell>{row.personnel !== null ? row.personnel.qualification : 'N.D'}</RowTableCell>
                                <RowTableCell>{row.personnel !== null ? row.personnel.cin : 'N.D'}</RowTableCell>
                                <RowTableCell>{row.sexe}</RowTableCell>
                                <RowTableCell>{row.date_edition}</RowTableCell>
                                <RowTableCell>{row.date_expiration}</RowTableCell>
                                <RowTableCell>
                                    <Link to={`${url}/${row.num}`}><FontAwesomeIcon icon={ faArrowUpRightFromSquare } className='details-icon'/></Link>
                                </RowTableCell>
                                <RowTableCell>
                                    <ActionButtonEdit>
                                        <FontAwesomeIcon onClick={() => {setId(row.numero);setOpenedit(true)}} icon={ faPenToSquare } className='btn btn-edit' />
                                    </ActionButtonEdit>
                                    <ActionButtonDelete>
                                        <FontAwesomeIcon onClick={() => {setId(row.numero);setOpendelete(true)}} icon={ faTrashCan } className='btn btn-delete' />
                                    </ActionButtonDelete>
                                </RowTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* END MUI */}

            <AjoutPasseport open={open} setOpen={setOpen} />
            <EditPasseport openedit={openedit} setOpenedit={setOpenedit} id={id} />
            <DeleteDialog opendelete={opendelete} setOpendelete={setOpendelete} id={id} deleteData={deleteData} />
        </Container>
    )
}

export default Passeports