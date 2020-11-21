import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Card, CardItem, Body, H3, Badge, Text, Grid, Row, Col} from 'native-base'

const DropList = ({droplist}) => {

    const droplistStyles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 5,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
        },
    
        status: {
            alignSelf: 'flex-end'
        }
    });

    const onPressHandle = () => {
        Alert.alert("pressed");
    }


    return(
        <TouchableOpacity
            onPress={onPressHandle}
        >
            <Card>
                <CardItem >
                    <Body style={droplistStyles.container}>
                    <Grid>
                        <Row>
                            <Col>
                                <H3>{droplist.description}</H3>
                            </Col>
                            <Col>
                            <Badge info  style={droplistStyles.status}>
                                <Text>{droplist.status}</Text>
                            </Badge>
                            </Col>
                        </Row>
                        <Row>
                            <Text>{droplist.created_at}</Text>
                        </Row>
                    </Grid>
                    </Body>
                </CardItem>
            </Card>
        </TouchableOpacity>
    )
}

export default DropList;