import { useState, useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import Truck from "../../assets/truck.png";
import Profil from "../../assets/profileDefault.jpg";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare, faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import axios from "axios"
import { baseURL, headers } from "../../services/service"


const CardCont = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin: 20px 0;
  box-sizing: border-box;
`

const VehicImg = styled.img`
  height: 100px;
`

const ProfileImg = styled.img`
  height: 80px;
  border: none;
  border-radius: 50%;
`

const Card = styled.div`
  box-sizing: border-box;
  flex-basis: 49%;
  background-color: #FFF;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.25);
  padding: 20px;
  margin-bottom: 10px;
  /*font-family: 'Montserrat', sans-serif;*/
  font-family: 'Bebas Neue', sans-serif;
  font-size: 18px;
  border-bottom: 2px solid #373B54;
  /*font-weight: bold;*/

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
  }

  .title {
    color: #000;
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

  .titre {
    font-family: Arial;
    color: #000;
    font-size: 16px;
    font-weight: bold;
  }

  .value {
    font-family: Arial;
    color: #000;
    font-size: 16px;
    font-weight: lighter;
  }
`

/* ##### */

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
  width: 100%;
  padding: 15px;
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
    font-size: 16px;
  }

  tr:not(:first-of-type) {
    &:hover {
      background-color: #E5E5E5;
    }
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
    font-family: 'Bebas Neue';
    padding: 7px 5px;
    border-bottom:1px solid #E3F1D5;
  }

  td .details-icon {
    color: #6D52ED;
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
  width: 30%;
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

/* /##### */

function PersonnelDetails() {

    const { personnelId } = useParams()
    const [ data, setData ] = useState()

    const retrieveData = () => {
      axios
        .get(`${baseURL}/personnel/${personnelId}`, {
          /*headers: {
            headers,
          },*/
        })
        .then((response) => {
          setData(response.data)
          console.log(data)
        })
        .catch((e) => {
          console.log(e)
        })
    }

    useEffect(() => {
      retrieveData()
    },[])

    return(
        <Container>
            <CardCont>
                <Card>
                    <div className='header'>
                        <span className='title'>Personnel: {data && data.username}</span>
                    </div>
                    <ProfileImg alt={'profil'} src={Profil} />
                    <h2 className={'titre'}>Nom</h2>
                    <span className={'value'}>{data && data.last_name}</span>
                    <h2 className={'titre'}>Prénom</h2>
                    <span className={'value'}>{data && data.first_name}</span>
                    <h2 className={'titre'}>Date de naissance</h2>
                    <span className={'value'}>{data && data.date_naissance}</span>
                    <h2 className={'titre'}>Téléphone</h2>
                    <span className={'value'}>{data && data.telephone}</span>
                    <h2 className={'titre'}>CIN</h2>
                    <span className={'value'}>{data && data.cin}</span>
                    <h2 className={'titre'}>Email</h2>
                    <span className={'value'}>{data && data.email}</span>
                </Card>

                <Card>
                    <div className='header'>
                        <span className='title'>Passeport</span>
                    </div>
                    {/* <h2 className={'titre'}>Num°</h2>
                    <span className={'value'}>12CF1235</span>
                    <h2 className={'titre'}>Type</h2>
                    <span className={'value'}>/</span>
                    <h2 className={'titre'}>Nationalité</h2>
                    <span className={'value'}>Tunisienne</span>
                    <h2 className={'titre'}>Adresse de naissance</h2>
                    <span className={'value'}>Tunis</span>
                    <h2 className={'titre'}>Profession</h2>
                    <span className={'value'}>Ingénieur</span>
                    <h2 className={'titre'}>N° national</h2>
                    <span className={'value'}>02020202</span>
                    <h2 className={'titre'}>Sexe</h2>
                    <span className={'value'}>Masculin</span>
                    <h2 className={'titre'}>Date d'édition</h2>
                    <span className={'value'}>12-03-2015</span>
                    <h2 className={'titre'}>Date d'expiration</h2>
                    <span className={'value'}>12-03-2020</span> */}
                </Card>

                <Card>
                    <div className='header'>
                        <span className='title'>Visites médicales</span>
                    </div>
                    {/* <TableCont>
                        <table>
                            <tbody>
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Diagnostique</th>
                                <th>Ordonnance</th>
                            </tr>

                            <tr>
                                <td>VM001253</td>
                                <td>10/10/2021</td>
                                <td>Grippe</td>
                                <td>OR001253</td>
                            </tr>

                            <tr>
                                <td>VM001254</td>
                                <td>10/12/2021</td>
                                <td>Branchite</td>
                                <td>OR001254</td>
                            </tr>

                            </tbody>
                        </table>
                    </TableCont> */}
                </Card>
            </CardCont>
        </Container>
    )
}

export default PersonnelDetails