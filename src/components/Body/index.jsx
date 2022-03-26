import styled from 'styled-components'
import Main from '../Main';
import Navigation from '../Navigation';

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