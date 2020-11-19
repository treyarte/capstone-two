import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Container,Content, Form, Item, Input, Label, Button, Text } from 'native-base'
import useFields from '../hooks/useFields';
const Login = () => {
    const INITIAL_STATE = {email: '', password: ''}

    const [formData, handleChange, resetForm] = useFields(INITIAL_STATE);
    
    const styles = StyleSheet.create({
        form: {
            marginHorizontal: 20
        }
    });

    const handleSubmit = () => {
        
    }

    return (
        <Container>
            <Content>
                <Form style={styles.form}>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input value={formData.email} onChangeText={(text) => handleChange(text, 'email')} />
                    </Item>
                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input 
                            secureTextEntry={true} 
                            value={formData.password}
                            onChangeText={(text) => handleChange(text, 'password')}
                        />
                    </Item>
                    <Button dark style={{marginTop: 20, alignSelf: 'flex-end'}}>
                        <Text>Login</Text>
                    </Button>
                </Form>
            </Content>
        </Container>
    )
}

export default Login;