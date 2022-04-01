import styled from "styled-components";
import {Link, Route, Switch, useRouteMatch} from "react-router-dom";
import Tiers from "./index";
import Fournisseurs from "./fournisseurs";
import ClientDetails from "./detailsClient";
import FournisseurDetails from "./detailsFournisseur";
import Contacts from "./contacts";
import ContactDetails from "./detailsContact";


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
  margin: 0px;
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

function TiersNav() {

    const { path, url } = useRouteMatch()

    return(
        <div>
            <Header>
                <Title>Tiers</Title>
            </Header>
            <LinksCont>
                <StyledLink to={`${url}`}>
                    <li>Clients</li>
                </StyledLink>

                <StyledLink to={`${url}/fournisseurs`}>
                    <li>Fournisseurs</li>
                </StyledLink>

                <StyledLink to={`${url}/contacts`}>
                    <li>Contacts</li>
                </StyledLink>
            </LinksCont>

            <Switch>
                <Route exact path={path}>
                    <Tiers />
                </Route>

                <Route path={`${path}/clients/:idClient`}>
                    <ClientDetails />
                </Route>

                <Route exact path={`${path}/fournisseurs`}>
                    <Fournisseurs />
                </Route>

                <Route path={`${path}/fournisseurs/:idFournisseur`}>
                    <FournisseurDetails />
                </Route>

                <Route exact path={`${path}/contacts`}>
                    <Contacts />
                </Route>

                <Route path={`${path}/contacts/:idContact`}>
                    <ContactDetails />
                </Route>
            </Switch>
        </div>
    )
}

export default TiersNav