import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, NativeModules} from 'react-native';
import {Button} from 'native-base';

const CustomSwipeableButton = ({data, rowMap, label, color, fn}) => {
    const styles = StyleSheet.create({
        backText: {
            color: '#FFF',
            
        },
        rowBack: {
            alignItems: 'center',
            backgroundColor: color,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 15,
            marginVertical: 6,
            marginHorizontal:3
        }
    })
    
    return (
        <TouchableOpacity
            style={styles.rowBack}
                onPress={() => fn(data.item.id)}
            >  
            <Text style={styles.backText}>{label}</Text>
        </TouchableOpacity>
    )


}

export default CustomSwipeableButton;