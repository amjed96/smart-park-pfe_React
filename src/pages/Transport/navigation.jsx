import styled from "styled-components";
import {Link, Route, Switch, useRouteMatch} from "react-router-dom";
import Transport from "./index";
import FichesTrajet from "./fichesTrajet";
import DocumentsTransport from "./documentsTransport";


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

function TransportNav() {

    const { path, url } = useRouteMatch()

    return(
        <div>
            <Header>
                <Title>Transport</Title>
            </Header>
            <LinksCont>
                <StyledLink to={`${url}`}>
                    <li>Dossiers voyage</li>
                </StyledLink>

                <StyledLink to={`${url}/fiches-trajet`}>
                    <li>Fiches trajet</li>
                </StyledLink>

                <StyledLink to={`${url}/documents`}>
                    <li>Documents</li>
                </StyledLink>
            </LinksCont>

            <Switch>
                <Route exact path={`${path}`}>
                    <Transport />
                </Route>

                <Route exact path={`${path}/fiches-trajet`}>
                    <FichesTrajet />
                </Route>

                <Route exact path={`${path}/documents`}>
                    <DocumentsTransport />
                </Route>
            </Switch>
        </div>
    )
}

export default TransportNav