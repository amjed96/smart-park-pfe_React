import styled from 'styled-components'
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

    ul .selected {
        background-color: #6D52ED;
        border-radius: 5px;
    }
`

function Navigation() {
    return(
        <NavMenu>
            <ul>
                <li class="selected">{/* REMOVE */}<FontAwesomeIcon icon={faGauge} /><span class="link">Tableau de bord</span></li>
                <li><FontAwesomeIcon icon={faTruck} /><span class="link">Flotte</span></li>
                <li><FontAwesomeIcon icon={faUser} /><span class="link">Personnel</span></li>
                <li><FontAwesomeIcon icon={faWrench} /><span class="link">Maintenance</span></li>
                <li><FontAwesomeIcon icon={faTruckFast} /><span class="link">Transport</span></li>
                <li><FontAwesomeIcon icon={faCubes} /><span class="link">Achat & stock</span></li>
                <li><FontAwesomeIcon icon={faCoins} /><span class="link">Finance</span></li>
                <li><FontAwesomeIcon icon={faKey} /><span class="link">Location</span></li>
                <li><FontAwesomeIcon icon={faWarehouse} /><span class="link">Garage</span></li>
            </ul>
        </NavMenu>
    );
}

export default Navigation