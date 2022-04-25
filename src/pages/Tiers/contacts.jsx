import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import AjoutContact from "../../components/AddContactForm";
import {Link, useRouteMatch} from "react-router-dom";

const Title = styled.span`
    color: #000;
    font-family: 'Montserrat', sans-serif;
    font-size: 24px; 
    font-weight: bolder;
`

const Container = styled.div`
  margin: 0px;
  padding: 0px;
  .second {
    width: 60%;
  }
`

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
`

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
  margin-bottom: 20px;

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
`

function Contacts() {

    const [ btnPopup, setBtnPopup ] = useState(false)
    const { url } = useRouteMatch()
    let id = 1;

    return (
        <Container>
            <Header>
                <Title>Contacts</Title>
            </Header>
            <TableCont>
                <caption>Liste des contacts</caption><br/>
                <AddBtn onClick={() => setBtnPopup(true)}>+ Ajouter</AddBtn>
                <SearchInput placeholder='Rechercher ...'/>
                <br/>
                <br/>
                <table>
                    <tbody>
                    <tr>
                        <th></th>
                        <th>Type</th>
                        <th>Civilité</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Service</th>
                        <th>Fonction</th>
                        <th>Téléphone</th>
                        <th>Portable</th>
                        <th>Télécopie</th>
                        <th>Skype</th>
                        <th>LinkedIn</th>
                        <th>Facebook</th>
                        <th>E-mail</th>
                        <th>Détails</th>
                        <th>Actions</th>
                    </tr>

                    <tr>
                        <td>
                            <input type='checkbox' />
                        </td>
                        <td>Interlocuteur</td>
                        <td>M.</td>
                        <td>Messaoudi</td>
                        <td>Iheb</td>
                        <td>RH</td>
                        <td>Chef département</td>
                        <td>71717171</td>
                        <td>98989898</td>
                        <td>//</td>
                        <td>iheb.msd</td>
                        <td>Iheb Messaoudi</td>
                        <td>Iheb Messaoudi</td>
                        <td>iheb.messaoudi@esprit.tn</td>
                        <td><Link to={`${url}/${id}`}><FontAwesomeIcon icon={ faArrowUpRightFromSquare } className='details-icon'/></Link></td>
                        <td className='action-btns'>
                            {/* <span className='details'>Détails</span> */}
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
            </TableCont>
            <TableCont className='second'> {/* A y penser */}
                <caption>Liste des contacts par client/fournisseur</caption><br/>
                <SearchInput placeholder='Rechercher ...'/>
                <br/>
                <br/>
                <table>
                    <tbody>
                    <tr>
                        <th></th>
                        <th>Code Tier</th>
                        <th>Nom Contact</th>
                        <th>Prénom Contact</th>
                        <th>Téléphone</th>
                        <th>E-mail</th>
                        <th>Détails</th>
                    </tr>

                    <tr>
                        <td>
                            <input type='checkbox' />
                        </td>
                        <td>411001</td>
                        <td>Messaoudi</td>
                        <td>Iheb</td>
                        <td>98989898</td>
                        <td>iheb.messaoudi@esprit.tn</td>
                        <td><Link to={`${url}/${id}`}><FontAwesomeIcon icon={ faArrowUpRightFromSquare } className='details-icon'/></Link></td>
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
            </TableCont>
            <AjoutContact trigger={btnPopup} setTrigger={setBtnPopup} />
        </Container>
    )
}

export default Contacts