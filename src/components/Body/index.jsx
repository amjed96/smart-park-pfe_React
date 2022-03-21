import styled from 'styled-components'
import Navigation from '../Navigation';

const BodyContainer = styled.div`
    display: flex;
`

function Body() {
    return(
        <BodyContainer>
            <Navigation />
        </BodyContainer>
    )
}

export default Body;