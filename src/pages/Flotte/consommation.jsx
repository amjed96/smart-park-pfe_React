import styled from "styled-components";
import {useState, useEffect} from "react";
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
import AjoutConsommation from "../../components/AddConsommationForm";
import { baseURL,headers } from "../../services/service"
import axios from "axios"
import EditConsommation from "../../components/AddConsommationForm/edit";
import DeleteDialog from "../../components/DeleteDialog";


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

function ConsommationFlotte() {
    const [ open, setOpen ] = useState(false)
    const [ openedit, setOpenedit ] = useState(false)
    const [ opendelete, setOpendelete ] = useState(false)

    /* Start API */
    const [ consommation, setConsommation ] = useState([])
    const [ id, setId ] = useState(0)
    /* End API */

    const { url } = useRouteMatch()

    /* Start API */

    useEffect(() => {
      retrieveAllConsommations()
  },[open,openedit])

  const retrieveAllConsommations = () => {
      axios
          .get(`${baseURL}/consommation/`, {
          /*headers: {
              headers,
          },*/
      })
          .then((response) => {
              setConsommation(response.data)
          })
          .catch((e) => {
              console.error(e)
          })
  }

  const deleteConsommation = (id) => {
      axios
          .delete(`${baseURL}/consommation/${id}/`, {
              /*headers: {
                  headers,
              },*/
          })
          .then((response) => {
              /*setDeleted(true);*/
              retrieveAllConsommations();
          })
          .catch((e) => {
              console.error(e);
          });
  };

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
                    Liste de consommation carburant
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

                <Table sx={{ width: '96%', margin: '20px' }} size={"small"}>
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
                        {consommation.map((row) =>(
                            <TableRow hover={true}>
                                <RowTableCell><input type='checkbox' /></RowTableCell>
                                <RowTableCell>{row.id}</RowTableCell>
                                <RowTableCell>{row.mois}</RowTableCell>
                                <RowTableCell><span className={'matricule'}>{row.vehicule}</span></RowTableCell>
                                <RowTableCell>{row.type}</RowTableCell>
                                <RowTableCell>{row.kilometrage}</RowTableCell>
                                <RowTableCell>{row.consommation_totale}</RowTableCell>
                                <RowTableCell>{row.consommation}</RowTableCell>
                                <RowTableCell>
                                    <Link to={`${url}/${row.id}`}><FontAwesomeIcon icon={ faArrowUpRightFromSquare } className='details-icon'/></Link>
                                </RowTableCell>
                                <RowTableCell>
                                    <ActionButtonEdit>
                                        <FontAwesomeIcon onClick={() => { setId(row.id);setOpenedit(true) }} icon={ faPenToSquare } className='btn btn-edit' />
                                    </ActionButtonEdit>
                                    <ActionButtonDelete>
                                        <FontAwesomeIcon onClick={() => {setId(row.id);setOpendelete(true)}} icon={ faTrashCan } className='btn btn-delete' />
                                    </ActionButtonDelete>
                                </RowTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* END MUI */}
            <AjoutConsommation open={open} setOpen={setOpen} />
            <EditConsommation openedit={openedit} setOpenedit={setOpenedit} id={id} />
            <DeleteDialog opendelete={opendelete} setOpendelete={setOpendelete} id={id} deleteData={deleteConsommation} />
        </Container>
    )
}

export default ConsommationFlotte