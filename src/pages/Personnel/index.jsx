import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import AjoutPersonne from '../../components/AddPersonnelForm'
import { useState } from 'react'

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

const TableCont = styled.div`
  box-sizing: border-box;
  background-color: #FFF;
  width: 60%;
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
    color: #C4C4C4;
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
  width: 39%;
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
`

function Personnel() {
  const [ btnPopup, setBtnPopup ] = useState(false)

  return (
    <Container>
      <Header>
        <Title>Personnel</Title>
      </Header>
      <div className='tab-act-cont'>
        <TableCont>
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
                <th>CIN</th>
                <th>Poste</th>
                <th>Salaire</th>
                <th>Actions</th>
              </tr>

              <tr>
                <td><input type='checkbox' /></td>
                <td>1</td>
                <td>120532</td>
                <td>Essence</td>
                <td>10.000</td>
                <td>10.000</td>
                <td>3</td>
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
        <RecentActivity>
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
        </RecentActivity>
      </div>
      
      <AjoutPersonne trigger={btnPopup} setTrigger={setBtnPopup} />
    </Container>
  )
}
  
export default Personnel