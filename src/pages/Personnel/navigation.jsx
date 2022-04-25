import styled from "styled-components";
import {Link, Route, Switch, useRouteMatch} from "react-router-dom";
import Personnel from "./index";
import PersonnelDetails from "./details";
import Permis from "./permis";
import Passeports from "./passeports";
import VisitesMedicales from "./visites";
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
    {/* START MUI */}
    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };
    {/* END MUI */}

    return(
        <div>
            <Header>
                <Title>Personnel</Title>
            </Header>
            {/* START MUI */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'white', marginBottom: '20px' }}>
                <Tabs
                    value={selectedTab}
                    onChange={handleChange}
                >
                    <Tab label="Personnel" component={Link} to={`${url}`} />
                    <Tab label="Permis" component={Link} to={`${url}/permis`} />
                    <Tab label="Passeports" component={Link} to={`${url}/passeports`} />
                    <Tab label="Visites médicales" component={Link} to={`${url}/visites-médicales`} />
                </Tabs>
            </Box>
            {/* END MUI */}

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