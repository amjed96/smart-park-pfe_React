import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import Flotte from "./index";
import Details from "./details";
import styled from "styled-components";

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
                {/*<StyledLink to={`${url}/details`}>
                    <li>Details</li>
                </StyledLink>*/}
            </LinksCont>
            <Switch>
                <Route exact path={path}>
                    <Flotte />
                </Route>

                {/*<Route exact path={`${path}/details`}>
                    <Details />
                </Route>*/}

               <Route path={`${path}/:flotteId`}>
                   <Details />
               </Route>

            </Switch>
        </div>
    )
}

export default FlotteNav