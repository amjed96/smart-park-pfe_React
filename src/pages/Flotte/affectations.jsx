import styled from "styled-components";
import {useState, useEffect} from "react";
import {Link, useRouteMatch} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare, faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TextField,
    Typography,
    Button
} from "@mui/material";
import AjoutAffectation from "../../components/AddAffectationForm";
import axios from "axios"
import { baseURL, headers } from "../../services/service";

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

const data = [
    {
        id:1,
        matricule:'120TUN2536',
        chauffeur:'Mohamed Mohamed',
        datedebut:'12/05/2022',
        datefin:'12/06/2022',
        etat:'en cours'
    },
    {id:2, matricule:'125TUN2576', chauffeur:'Mohamed Ali', datedebut:'12/05/2022', datefin:'12/06/2022', etat:'clôturée'},

];

function AffectationsFlotte() {
    const [ open, setOpen ] = useState(false)
    const [ openedit, setOpenedit ] = useState(false)
    const [ affectations, setAffectations ] = useState([])
    const [ chauffeur, setChauffeur ] = useState()
    const [ id, setId ] = useState(0)
    /*const [ deleted, setDeleted ] = useState(false)*/
    const { url } = useRouteMatch()

    useEffect(() => {
      retrieveAllAffectations()
  },[open,openedit])

  const retrieveAllAffectations = () => {
    axios
        .get(`${baseURL}/affectation/`, {
        /*headers: {
            headers,
        },*/
    })
        .then((response) => {
            setAffectations(response.data)
            // retrieveChauffeur(response.data.id)
        })
        .catch((e) => {
            console.error(e)
        })
  }

  const retrieveChauffeur = (id) => {
    axios
        .get(`${baseURL}/personnel/${id}`, {
        /*headers: {
            headers,
        },*/
    })
        .then((response) => {
            setChauffeur(response.data)
        })
        .catch((e) => {
            console.error(e)
        })
    }

  const deleteAffectations = (id) => {
    axios
        .delete(`${baseURL}/affectation/${id}/`, {
            /*headers: {
                headers,
            },*/
        })
        .then((response) => {
            /*setDeleted(true);*/
            retrieveAllAffectations();
        })
        .catch((e) => {
            console.error(e);
        });
  };

    return (
        <Container>
            {/* START MUI */}
            <TableContainer component={Paper}>
                <Typography
                    sx={{ flex: '1 1 100%', margin: '20px', position: 'relative' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Liste des affectations
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

                <Table sx={{ minWidth: 700, margin: '20px' }} size={"small"}>
                    <TableHead>
                        <TableRow>

                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell><span>#</span></StyledTableCell>
                            <StyledTableCell><span>Matricule</span></StyledTableCell>
                            <StyledTableCell><span>Chauffeur</span></StyledTableCell>
                            <StyledTableCell><span>Date Debut</span></StyledTableCell>
                            <StyledTableCell><span>Date Fin</span></StyledTableCell>
                            <StyledTableCell><span>Etat</span></StyledTableCell>
                            <StyledTableCell><span>Details</span></StyledTableCell>
                            <StyledTableCell><span>Actions</span></StyledTableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {affectations.map((row) =>(
                            <TableRow hover={true}>
                                <RowTableCell><input type='checkbox' /></RowTableCell>
                                <RowTableCell>{row.id}</RowTableCell>
                                <RowTableCell><span className={'matricule'}>{row.vehicule}</span></RowTableCell>
                                <RowTableCell>{row.chauffeur}</RowTableCell>
                                <RowTableCell>{row.date_debut}</RowTableCell>
                                <RowTableCell>{row.date_fin}</RowTableCell>
                                <RowTableCell>{row.etat ? <span className='etat dispo'>En cours</span>
                                    : <span className='etat cloture'>Clôturée</span>
                                }
                                </RowTableCell>
                                <RowTableCell>
                                    <Link to={`${url}/${row.id}`}><FontAwesomeIcon icon={ faArrowUpRightFromSquare } className='details-icon'/></Link>
                                </RowTableCell>
                                <RowTableCell>
                                    {/*<ActionButtonEdit>
                                        <FontAwesomeIcon onClick={() => setBtnPopup(true)} icon={ faPenToSquare } className='btn btn-edit' />
                              </ActionButtonEdit>*/}
                                    <ActionButtonDelete>
                                        <FontAwesomeIcon onClick={() => deleteAffectations(row.id)} icon={ faTrashCan } className='btn btn-delete' />
                                    </ActionButtonDelete>
                                </RowTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <AjoutAffectation open ={open} setOpen={setOpen} />
            {/* END MUI */}
        </Container>
    )
}

export default AffectationsFlotte