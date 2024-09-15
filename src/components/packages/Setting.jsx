import {  ScrollView, Switch, RefreshControl } from 'react-native'

import { useSnapshot } from 'valtio';
import {state} from '../state/store'
import tw from 'twrnc'
import React,{useState,useEffect,useCallback} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  _signOutGoogle } from '../config/firebase/GoogleSignin'
const Settings = () => {
const [name,setName]=useState('')
const [count,setCount]=useState(0)
  const [refreshing, setRefreshing] = useState(false);
const [loading,setLoading]=useState(false)
const [selectedColor, setSelectedColor] = useState('#000000');
const getdata = async () => {
    try {
   
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) {
        setName(storedUsername)
      }
   
    } catch (error) {
      console.log(error)
      alert('Internal server error');
    } 
  };
  const googleSignOut=async()=>{
    _signOutGoogle().then(()=>{
      console.log('=> success signed out')
    })
    AsyncStorage.removeItem('username')
    AsyncStorage.removeItem('loggedIn')
    setName('')
    setCount(count+1)
  }
useEffect(()=>{

    getdata()
},[name,count])
const snapshot=useSnapshot(state)
const toggleSwitch = (color) => {
  setSelectedColor(color);
  if (color === '#F0EDEA') {
    state.backgroundColor = '#F0EDEA';
    state.light = '#F0EDEA';
    state.text = '#4a4b4d';
    state.filterColor = '#4a4b4d';
    state.headcolor = '#d3d3d3';
    state.searchcolor = '#d3d3d3';
    state.searchtextcolor = '#4a4b4d';
  } else {
    state.backgroundColor = color;
    state.light = color;
    state.headcolor = color;

    state.text = '#ffffff',
    state.filterColor='#ccc',
    state.searchcolor='#808080',
    state.searchtextcolor='#ccc'
    // Maintain other colors if not light mode
  }
};
 const onRefresh = useCallback(() => {
    setRefreshing(true);
    getdata().then(() => setRefreshing(false));
  }, []);
      
  const handleDeleteAccount = () => {
    // Show alert to confirm account deletion
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete your account? This action is irreversible.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async() => {
            // Add your delete account logic here
          try {
            setLoading(true)
            const data=await fetch(`https://abujacar.org/api/deleteaccount/${name}`,{method:'DELETE'})
            const response=await data.json()
            if(response.ok){
                alert(response.ok)
                AsyncStorage.removeItem('username')
              googleSignOut()
            }
          } catch (error) {
            alert('Something went wrong')
          }
          finally{
            setLoading(false)
          }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };
if(loading){
    return <View><Text>Loading..</Text></View>
}
  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={[styles.container,tw`bg-[${state.backgroundColor}] h-full p-2`]}>
      {name&&(<Text style={[styles.title,tw`text-[${state.text}]`]}>Hello, {name}!</Text>)}
     <View style={tw`flex flex-row justify-between`}>
        <Text style={tw`text-[${state.text}] text-base`}>Dark mode</Text>
        <View style={styles.marbleContainer}>
        <TouchableOpacity onPress={() => toggleSwitch('#F0EDEA')}>
          <View style={[styles.marble, { backgroundColor: '#F0EDEA' },   selectedColor === '#F0EDEA' && styles.selectedMarble]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleSwitch('#000000')}>
          <View style={[styles.marble, { backgroundColor: '#000000' }, selectedColor === '#000000' && styles.selectedMarble]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleSwitch('#262626')}>
          <View style={[styles.marble, { backgroundColor: '#262626' }, selectedColor === '#262626' && styles.selectedMarble]} />
        </TouchableOpacity>
      </View>
        
        </View> 
      
        {name && (<TouchableOpacity  
  style={tw`flex border rounded p-2 shadow-md bg-white mx-20`} 
  onPress={async () => {
    try {
      await AsyncStorage.removeItem('username');
      await googleSignOut();
    } catch (error) {
      console.error('Logout error:', error);
      // Handle any logout errors here
    }
  }}
>
<Text style={tw`text-center text-black `}>Logout</Text>
</TouchableOpacity>)}
      {name && (<TouchableOpacity style={[styles.deleteButton,tw`mt-2  flex items-center mx-20 `]} onPress={handleDeleteAccount}>
        <Text style={[styles.deleteButtonText]}>Delete Account</Text>
      </TouchableOpacity>)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  marbleContainer: {
    width: 200, // Width of the rectangular box
    height: 70, // Height of the rectangular box
    backgroundColor: '#d3d3d3', // Background color of the rectangular box
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    marginBottom:10,
    borderRadius: 10, // Optional: to make the box have rounded corners
  },
  marble: {
    width: 30, // Width of the marbles
    height: 30, // Height of the marbles
    borderRadius: 15, // To make the marbles circular
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  selectedMarble: {
    borderWidth: 2,
    borderColor: '#FF0000', // Change this color as needed
    borderStyle: 'dashed',
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Settings;
