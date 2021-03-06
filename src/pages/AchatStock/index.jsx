import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowUpRightFromSquare, faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import AjoutDocument from '../../components/AddDocumentForm'
import {Link, useRouteMatch} from "react-router-dom"
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
} from "@mui/material"
import axios from 'axios'
import { baseURL, headers } from '../../services/service'


const Title = styled.span`
    color: #000;
    font-family: 'Montserrat', sans-serif;
    font-size: 24px; 
    font-weight: bolder;
`

const Container = styled.div`
  margin: 0px;
  padding: 0px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 15px 0;
`

const CardCont = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 20px 0;
  box-sizing: border-box;
`

const Card = styled.div`
  box-sizing: border-box;
  flex-basis: 23%;
  background-color: #FFF;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.25);
  padding: 20px;
  /*font-family: 'Montserrat', sans-serif;*/
  font-family: 'Bebas Neue';
  font-size: 18px;
  border-bottom: 2px solid #373B54;
  /*font-weight: bold;*/

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
  }

  .title {
    color: #C4C4C4;
  }

  .ratio-total {
    color: #000;
  }

  .ratio-ventes {
    color: #6D52ED;
  }

  .ratio-achats {
    color: #4BF2B5;
  }

  .ratio-attente {
    color: #F12559;
  }

  .value {
    color: #000;
  }
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

// const data = [
//   {
//     id:'ST001268',
//     type:'achat',
//     date:'20-05-2022',
//     num:'00142355',
//     codetiers:'00140235',
//   },
// ];

/* END MUI */

function AchatStock() {
  const [ open, setOpen ] = useState(false)
  const [ openedit, setOpenedit ] = useState(false)

  /* Start API */
  const [ data, setData ] = useState([])
  const [ user , setUser ] = useState()
  const [ id, setId ] = useState(0)
  /* End API */

  const { url } = useRouteMatch()

  /* Start API */

  useEffect(() => {
    retrieveAllData()
  },[open,openedit])

  const retrieveAllData = () => {
      axios
          .get(`${baseURL}/contrat-location/`, {
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
          .delete(`${baseURL}/contrat-location/${id}/`, {
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
        <Header>
          <Title>Achat et ventes</Title>
        </Header>
        <CardCont>
          <Card>
            <div className='header'>
              <span className='title'>Nombre total</span>
              <span className='ratio-total'>100%</span>
            </div>
            <span className='value'>50</span>
          </Card>
          <Card>
            <div className='header'>
              <span className='title'>Ventes</span>
              <span className='ratio-ventes'>70%</span>
            </div>
            <span className='value'>35</span>
          </Card>
          <Card>
            <div className='header'>
              <span className='title'>Achats</span>
              <span className='ratio-achats'>20%</span>
            </div>
            <span className='value'>10</span>
          </Card>
          <Card>
            <div className='header'>
              <span className='title'>En attente</span>
              <span className='ratio-attente'>10%</span>
            </div>
            <span className='value'>5</span>
          </Card>
        </CardCont>
        {/*<TableCont>
            <caption>Liste des documents achats/ventes</caption><br/>
            <AddBtn onClick={() => setBtnPopup(true)}>+ Ajouter</AddBtn>
            <SearchInput placeholder='Rechercher ...'/>
            <br/>
            <br/>
            <table>
              <tbody>
              <tr>
                <th></th>
                <th>#</th>
                <th>Type</th>
                <th>Date</th>
                <th>Num??ro</th>
                <th>Code tiers</th>
                <th>Actions</th>
              </tr>

              <tr>
                <td>
                  <input type='checkbox' />
                </td>
                <td>1</td>
                <td>Achat</td>
                <td>30/03/2022</td>
                <td>1253</td>
                <td>00123569</td>
                <td className='action-btns'>
                   <span className='details'>D??tails</span>
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

        <TableContainer
            /*sx={{width: 1155}}*/
            component={Paper}
        >
          <Typography
              sx={{ flex: '1 1 100%', margin: '20px', position: 'relative' }}
              variant="h6"
              id="tableTitle"
              component="div"
          >
            Liste des documents/factures
            <AddBtn
                sx={{ position: 'sticky', marginLeft: '300px'  }}
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
                <StyledTableCell><span>Type</span></StyledTableCell>
                <StyledTableCell><span>Date</span></StyledTableCell>
                <StyledTableCell><span>Num??ro</span></StyledTableCell>
                <StyledTableCell><span>Code_tiers</span></StyledTableCell>

                <StyledTableCell><span>Details</span></StyledTableCell>
                <StyledTableCell><span>Actions</span></StyledTableCell>

              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((row) =>(
                  <TableRow hover={true}>

                    <RowTableCell><input type='checkbox' /></RowTableCell>
                    <RowTableCell>{row.id}</RowTableCell>
                    <RowTableCell>{row.type}</RowTableCell>
                    <RowTableCell>{row.date}</RowTableCell>
                    <RowTableCell>{row.num}</RowTableCell>
                    <RowTableCell>{row.codetiers}</RowTableCell>

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

        <AjoutDocument open={open} setOpen={setOpen} />

      </Container>
    )
  }
  
  export default AchatStock