import styled from 'styled-components'
import { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faPenToSquare, faTrashCan, faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import AjoutDemandeGarage from "../../components/AddDemandeInterventionGarageForm";
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
import { baseURL, headers } from '../../services/service';
import EditDemandeGarage from '../../components/AddDemandeInterventionGarageForm/edit';


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

/* END MUI */

function Garage() {
  const [ open, setOpen ] = useState(false)
  const [ openedit, setOpenedit ] = useState(false)

  /* Start API */
  const [ data, setData ] = useState([])
  const [ user , setUser ] = useState()
  const [ id, setId ] = useState(0)
  /* End API */

  const { url } = useRouteMatch()

  /* Start API */

  const retrieveAllData = () => {
      axios
          .get(`${baseURL}/demande-intervention-garage/`, {
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
          .delete(`${baseURL}/demande-intervention-garage/${id}/`, {
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

  const cloturerDemande = (id) => {
    axios
      .post(`${baseURL}/demande-intervention-garage/${id}/cloturer/`, {
        /*headers: {
          headers,
        },*/
      })
      .then((response) => {
        retrieveAllData();
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const annulerClotureDemande = (id) => {
    axios.
      post(`${baseURL}/demande-intervention-garage/${id}/annuler/`, {
        /*headers: {
          headers,
        },*/
      })
      .then((response) => {
        retrieveAllData()
      })
      .catch((e) => {
        console.error(e)
      })
  }

  useEffect(() => {
        retrieveAllData()
      },[open,openedit])

  /* End API */

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
                  Liste des demandes d'intervention
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
                          <StyledTableCell><span>Date demande</span></StyledTableCell>
                          <StyledTableCell><span>Immatriculation</span></StyledTableCell>
                          <StyledTableCell><span>Type</span></StyledTableCell>
                          <StyledTableCell><span>Description</span></StyledTableCell>
                          <StyledTableCell><span>Etat</span></StyledTableCell>

                          <StyledTableCell><span>Clôturer/Annuler</span></StyledTableCell>

                          <StyledTableCell><span>Details</span></StyledTableCell>
                          <StyledTableCell><span>Actions</span></StyledTableCell>

                      </TableRow>
                  </TableHead>

                  <TableBody>
                      {data.map((row) =>(
                          <TableRow hover={true}>

                              <RowTableCell><input type='checkbox' /></RowTableCell>
                              <RowTableCell>{row.id}</RowTableCell>
                              <RowTableCell>{row.date_demande}</RowTableCell>
                              <RowTableCell><span className={'matricule'}>{row.vehicule}</span></RowTableCell>
                              <RowTableCell>{row.type === 'préventive' ? <span className={'green'}>{row.type}</span> :
                                  <span className={'red'}>{row.type}</span>}</RowTableCell>
                              <RowTableCell>{row.description}</RowTableCell>
                              <RowTableCell>{row.etat ? <span className={'red'}>en cours</span> :
                                  <span className={'green'}>clôturée</span> }
                              </RowTableCell>

                              <RowTableCell>
                              {row.etat ? <Button sx={{ color: 'green' }} onClick={() => cloturerDemande(row.id)}><FontAwesomeIcon icon={faCircleCheck} className='btn' /></Button>
                                  : <Button sx={{ color: 'red' }} onClick={() => annulerClotureDemande(row.id)}><FontAwesomeIcon icon={faCircleXmark} className='btn' /></Button>}
                              </RowTableCell>

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

          <AjoutDemandeGarage open={open} setOpen={setOpen} />
          <EditDemandeGarage openedit={openedit} setOpenedit={setOpenedit} id={id} />
      </Container>
  );
  }
  
  export default Garage