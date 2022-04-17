import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import Flotte from "./index";
import styled from "styled-components";
import AffectationsFlotte from "./affectations";
import ConsommationFlotte from "./consommation";
import ContratsFlotte from "./contratsFlotte";
import FlotteDetails from "./details";
import FlotteAffectationDetails from "./detailsAffectation";

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

function FlotteNav() {

    const { path, url } = useRouteMatch()

    return (
        <div>
            <Header>
                <Title>Flotte</Title>
            </Header>
            <LinksCont>
                <StyledLink to={`${url}`}>
                    <li>Flotte</li>
                </StyledLink>

                <StyledLink to={`${url}/affectations`}>
                    <li>َAffectations</li>
                </StyledLink>

                <StyledLink to={`${url}/carburant`}>
                    <li>Consommation</li>
                </StyledLink>

                <StyledLink to={`${url}/contrats`}>
                    <li>Contrats</li>
                </StyledLink>
            </LinksCont>

            <Switch>
                <Route exact path={path}>
                    <Flotte />
                </Route>

                <Route exact path={`${path}/affectations`}>
                    <AffectationsFlotte />
                </Route>

                <Route path={`${path}/carburant`}>
                    <ConsommationFlotte />
                </Route>

                <Route path={`${path}/contrats`}>
                    <ContratsFlotte />
                </Route>

                <Route exact path={`${path}/:id`}>
                    <FlotteDetails />
                </Route>

                <Route exact path={`${path}/affectations/:id`}>
                    <FlotteAffectationDetails/>
                </Route>
            </Switch>
        </div>
    )
}

export default FlotteNav