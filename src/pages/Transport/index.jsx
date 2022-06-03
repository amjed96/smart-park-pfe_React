import styled from "styled-components";
import { useState, useEffect } from "react";
import {Link, useRouteMatch} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare, faPenToSquare, faTrashCan, faCircleCheck, faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import AjoutFournisseur from "../../components/AddFournisseurForm";
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
} from "@mui/material"
import AjoutDossierVoyage from "../../components/AddDossierVoyageForm"
import axios from "axios"
import { baseURL, headers } from "../../services/service"
import EditDossierVoyage from "../../components/AddDossierVoyageForm/edit";


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

/* END MUI */

function Transport() {

    const [ open, setOpen ] = useState(false)
    const [ openedit, setOpenedit ] = useState(false)

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
            .get(`${baseURL}/dossier-voyage-get/`, {
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
            .delete(`${baseURL}/dossier-voyage/${id}/`, {
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

    const cloturerDossier = (id) => {
      axios
        .post(`${baseURL}/dossier-voyage/${id}/cloturer/`, {
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
  
    const annulerClotureDossier = (id) => {
      axios.
        post(`${baseURL}/dossier-voyage/${id}/annuler/`, {
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
                    Liste des dossiers voyage
                    <AddBtn
                        sx={{ position: 'absolute', right: '15px'  }}
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
                            <StyledTableCell><span>Code</span></StyledTableCell>
                            <StyledTableCell><span>Numéro</span></StyledTableCell>
                            <StyledTableCell><span>Référence_aller</span></StyledTableCell>
                            <StyledTableCell><span>Date_création</span></StyledTableCell>
                            <StyledTableCell><span>Chauffeur</span></StyledTableCell>
                            <StyledTableCell><span>Véficule</span></StyledTableCell>
                            <StyledTableCell><span>Remorque</span></StyledTableCell>
                            <StyledTableCell><span>Client</span></StyledTableCell>
                            <StyledTableCell><span>Voyage</span></StyledTableCell>
                            <StyledTableCell><span>Date_chargement</span></StyledTableCell>
                            <StyledTableCell><span>Date_déchargement</span></StyledTableCell>
                            <StyledTableCell><span>Montant_HT</span></StyledTableCell>
                            <StyledTableCell><span>Etat</span></StyledTableCell>
                            
                            <StyledTableCell><span>Clôturer/Annuler</span></StyledTableCell>

                            <StyledTableCell><span>Details</span></StyledTableCell>
                            <StyledTableCell><span>Actions</span></StyledTableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.map((row) =>(
                            <TableRow hover={true}>

                                <RowTableCell><input type='checkbox' /></RowTableCell>
                                <RowTableCell>{row.code}</RowTableCell>
                                <RowTableCell>{row.numero}</RowTableCell>
                                <RowTableCell>{row.ref_aller}</RowTableCell>
                                <RowTableCell>{row.date_creation}</RowTableCell>
                                <RowTableCell>{row.chauffeur ? row.chauffeur.first_name+' '+row.chauffeur.last_name : 'N.D'}</RowTableCell>
                                <RowTableCell><span className={'matricule'}>{row.vehicule ? row.vehicule.immatriculation : 'N.D'}</span></RowTableCell>
                                <RowTableCell>{row.remorque}</RowTableCell>
                                <RowTableCell>{row.client ? row.client.intitule : 'N.D'}</RowTableCell>
                                <RowTableCell><span className={'matricule'}>{row.voyage}</span></RowTableCell>
                                <RowTableCell>{row.date_chargement}</RowTableCell>
                                <RowTableCell>{row.date_dechargement}</RowTableCell>
                                <RowTableCell>{row.montant_ht} D.T</RowTableCell>

                                <RowTableCell>{row.etat ? <span className={'red'}>en cours</span> :
                                    <span className={'green'}>facturé</span> }
                                </RowTableCell>

                                <RowTableCell>
                                {row.etat ? <Button sx={{ color: 'green' }} onClick={() => cloturerDossier(row.code)}><FontAwesomeIcon icon={faCircleCheck} className='btn' /></Button>
                                    : <Button sx={{ color: 'red' }} onClick={() => annulerClotureDossier(row.code)}><FontAwesomeIcon icon={faCircleXmark} className='btn' /></Button>}
                                </RowTableCell>

                                <RowTableCell>
                                    <Link to={`${url}/${row.code}`}><FontAwesomeIcon icon={ faArrowUpRightFromSquare } className='details-icon'/></Link>
                                </RowTableCell>
                                <RowTableCell>
                                    <ActionButtonEdit>
                                        <FontAwesomeIcon onClick={() => {setId(row.code);setOpenedit(true)}} icon={ faPenToSquare } className='btn btn-edit' />
                                    </ActionButtonEdit>
                                    <ActionButtonDelete>
                                        <FontAwesomeIcon onClick={() => deleteData(row.code)} icon={ faTrashCan } className='btn btn-delete' />
                                    </ActionButtonDelete>
                                </RowTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* END MUI */}

            <AjoutDossierVoyage open={open} setOpen={setOpen} />
            <EditDossierVoyage openedit={openedit} setOpenedit={setOpenedit} id={id} />
        </Container>
    );
  }
  
  export default Transport