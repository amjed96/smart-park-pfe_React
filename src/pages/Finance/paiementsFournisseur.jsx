import styled from "styled-components";
import {useState} from "react";
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
} from "@mui/material";

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

const data = [
    {
        id:'PF001256',
        date:'28-05-2022',
        typepaiement:'versement',
        montant:'15000',
        fournisseur:'Mohamed Mhamdi',
        numfacture:'FR001234',
        datefacture:'20-05-2022',
        montantttc:'15500',
        montantpaye:'10000',
    },
];

/* END MUI */

function PaiementsFournisseur() {
    const [ open, setOpen ] = useState(false)
    const { url } = useRouteMatch()

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
                    Liste des encaissements client
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
                            <StyledTableCell><span>#</span></StyledTableCell>
                            <StyledTableCell><span>Date</span></StyledTableCell>
                            <StyledTableCell><span>Type_paiement</span></StyledTableCell>
                            <StyledTableCell><span>Montant</span></StyledTableCell>
                            <StyledTableCell><span>Fournisseur</span></StyledTableCell>
                            <StyledTableCell><span>Num°_facture</span></StyledTableCell>
                            <StyledTableCell><span>Date_facture</span></StyledTableCell>
                            <StyledTableCell><span>Montant_TTC</span></StyledTableCell>
                            <StyledTableCell><span>Montant_payé</span></StyledTableCell>

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
                                <RowTableCell>{row.typepaiement}</RowTableCell>
                                <RowTableCell>{row.montant} D.T</RowTableCell>
                                <RowTableCell>{row.fournisseur}</RowTableCell>
                                <RowTableCell>{row.numfacture}</RowTableCell>
                                <RowTableCell>{row.datefacture}</RowTableCell>
                                <RowTableCell>{row.montantttc} D.T</RowTableCell>
                                <RowTableCell>{row.montantpaye} D.T</RowTableCell>

                                <RowTableCell>
                                    <Link to={`${url}/${row.id}`}><FontAwesomeIcon icon={ faArrowUpRightFromSquare } className='details-icon'/></Link>
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

            {/*<AjoutFlotte trigger={btnPopup} setTrigger={setBtnPopup} />*/}
        </Container>
    )
}

export default PaiementsFournisseur