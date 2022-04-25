import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import Flotte from "./index";
import styled from "styled-components";
import AffectationsFlotte from "./affectations";
import ConsommationFlotte from "./consommation";
import ContratsFlotte from "./contratsFlotte";
import FlotteDetails from "./details";
import FlotteAffectationDetails from "./detailsAffectation";
import {Box, Tab, Tabs} from "@mui/material";
import {useState} from "react";

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

function FlotteNav() {

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
                <Title>Flotte</Title>
            </Header>
            {/* START MUI */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'white', marginBottom: '20px' }}>
                <Tabs
                    value={selectedTab}
                    onChange={handleChange}
                >
                    <Tab label="Flotte" component={Link} to={`${url}`} />
                    <Tab label="Affectations" component={Link} to={`${url}/affectations`} />
                    <Tab label="Consommation" component={Link} to={`${url}/carburant`} />
                    <Tab label="Contrats" component={Link} to={`${url}/contrats`} />
                </Tabs>
            </Box>
            {/* END MUI */}
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