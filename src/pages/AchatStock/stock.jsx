import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowUpRightFromSquare, faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import AjoutStock from '../../components/AddStockForm';
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

const TableCont = styled.div`
  box-sizing: border-box;
  background-color: #FFF;
  width: 100%;
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
  }

  tr:not(:first-of-type) {
    &:hover {
      background-color: #E5E5E5;
    }
  }

  th {
    color: #FFF;
    background-color: blue;
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

  td .green {
    color: #00ed96;
  }

  td .red {
    color: #f12559;
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
    justify-content: flex-start;
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
  margin-right: 10px;
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

function Stock() {
    const [ btnPopup, setBtnPopup ] = useState(false)
    const { url } = useRouteMatch()
    let id = 1, id1 = 2, id2 = 3;

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
            </CardCont>*/}
            <TableCont>
                <caption>Liste de stock</caption><br/>
                <AddBtn onClick={() => setBtnPopup(true)}>+ Ajouter</AddBtn>
                <SearchInput placeholder='Rechercher ...'/>
                <br/>
                <br/>
                <table>
                    <tbody>
                    <tr>
                        <th></th>
                        <th>Réf</th>
                        <th>Article</th>
                        <th>Code casier</th>
                        <th>Catégorie</th>
                        <th>Date d'achat</th>
                        <th>Quantité</th>
                        <th>Unité</th>
                        <th>Détails</th>
                        <th>Actions</th>
                    </tr>

                    <tr>
                        <td>
                            <input type='checkbox' />
                        </td>
                        <td>AR001235</td>
                        <td>Bougie</td>
                        <td>CS002456</td>
                        <td>Mécanique</td>
                        <td>02-04-2022</td>
                        <td>10</td>
                        <td>Pièce</td>
                        <td><Link to={`${url}/${id1}`}><FontAwesomeIcon icon={ faArrowUpRightFromSquare } className='details-icon'/></Link></td>
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
            </TableCont>
            <AjoutStock trigger={btnPopup} setTrigger={setBtnPopup} />
        </Container>
    )
}

export default Stock