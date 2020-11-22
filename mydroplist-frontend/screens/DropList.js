import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Card, CardItem, Body, H3, Badge, Text, Grid, Row, Col} from 'native-base'

const DropList = ({droplist, departments}) => {
    const date = new Date(droplist.created_at);

    const droplistStyles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 5,
            flexDirection: 'column',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
        },
    
        badge: {
            

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
                                <H3>{droplist.description}</H3> 
                        </Row>
                        <Row>
                            <Text style={{marginVertical: 10}}>Date: {`${date.getFullYear()}-${date.getDay()}-${date.getMonth()}`}</Text>
                        </Row>
                        <Row>
                            <Col>
                                <Badge info  style={droplistStyles.badge}>
                                    <Text>{droplist.status}</Text>
                                </Badge>
                            </Col>
                            <Col>
                                <Badge success style={droplistStyles.badge}>
                                    <Text>
                                        {departments[droplist.department_id - 1]}
                                    </Text>
                                </Badge>
                            </Col>
                        </Row>
                     
                    </Grid>
                    </Body>
                </CardItem>
            </Card>
        </TouchableOpacity>
    )
}

export default DropList;