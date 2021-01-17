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
            marginRight: 5,
        },
        editBtn: {
         
        },
        droplistText:{
            textTransform: 'capitalize'
        }
    });

    const statusColor = {
        sent: '#5bc0de',
        accepted: '#0275d8',
        completed: '#5cb85c',
        declined: '#d9534f',
        'not sent': '#6e6d6d'
    }

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
                        
                                <Badge info  style={{backgroundColor: statusColor[droplist.status], marginRight: 5}}>
                                    <Text style={droplistStyles.droplistText}>{droplist.status}</Text>
                                </Badge>
                     
                    
                                <Badge dark style={ {backgroundColor: '#222831', marginRight: 5}}>
                                    <Text style={droplistStyles.droplistText}>
                                        {departments[droplist.department_id - 1]}
                                    </Text>
                                </Badge>
                            
                                <Badge primary style={droplistStyles.badge}>
                                    <Text >Items: {droplist.num_items}</Text>
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