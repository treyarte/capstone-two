import React from 'react';
import {Container, Content, Spinner} from 'native-base';

const SpinnerScreen = () => {
    return (
        <Container>
            <Content>
                <Spinner color='#000'/>
            </Content>
        </Container>
    )
}

export default SpinnerScreen