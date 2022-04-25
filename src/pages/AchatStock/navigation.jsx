import {Switch, Route, Link, useRouteMatch} from "react-router-dom";
import styled from "styled-components";
import Flotte from "../Flotte";
import Details from "../Flotte/details";
import AchatStock from "./index";
import DemandesAchat from "./demandesAchat";
import Stock from "./stock";
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

function AchatStockNav() {

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
                <Title>Achats & Stock</Title>
            </Header>
            {/* START MUI */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'white', marginBottom: '20px' }}>
                <Tabs
                    value={selectedTab}
                    onChange={handleChange}
                >
                    <Tab label="Documents/Factures" component={Link} to={`${url}`} />
                    <Tab label="Stock" component={Link} to={`${url}/stock`} />
                    <Tab label="Demandes d'achat" component={Link} to={`${url}/demandes-achat`} />
                </Tabs>
            </Box>
            {/* END MUI */}
            {/*<LinksCont>
                <StyledLink to={`${url}`}>
                    <li>Documents/Factures</li>
                </StyledLink>

                <StyledLink to={`${url}/stock`}>
                    <li>Stock</li>
                </StyledLink>

                <StyledLink to={`${url}/demandes-achat`}>
                    <li>Demandes d'achat</li>
                </StyledLink>
            </LinksCont>*/}
            <Switch>
                <Route exact path={path}>
                    <AchatStock />
                </Route>

                <Route path={`${path}/stock`}>
                    <Stock />
                </Route>

                <Route path={`${path}/demandes-achat`}>
                    <DemandesAchat />
                </Route>

                {/*<Route path={`${path}/:flotteId`}>
                    <Details />
                </Route>*/}

            </Switch>
        </div>
    )
}

export default AchatStockNav