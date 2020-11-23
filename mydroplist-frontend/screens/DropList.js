import React from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Card, CardItem, Body, H3, Badge, Text, Grid, Row, Col, Button, View} from 'native-base'

const DropList = ({droplist, departments, navigateToDetails}) => {
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
            marginRight: 5
        },
        editBtn: {
         
        }
    });

    const onPressHandle = () => {
        navigateToDetails(droplist.id, droplist.description);
    }


    return(
        <TouchableWithoutFeedback 
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
                            <Text style={{marginVertical: 10}}>Date: {`${date.toDateString()}`}</Text>
                        </Row>
                        <Row>
                        
                                <Badge info  style={droplistStyles.badge}>
                                    <Text>{droplist.status}</Text>
                                </Badge>
                     
                    
                                <Badge success style={droplistStyles.badge}>
                                    <Text>
                                        {departments[droplist.department_id - 1]}
                                    </Text>
                                </Badge>
                        </Row>
                    
                     
                    </Grid>
                    </Body>
                </CardItem>
            </Card>
        </TouchableWithoutFeedback >
    )
}

export default DropList;