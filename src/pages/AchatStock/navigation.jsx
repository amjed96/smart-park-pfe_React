import {Switch, Route, Link, useRouteMatch} from "react-router-dom";
import styled from "styled-components";
import Flotte from "../Flotte";
import Details from "../Flotte/details";
import AchatStock from "./index";
import DemandesAchat from "./demandesAchat";
import Stock from "./stock";

const Title = styled.span`
    color: #000;
    font-family: 'Montserrat', sans-serif;
    font-size: 24px; 
    font-weight: bolder;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 15px 0;
`

const LinksCont = styled.ul`
  margin: 10px 0;
  padding: 0px;
  display: flex;
  li {
    list-style: none;
  }
`

const StyledLink = styled(Link)`
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  background-color: #FFF;
  color: #000;
  padding: 10px;
  margin-right: 10px;
  text-decoration: none;
  border-bottom: 2px solid #373B54;
`

function AchatStockNav() {

    const { url, path } = useRouteMatch()

    return(
        <div>
            <Header>
                <Title>Achats & Stock</Title>
            </Header>
            <LinksCont>
                <StyledLink to={`${url}`}>
                    <li>Documents/Factures</li>
                </StyledLink>

                <StyledLink to={`${url}/stock`}>
                    <li>Stock</li>
                </StyledLink>

                <StyledLink to={`${url}/demandes-achat`}>
                    <li>Demandes d'achat</li>
                </StyledLink>
                {/*<StyledLink to={`${url}/details`}>
                    <li>Details</li>
                </StyledLink>*/}
            </LinksCont>
            <Switch>
                <Route exact path={path}>
                    <AchatStock />
                </Route>

                <Route path={`${path}/stock`}>
                    <Stock />
                </Route>

                <Route path={`${path}/demandes-achat`}>
                    <DemandesAchat />
                </Route>

                {/*<Route path={`${path}/:flotteId`}>
                    <Details />
                </Route>*/}

            </Switch>
        </div>
    )
}

export default AchatStockNav