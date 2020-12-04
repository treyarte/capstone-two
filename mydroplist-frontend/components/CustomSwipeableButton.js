import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Toast} from 'native-base';

const CustomSwipeableButton = ({data, rowMap, label, color, fn, declinedOption, deleteOption}) => {
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
    });

    const handleSwipe = () =>{
        if(deleteOption) fn(data.item.id);
        else if(data.item.status === 'accepted' && !declinedOption || data.item.status === 'completed'){
            // Alert.alert('Warning', `Droplist has already been ${data.item.status}`);
            Toast.show({
                text: `Droplist has already been ${data.item.status}`,
                buttonText: 'Okay',
                type: 'warning',
                duration: 5000
            });
        } else {
            fn(data.item.id)
        }
    }
    
    return (
        <TouchableOpacity
            style={styles.rowBack}
                onPress={handleSwipe}
            >  
            <Text style={styles.backText}>{label}</Text>
        </TouchableOpacity>
    )


}

export default CustomSwipeableButton;