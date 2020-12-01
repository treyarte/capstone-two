import React from 'react';
import {Text, Button, Icon, View} from 'native-base';

const DroplistNavigationButtons = ({droplist, handleEditButton, handleAddButton}) => {
    return (
        <>
            {   
                droplist !== null &&
                <View style={{flexDirection: 'row'}}>
                    {
                    droplist.droplist.status !== 'completed' &&
                    droplist.droplist.status !== 'accepted' &&
                    <>
                        <Button  transparent  onPress={handleEditButton}>
                            <Text style={{color: '#222831'}}>
                                Edit
                            </Text>
                        </Button>
        
                        <Button Icon transparent onPress={handleAddButton}>
                            <Icon name="add" style={{color: '#222831'}}/>
                        </Button>
                    </>
                    }
                </View>
            }
        </>
    )
}

export default DroplistNavigationButtons;