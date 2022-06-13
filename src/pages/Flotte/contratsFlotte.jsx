import styled from "styled-components";
import {useState, useEffect} from "react";
import {Link, useRouteMatch} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare, faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import AjoutContratVente from "../../components/AddContratVente";
import AjoutContratLocationFlotte from "../../components/AddContratLocationFlotteForm";
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
import axios from "axios";
import { baseURL,headers } from "../../services/service";
import EditContratVente from "../../components/AddContratVente/edit";
import EditContratLocationFlotte from "../../components/AddContratLocationFlotteForm/edit";
import DeleteDialog from "../../components/DeleteDialog";


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

  .cloture {
    background-color: #fde9ee;
    color: #f12559;
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

const data1 = [
    {
        id:1,
        matricule:'146TUN5236',
        datedebut:'12/03/2022',
        datefin:'12/03/2023',
        marque:'Totyota',
        modele:'Toyota',
        prix: 1200,
    }
];

function ContratsFlotte() {
    const [ open, setOpen ] = useState(false)
    const [ openedit, setOpenedit ] = useState(false)
    const [ open1, setOpen1 ] = useState(false)
    const [ openedit1, setOpenedit1 ] = useState(false)

    const [ opendelete1, setOpendelete1 ] = useState(false)
    const [ opendelete2, setOpendelete2 ] = useState(false)

    /* Start API */
    const [ contratsvente, setContratsvente ] = useState([])
    const [ id, setId ] = useState(0)

    const [ contratslocation, setContratslocation ] = useState([])
    const [ id1, setId1 ] = useState(0)
    /* End API */

    const { url } = useRouteMatch()

    /* Start API */

    useEffect(() => {
        retrieveAllContratsvente()
        retrieveAllContratslocation()
    },[open,openedit,open1,openedit1])

    const retrieveAllContratsvente = () => {
        axios
            .get(`${baseURL}/contrat-achat/`, {
            /*headers: {
                headers,
            },*/
        })
            .then((response) => {
                setContratsvente(response.data)
            })
            .catch((e) => {
                console.error(e)
            })
    }

    const retrieveAllContratslocation = () => {
        axios
            .get(`${baseURL}/contrat-location-flotte/`, {
            /*headers: {
                headers,
            },*/
        })
            .then((response) => {
                setContratslocation(response.data)
            })
            .catch((e) => {
                console.error(e)
            })
    }

    const deleteContratvente = (id) => {
        axios
            .delete(`${baseURL}/contrat-achat/${id}/`, {
                /*headers: {
                    headers,
                },*/
            })
            .then((response) => {
                /*setDeleted(true);*/
                retrieveAllContratsvente();
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const deleteContratlocation = (id) => {
        axios
            .delete(`${baseURL}/contrat-location-flotte/${id}/`, {
                /*headers: {
                    headers,
                },*/
            })
            .then((response) => {
                /*setDeleted(true);*/
                retrieveAllContratslocation();
            })
            .catch((e) => {
                console.error(e);
            });
    };

    /* End API */

    return (
        <Container>
            {/* START MUI */}
            <TableContainer component={Paper} sx={{ marginBottom: '20px' }}>
                <Typography
                    sx={{ flex: '1 1 100%', margin: '20px', position: 'relative' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Liste des contrats d'achat
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

                <Table sx={{ width: '96%', margin: '20px' }} size={"small"}>
                    <TableHead>
                        <TableRow>

                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell><span>#</span></StyledTableCell>
                            <StyledTableCell><span>Date</span></StyledTableCell>
                            <StyledTableCell><span>Vendeur</span></StyledTableCell>
                            <StyledTableCell><span>Matricule</span></StyledTableCell>
                            <StyledTableCell><span>Marque</span></StyledTableCell>
                            <StyledTableCell><span>Modèle</span></StyledTableCell>
                            <StyledTableCell><span>Chassis</span></StyledTableCell>
                            <StyledTableCell><span>Moteur</span></StyledTableCell>
                            <StyledTableCell><span>Prix</span></StyledTableCell>
                            <StyledTableCell><span>Details</span></StyledTableCell>
                            <StyledTableCell><span>Actions</span></StyledTableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {contratsvente.map((row) =>(
                            
                            <TableRow hover={true}>
                                <RowTableCell><input type='checkbox' /></RowTableCell>
                                <RowTableCell>{row.id}</RowTableCell>
                                <RowTableCell>{row.date}</RowTableCell>
                                <RowTableCell>{row.vendeur}</RowTableCell>
                                <RowTableCell><span className={'matricule'}>{row.vehicule}</span></RowTableCell>
                                <RowTableCell>{row.marque}</RowTableCell>
                                <RowTableCell>{row.modele}</RowTableCell>
                                <RowTableCell>{row.chassis}</RowTableCell>
                                <RowTableCell>{row.moteur}</RowTableCell>
                                <RowTableCell>{row.prix} D.T</RowTableCell>
                                <RowTableCell>
                                    <Link to={`${url}/${row.id}`}><FontAwesomeIcon icon={ faArrowUpRightFromSquare } className='details-icon'/></Link>
                                </RowTableCell>
                                <RowTableCell>
                                    <ActionButtonEdit>
                                        <FontAwesomeIcon onClick={() => {setOpenedit(true);setId(row.id)}} icon={ faPenToSquare } className='btn btn-edit' />
                                    </ActionButtonEdit>
                                    <ActionButtonDelete>
                                        <FontAwesomeIcon onClick={() => {setId(row.id);setOpendelete1(true)}} icon={ faTrashCan } className='btn btn-delete' />
                                    </ActionButtonDelete>
                                </RowTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* END MUI */}

            {/* START MUI */}
            <TableContainer component={Paper}>
                <Typography
                    sx={{ flex: '1 1 100%', margin: '20px', position: 'relative' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Liste des contrats de location
                    <AddBtn
                        sx={{ position: 'absolute', right: '15px'  }}
                        variant="outlined"
                        size={"small"}
                        onClick={() => setOpen1(true)}
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

                <Table sx={{ width: '96%', margin: '20px' }} size={"small"}>
                    <TableHead>
                        <TableRow>

                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell><span>#</span></StyledTableCell>
                            <StyledTableCell><span>Matricule</span></StyledTableCell>
                            <StyledTableCell><span>Date début</span></StyledTableCell>
                            <StyledTableCell><span>Date fin</span></StyledTableCell>
                            <StyledTableCell><span>Marque</span></StyledTableCell>
                            <StyledTableCell><span>Modèle</span></StyledTableCell>
                            <StyledTableCell><span>Prix</span></StyledTableCell>
                            <StyledTableCell><span>Details</span></StyledTableCell>
                            <StyledTableCell><span>Actions</span></StyledTableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {contratslocation.map((row) =>(
                            <TableRow hover={true}>
                                <RowTableCell><input type='checkbox' /></RowTableCell>
                                <RowTableCell>{row.id}</RowTableCell>
                                <RowTableCell><span className={'matricule'}>{row.vehicule}</span></RowTableCell>
                                <RowTableCell>{row.date_debut}</RowTableCell>
                                <RowTableCell>{row.date_fin}</RowTableCell>
                                <RowTableCell>{row.marque}</RowTableCell>
                                <RowTableCell>{row.modele}</RowTableCell>
                                <RowTableCell>{row.prix} D.T</RowTableCell>
                                <RowTableCell>
                                    <Link to={`${url}/${row.id}`}><FontAwesomeIcon icon={ faArrowUpRightFromSquare } className='details-icon'/></Link>
                                </RowTableCell>
                                <RowTableCell>
                                    <ActionButtonEdit>
                                        <FontAwesomeIcon onClick={() => {setId1(row.id); setOpenedit1(true)}} icon={ faPenToSquare } className='btn btn-edit' />
                                    </ActionButtonEdit>
                                    <ActionButtonDelete>
                                        <FontAwesomeIcon onClick={() => {setId(row.id);setOpendelete2(true)}} icon={ faTrashCan } className='btn btn-delete' />
                                    </ActionButtonDelete>
                                </RowTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* END MUI */}

            <AjoutContratVente open={open} setOpen={setOpen} />
            <AjoutContratLocationFlotte open={open1} setOpen={setOpen1} />

            <EditContratVente openedit={openedit} setOpenedit={setOpenedit} id={id} />
            <EditContratLocationFlotte openedit={openedit1} setOpenedit={setOpenedit1} id={id1} />

            <DeleteDialog opendelete={opendelete1} setOpendelete={setOpendelete1} id={id} deleteData={deleteContratvente} />
            <DeleteDialog opendelete={opendelete2} setOpendelete={setOpendelete2} id={id} deleteData={deleteContratlocation} />

        </Container>
    )
}

export default ContratsFlotte