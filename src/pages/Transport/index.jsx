import styled from "styled-components";
import {useState} from "react";
import {Link, useRouteMatch} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare, faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";
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
} from "@mui/material";
import AjoutDossierVoyage from "../../components/AddDossierVoyageForm";

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
    padding: 5px 10px; !important;
    border-radius: 15px; !important;
    font-weight: bold; !important;
  }

  .dispo {
    background-color: #e5fdf4; !important;
    color: #00ed96; !important;
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

const data = [
    {
        code:'DV001256',
        numero:'002135',
        refaller:'001256',
        datecreation:'12-05-2022',
        chauffeur:'Mohamed Ben Ali',
        vehicule:'128TUN4563',
        remorque:'004568',
        client:'Ahmed Belhaj',
        voyage:'tunis-bizerte',
        datechargement:'15-05-2022',
        datedechargement:'16-05-2022',
        montantht:'150',
        etat:'en cours',
    },
    {
        code:'DV001356',
        numero:'002235',
        refaller:'002256',
        datecreation:'15-06-2022',
        chauffeur:'Mohamed Ben Ali',
        vehicule:'130TUN2363',
        remorque:'005568',
        client:'Ahmed Belhaj',
        voyage:'tunis-sousse',
        datechargement:'17-06-2022',
        datedechargement:'18-06-2022',
        montantht:'180',
        etat:'facturé',
    },
];

/* END MUI */

function Transport() {

    const [ open, setOpen ] = useState(false)
    const { url } = useRouteMatch()

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

                <Table sx={{ minWidth: 400, margin: '20px' }} size={'small'}>
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
                                <RowTableCell>{row.refaller}</RowTableCell>
                                <RowTableCell>{row.datecreation}</RowTableCell>
                                <RowTableCell>{row.chauffeur}</RowTableCell>
                                <RowTableCell><span className={'matricule'}>{row.vehicule}</span></RowTableCell>
                                <RowTableCell>{row.remorque}</RowTableCell>
                                <RowTableCell>{row.client}</RowTableCell>
                                <RowTableCell><span className={'matricule'}>{row.voyage}</span></RowTableCell>
                                <RowTableCell>{row.datechargement}</RowTableCell>
                                <RowTableCell>{row.datedechargement}</RowTableCell>
                                <RowTableCell>{row.montantht} D.T</RowTableCell>

                                <RowTableCell>{row.etat === 'facturé' ? <span className={'green'}>{row.etat}</span> :
                                    <span className={'red'}>{row.etat}</span> }
                                </RowTableCell>

                                <RowTableCell>
                                    <Link to={`${url}/${row.code}`}><FontAwesomeIcon icon={ faArrowUpRightFromSquare } className='details-icon'/></Link>
                                </RowTableCell>
                                <RowTableCell>
                                    <ActionButtonEdit>
                                        <FontAwesomeIcon onClick={() => setOpen(true)} icon={ faPenToSquare } className='btn btn-edit' />
                                    </ActionButtonEdit>
                                    <ActionButtonDelete>
                                        <FontAwesomeIcon icon={ faTrashCan } className='btn btn-delete' />
                                    </ActionButtonDelete>
                                </RowTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* END MUI */}

            <AjoutDossierVoyage open={open} setOpen={setOpen} />
        </Container>
    );
  }
  
  export default Transport