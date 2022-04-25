import styled from "styled-components";
import {useState} from "react";
import {Link, useRouteMatch} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare, faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import AjoutContratVente from "../../components/AddContratVente";
import AjoutContratLocation from "../../components/AddContratLocationFlotteForm";
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
    {id:1, date:'20/04/2022', vendeur:'Mohamed Ali', matricule:'120TUN5231', marque:'Volvo', modele:'Volvo', chassis: '1254RFG523', moteur:'essence', prix:'120 000'},
    {id:2, date:'15/06/2022', vendeur:'Amjed Bouallegui', matricule:'135TUN8466', marque:'Volvo', modele:'Volvo', chassis: '5236CHG514', moteur:'diesel', prix:'52 000'},
];

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
    const [ open1, setOpen1 ] = useState(false)
    const { url } = useRouteMatch()

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

                <Table sx={{ minWidth: 700, margin: '20px' }} size={"small"}>
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
                        {data.map((row) =>(
                            <TableRow hover={true}>
                                <RowTableCell><input type='checkbox' /></RowTableCell>
                                <RowTableCell>{row.id}</RowTableCell>
                                <RowTableCell>{row.date}</RowTableCell>
                                <RowTableCell>{row.vendeur}</RowTableCell>
                                <RowTableCell><span className={'matricule'}>{row.matricule}</span></RowTableCell>
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

                <Table sx={{ minWidth: 700, margin: '20px' }} size={"small"}>
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
                        {data1.map((row) =>(
                            <TableRow hover={true}>
                                <RowTableCell><input type='checkbox' /></RowTableCell>
                                <RowTableCell>{row.id}</RowTableCell>
                                <RowTableCell><span className={'matricule'}>{row.matricule}</span></RowTableCell>
                                <RowTableCell>{row.datedebut}</RowTableCell>
                                <RowTableCell>{row.datefin}</RowTableCell>
                                <RowTableCell>{row.marque}</RowTableCell>
                                <RowTableCell>{row.modele}</RowTableCell>
                                <RowTableCell>{row.prix} D.T</RowTableCell>
                                <RowTableCell>
                                    <Link to={`${url}/${row.id}`}><FontAwesomeIcon icon={ faArrowUpRightFromSquare } className='details-icon'/></Link>
                                </RowTableCell>
                                <RowTableCell>
                                    <ActionButtonEdit>
                                        <FontAwesomeIcon onClick={() => setOpen1(true)} icon={ faPenToSquare } className='btn btn-edit' />
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

            <AjoutContratVente open={open} setOpen={setOpen} />
            <AjoutContratLocation open={open1} setOpen={setOpen1} />

        </Container>
    )
}

export default ContratsFlotte