import React from 'react';
import {Text, Button, Icon, View} from 'native-base';

const DroplistNavigationButtons = ({droplist, handleEditButton, handleAddButton}) => {
    return (
        <View style={{flexDirection: 'row'}}>
            {
                droplist !== null ? 
                    
                    droplist.droplist.status !== 'not sent' ? 
                    <Button disabled transparent  onPress={handleEditButton}>
                        <Text style={{color: '#222831'}}>
                            Edit
                        </Text>
                    </Button>
                    :
                    <Button  transparent  onPress={handleEditButton}>
                        <Text style={{color: '#222831'}}>
                            Edit
                        </Text>
                    </Button>
                :
                <></>
            }
              <Button Icon transparent onPress={handleAddButton}>
                  <Icon name="add" style={{color: '#222831'}}/>
              </Button>
            </View>
    )
}

export default DroplistNavigationButtons;