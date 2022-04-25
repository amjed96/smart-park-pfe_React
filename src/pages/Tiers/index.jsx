import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowUpRightFromSquare, faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import AjoutClient from '../../components/AddClientForm'
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

/*
const Title = styled.span`
    color: #000;
    font-family: 'Montserrat', sans-serif;
    font-size: 24px; 
    font-weight: bolder;
`
*/

const Container = styled.div`
  margin: 0px;
  padding: 0px;
`
/*
const AddBtn = styled.button`
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
`*/

// const CardCont = styled.div`
//   display: flex;
//   justify-content: space-between;
//   width: 100%;
//   margin: 20px 0;
//   box-sizing: border-box;
// `

// const Card = styled.div`
//   box-sizing: border-box;
//   flex-basis: 23%;
//   background-color: #FFF;
//   box-shadow: 0px 4px 10px rgba(0,0,0,0.25);
//   padding: 20px;
//   /*font-family: 'Montserrat', sans-serif;*/
//   font-family: 'Bebas Neue';
//   font-size: 18px;
//   border-bottom: 2px solid #373B54;
//   /*font-weight: bold;*/

//   .header {
//     display: flex;
//     justify-content: space-between;
//     margin-bottom: 25px;
//   }

//   .title {
//     color: #C4C4C4;
//   }

//   .ratio-total {
//     color: #000;
//   }

//   .ratio-occ {
//     color: #6D52ED;
//   }

//   .ratio-dispo {
//     color: #4BF2B5;
//   }

//   .ratio-panne {
//     color: #F12559;
//   }

//   .value {
//     color: #000;
//   }
// `
/*
const TableCont = styled.div`
  box-sizing: border-box;
  background-color: #FFF;
  width: 100%;
  padding: 15px;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.25);
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
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
  }

  tr:not(:first-of-type) {
    &:hover {
      background-color: #E5E5E5;
    }
  }
  
  tr:nth-child(odd) {
    background-color: #E5E5E5;
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
    font-family: 'Bebas Neue', sans-serif;
    padding: 7px 5px;
    border-bottom:1px solid #E3F1D5;
  }

  .etat {
    padding: 5px 10px;
    border-radius: 15px;
  }

  .client {
    background-color: #e5fdf4;
    color: #00ed96;
  }

  .panne {
    background-color: #fde9ee;
    color: #f12559;
  }

  .fournisseur {
    background-color: #fdf8e9;
    color: #f1be25;
  }

  .action-btns {
    display: flex;
    justify-content: space-evenly;
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
    compte:'CL0012',
    intitule:'SATEM',
    abrege:'SATEM',
    comptecollectif:'411001',
    qualite:'(N.D)',
    interlocuteur:'Mohamed Selmi',
    commentaire:'//',
  },
];

/* END MUI */

function Clients() {

  const [ open, setOpen ] = useState(false)
    const { url } = useRouteMatch()

    return (
      <Container>
        {/*<Header>
          <Title>Clients</Title>
        </Header>
        <TableCont>
            <caption>Liste des clients</caption><br/>
            <AddBtn onClick={() => setBtnPopup(true)}>+ Ajouter</AddBtn>
            <SearchInput placeholder='Rechercher ...'/>
            <br/>
            <br/>
            <table>
              <tbody>
              <tr>
                <th></th>
                <th>Compte</th>
                <th>Intitulé</th>
                <th>Abrégé</th>
                <th>Compte collectif</th>
                <th>Qualité</th>
                <th>Interlocuteur</th>
                <th>Commentaire</th>
                <th>Détails</th>
                <th>Actions</th>
              </tr>

              <tr>
                <td>
                  <input type='checkbox' />
                </td>
                <td>CL00003</td>
                <td>SATEM</td>
                <td>SATEM</td>
                <td>411000</td>
                <td>(N.D)</td>
                <td>Mohamed Ben Ali</td>
                <td>//</td>
                <td><Link to={`${url}/clients/${id}`}><FontAwesomeIcon icon={ faArrowUpRightFromSquare } className='details-icon'/></Link></td>
                <td className='action-btns'>
                   <span className='details'>Détails</span>
                  <ActionButtonEdit>
                    <FontAwesomeIcon onClick={() => setBtnPopup(true)} icon={ faPenToSquare } className='btn btn-edit' />
                  </ActionButtonEdit>
                  <ActionButtonDelete>
                    <FontAwesomeIcon icon={ faTrashCan } className='btn btn-delete' />
                  </ActionButtonDelete>
                </td>
              </tr>

              <tr>
                <td>
                  <input type='checkbox' />
                </td>
                <td>CL00004</td>
                <td>DEV-FUTURE</td>
                <td>DEV-FUTURE</td>
                <td>411001</td>
                <td>(N.D)</td>
                <td>Ouays Bouallegui</td>
                <td>//</td>
                <td><Link to={`${url}/clients/${id}`}><FontAwesomeIcon icon={ faArrowUpRightFromSquare } className='details-icon'/></Link></td>
                <td className='action-btns'>
                   <span className='details'>Détails</span>
                  <ActionButtonEdit>
                    <FontAwesomeIcon icon={ faPenToSquare } className='btn btn-edit' />
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
            Liste des clients
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
                <StyledTableCell><span>Compte</span></StyledTableCell>
                <StyledTableCell><span>Intitulé</span></StyledTableCell>
                <StyledTableCell><span>Abrégé</span></StyledTableCell>
                <StyledTableCell><span>Compte_collectif</span></StyledTableCell>
                <StyledTableCell><span>Qualité</span></StyledTableCell>
                <StyledTableCell><span>Interlocuteur</span></StyledTableCell>
                <StyledTableCell><span>Commentaire</span></StyledTableCell>

                <StyledTableCell><span>Details</span></StyledTableCell>
                <StyledTableCell><span>Actions</span></StyledTableCell>

              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((row) =>(
                  <TableRow hover={true}>

                    <RowTableCell><input type='checkbox' /></RowTableCell>
                    <RowTableCell>{row.compte}</RowTableCell>
                    <RowTableCell>{row.intitule}</RowTableCell>
                    <RowTableCell>{row.abrege}</RowTableCell>
                    <RowTableCell>{row.comptecollectif}</RowTableCell>
                    <RowTableCell>{row.qualite}</RowTableCell>
                    <RowTableCell>{row.interlocuteur}</RowTableCell>
                    <RowTableCell>{row.commentaire}</RowTableCell>

                    <RowTableCell>
                      <Link to={`${url}/${row.compte}`}><FontAwesomeIcon icon={ faArrowUpRightFromSquare } className='details-icon'/></Link>
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

        {/*<AjoutClient trigger={btnPopup} setTrigger={setBtnPopup} />*/}
      </Container>
    )
  }
  
  export default Clients