import styled from "styled-components";
import { useState, useEffect } from "react";
import {Link, useRouteMatch} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare, faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import AjoutFlotte from "../../components/AddFlotteForm";
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
import axios from 'axios'
import { baseURL } from "../../services/service"
import AjoutReglement from "../../components/AddReglementForm";
import EditReglement from "../../components/AddReglementForm/edit";
import AjoutDocReglement from "../../components/AddDocReglement";
import EditDocReglement from "../../components/AddDocReglement/edit";


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

  .echeance {
    color: orangered;
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

function DocumentsReglements() {

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
            .get(`${baseURL}/doc-regl/`, {
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
            .delete(`${baseURL}/doc-regl/${id}/`, {
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
                component={Paper}
                sx={{width: 1155}}
            >
                <Typography
                    sx={{ flex: '1 1 100%', margin: '20px', position: 'relative' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Liste des documents règlements
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

                <Table sx={{ minWidth: 400, margin: '20px' }} size={'small'}>
                    <TableHead>
                        <TableRow>

                            <StyledTableCell></StyledTableCell>
                            {/* <StyledTableCell><span>Num°</span></StyledTableCell>
                            <StyledTableCell><span>Date</span></StyledTableCell>
                            <StyledTableCell><span>Date_échéance</span></StyledTableCell>
                            <StyledTableCell><span>Mode_paiement</span></StyledTableCell>
                            <StyledTableCell><span>Client</span></StyledTableCell>
                            <StyledTableCell><span>Montant</span></StyledTableCell>
                            <StyledTableCell><span>Statut</span></StyledTableCell> */}

                            <StyledTableCell><span>dr_no</span></StyledTableCell>
                            <StyledTableCell><span>do_domaine</span></StyledTableCell>
                            <StyledTableCell><span>do_type</span></StyledTableCell>
                            <StyledTableCell><span>do_piece</span></StyledTableCell>
                            <StyledTableCell><span>dr_type_regl</span></StyledTableCell>
                            <StyledTableCell><span>dr_date</span></StyledTableCell>
                            <StyledTableCell><span>dr_libelle</span></StyledTableCell>
                            <StyledTableCell><span>dr_pourcent</span></StyledTableCell>
                            <StyledTableCell><span>dr_montant</span></StyledTableCell>
                            <StyledTableCell><span>dr_montant_dev</span></StyledTableCell>
                            <StyledTableCell><span>dr_equil</span></StyledTableCell>
                            <StyledTableCell><span>ec_no</span></StyledTableCell>
                            <StyledTableCell><span>dr_regle</span></StyledTableCell>
                            <StyledTableCell><span>n_reglement</span></StyledTableCell>

                            <StyledTableCell><span>Details</span></StyledTableCell>
                            <StyledTableCell><span>Actions</span></StyledTableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.map((row) =>(
                            <TableRow hover={true}>

                                <RowTableCell><input type='checkbox' /></RowTableCell>
                                {/* <RowTableCell>{row.num}</RowTableCell>
                                <RowTableCell>{row.date}</RowTableCell>
                                <RowTableCell><span className={'echeance'}>{row.dateecheance}</span></RowTableCell>
                                <RowTableCell>{row.modepaiement === 'versement' ? <span className={'green'}>{row.modepaiement}</span> :
                                    <span className={'matricule'}>{row.modepaiement}</span>
                                }</RowTableCell>
                                <RowTableCell>{row.client}</RowTableCell>
                                <RowTableCell>{row.montant} D.T</RowTableCell>
                                <RowTableCell>{row.statut === 'clôturé' ? <span className={'green'}>{row.statut}</span> :
                                    <span className={'red'}>{row.statut}</span>
                                }</RowTableCell> */}

                                <RowTableCell>{row.dr_no}</RowTableCell>
                                <RowTableCell>{row.do_domaine}</RowTableCell>
                                <RowTableCell>{row.do_type}</RowTableCell>
                                <RowTableCell>{row.do_piece}</RowTableCell>
                                <RowTableCell>{row.dr_type_regl}</RowTableCell>
                                <RowTableCell>{row.dr_date}</RowTableCell>
                                <RowTableCell>{row.dr_libelle}</RowTableCell>
                                <RowTableCell>{row.dr_pourcent}</RowTableCell>
                                <RowTableCell>{row.dr_montant}</RowTableCell>
                                <RowTableCell>{row.dr_montant_dev}</RowTableCell>
                                <RowTableCell>{row.dr_equil}</RowTableCell>
                                <RowTableCell>{row.ec_no}</RowTableCell>
                                <RowTableCell>{row.dr_regle}</RowTableCell>
                                <RowTableCell>{row.n_reglement}</RowTableCell>
                                

                                <RowTableCell>
                                    <Link to={`${url}/${row.id}`}><FontAwesomeIcon icon={ faArrowUpRightFromSquare } className='details-icon'/></Link>
                                </RowTableCell>
                                <RowTableCell>
                                    <ActionButtonEdit>
                                        <FontAwesomeIcon onClick={() => {setId(row.id);setOpenedit(true)}} icon={ faPenToSquare } className='btn btn-edit' />
                                    </ActionButtonEdit>
                                    <ActionButtonDelete>
                                        <FontAwesomeIcon onClick={() => deleteData(row.id)} icon={ faTrashCan } className='btn btn-delete' />
                                    </ActionButtonDelete>
                                </RowTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* END MUI */}

            <AjoutDocReglement open={open} setOpen={setOpen} />
            <EditDocReglement openedit={openedit} setOpenedit={setOpenedit} id={id} />
        </Container>
    )
}

export default DocumentsReglements