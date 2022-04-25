import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import AjoutPersonne from '../../components/AddPersonnelForm'
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

const Title = styled.span`
  color: #000;
  font-family: 'Montserrat', sans-serif;
  font-size: 24px; 
  font-weight: bolder;
`

const Container = styled.div`
  margin: 0px;
  padding: 0px;

  .tab-act-cont {
    display: flex;
    justify-content: space-between;
  }
`

/*const AddBtn = styled.button`
  background-color: #4BF2B5;
  border: none;
  color: #FFF;
  width: 87px;
  height: 33px;
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: bold;
  position: absolute;
  right: 15px;
  cursor: pointer;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 15px 0;
`

const TableCont = styled.div`
  box-sizing: border-box;
  background-color: #FFF;
  width: 69%;
  padding: 15px;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.25);
  font-family: 'Montserrat', sans-serif;
  position: relative;
  border-bottom: 2px solid #373B54;

  caption {
    text-align: left;
    padding-bottom: 25px;
    display: inline-block;
    font-weight: bolder;
    font-size: 20px;
  }

  table {
    width: 100%;
    text-align: left;
    border-collapse: collapse;
    table-layout: auto;
    font-size: 12px;
  }

  tr:not(:first-of-type) {
    &:hover {
      background-color: #E5E5E5;
    }
  }

  th {
    color: #FFF;
    background-color: #00F;
    padding: 10px 0;
    border-bottom:1px solid #E3F1D5;
    font-weight: bolder;
  }

  td {
    color: #000;
    font-family: 'Bebas Neue';
    padding: 7px 5px;
    border-bottom:1px solid #E3F1D5;
  }

  td .details-icon {
    color: #6D52ED;
  }

  .etat {
    padding: 5px 10px;
    border-radius: 15px;
  }

  .dispo {
    background-color: #e5fdf4;
    color: #00ed96;
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
    justify-content: space-around;
  }

  .details {
    display: block;
    border: 1px solid #000;
    padding: 5px;
    cursor: pointer;
    &:hover {
      background-color: #000;
      color: #FFF;
    }
  }
`

const SearchInput = styled.input`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: bold;
  padding: 10px;
  border: 1px solid #C4C4C4;
  width: 220px;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border: 1px solid #000;
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

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;

  div {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #6D52ED;
  border-radius: 10px;
  width: 25%;
  padding: 5px;
  margin: 5px;

  span {
  display: inline-block;
  text-align: center;
  height: 20px;
  width: 20px;
  margin: 5px;
  border-radius: 2px;
    &:hover {
      background-color: #6D52ED;
      color: #FFF;
    }
  }

.selected,.ext {
    background-color: #6D52ED;
    color: #FFF;
  }
}
`

const RecentActivity = styled.div`
  box-sizing: border-box;
  background-color: #FFF;
  width: 30%;
  padding: 0px;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.25);
  font-family: 'Montserrat', sans-serif;
  position: relative;
  border-bottom: 2px solid #373B54;

  .caption {
    text-align: left;
    padding-bottom: 25px;
    margin: 15px;
    display: inline-block;
    font-weight: bolder;
    font-size: 20px;
  }

  table {
    width: 100%;
    text-align: center;
  }

  th {
    color: #C4C4C4;
    padding: 10px 0;
    border-bottom:1px solid #E3F1D5;
    font-weight: bolder;
    }

  td {
    color: #000;
    font-family: 'Bebas Neue';
    padding: 15px;
    border-bottom:1px solid #E3F1D5;
    }
`*/

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
    id:'12356',
    nom:'Mohamed',
    prenom:'Ben Mohamed',
    datenaissance:'10-08-1986',
    telephone:'92350393',
    cin:'12121212',
    qualification:'Chauffeur',
    salaire:'1000',
    typepermis:'A+C',
  },
];

/* END MUI */

function Personnel() {
  const [ open, setOpen ] = useState(false)
  const { url } = useRouteMatch()

  return (
    <Container>
      <div className='tab-act-cont'>
        {/*<TableCont>
            <caption>Liste du personnel</caption><br/>
            <AddBtn onClick={() => setBtnPopup(true)}>+ Ajouter</AddBtn>
            <SearchInput placeholder='Rechercher ...'/>
            <br/>
            <br/>
            <table>
              <tbody>
              <tr>
                <th></th>
                <th>#</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Date naissance</th>
                <th>Téléphone</th>
                <th>CIN</th>
                <th>Qualification</th>
                <th>Salaire</th>
                <th>Type permis</th>
                <th>Détails</th>
                <th>Actions</th>
              </tr>

              <tr>
                <td><input type='checkbox' /></td>
                <td>1</td>
                <td>Mohamed</td>
                <td>Bouallegui</td>
                <td>10/10/1996</td>
                <td>92350393</td>
                <td>12121212</td>
                <td>Mécanicien</td>
                <td>10.000</td>
                <td>C</td>
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
            Liste du personnel
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
                <StyledTableCell><span>Nom</span></StyledTableCell>
                <StyledTableCell><span>Prénom</span></StyledTableCell>
                <StyledTableCell><span>Date naissance</span></StyledTableCell>
                <StyledTableCell><span>Téléphone</span></StyledTableCell>
                <StyledTableCell><span>CIN</span></StyledTableCell>
                <StyledTableCell><span>Qualification</span></StyledTableCell>
                <StyledTableCell><span>Salaire</span></StyledTableCell>
                <StyledTableCell><span>Type permis</span></StyledTableCell>

                <StyledTableCell><span>Details</span></StyledTableCell>
                <StyledTableCell><span>Actions</span></StyledTableCell>

              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((row) =>(
                  <TableRow hover={true}>
                    <RowTableCell><input type='checkbox' /></RowTableCell>
                    <RowTableCell>{row.id}</RowTableCell>
                    <RowTableCell>{row.nom}</RowTableCell>
                    <RowTableCell>{row.prenom}</RowTableCell>
                    <RowTableCell>{row.datenaissance}</RowTableCell>
                    <RowTableCell>{row.telephone}</RowTableCell>
                    <RowTableCell>{row.cin}</RowTableCell>
                    <RowTableCell>{row.qualification}</RowTableCell>
                    <RowTableCell>{row.salaire}</RowTableCell>
                    <RowTableCell>{row.typepermis}</RowTableCell>
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

        {/*<RecentActivity>
          <h1 className="caption">Activité récente</h1>
          <table>
            <tr>
              <th>Utilisateur</th>
              <th>Activité</th>
              <th>Net</th>
            </tr>

            <tr>
              <td>Amjed Bouallegui</td>
              <td>Recharge carburant</td>
              <td>- 50 D.T</td>
            </tr>
            <tr>
              <td>Iheb Massaoudi</td>
              <td>Recharge carburant</td>
              <td>- 50 D.T</td>
            </tr>
            <tr>
              <td>Ali Ben Salah</td>
              <td>Recharge carburant</td>
              <td>- 50 D.T</td>
            </tr>
            <tr>
              <td>Amel Ayari</td>
              <td>Recharge carburant</td>
              <td>- 50 D.T</td>
            </tr>
            <tr>
              <td>Youssef Msekni</td>
              <td>Recharge carburant</td>
              <td>- 50 D.T</td>
            </tr>
          </table>
        </RecentActivity>*/}
      </div>
      
      <AjoutPersonne open={open} setOpen={setOpen} />
    </Container>
  )
}
  
export default Personnel