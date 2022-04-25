import {Link, Route, Switch, useRouteMatch} from "react-router-dom";
import styled from "styled-components";
import Maintenance from "./index";
import Interventions from "./interventions";
import PlansEntretien from "./plansEntretien";
import PiecesRechange from "./piecesRechange";
import {useState} from "react";
import {Box, Tab, Tabs} from "@mui/material";

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
    {/* START MUI */}
    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };
    {/* END MUI */}

    return(
        <div>
            <Header>
                <Title>Maintenance</Title>
            </Header>
            {/* START MUI */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'white', marginBottom: '20px' }}>
                <Tabs
                    value={selectedTab}
                    onChange={handleChange}
                >
                    <Tab label="Demandes d'intervention" component={Link} to={`${url}`} />
                    <Tab label="Interventions" component={Link} to={`${url}/interventions`} />
                    <Tab label="Plans d'entretien" component={Link} to={`${url}/plans-entretien`} />
                    <Tab label="Pièces de rechange" component={Link} to={`${url}/pieces-rechange`} />
                    <Tab label="Documents" component={Link} to={`${url}/documents`} />
                </Tabs>
            </Box>
            {/* END MUI */}
            {/*<LinksCont>
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
            </LinksCont>*/}
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