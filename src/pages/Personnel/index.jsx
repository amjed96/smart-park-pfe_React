import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import AjoutPersonne from '../../components/AddPersonnelForm'
import { useState, useEffect } from 'react'
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
import axios from 'axios'
import { baseURL, headers } from '../../services/service'
import EditPersonnel from '../../components/AddPersonnelForm/edit'

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

/* END MUI */

function Personnel() {
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
          .get(`${baseURL}/personnel/`, {
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
          .delete(`${baseURL}/personnel/${id}/`, {
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
  }

/* End API */

  return (
    <Container>
      <div className='tab-act-cont'>

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

          <Table sx={{ width: '96%', margin: '20px' }} size={'small'}>
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
                    <RowTableCell>{row.last_name}</RowTableCell>
                    <RowTableCell>{row.first_name}</RowTableCell>
                    <RowTableCell>{row.date_naissance}</RowTableCell>
                    <RowTableCell>{row.telephone}</RowTableCell>
                    <RowTableCell>{row.cin}</RowTableCell>
                    <RowTableCell>{row.qualification}</RowTableCell>
                    <RowTableCell>{row.salaire}</RowTableCell>
                    <RowTableCell>{row.type_permis}</RowTableCell>
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

      </div>
      
      <AjoutPersonne open={open} setOpen={setOpen} />
      <EditPersonnel openedit={openedit} setOpenedit={setOpenedit} id={id} />
    </Container>
  )
}
  
export default Personnel