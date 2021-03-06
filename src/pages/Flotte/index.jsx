import axios from 'axios'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import AjoutFlotte from '../../components/AddFlotteForm'
import { useState, useEffect } from 'react'
import { Link, useRouteMatch } from "react-router-dom";
import {
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Typography, 
    TextField
} from "@mui/material";
import { baseURL, headers } from "../../services/service"
import EditFlotte from '../../components/AddFlotteForm/edit'
import DeleteDialog from '../../components/DeleteDialog'


const Container = styled.div`
  margin: 0px;
  padding: 0px;
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
  font-family: 'Bebas Neue', sans-serif;
  font-size: 18px;
  border-bottom: 2px solid #373B54;

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

  .ratio-occ {
    color: #6D52ED;
  }

  .ratio-dispo {
    color: #4BF2B5;
  }

  .ratio-panne {
    color: #F12559;
  }

  .value {
    color: #000;
  }
`

const TableCont = styled.div`
  box-sizing: border-box;
  background-color: #FFF;
  width: 100%;
  padding: 15px;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.25);
  font-family: 'Roboto', sans-serif;
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
  
  tr:nth-child(odd) {
    background-color: #E5E5E5;
  }

  tr:not(:first-of-type) {
    &:hover {
      background-color: #C4C4C4;
    }
  }

  th {
    color: #FFF;
    padding: 10px 0;
    border-bottom:1px solid #E3F1D5;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    background-color: #00F;
  }

  td {
    color: #000;
    font-family: Roboto, sans-serif;
    font-size: 12px;
    padding: 2px;
    border-bottom:1px solid #E3F1D5;
  }
  
  td .details-icon {
    color: #6D52ED;
  }

  .etat {
    padding: 5px 10px;
    border-radius: 15px;
    font-weight: bold;
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


/*const data = [
    {
        matricule:'120TUN2536',
        serie:'12653',
        kilometrage:'125436',
        moteur:'essence',
        consommation:'2L/Km',
        entretien:'5',
        etat:'disponible'
    },
    {matricule:'125TUN1220',serie:'25638',kilometrage:'25036',moteur:'diesel',consommation:'1.5L/Km', entretien:'3', etat:'occupe'},
    {matricule:'182TUN5234',serie:'84652',kilometrage:'5468',moteur:'diesel',consommation:'1.5L/Km', entretien:'1', etat:'en panne'},
];*/

/* END MUI */

function Flotte() {
    const [ open, setOpen ] = useState(false)
    const [ openedit, setOpenedit ] = useState(false)
    const [ opendelete, setOpendelete ] = useState(false)

    const [ vehicules, setVehicules ] = useState([])
    const [ id, setId ] = useState(0)
    /*const [ deleted, setDeleted ] = useState(false)*/

    const { url } = useRouteMatch()

    useEffect(() => {
        retrieveAllVehicules()
    },[open,openedit])

    const retrieveAllVehicules = () => {
        axios
            .get(`${baseURL}/vehicule/`, {
            /*headers: {
                headers,
            },*/
        })
            .then((response) => {
                setVehicules(response.data)
            })
            .catch((e) => {
                console.error(e)
            })
    }

    const deleteVehicule = (id) => {
        axios
            .delete(`${baseURL}/vehicule/${id}/`, {
                /*headers: {
                    headers,
                },*/
            })
            .then((response) => {
                /*setDeleted(true);*/
                retrieveAllVehicules();
            })
            .catch((e) => {
                console.error(e);
            });
    };

    return (
      <Container>
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
              <span className='title'>Occup??es</span>
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
        </CardCont>
          {/* START MUI */}

          <TableContainer component={Paper}>
              <Typography
                  sx={{ flex: '1 1 100%', margin: '20px', position: 'relative' }}
                  variant="h6"
                  id="tableTitle"
                  component="div"
              >
                  Liste des engins et v??hicules
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
                        <StyledTableCell><span>Matricule</span></StyledTableCell>
                        <StyledTableCell><span>N?? de s??rie</span></StyledTableCell>
                        <StyledTableCell><span>Kilom??trage</span></StyledTableCell>
                        <StyledTableCell><span>Moteur</span></StyledTableCell>
                        <StyledTableCell><span>Consommation</span></StyledTableCell>
                        <StyledTableCell><span>Entretien</span></StyledTableCell>
                        <StyledTableCell><span>Etat</span></StyledTableCell>
                        <StyledTableCell><span>Details</span></StyledTableCell>
                        <StyledTableCell><span>Actions</span></StyledTableCell>
                    </TableRow>
                </TableHead>

                  <TableBody>
                      { vehicules.map((row) => (
                          <TableRow hover={true} key={row.id}>
                              <RowTableCell><input type='checkbox' /></RowTableCell>
                              <RowTableCell><span className={'matricule'}>{ row.immatriculation }</span></RowTableCell>
                              <RowTableCell>{row.num_serie}</RowTableCell>
                              <RowTableCell>{row.kilometrage}</RowTableCell>
                              <RowTableCell>{row.engin}</RowTableCell>
                              <RowTableCell>{row.consommation}</RowTableCell>
                              <RowTableCell>{row.entretien}</RowTableCell>
                              <RowTableCell>{row.etat === "disponible" ? <span className='etat dispo'>Disponible</span>
                                  : row.etat === "en panne" ? <span className='etat panne'>En panne</span>
                                      : <span className='etat occupe'>Occup??</span> }
                              </RowTableCell>
                              <RowTableCell>
                                  <Link to={`${url}/${row.immatriculation}`}><FontAwesomeIcon icon={ faArrowUpRightFromSquare } className='details-icon'/></Link>
                              </RowTableCell>
                              <RowTableCell>
                                  <ActionButtonEdit>
                                      <FontAwesomeIcon onClick={() => { setId(row.immatriculation);setOpenedit(true) }} icon={ faPenToSquare } className='btn btn-edit' />
                                  </ActionButtonEdit>
                                  <ActionButtonDelete>
                                      <FontAwesomeIcon onClick={() => {setId(row.immatriculation);setOpendelete(true)}} icon={ faTrashCan } className='btn btn-delete' />
                                  </ActionButtonDelete>
                              </RowTableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </TableContainer>
          {/* END MUI */}
          <AjoutFlotte open={open} setOpen={setOpen} />
          <EditFlotte openedit={openedit} setOpenedit={setOpenedit} id={id} />
          <DeleteDialog opendelete={opendelete} setOpendelete={setOpendelete} id={id} deleteData={deleteVehicule} />
      </Container>
    )
  }
  
  export default Flotte