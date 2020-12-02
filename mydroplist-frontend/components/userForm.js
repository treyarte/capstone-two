import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Form, Item, Input, Label, Picker } from 'native-base'

const userForm = ({formData, handleChange}) => {
    

    const styles = StyleSheet.create({
        form: {
            marginHorizontal: 20
        },

        dropDown: {
            marginTop: 30,
        },
        dropDownText: {
            color: '#323232',
            margin: -5
            
        }
    });

    return (
         <Form style={styles.form}>
                    <Item floatingLabel>
                        <Label>Email *</Label>
                        <Input value={formData.email} onChangeText={(text) => handleChange(text, 'email')} />
                    </Item>
                    <Item floatingLabel>
                        <Label>First name *</Label>
                        <Input value={formData.firstName} onChangeText={(text) => handleChange(text, 'firstName')} />
                    </Item>
                    <Item floatingLabel>
                        <Label>Last name *</Label>
                        <Input value={formData.lastName} onChangeText={(text) => handleChange(text, 'lastName')} />
                    </Item>
                    <Item style={styles.dropDown}>
                    
                        <Picker style={styles.dropDownText}  mode='dialog' selectedValue={formData.department} 
                            onValueChange={(text) => handleChange(text, 'department')}>
                            <Picker.Item label='Produce' value={1}/>
                            <Picker.Item label='Sundries' value={2}/>
                            <Picker.Item label='Hardlines' value={3}/>
                            <Picker.Item label='Seasonal' value={4}/>
                            <Picker.Item label='Freezer' value={5}/>
                            <Picker.Item label='Dairy' value={6}/>
                            <Picker.Item label='Receiving' value={7}/>
                            <Picker.Item label='Deli' value={8}/>
                        </Picker>
                    </Item>
                    <Item style={styles.dropDown}>
                        <Picker style={styles.dropDownText} mode='dropdown' selectedValue={formData.role} placeholder='Role'
                            onValueChange={(text) => handleChange(text, 'role')}>
                            <Picker.Item label='Stocker' value={1}/>
                            <Picker.Item label='Forklift driver' value={2}/>
                        </Picker>
                    </Item>
                    <Item floatingLabel>
                        <Label>Password *</Label>
                        <Input 
                            secureTextEntry={true} 
                            value={formData.password}
                            onChangeText={(text) => handleChange(text, 'password')}
                        />
                    </Item>

                    {/* <Item floatingLabel>
                        <Label>Confirm Password</Label>
                        <Input 
                            secureTextEntry={true} 
                            value={formData.passwordConfirmation}
                            onChangeText={(text) => handleChange(text, 'passwordConfirmation')}
                        />
                    </Item> */}
                </Form>
    )
}

export default userForm;