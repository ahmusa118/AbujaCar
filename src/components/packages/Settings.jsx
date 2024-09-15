import React,{useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  _signOutGoogle } from '../config/firebase/GoogleSignin'
const Settings = ({ route }) => {
  const { name } = route.params;
const [loading,setLoading]=useState(false)
const Navigation=useNavigation()
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
            const data=await fetch(`https://abujacar.org/api/deleteaccount/${route.params.name}`,{method:'DELETE'})
            const response=await data.json()
            if(response.ok){
                alert(response.ok)
                AsyncStorage.removeItem('username')
                _signOutGoogle()
                Navigation.goBack();
                Navigation.goBack();
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
    <View style={styles.container}>
      <Text style={styles.title}>Hello, {name}!</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.deleteButtonText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
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
