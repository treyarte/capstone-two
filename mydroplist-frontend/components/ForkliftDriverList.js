import React from 'react';
import {View, Text, SectionList, StyleSheet} from 'react-native';
import {H3, Button, Row, Col} from 'native-base';

const ForkliftDriverList = ({forkliftDrivers, sendDroplist}) => {
     
     forkliftDrivers = formatItems(forkliftDrivers);

    const styles = StyleSheet.create({
        title: {
            flex: 1,
            backgroundColor: '#1a1c20',
            marginVertical: 10,
            alignItems: 'flex-start',
            padding: 5,
            
        }, 
        titleText: {
            color: '#eeeeee',
            textTransform: 'capitalize',
            margin: 5
        },
        driveText: {
            textTransform: 'capitalize',
            fontWeight: 'bold',
            margin: 10
            
        },
        noItems: {
            flex: 1,
            marginTop: 100,
            alignSelf: 'center'
        },
        sendBtn: {
            flex: 1,
            padding: 20,
            color: '#eee',
            alignSelf: 'flex-end',
            marginRight: 10,
            marginBottom: 10
        }
    });

    const handleSend = async (forklift_driver_id) => {
        await sendDroplist(forklift_driver_id);
    }

    const renderDriver = ({item}) => (
        <View style={{justifyContent: 'center'}}>
            <Row>
                <Col>
                    <H3 style={styles.driveText}>{`${item.first_name} ${item.last_name}`}</H3>
                </Col>
                <Col>
                    <Button style={styles.sendBtn} onPress={() => handleSend(item.id)}>
                        <Text style={{color: '#eee', fontWeight: 'bold', fontSize: 16}}>Send</Text>
                    </Button>
                </Col>
            </Row>
        </View>
    )
    

    const renderHeader = ({section: {department}}) => (
        <View style={styles.title}>
            <H3 style={styles.titleText}>{department}</H3>
        </View>
    );


    
    return (
        <>
            {
                forkliftDrivers.length <= 0 ? 
                    <H3>No Drivers available at this time</H3>
                :
                    <SectionList
                        sections={forkliftDrivers}
                        keyExtractor={(driver)=> driver.id.toString()}
                        renderItem={renderDriver}
                        renderSectionHeader={renderHeader}
                    />
            }
        </>
    )
}

function formatItems(drivers){
    let arr = [...new Set(drivers.map((d) => d.department))]

    const newFormatDrivers = []

    for(let department of arr){
        newFormatDrivers.push({department, data: [...drivers.filter((i) => i.department === department)]});
    }
    return newFormatDrivers
}

export default ForkliftDriverList;