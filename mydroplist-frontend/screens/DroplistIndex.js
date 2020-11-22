import React, {useState, useEffect, useContext} from 'react';
import {View, FlatList, Alert, TouchableOpacity} from 'react-native';
import {Spinner, Container, Text,} from 'native-base';
import DropList from './DropList';
import DroplistApi from '../helpers/DroplistApi';
import CustomPicker from './CustomPicker';
import {TokenContext} from '../components/tokenContext'
import {SwipeListView} from 'react-native-swipe-list-view'
import CustomSwipeableButton from '../components/CustomSwipeableButton';

const DroplistIndex = ({navigation}) => {

    const [departments, setDepartments] = useState(
        ['produce', 'sundries', 'hardlines',  'seasonal',  'freezer',  'dairy', 'receiving',  'deli']
    );
    
    const token = useContext(TokenContext);

    const INITIAL_STATE = [];
    const [droplists, setdroplists] = useState(INITIAL_STATE);
  
    useEffect(() => {
        async function getDroplists(){
            const userDroplists = await DroplistApi.getAllDroplist(token);
            setdroplists( () => [...userDroplists.droplists]);
        }
        getDroplists();
    }, []);
    
    const renderItem = ({item}) => (
        <DropList droplist ={item} departments={departments}/>
    )
    
    const renderHeader = () => (
       
           <View></View>
       
    );

    const sendDroplist = (droplist_id) => {
        Alert.alert("droplist id", `${droplist_id}`)
    }

      const renderHiddenItem = (data, rowMap) => (
        <View style={{flex: 1, flexDirection: 'row'}}>

         <View style={{flex: 1, alignItems: 'flex-start'}} >
          <CustomSwipeableButton data={data} rowMap={rowMap} label={'Send'} color={'#393e46'} fn={sendDroplist} />
         </View>

          <View style={{flex: 1, alignItems: 'flex-end'}}>
            
          <CustomSwipeableButton data={data} rowMap={rowMap} label={'Delete'} color={'#ea5455'} fn={sendDroplist} />
          </View>

        </View>
       
    );


    return(
        <View>
            {
                !droplists ? (
                   <Text>No droplists found</Text>
                ) : 
            (
                <SwipeListView 
                initialNumToRender={4}
                maxToRenderPerBatch={3}
                stickyHeaderIndices={[0]}
                ListHeaderComponent={renderHeader}
                removeClippedSubviews={true}
                data={droplists}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                keyExtractor={(item)=> item.id.toString()}
                leftOpenValue={60}
                rightOpenValue={-60}
                
                previewOpenValue={-40}
                previewOpenDelay={3000}
                />
            )

            }
        </View>
    )

  
}

export default DroplistIndex;