import styled from 'styled-components'
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGauge } from '@fortawesome/free-solid-svg-icons';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { faCubes } from '@fortawesome/free-solid-svg-icons';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';

const NavMenu = styled.div`
    background-color: #373B54;
    width: 180px;
    height: calc(100vh - 51px);
    margin: 0px;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 51px;

    ul {
        margin: 0px;
        justify-content: left;
        padding: 0px;
        width: 165px;
        margin-top: 16px;
    }

    ul li {
        list-style: none;
        font-family: 'Montserrat', sans-serif;
        font-size: 12px;
        font-weight: bold;
        color: #FFF;
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        padding-left: 27px;
        box-sizing: border-box;
    }

    ul li .link {
        margin-left: 10px;
    }

    // ul .selected {
    //     background-color: #6D52ED;
    //     border-radius: 5px;
    // }

    /* TODO */
    // ul .selected {
    //     background-color: #6D52ED;
    //     border-radius: 5px;
    // }
`

const StyledLink = styled(Link)`
    list-style: none;
    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
    font-weight: bold;
    color: #FFF;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 27px;
    box-sizing: border-box;
    text-decoration: none;

    .link {
        margin-left: 10px;
    }
`

function Navigation() {
    return(
        <NavMenu>
            <ul>
                <StyledLink to={'/'}><FontAwesomeIcon icon={faGauge} /><span class="link">Tableau de bord</span></StyledLink>
                <StyledLink to={'/flotte'}><FontAwesomeIcon icon={faTruck} /><span class="link">Flotte</span></StyledLink>
                <StyledLink to={'/personnel'}><FontAwesomeIcon icon={faUser} /><span class="link">Personnel</span></StyledLink>
                <StyledLink to={'/maintenance'}><FontAwesomeIcon icon={faWrench} /><span class="link">Maintenance</span></StyledLink>
                <StyledLink to={'/transport'}><FontAwesomeIcon icon={faTruckFast} /><span class="link">Transport</span></StyledLink>
                <StyledLink to={'/achat-stock'}><FontAwesomeIcon icon={faCubes} /><span class="link">Achat & stock</span></StyledLink>
                <StyledLink to={'/finance'}><FontAwesomeIcon icon={faCoins} /><span class="link">Finance</span></StyledLink>
                <StyledLink to={'/location'}><FontAwesomeIcon icon={faKey} /><span class="link">Location</span></StyledLink>
                {/*<StyledLink to={'/garage'}><FontAwesomeIcon icon={faWarehouse} /><span class="link">Garage</span></StyledLink>*/}
                <StyledLink to={'/tiers'}><FontAwesomeIcon icon={faHandshake} /><span class="link">Tiers</span></StyledLink>
            </ul>
        </NavMenu>
    );
}

export default Navigation