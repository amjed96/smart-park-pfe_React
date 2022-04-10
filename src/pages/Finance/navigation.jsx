import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Finance from "./index";
import Encaissements from "./encaissements";
import PaiementsFournisseur from "./paiementsFournisseur";

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

function FinanceNav() {

    const { path, url } = useRouteMatch()

    return (
        <div>
            <Header>
                <Title>Finance</Title>
            </Header>
            <LinksCont>
                <StyledLink to={`${url}`}>
                    <li>Caisse</li>
                </StyledLink>

                <StyledLink to={`${url}/encaiss-client`}>
                    <li>Encaissements Client</li>
                </StyledLink>

                <StyledLink to={`${url}/paiement-fournisseur`}>
                    <li>Paiement Fournisseur</li>
                </StyledLink>
            </LinksCont>

            <Switch>
                <Route exact path={`${path}`}>
                    <Finance />
                </Route>

                <Route path={`${path}/encaiss-client`}>
                    <Encaissements />
                </Route>

                <Route path={`${path}/paiement-fournisseur`}>
                    <PaiementsFournisseur />
                </Route>

                {/*<Route exact path={`${path}/details`}>
                    <Details />
                </Route>*/}
            </Switch>
        </div>
    )
}

export default FinanceNav