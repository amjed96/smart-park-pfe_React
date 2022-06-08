import { useState, useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import Truck from "../../assets/truck.png";
import Profil from "../../assets/profileDefault.jpg";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare, faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import axios from "axios"
import { baseURL, headers } from "../../services/service"
import moment from 'moment'


// const CardCont = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
//   width: 100%;
//   margin: 20px 0;
//   box-sizing: border-box;
// `

// const VehicImg = styled.img`
//   height: 100px;
// `

// const ProfileImg = styled.img`
//   height: 80px;
//   border: none;
//   border-radius: 50%;
// `

// const Card = styled.div`
//   box-sizing: border-box;
//   flex-basis: 49%;
//   background-color: #FFF;
//   box-shadow: 0px 4px 10px rgba(0,0,0,0.25);
//   padding: 20px;
//   margin-bottom: 10px;
//   /*font-family: 'Montserrat', sans-serif;*/
//   font-family: 'Bebas Neue', sans-serif;
//   font-size: 18px;
//   border-bottom: 2px solid #373B54;
//   /*font-weight: bold;*/

//   .header {
//     display: flex;
//     justify-content: space-between;
//     margin-bottom: 25px;
//   }

//   .title {
//     color: #000;
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

//   .titre {
//     font-family: Arial;
//     color: #000;
//     font-size: 16px;
//     font-weight: bold;
//   }

//   .value {
//     font-family: Arial;
//     color: #000;
//     font-size: 16px;
//     font-weight: lighter;
//   }
// `

// /* ##### */

// const Title = styled.span`
//   color: #000;
//   font-family: 'Montserrat', sans-serif;
//   font-size: 24px;
//   font-weight: bolder;
// `

// const Container = styled.div`
//   margin: 0px;
//   padding: 0px;

//   .tab-act-cont {
//     display: flex;
//     justify-content: space-between;
//   }
// `

// const AddBtn = styled.button`
//   background-color: #4BF2B5;
//   border: none;
//   color: #FFF;
//   width: 87px;
//   height: 33px;
//   font-family: 'Montserrat', sans-serif;
//   font-size: 12px;
//   font-weight: bold;
//   position: absolute;
//   right: 15px;
//   cursor: pointer;
// `

// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   width: 100%;
//   margin: 15px 0;
// `

// const TableCont = styled.div`
//   box-sizing: border-box;
//   background-color: #FFF;
//   width: 100%;
//   padding: 15px;
//   font-family: 'Montserrat', sans-serif;
//   position: relative;
//   border-bottom: 2px solid #373B54;

//   caption {
//     text-align: left;
//     padding-bottom: 25px;
//     display: inline-block;
//     font-weight: bolder;
//     font-size: 20px;
//   }

//   table {
//     width: 100%;
//     text-align: left;
//     border-collapse: collapse;
//     table-layout: auto;
//     font-size: 16px;
//   }

//   tr:not(:first-of-type) {
//     &:hover {
//       background-color: #E5E5E5;
//     }
//   }

//   th {
//     color: #FFF;
//     background-color: #00F;
//     padding: 10px 0;
//     border-bottom:1px solid #E3F1D5;
//     font-weight: bolder;
//   }

//   td {
//     color: #000;
//     font-family: 'Bebas Neue';
//     padding: 7px 5px;
//     border-bottom:1px solid #E3F1D5;
//   }

//   td .details-icon {
//     color: #6D52ED;
//   }

//   .etat {
//     padding: 5px 10px;
//     border-radius: 15px;
//   }

//   .dispo {
//     background-color: #e5fdf4;
//     color: #00ed96;
//   }

//   .panne {
//     background-color: #fde9ee;
//     color: #f12559;
//   }

//   .occupe {
//     background-color: #fdf8e9;
//     color: #f1be25;
//   }

//   .action-btns {
//     display: flex;
//     justify-content: space-around;
//   }

//   .details {
//     display: block;
//     border: 1px solid #000;
//     padding: 5px;
//     cursor: pointer;
//     &:hover {
//       background-color: #000;
//       color: #FFF;
//     }
//   }
// `

// const SearchInput = styled.input`
//   font-family: 'Montserrat', sans-serif;
//   font-size: 14px;
//   font-weight: bold;
//   padding: 10px;
//   border: 1px solid #C4C4C4;
//   width: 220px;
//   box-sizing: border-box;
//   &:focus {
//     outline: none;
//     border: 1px solid #000;
//   }
// `

// const ActionButtonEdit = styled.button`
// width: 30px;
// height: 30px;
// border: 1px solid #2cd2f6;
// background-color: #e9fafe;
// cursor: pointer;
// &:hover {
//   background-color: #2cd2f6;
//   .btn-edit {
//     color: #FFF;
//   }
// }
//   .btn-edit {
//     color: #2cd2f6;
//   }
// `

// const ActionButtonDelete = styled.button`
// width: 30px;
// height: 30px;
// border: 1px solid #f12559;
// background-color: #fde9ee;
// cursor: pointer;
// &:hover {
// background-color: #f12559;
//   .btn-delete {
//     color: #FFF;
//   }
// }
// .btn-delete {
//   color: #f12559;
// }
// `

// const Pagination = styled.div`
//   display: flex;
//   justify-content: flex-end;

//   div {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-weight: bold;
//   color: #6D52ED;
//   border-radius: 10px;
//   width: 25%;
//   padding: 5px;
//   margin: 5px;

//   span {
//   display: inline-block;
//   text-align: center;
//   height: 20px;
//   width: 20px;
//   margin: 5px;
//   border-radius: 2px;
//     &:hover {
//       background-color: #6D52ED;
//       color: #FFF;
//     }
//   }

// .selected,.ext {
//     background-color: #6D52ED;
//     color: #FFF;
//   }
// }
// `

// const RecentActivity = styled.div`
//   box-sizing: border-box;
//   background-color: #FFF;
//   width: 30%;
//   padding: 0px;
//   box-shadow: 0px 4px 10px rgba(0,0,0,0.25);
//   font-family: 'Montserrat', sans-serif;
//   position: relative;
//   border-bottom: 2px solid #373B54;

//   .caption {
//     text-align: left;
//     padding-bottom: 25px;
//     margin: 15px;
//     display: inline-block;
//     font-weight: bolder;
//     font-size: 20px;
//   }

//   table {
//     width: 100%;
//     text-align: center;
//   }

//   th {
//     color: #C4C4C4;
//     padding: 10px 0;
//     border-bottom:1px solid #E3F1D5;
//     font-weight: bolder;
//     }

//   td {
//     color: #000;
//     font-family: 'Bebas Neue';
//     padding: 15px;
//     border-bottom:1px solid #E3F1D5;
//     }
// `

/* /##### */

function PersonnelDetails() {

    const { personnelId } = useParams()
    const [ data, setData ] = useState()
    const [ datas, setDatas ] = useState(data)

    const visites = []

    const [ edit, setEdit ] = useState(false)

    const getDate = (date) => {
      return moment(date).format('DD/MM/YYYY HH:mm')
    }

    const retrieveData = () => {
      axios
        .get(`${baseURL}/personnel/${personnelId}/retrieve_details/`, {
          /*headers: {
            headers,
          },*/
        })
        .then((response) => {
          setData(response.data)
          if(response.data.visites_personnel) {
            visites = response.data.visites_personnel
          }
          console.log('HERE: '+data)
        })
        .catch((e) => {
          console.log(e)
        })
    }

    const updateDatas = () => {
      let dataed = {
        // id: data.id,
        // last_login: data.last_login,
        // is_superuser: data.is_superuser,
        first_name: data.first_name,
        last_name: data.last_name,
        // is_staff: data.is_staff,
        // is_active: data.is_active,
        // date_joined: data.date_joined,
        cin: data.cin,
        date_naissance: data.date_naissance,
        telephone: data.telephone,
        qualification: data.qualification,
        type_permis: data.type_permis,
        username: data.username,
        // password: data.password,
        email: data.email,
        // affecte: data.affecte,
        // groups: data.groups,
        // user_permissions: data.user_permissions,
        // permis_personnel: data.permis_personnel,
        // passeport_personnel: data.passeport_peronnel,
        // visites_personnel: data.visites_personnel
      }
      axios
        .patch(`${baseURL}/personnel/${personnelId}/`, dataed, {
          /*headers: {
            headers,
          },*/
        })
        .then((response) => {
          retrieveData()
          // setSubmitted(true);
          console.log(response.data);
        })
        .catch((e) => {
          console.error(e);
        });
    }

    const handleDataChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value })
      console.log(value)
    }

    useEffect(() => {
      retrieveData()
    },[])

    return(

      <div className="container">
        <div className="row">
          
          <div className="col-xl-3 col-sm-3 col-12">
            <div className="card mb-1">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div className="align-self-center ml-1">
                    <i className="bi bi-person text-success fa-3x"></i>
                  </div>
                  <div className="text-start">
                    <h4>{data && data.first_name} {data && data.last_name}</h4>
                    <p className="mb-0">{data && data.qualification}</p>
                  </div>
                </div>
              </div>
            </div>

            {/*A COMPLETER */}
            <div className="card">
              <div className="card-header bg-success text-light">
                <h5>Engin affecté</h5>
              </div>
              <div className="card-body">
                {data && data.affecte === true ?
                  ''
                  : '(Aucun)'
                }
                {/* {data && data.visites_personnel ? 
                  <table>
                  data.visites_personnel.map(v => {
                    <tr>
                      <td>{v.date && v.date}</td>
                      <td>{v.diagnostique && v.diagnostique}</td>
                    </tr>
                  })
                  </table>
                : '(Aucune)'} */}
              </div>
            </div>

            {/*FIX WIDTH*/}
            <div className="card mt-1">
              <div className="card-header bg-danger text-light">
                Visites médicales
              </div>
              <div className="card-body">
              {data && data.visites_personnel !== null ? (
                  <table className="table">
                    <thead>
                      <th>
                        <td>Date</td>
                        <td>Diagnostique</td>
                      </th>
                    </thead>
                    <tbody>
                    {data.visites_personnel && data.visites_personnel.map(v => (
                      <tr>
                        <td>{v.date && v.date}</td>
                        <td>{v.diagnostique && v.diagnostique}</td>
                      </tr>))
                    }
                    </tbody>
                  </table>)
                : '(Aucune)'}
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-sm-6 col-12">
            <div className="card">
              <div className="card-header">
                <div className="text-start">
                  <h3>Détails {data && data.first_name} {data && data.last_name}</h3>
                </div>
              </div>
              <div className="card-body">
                <div className="float-end">
                  {edit ? <button onClick={()=>{updateDatas();setEdit(false)}} className="btn btn-success">Enregistrer </button> :
                    <button onClick={()=>setEdit(true)} className="btn btn-primary">Modifier <i class="bi bi-pencil-square"></i></button>
                  }
                </div>
                <div className="text-start">
                  <h5>Nom d'utilisateur</h5>
                  {edit ? 
                    <input className="form-control" name={'username'} onChange={handleDataChange} placeholder="Nom d'utilisateur" value={data && data.username ? data.username:''} /> : 
                      <p>{data && data.username ? data.username : 'N.D'}</p>
                  }
                                    
                  <h5>Nom et prénom</h5>
                  {edit ? <><input className="form-control" name={'first_name'} onChange={handleDataChange} placeholder="Prénom" value={data && data.first_name ? data.first_name:''} />
                          <input className="form-control" name={'last_name'} onChange={handleDataChange} placeholder="Nom" value={data && data.first_name ? data.last_name:''} /></>
                  :
                    <p>
                      {data && data.first_name ? data.first_name : 'N.D'} 
                      {data && data.last_name ? data.last_name : 'N.D'}
                    </p>
                  }
                  
                  <h5>Dernière activité</h5>
                  <p>{data && data.last_login ? getDate(data.last_login) : 'N.D'}</p>
                  
                  <h5>Date d'ajout</h5>
                  <p>{data && data.date_joined ? getDate(data.date_joined) : 'N.D'}</p>
                  
                  <h5>CIN</h5>
                  {edit ? <input className="form-control" name={'cin'} onChange={handleDataChange} placeholder="Cin" type={'number'} value={data && data.cin ? data.cin:''} />
                  : <p>{data && data.cin ? data.cin : 'N.D'}</p>
                  }
                  
                  <h5>Date de naissance</h5>
                  {edit ? <input className="form-control" name={'date_naissance'} onChange={handleDataChange} placeholder="Date de naissance" type={'date'} value={data && data.date_naissance ? data.date_naissance:''} />
                  : <p>{data && data.date_naissance ? data.date_naissance : 'N.D'}</p>
                  }

                  <h5>Téléphone</h5>
                  {edit ? <input className="form-control" name={'telephone'} onChange={handleDataChange} placeholder="Telephone" type={'number'} value={data && data.telephone ? data.telephone:''} />
                  : <p>{data && data.telephone ? data.telephone : 'N.D'}</p>
                  }

                  <h5>Email</h5>
                  {edit ? <input className="form-control" name={'email'} onChange={handleDataChange} placeholder="Email" type={'email'} value={data && data.email ? data.email:''} />
                  : <p>{data && data.email ? data.email : 'N.D'}</p>
                  }

                  <h5>Qualification</h5>
                  {edit ?
                    /*To complete initial value*/
                  (<select className="form-select" onChange={(e,newValue)=>{data.qualification=e.target.value}}>
                    <option value={''}>-- Qualification --</option>
                    <option value={'Chef de parc'}>Chef de parc</option>
                    <option value={'Chauffeur'}>Chauffeur</option>
                    <option value={'Chauffeur poids lourd'}>Chauffeur poids lourd</option>
                    <option value={'Mécanicien'}>Mécanicien</option>
                    <option value={'Gardien'}>Gardien</option>
                  </select>)
                  : <p>{data && data.qualification ? data.qualification : 'N.D'}</p>
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-3 col-12">
            <div className="card mb-1">
              <div className="card-header">
                <div className="text-start">
                  <h6>Permis</h6>
                </div>
              </div>
              <div className="card-body">
                {
                  data && data.permis_personnel !== null ? (<>
                    <h5>Référence</h5>
                    <p>{data.permis_personnel && data.permis_personnel.reference ? data.permis_personnel.reference : 'N.D'}</p>
                    <h5>Date</h5>
                    <p>{data.permis_personnel && data.permis_personnel.date ? data.permis_personnel.date : 'N.D'}</p>
                    <h5>Type</h5>
                    <p>{data.permis_personnel && data.permis_personnel.type ? data.permis_personnel.type : 'N.D'}</p>
                  </>): 'N.D'
                }
              </div>
            </div>
            <div className="card mb-1">
              <div className="card-header">
                <div className="text-start">
                  <h6>Passeport</h6>
                </div>
              </div>
              <div className="card-body">
                {
                  data && data.passeport_personnel !== null ? (<>
                    <h5>Numéro</h5>
                    <p>{data.passeport_personnel && data.passeport_personnel.numero ? data.passeport_personnel.numero : 'N.D'}</p>
                    <h5>Type</h5>
                    <p>{data.passeport_personnel && data.passeport_personnel.type ? data.passeport_personnel.type : 'N.D'}</p>
                    <h5>Nationalité</h5>
                    <p>{data.passeport_personnel && data.passeport_personnel.nationalite ? data.passeport_personnel.nationalite : 'N.D'}</p>
                    <h5>Adresse de naissance</h5>
                    <p>{data.passeport_personnel && data.passeport_personnel.adresse_naissance ? data.passeport_personnel.adresse_naissance : 'N.D'}</p>
                    <h5>Authorité d'édition</h5>
                    <p>{data.passeport_personnel && data.passeport_personnel.authorite_edition ? data.passeport_personnel.authorite_edition : 'N.D'}</p>
                    <h5>Date d'édition</h5>
                    <p>{data.passeport_personnel && data.passeport_personnel.date_edition ? data.passeport_personnel.date_edition : 'N.D'}</p>
                    <h5>Date d'expiration</h5>
                    <p>{data.passeport_personnel && data.passeport_personnel.date_expiration ? data.passeport_personnel.date_expiration : 'N.D'}</p>
                    
                  </>): 'N.D'
                }
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-3 col-12">
            
          </div>
        </div>
      </div>

        // <Container>
        //     <CardCont>
        //         <Card>
        //             <div className='header'>
        //                 <span className='title'>Personnel: {data && data.username}</span>
        //             </div>
        //             <ProfileImg alt={'profil'} src={Profil} />
        //             <h2 className={'titre'}>Nom</h2>
        //             <span className={'value'}>{data && data.last_name}</span>
        //             <h2 className={'titre'}>Prénom</h2>
        //             <span className={'value'}>{data && data.first_name}</span>
        //             <h2 className={'titre'}>Date de naissance</h2>
        //             <span className={'value'}>{data && data.date_naissance}</span>
        //             <h2 className={'titre'}>Téléphone</h2>
        //             <span className={'value'}>{data && data.telephone}</span>
        //             <h2 className={'titre'}>CIN</h2>
        //             <span className={'value'}>{data && data.cin}</span>
        //             <h2 className={'titre'}>Email</h2>
        //             <span className={'value'}>{data && data.email}</span>
        //         </Card>

        //         <Card>
        //             <div className='header'>
        //                 <span className='title'>Passeport</span>
        //             </div>
        //             {/* <h2 className={'titre'}>Num°</h2>
        //             <span className={'value'}>12CF1235</span>
        //             <h2 className={'titre'}>Type</h2>
        //             <span className={'value'}>/</span>
        //             <h2 className={'titre'}>Nationalité</h2>
        //             <span className={'value'}>Tunisienne</span>
        //             <h2 className={'titre'}>Adresse de naissance</h2>
        //             <span className={'value'}>Tunis</span>
        //             <h2 className={'titre'}>Profession</h2>
        //             <span className={'value'}>Ingénieur</span>
        //             <h2 className={'titre'}>N° national</h2>
        //             <span className={'value'}>02020202</span>
        //             <h2 className={'titre'}>Sexe</h2>
        //             <span className={'value'}>Masculin</span>
        //             <h2 className={'titre'}>Date d'édition</h2>
        //             <span className={'value'}>12-03-2015</span>
        //             <h2 className={'titre'}>Date d'expiration</h2>
        //             <span className={'value'}>12-03-2020</span> */}
        //         </Card>

        //         <Card>
        //             <div className='header'>
        //                 <span className='title'>Visites médicales</span>
        //             </div>
        //             {/* <TableCont>
        //                 <table>
        //                     <tbody>
        //                     <tr>
        //                         <th>#</th>
        //                         <th>Date</th>
        //                         <th>Diagnostique</th>
        //                         <th>Ordonnance</th>
        //                     </tr>

        //                     <tr>
        //                         <td>VM001253</td>
        //                         <td>10/10/2021</td>
        //                         <td>Grippe</td>
        //                         <td>OR001253</td>
        //                     </tr>

        //                     <tr>
        //                         <td>VM001254</td>
        //                         <td>10/12/2021</td>
        //                         <td>Branchite</td>
        //                         <td>OR001254</td>
        //                     </tr>

        //                     </tbody>
        //                 </table>
        //             </TableCont> */}
        //         </Card>
        //     </CardCont>
        // </Container>
    )
}

export default PersonnelDetails