import styled from "styled-components";
import {Link, Route, Switch, useRouteMatch} from "react-router-dom";
import Personnel from "./index";
import PersonnelDetails from "./details";
import Permis from "./permis";
import Passeports from "./passeports";
import VisitesMedicales from "./visites";

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
  margin-bottom: 10px;
`

function PersonnelNav() {

    const { path, url } = useRouteMatch()

    return(
        <div>
            <Header>
                <Title>Personnel</Title>
            </Header>
            <LinksCont>
                <StyledLink to={`${url}`}>
                    <li>Personnel</li>
                </StyledLink>

                <StyledLink to={`${url}/permis`}>
                    <li>Permis</li>
                </StyledLink>

                <StyledLink to={`${url}/passeports`}>
                    <li>Passeports</li>
                </StyledLink>

                <StyledLink to={`${url}/visites-médicales`}>
                    <li>Visites médicales</li>
                </StyledLink>
            </LinksCont>

            <Switch>
                <Route exact path={path}>
                    <Personnel />
                </Route>

                <Route path={`${path}/permis`}>
                    <Permis />
                </Route>

                <Route path={`${path}/passeports`}>
                    <Passeports />
                </Route>

                <Route path={`${path}/visites-médicales`}>
                    <VisitesMedicales />
                </Route>

                <Route path={`${path}/:personnelId`}>
                    <PersonnelDetails />
                </Route>
            </Switch>
        </div>
    )
}

export default PersonnelNav