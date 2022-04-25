import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Finance from "./index";
import Encaissements from "./encaissements";
import PaiementsFournisseur from "./paiementsFournisseur";
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

function FinanceNav() {

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
                <Title>Finance</Title>
            </Header>
            {/* START MUI */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'white', marginBottom: '20px' }}>
                <Tabs
                    value={selectedTab}
                    onChange={handleChange}
                >
                    <Tab label="Caisse" component={Link} to={`${url}`} />
                    <Tab label="Encaissements Client" component={Link} to={`${url}/encaiss-client`} />
                    <Tab label="Paiement Fournisseur" component={Link} to={`${url}/paiement-fournisseur`} />
                </Tabs>
            </Box>
            {/* END MUI */}
            {/*<LinksCont>
                <StyledLink to={`${url}`}>
                    <li>Caisse</li>
                </StyledLink>

                <StyledLink to={`${url}/encaiss-client`}>
                    <li>Encaissements Client</li>
                </StyledLink>

                <StyledLink to={`${url}/paiement-fournisseur`}>
                    <li>Paiement Fournisseur</li>
                </StyledLink>
            </LinksCont>*/}

            <Switch>
                <Route exact path={`${path}`}>
                    <Finance />
                </Route>

                <Route path={`${path}/encaiss-client`}>
                    <Encaissements />
                </Route>

                <Route path={`${path}/paiement-fournisseur`}>
                    <PaiementsFournisseur />
                </Route>

                {/*<Route exact path={`${path}/details`}>
                    <Details />
                </Route>*/}
            </Switch>
        </div>
    )
}

export default FinanceNav