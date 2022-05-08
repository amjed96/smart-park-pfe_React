import { useRouteMatch, Route, BrowserRouter as Router } from 'react-router-dom';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Login from '../Login';
import Admin from '../Admin';


function Home() {
    const { path, url } = useRouteMatch()

    return (
            <Switch>
                <Route exact path={`/login`}>
                    <Login />
                </Route>
                <Route exact path={`/ad`}>
                    <Admin />
                </Route>
            </Switch>
    )
}

export default Home()