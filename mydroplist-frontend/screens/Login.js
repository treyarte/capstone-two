import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Container,Content, Form, Item, Input, Label, Button, Text, Toast } from 'native-base'
import useFields from '../hooks/useFields';
import useErrors from '../hooks/useErrors';
import {AuthContext} from '../components/context';
import DroplistApi from '../helpers/DroplistApi';

const Login = () => {

    const {signIn} = useContext(AuthContext);

    const INITIAL_STATE = {email: '', password: ''}

    const [formData, handleChange] = useFields(INITIAL_STATE);

    const [errors, handleErrors] = useErrors([])
    
    const styles = StyleSheet.create({
        form: {
            marginHorizontal: 20
        }
    });

    const handleSubmit = async () => {
        try {
            const {email, password} = formData;

            const token = await DroplistApi.login(email, password);

            signIn(token);

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

    

    return (
        <Container>
            <Content>
                <Form style={styles.form}>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input autoCapitalize="none" value={formData.email} onChangeText={(text) => handleChange(text, 'email')} />
                    </Item>
                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input 
                            secureTextEntry={true} 
                            value={formData.password}
                            onChangeText={(text) => handleChange(text, 'password')}
                        />
                    </Item>
                    <Button dark style={{marginTop: 20, alignSelf: 'flex-end'}} onPress={handleSubmit}>
                        <Text>Login</Text>
                    </Button>
                </Form>
            </Content>
        </Container>
    )
}

export default Login;