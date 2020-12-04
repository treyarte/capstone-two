import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Container,Content, Button, Text, Toast } from 'native-base'
import useFields from '../hooks/useFields';
import useErrors from '../hooks/useErrors';
import {AuthContext} from '../components/context'
import DroplistApi from '../helpers/DroplistApi';
import UserForm from '../components/userForm';

const SignUp = () => {

    const {signUp} = useContext(AuthContext);

    const INITIAL_STATE = {email: '', firstName: '', lastName: '', department: 1, role: 1, password: '', passwordConfirmation: ''}

    const [formData, handleChange, resetForm] = useFields(INITIAL_STATE);
    
    const [errors, handleErrors] = useErrors([])
    
    const handleSignUp = async () => {
        try {
            const {email, firstName, lastName, department, role, password} = formData;
            
            let token = await DroplistApi.signUp(email, password, firstName, lastName, department, role);

            signUp(token);

        } catch (error) {
            const errorsArr = error[0].errors ? error[0].errors : error;
            handleErrors(errorsArr);
            Toast.show({
                text: errorsArr.join('\n'),
                buttonText: 'Okay',
                type: 'danger',
                duration: 5000
            });
            // Alert.alert("Errors: ", errorsArr.join("\n"));
        }
    }

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
            
        },
        submitBtn: {
            marginRight: 20,
            marginTop: 20, 
            alignSelf: 'flex-end'
        }
    });

    return (
         <Container>
            <Content>
                <UserForm formData={formData} handleChange={handleChange} />
                <Button dark style={styles.submitBtn} onPress={handleSignUp}>
                    <Text>Sign Up</Text>
                </Button>
            </Content>
        </Container>
    )
}

export default SignUp;