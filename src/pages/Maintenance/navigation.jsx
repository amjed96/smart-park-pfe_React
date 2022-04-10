import {Link, Route, Switch, useRouteMatch} from "react-router-dom";
import styled from "styled-components";
import Maintenance from "./index";
import Interventions from "./interventions";
import PlansEntretien from "./plansEntretien";
import PiecesRechange from "./piecesRechange";

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

function MaintenanceNav() {

    const { url, path } = useRouteMatch()

    return(
        <div>
            <Header>
                <Title>Maintenance</Title>
            </Header>
            <LinksCont>
                <StyledLink to={`${url}`}>
                    <li>Demandes d'intervention</li>
                </StyledLink>

                <StyledLink to={`${url}/interventions`}>
                    <li>Interventions</li>
                </StyledLink>

                <StyledLink to={`${url}/plans-entretien`}>
                    <li>Plans d'entretien</li>
                </StyledLink>

                <StyledLink to={`${url}/pieces-rechange`}>
                    <li>Pièces de rechange</li>
                </StyledLink>

                <StyledLink to={`${url}/documents`}>
                    <li>Documents</li>
                </StyledLink>
            </LinksCont>
            <Switch>
                <Route exact path={path}>
                    <Maintenance />
                </Route>

                <Route path={`${path}/interventions`}>
                    <Interventions />
                </Route>

                <Route path={`${path}/plans-entretien`}>
                    <PlansEntretien />
                </Route>

                <Route path={`${path}/pieces-rechange`}>
                    <PiecesRechange />
                </Route>

                {/*<Route path={`${path}/:demandeId`}>
                    <Details />
                </Route>*/}

            </Switch>
        </div>
    )
}

export default MaintenanceNav