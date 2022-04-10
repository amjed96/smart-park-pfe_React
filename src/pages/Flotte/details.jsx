import { useParams } from "react-router-dom";
import styled from "styled-components";
import Truck from '../../assets/truck.png';

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

    const { flotteId } = useParams()

    return(
        <Container>
            <CardCont>
                <Card>
                    <div className='header'>
                        <span className='title'>Détails véhicule</span>
                    </div>
                    <VehicImg alt={'Camion'} src={Truck} />
                    <h2 className={'titre'}>Immatriculation</h2>
                    <span className={'value'}>165TUN2533</span>
                    <h2 className={'titre'}>N° de série</h2>
                    <span className={'value'}>00123520</span>
                    <h2 className={'titre'}>Kilométrage</h2>
                    <span className={'value'}>123 520</span>
                    <h2 className={'titre'}>Engin</h2>
                    <span className={'value'}>Essence</span>
                    <h2 className={'titre'}>Consommation (mois)</h2>
                    <span className={'value'}>20 000 L</span>
                    <h2 className={'titre'}>Entretien</h2>
                    <span className={'value'}>N/A</span>
                </Card>
                <Card>
                    <div className='header'>
                        <span className='title'>Carte grise</span>
                    </div>
                    <h2 className={'titre'}>Immatriculation</h2>
                    <span className={'value'}>165TUN2533</span>
                </Card>
            </CardCont>
        </Container>
    )
}

export default FlotteDetails