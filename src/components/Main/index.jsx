import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import styled from 'styled-components';
import AchatStock from '../../pages/AchatStock';
import Dashboard from '../../pages/Dashboard';
import Finance from '../../pages/Finance';
import Garage from '../../pages/Garage';
import Location from '../../pages/Location';
import Maintenance from '../../pages/Maintenance';
import Personnel from '../../pages/Personnel';
import Transport from '../../pages/Transport';
import FlotteNav from "../../pages/Flotte/navigation";
import TiersNav from "../../pages/Tiers/navigation";
import PersonnelNav from "../../pages/Personnel/navigation";

const MainContent = styled.div`
    flex: 1;
    padding: 15px;
    margin-left: 180px;
    margin-top: 51px;
`

function Main() {
    return (
        <MainContent>
            <Switch>
                <Route exact path={'/'}>
                    <Dashboard />
                </Route>
                <Route path={'/flotte'}>
                    <FlotteNav />
                </Route>
                <Route path={'/personnel'}>
                    <PersonnelNav />
                </Route>
                <Route path={'/maintenance'}>
                    <Maintenance />
                </Route>
                <Route path={'/transport'}>
                    <Transport />
                </Route>
                <Route path={'/achat-stock'}>
                    <AchatStock />
                </Route>
                <Route path={'/finance'}>
                    <Finance />
                </Route>
                <Route path={'/location'}>
                    <Location />
                </Route>
                <Route path={'/garage'}>
                    <Garage />
                </Route>
                <Route path={'/tiers'}>
                    <TiersNav />
                </Route>
                <Route>
                    ERROR
                </Route>
            </Switch>
        </MainContent>
    )
}

export default Main