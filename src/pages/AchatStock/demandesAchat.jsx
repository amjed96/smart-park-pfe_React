import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowUpRightFromSquare, faPenToSquare, faCircleCheck, faCircleXmark} from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import AjoutDocument from '../../components/AddDocumentForm'
import {Link, useRouteMatch} from "react-router-dom"
import AjoutDemandeAchat from "../../components/AddDemandeAchatForm"
import {
    Button,
    Paper,
    Table,
    TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material"
import axios from 'axios'
import { baseURL, headers } from '../../services/service'
import EditDemandeAchat from '../../components/AddDemandeAchatForm/edit'
import DeleteDialog from '../../components/DeleteDialog'


/*const Title = styled.span`
    color: #000;
    font-family: 'Montserrat', sans-serif;
    font-size: 24px; 
    font-weight: bolder;
`*/

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

  .red {
    color: #f12559;
  }

  .green {
    color: green;
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

// const data = [
//     {
//         id:'DA001206',
//         date:'24-05-2022',
//         demandeur:'John Doe',
//         article:'Filter ?? air',
//         nombre:'5',
//         description:'//',
//         statut:'en attente',
//     },
//     {
//         id:'DA001207',
//         date:'24-05-2022',
//         demandeur:'John Doe',
//         article:'Filter ?? air',
//         nombre:'10',
//         description:'//',
//         statut:'command??',
//     },
// ];

/* END MUI */

function DemandesAchat() {
    const [ open, setOpen ] = useState(false)
    const [ openedit, setOpenedit ] = useState(false)
    const [ opendelete, setOpendelete ] = useState(false)

    /* Start API */
    const [ data, setData ] = useState([])
    const [ user , setUser ] = useState()
    const [ id, setId ] = useState(0)
    /* End API */

    const { url } = useRouteMatch()

    /* Start API */

    useEffect(() => {
      retrieveAllData()
    },[open,openedit])

    const retrieveAllData = () => {
        axios
            .get(`${baseURL}/demande-achat/`, {
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
            .delete(`${baseURL}/demande-achat/${id}/`, {
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

    const cloturerDemande = (id) => {
      axios
        .post(`${baseURL}/demande-achat/${id}/cloturer/`, {
          /*headers: {
            headers,
          },*/
        })
        .then((response) => {
          retrieveAllData();
        })
        .catch((e) => {
          console.error(e)
        })
    }
  
    const annulerClotureDemande = (id) => {
      axios.
        post(`${baseURL}/demande-achat/${id}/annuler/`, {
          /*headers: {
            headers,
          },*/
        })
        .then((response) => {
          retrieveAllData()
        })
        .catch((e) => {
          console.error(e)
        })
    }

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
                    Liste des demandes d'achat
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
                            <StyledTableCell><span>#</span></StyledTableCell>
                            <StyledTableCell><span>Date</span></StyledTableCell>
                            <StyledTableCell><span>Demandeur</span></StyledTableCell>
                            <StyledTableCell><span>Article</span></StyledTableCell>
                            <StyledTableCell><span>Nombre</span></StyledTableCell>
                            <StyledTableCell><span>Description</span></StyledTableCell>
                            <StyledTableCell><span>Statut</span></StyledTableCell>
                            
                            <StyledTableCell><span>Finaliser</span></StyledTableCell>


                            <StyledTableCell><span>Details</span></StyledTableCell>
                            <StyledTableCell><span>Actions</span></StyledTableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.map((row) =>(
                            <TableRow hover={true}>

                                <RowTableCell><input type='checkbox' /></RowTableCell>
                                <RowTableCell>{row.id}</RowTableCell>
                                <RowTableCell>{row.date}</RowTableCell>
                                <RowTableCell>{row.demandeur}</RowTableCell>
                                <RowTableCell>{row.article}</RowTableCell>
                                <RowTableCell>{row.nombre}</RowTableCell>
                                <RowTableCell>{row.description}</RowTableCell>
                                <RowTableCell>{row.statut ? <span className={'red'}>en attente</span> :
                                    <span className={'green'}>finalis??e</span>
                                }</RowTableCell>

                                <RowTableCell>
                                  {row.statut ? <Button sx={{ color: 'green' }} onClick={() => cloturerDemande(row.id)}><FontAwesomeIcon icon={faCircleCheck} className='btn' /></Button>
                                    : <Button sx={{ color: 'red' }} onClick={() => annulerClotureDemande(row.id)}><FontAwesomeIcon icon={faCircleXmark} className='btn' /></Button>}
                                </RowTableCell>

                                <RowTableCell>
                                    <Link to={`${url}/${row.id}`}><FontAwesomeIcon icon={ faArrowUpRightFromSquare } className='details-icon'/></Link>
                                </RowTableCell>
                                <RowTableCell>
                                    <ActionButtonEdit>
                                        <FontAwesomeIcon onClick={() => {setId(row.id);setOpenedit(true)}} icon={ faPenToSquare } className='btn btn-edit' />
                                    </ActionButtonEdit>
                                    <ActionButtonDelete>
                                        <FontAwesomeIcon onClick={() => {setId(row.id);setOpendelete(true)}} icon={ faTrashCan } className='btn btn-delete' />
                                    </ActionButtonDelete>
                                </RowTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* END MUI */}

            <AjoutDemandeAchat open={open} setOpen={setOpen} />
            <EditDemandeAchat openedit={openedit} setOpenedit={setOpenedit} id={id} />
            <DeleteDialog opendelete={opendelete} setOpendelete={setOpendelete} id={id} deleteData={deleteData} />
        </Container>
    )
}

export default DemandesAchat