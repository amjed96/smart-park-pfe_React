import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import styled from 'styled-components';
import Dashboard from '../../pages/Dashboard';
import Finance from '../../pages/Finance';
import Garage from '../../pages/Garage';
import Location from '../../pages/Location';
import FlotteNav from "../../pages/Flotte/navigation";
import TiersNav from "../../pages/Tiers/navigation";
import PersonnelNav from "../../pages/Personnel/navigation";
import AchatStockNav from "../../pages/AchatStock/navigation";
import MaintenanceNav from "../../pages/Maintenance/navigation";
import TransportNav from "../../pages/Transport/navigation";
import LocationNav from "../../pages/Location/navigation";
import FinanceNav from "../../pages/Finance/navigation";

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
                    <MaintenanceNav />
                </Route>
                <Route path={'/transport'}>
                    <TransportNav />
                </Route>
                <Route path={'/achat-stock'}>
                    <AchatStockNav />
                </Route>
                <Route path={'/finance'}>
                    <FinanceNav />
                </Route>
                <Route path={'/location'}>
                    <LocationNav />
                </Route>
                {/*<Route path={'/garage'}>
                    <Garage />
                </Route>*/}
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