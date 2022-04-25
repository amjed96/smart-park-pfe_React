import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Location from "./index";
import LocationContrats from "./contrats";
import FacturesLocation from "./factures";
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

function LocationNav() {

    const { path, url } = useRouteMatch()
    {/* START MUI */}
    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };
    {/* END MUI */}

    return (
        <div>
            <Header>
                <Title>Location</Title>
            </Header>
            {/* START MUI */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'white', marginBottom: '20px' }}>
                <Tabs
                    value={selectedTab}
                    onChange={handleChange}
                >
                    <Tab label="Engins à louer" component={Link} to={`${url}`} />
                    <Tab label="Contrats de location" component={Link} to={`${url}/contrats`} />
                    <Tab label="Factures de location" component={Link} to={`${url}/factures`} />
                </Tabs>
            </Box>
            {/* END MUI */}
            {/*<LinksCont>
                <StyledLink to={`${url}`}>
                    <li>Véhicules à louer</li>
                </StyledLink>

                <StyledLink to={`${url}/contrats`}>
                    <li>Contrats de location</li>
                </StyledLink>

                <StyledLink to={`${url}/factures`}>
                    <li>Factures de location</li>
                </StyledLink>
            </LinksCont>*/}

            <Switch>
                <Route exact path={`${path}`}>
                    <Location />
                </Route>

                <Route path={`${path}/contrats`}>
                    <LocationContrats />
                </Route>

                <Route path={`${path}/factures`}>
                    <FacturesLocation />
                </Route>

                {/*<Route exact path={`${path}/details`}>
                    <Details />
                </Route>*/}
            </Switch>
        </div>
    )
}

export default LocationNav