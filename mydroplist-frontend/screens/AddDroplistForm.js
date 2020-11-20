import React, {useState} from 'react';
import { Form, Item, Input, Label, Picker, Icon, Button, Text } from 'native-base';
import CustomPicker from './CustomPicker';


const AddDroplistForm = ({departments, navigation}) => {
    const [department, setDepartment] = useState({selected: 1});

    const handlePickerChange = (value) => {
        setDepartment({
            selected: value
        });
    }
    return (
         <Form>
            <Item floatingLabel>
            <Label>Title</Label>
              <Input />
            </Item>
            <Item  picker>
            <Picker
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholder='department'
                        mode="dropdown"
                        selectedValue={department.selected}
                        onValueChange={handlePickerChange}
                        
                    >
                    <Picker.Item label="Produce" value={1}/>
                    <Picker.Item label="Hardlines" value={2}/>
                    <Picker.Item label="Freezer" value={3}/>
                    <Picker.Item label="Seasonal" value={4}/>
                    <Picker.Item label="Sundries" value={5}/>

                    </Picker>
            </Item>
            <Button onPress={() => navigation.goBack()}>
                <Text>Cancel</Text>
            </Button>
          </Form>
    )
}

export default AddDroplistForm