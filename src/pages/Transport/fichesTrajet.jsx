import styled from "styled-components";
import { useState, useEffect } from "react";
import {Link, useRouteMatch} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare, faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import AjoutFournisseur from "../../components/AddFournisseurForm";
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
import AjoutFicheTrajet from "../../components/AddFicheTrajetForm";
import axios from "axios"
import { baseURL, headers } from "../../services/service"
import EditFicheTrajet from "../../components/AddFicheTrajetForm/edit";


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

// const data = [
//     {
//         id:'DI1256',
//         nom:'Mohamed Mohamed',
//         client:'Ali Ben Ali',
//         marchandise:'Fer',
//         trajet:'tunis-mahdia',
//         unite:'tonne',
//         typeprestation:'/',
//         categorie:'materiaux construction',
//         datedebut:'20-05-2022',
//         datefin:'21-05-2022',
//         prix:'5000',
//         prixretour:'500',
//     },
// ];

/* END MUI */

function Designation() {

    const [ open, setOpen ] = useState(false)
    const [ openedit, setOpenedit ] = useState(false)

    /* Start API */
    const [ data, setData ] = useState([])
    const [ user , setUser ] = useState()
    const [ id, setId ] = useState(0)
    /* End API */

    /* Start API */

    useEffect(() => {
      retrieveAllData()
    },[open,openedit])

    const retrieveAllData = () => {
        axios
            .get(`${baseURL}/fiche-trajet-get/`, {
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
            .delete(`${baseURL}/fiche-trajet/${id}/`, {
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

    const { url } = useRouteMatch()

    return (
        <Container>
            {/* START MUI */}

            <TableContainer
                sx={{width: 1155}}
                component={Paper}
            >
                <Typography
                    sx={{ flex: '1 1 100%', margin: '20px', position: 'relative' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Liste des fiches trajet
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
                            <StyledTableCell><span>Client</span></StyledTableCell>
                            <StyledTableCell><span>Marchandise</span></StyledTableCell>
                            <StyledTableCell><span>Trajet</span></StyledTableCell>
                            <StyledTableCell><span>Unité</span></StyledTableCell>
                            <StyledTableCell><span>Type_prestation</span></StyledTableCell>
                            <StyledTableCell><span>Catégorie</span></StyledTableCell>
                            <StyledTableCell><span>Date_début</span></StyledTableCell>
                            <StyledTableCell><span>Date_fin</span></StyledTableCell>
                            <StyledTableCell><span>Prix</span></StyledTableCell>
                            <StyledTableCell><span>Prix_retour</span></StyledTableCell>

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
                                <RowTableCell>{row.client ? row.client.intitule : 'N.D'}</RowTableCell>
                                <RowTableCell>{row.marchandise}</RowTableCell>
                                <RowTableCell><span className={'matricule'}>{row.trajet}</span></RowTableCell>
                                <RowTableCell>{row.unite}</RowTableCell>
                                <RowTableCell>{row.type_prestation}</RowTableCell>
                                <RowTableCell>{row.categorie}</RowTableCell>
                                <RowTableCell>{row.date_debut}</RowTableCell>
                                <RowTableCell>{row.date_fin}</RowTableCell>
                                <RowTableCell>{row.prix} D.T</RowTableCell>
                                <RowTableCell>{row.prix_retour} D.T</RowTableCell>

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

            <AjoutFicheTrajet open={open} setOpen={setOpen} />
            <EditFicheTrajet openedit={openedit} setOpenedit={setOpenedit} id={id} />
        </Container>
    );
}

export default Designation