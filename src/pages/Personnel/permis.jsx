import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import AjoutPermis from '../../components/AddPermisForm'
import { useState } from 'react'
import {Link, useRouteMatch} from "react-router-dom";
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
        ref:'12356',
        date:'12-05-2022',
        nom:'Ben Mohamed',
        prenom:'Mohamed',
        typepermis:'A+C',
    },
];

/* END MUI */

function Permis() {
    const [ open, setOpen ] = useState(false)
    const { url } = useRouteMatch()

    return (
        <Container>
            {/*<CardCont>
                <Card>
                    <div className='header'>
                        <span className='title'>Nombre total</span>
                        <span className='ratio-total'>100%</span>
                    </div>
                    <span className='value'>50</span>
                </Card>
                <Card>
                    <div className='header'>
                        <span className='title'>Occupées</span>
                        <span className='ratio-occ'>70%</span>
                    </div>
                    <span className='value'>35</span>
                </Card>
                <Card>
                    <div className='header'>
                        <span className='title'>Disponible</span>
                        <span className='ratio-dispo'>20%</span>
                    </div>
                    <span className='value'>10</span>
                </Card>
                <Card>
                    <div className='header'>
                        <span className='title'>En panne</span>
                        <span className='ratio-panne'>10%</span>
                    </div>
                    <span className='value'>5</span>
                </Card>
            </CardCont>*/}
            {/*<TableCont>
                <caption>Liste des permis</caption><br/>
                <AddBtn onClick={() => setBtnPopup(true)}>+ Ajouter</AddBtn>
                <SearchInput placeholder='Rechercher ...'/>
                <br/>
                <br/>
                <table>
                    <tbody>
                    <tr>
                        <th></th>
                        <th>Réf</th>
                        <th>Date</th>
                        <th>Nom prénom</th>
                        <th>Type permis</th>
                        <th>Details</th>
                        <th>Actions</th>
                    </tr>

                    <tr>

                        <td>
                            <input type='checkbox' />
                        </td>
                        <td>1</td>
                        <td>12-05-2022</td>
                        <td>Foulen Ben Foulen</td>
                        <td>A+C</td>
                        <td><Link to={`${url}/${id}`}><FontAwesomeIcon icon={ faArrowUpRightFromSquare } className='details-icon'/></Link></td>
                        <td className='action-btns'>
                            <ActionButtonEdit>
                                <FontAwesomeIcon onClick={() => setBtnPopup(true)} icon={ faPenToSquare } className='btn btn-edit' />
                            </ActionButtonEdit>
                            <ActionButtonDelete>
                                <FontAwesomeIcon icon={ faTrashCan } className='btn btn-delete' />
                            </ActionButtonDelete>
                        </td>
                    </tr>

                    </tbody>
                </table>
                <Pagination>
                    <div>
                        <span className='ext'>&lt;</span>
                        <span className='selected'>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>...</span>
                        <span>5</span>
                        <span className='ext'>&gt;</span>
                    </div>
                </Pagination>
            </TableCont>*/}

            {/* START MUI */}

            <TableContainer component={Paper}>
                <Typography
                    sx={{ flex: '1 1 100%', margin: '20px', position: 'relative' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Liste des permis
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
                            <StyledTableCell><span>Réf</span></StyledTableCell>
                            <StyledTableCell><span>Date</span></StyledTableCell>
                            <StyledTableCell><span>Nom prénom</span></StyledTableCell>
                            <StyledTableCell><span>Type permis</span></StyledTableCell>

                            <StyledTableCell><span>Details</span></StyledTableCell>
                            <StyledTableCell><span>Actions</span></StyledTableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.map((row) =>(
                            <TableRow hover={true}>
                                <RowTableCell><input type='checkbox' /></RowTableCell>
                                <RowTableCell>{row.ref}</RowTableCell>
                                <RowTableCell>{row.date}</RowTableCell>
                                <RowTableCell>{row.prenom} {row.nom}</RowTableCell>
                                <RowTableCell>{row.typepermis}</RowTableCell>
                                <RowTableCell>
                                    <Link to={`${url}/${row.ref}`}><FontAwesomeIcon icon={ faArrowUpRightFromSquare } className='details-icon'/></Link>
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

            <AjoutPermis open={open} setOpen={setOpen} />
        </Container>
    )
}

export default Permis