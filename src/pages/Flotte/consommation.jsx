import styled from "styled-components";
import {useState} from "react";
import {Link, useRouteMatch} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare, faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";

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
    {id:1, mois:'04/2022', vehicule:'120TUN5236', type:'camion', kilometrage:'145236', consototal:'20536', conso: '2.5'},
    {id:2, mois:'05/2022', vehicule:'135TUN1022', type:'camion', kilometrage:'145236', consototal:'245356', conso: '1.5'},
];

function ConsommationFlotte() {
    const [ btnPopup, setBtnPopup ] = useState(false)
    const { url } = useRouteMatch()
    let id = 1, id1 = 2, id2 = 3;

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
                    Liste de consommation carburant
                    <AddBtn
                        sx={{ position: 'absolute', right: '15px'  }}
                        variant="outlined"
                        size={"small"}
                        onClick={() => setBtnPopup(true)}
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
                            <StyledTableCell><span>Mois</span></StyledTableCell>
                            <StyledTableCell><span>Véhicule</span></StyledTableCell>
                            <StyledTableCell><span>Type</span></StyledTableCell>
                            <StyledTableCell><span>Kilométrage</span></StyledTableCell>
                            <StyledTableCell><span>Consommation totale (l)</span></StyledTableCell>
                            <StyledTableCell><span>Consommation (l/km)</span></StyledTableCell>
                            <StyledTableCell><span>Details</span></StyledTableCell>
                            <StyledTableCell><span>Actions</span></StyledTableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.map((row) =>(
                            <TableRow hover={true}>
                                <RowTableCell><input type='checkbox' /></RowTableCell>
                                <RowTableCell>{row.id}</RowTableCell>
                                <RowTableCell>{row.mois}</RowTableCell>
                                <RowTableCell><span className={'matricule'}>{row.vehicule}</span></RowTableCell>
                                <RowTableCell>{row.type}</RowTableCell>
                                <RowTableCell>{row.kilometrage}</RowTableCell>
                                <RowTableCell>{row.consototal}</RowTableCell>
                                <RowTableCell>{row.conso}</RowTableCell>
                                <RowTableCell>
                                    <Link to={`${url}/${row.id}`}><FontAwesomeIcon icon={ faArrowUpRightFromSquare } className='details-icon'/></Link>
                                </RowTableCell>
                                <RowTableCell>
                                    <ActionButtonEdit>
                                        <FontAwesomeIcon onClick={() => setBtnPopup(true)} icon={ faPenToSquare } className='btn btn-edit' />
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

export default ConsommationFlotte