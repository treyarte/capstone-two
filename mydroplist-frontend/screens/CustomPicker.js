import React, {useState} from 'react';
import {StyleSheet} from 'react-native'
import {Container, Content, Icon, Picker, Form} from 'native-base';

const CustomPicker = ({department, setDepartment}) => {
    
    const pickerStyles = StyleSheet.create({
        main: {
         
            backgroundColor: '#EEE',
        },
        picker: {
            marginLeft: 15
        }
    })

    const handlePickerChange = (value) => {
        setDepartment({
            selected: value
        });

        
    }
    return (
                <Form style={pickerStyles.main}>
                    <Picker
                        mode="dropdown"
                        selectedValue={department.selected}
                        onValueChange={handlePickerChange}
                        style={pickerStyles.picker}
                    >
                    <Picker.Item label="Produce" value={1}/>
                    <Picker.Item label="Hardlines" value={2}/>
                    <Picker.Item label="Freezer" value={3}/>
                    <Picker.Item label="Seasonal" value={4}/>
                    <Picker.Item label="Sundries" value={5}/>

                    </Picker>
                </Form>
    )
}

export default CustomPicker;