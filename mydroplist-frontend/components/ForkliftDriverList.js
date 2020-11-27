import React from 'react';
import {View, Text, SectionList, StyleSheet} from 'react-native';
import {H3, Button} from 'native-base';

const ForkliftDriverList = ({forkliftDrivers}) => {

     forkliftDrivers = formatItems(forkliftDrivers);

    const styles = StyleSheet.create({
        title: {
            flex: 1,
            backgroundColor: '#393e46',
            marginVertical: 10,
            alignItems: 'center',
            padding: 5
        }, 
        titleText: {
            color: '#eeeeee',
        },
        noItems: {
            flex: 1,
            marginTop: 100,
            alignSelf: 'center'
        }
    });

    const renderDriver = ({item}) => (
        <View>
            <H3>{`${item.first_name} ${item.last_name}`}</H3>
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