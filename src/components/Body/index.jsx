import styled from 'styled-components'
import Main from '../Main';
import Navigation from '../Navigation';
import { Router } from 'react-router-dom';

const BodyContainer = styled.div`
    display: flex;
`

function Body() {
    return(
        <BodyContainer>
            <Navigation />
            <Main />
        </BodyContainer>
    )
}

export default Body;