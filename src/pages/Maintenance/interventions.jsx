import styled from 'styled-components'
import {useState} from "react";
import {Link, useRouteMatch} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare, faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import AjoutDemande from "../../components/AddDemandeInterventionForm";
import AjoutIntervention from "../../components/AddInterventionForm";
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
        id:'IT1256',
        matricule:'123TUN1452',
        datedebut:'10-08-2020',
        datefin:'10-09-2020',
        objet:'diagnostique moteur',
        entreprise:'peugeot',
        montantmoht:'250',
        montantpht:'500',
        montanttotalht:'750',
        collaborateur:'Mohamed Salhi',
    },
];

/* END MUI */

function Interventions() {

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
                    Liste des interventions
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
                            <StyledTableCell><span>Immatriculation</span></StyledTableCell>
                            <StyledTableCell><span>Date_début</span></StyledTableCell>
                            <StyledTableCell><span>Date_fin</span></StyledTableCell>
                            <StyledTableCell><span>Objet</span></StyledTableCell>
                            <StyledTableCell><span>Entreprise</span></StyledTableCell>
                            <StyledTableCell><span>Montant_MO_HT</span></StyledTableCell>
                            <StyledTableCell><span>Montant_pièces_HT</span></StyledTableCell>
                            <StyledTableCell><span>Montant_total_HT</span></StyledTableCell>
                            <StyledTableCell><span>Collaborateur</span></StyledTableCell>

                            <StyledTableCell><span>Details</span></StyledTableCell>
                            <StyledTableCell><span>Actions</span></StyledTableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.map((row) =>(
                            <TableRow hover={true}>

                                <RowTableCell><input type='checkbox' /></RowTableCell>
                                <RowTableCell>{row.id}</RowTableCell>
                                <RowTableCell><span className={'matricule'}>{row.matricule}</span></RowTableCell>
                                <RowTableCell>{row.datedebut}</RowTableCell>
                                <RowTableCell>{row.datefin}</RowTableCell>
                                <RowTableCell>{row.objet}</RowTableCell>
                                <RowTableCell>{row.entreprise}</RowTableCell>
                                <RowTableCell>{row.montantmoht}</RowTableCell>
                                <RowTableCell>{row.montantpht}</RowTableCell>
                                <RowTableCell>{row.montanttotalht}</RowTableCell>
                                <RowTableCell>{row.collaborateur}</RowTableCell>

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

            <AjoutIntervention open={open} setOpen={setOpen} />
        </Container>
    );
}

export default Interventions