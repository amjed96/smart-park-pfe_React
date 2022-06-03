import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import Truck from '../../assets/truck.png'
import axios from "axios"
import { baseURL, headers } from "../../services/service"

const Container = styled.div`
  margin: 0px;
  padding: 0px;
`

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


function FlotteDetails() {

    const { id } = useParams()
    const [ data, setData ] = useState()
    const [ contrat, setContrat ] = useState()

    const retrieveData = () => {
      axios
        .get(`${baseURL}/vehicule/${id}`, {
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

    const retrieveContrat = () => {
      axios
        .get(`${baseURL}/contrat-achat/?vehicule=${data.vehicule}`, {
          /*headers: {
            headers,
          },*/
        })
        .then((response) => {
          setContrat(response.data)
          console.log(data)
        })
        .catch((e) => {
          console.log(e)
        })
    }

    useEffect(()=>{
      retrieveData()
      // if(data!=null){
      //   retrieveContrat()
      // }
    },[])

    // useEffect(()=>{
    //   retrieveContrat()
    // },[data])

    return(
        <Container>
            <CardCont>
                <Card>
                    <div className='header'>
                        <span className='title'>Détails véhicule</span>
                    </div>
                    <VehicImg alt={'Camion'} src={Truck} />
                    <h2 className={'titre'}>Immatriculation</h2>
                    <span className={'value'}>{data && data.immatriculation}</span>
                    <h2 className={'titre'}>N° de série</h2>
                    <span className={'value'}>{data && data.num_serie}</span>
                    <h2 className={'titre'}>Kilométrage</h2>
                    <span className={'value'}>{data && data.kilometrage}</span>
                    <h2 className={'titre'}>Moteur</h2>
                    <span className={'value'}>{data && data.engin}</span>
                    <h2 className={'titre'}>Consommation (mois)</h2>
                    <span className={'value'}>{data && data.consommation} L</span>
                    <h2 className={'titre'}>Entretien</h2>
                    <span className={'value'}>{data && data.entretien}</span>
                </Card>
                <Card>
                    <div className='header'>
                        <span className='title'>Carte grise</span>
                    </div>
                    <h2 className={'titre'}>Constructeur</h2>
                    <span className={'value'}>{data && data.constructeur}</span>
                    <h2 className={'titre'}>Type commercial</h2>
                    <span className={'value'}>{data && data.type_commercial}</span>
                    <h2 className={'titre'}>Activité</h2>
                    <span className={'value'}>{data && data.activite}</span>
                    <h2 className={'titre'}>Genre</h2>
                    <span className={'value'}>{data && data.genre}</span>
                    <h2 className={'titre'}>Date PMC</h2>
                    <span className={'value'}>{data && data.date_pmc}</span>
                    <h2 className={'titre'}>Puissance fiscale</h2>
                    <span className={'value'}>{data && data.puissance_fiscale}</span>
                    <h2 className={'titre'}>Carrosserie</h2>
                    <span className={'value'}>{data && data.carrosserie}</span>
                    <h2 className={'titre'}>Charge utile</h2>
                    <span className={'value'}>{data && data.charge_utile}</span>
                </Card>

                <Card>
                    <div className='header'>
                        <span className='title'>Contrat de vente</span>
                    </div>
                    <h2 className={'titre'}>#</h2>
                    <span className={'value'}>{contrat && contrat.id}</span>
                    <h2 className={'titre'}>Date</h2>
                    <span className={'value'}>10-09-2021</span>
                    <h2 className={'titre'}>Marque</h2>
                    <span className={'value'}>Iveco</span>
                    <h2 className={'titre'}>Modèle</h2>
                    <span className={'value'}>Iveco</span>
                    <h2 className={'titre'}>Chassis</h2>
                    <span className={'value'}>123FE5164</span>
                    <h2 className={'titre'}>Moteur</h2>
                    <span className={'value'}>Essence</span>
                    <h2 className={'titre'}>Prix</h2>
                    <span className={'value'}>50 000 D.T</span>
                </Card>
            </CardCont>
        </Container>
    )
}

export default FlotteDetails