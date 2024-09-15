
import React, { useState,useEffect } from 'react';
import { Text, View, Linking, ScrollView, TouchableOpacity,Image, Alert } from 'react-native';
import { Input, Button } from '@rneui/themed';
import tw from 'twrnc';
import Loading from './Loading';
import Saved from './Saved'
import { AppleButton } from '@invertase/react-native-apple-authentication';
import {onAppleButtonPress} from '../config/firebase/AppleSignin'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useSnapshot } from 'valtio';

import {state} from '../state/store'

import { _signInWithGoogle , _signOutGoogle, isUserSignedIn } from '../config/firebase/GoogleSignin'
import {onFacebookButtonPress}  from './config/firebase/FaceBooksignin'
const Login = () => {
  const snapshot = useSnapshot(state);
  const Navigation = useNavigation();
  const [em, setEmail] = useState('');
  const [pass, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [fedemail,setfedemail]=useState('')
  const [fedusername,setfedusername]=useState('')
  const [username,setUsername]=useState('')
  const [photo,setPhoto]=useState('')
const [data,setData]=useState([])
const [isSignedIn, setIsSignedIn] = useState(false);
const [count,setCount]=useState(0)




useEffect(() => {
  checkSignInStatus();
}, [count]);

const checkSignInStatus = async () => {
  const signedInStatus = await isUserSignedIn();
  setIsSignedIn(signedInStatus);
}

  const fetchData = async (key) => {
    try {
      // Fetch fresh data
      const response = await fetch('https://abujacar.org/api/individualdashboard', {
        method: 'GET',
        headers: { Authorization: `Bearer ${key}` },
      });
 
      if (response.ok) {
        const responseData = await response.json();
        setUsername(responseData.email)
        AsyncStorage.setItem('username', responseData.email);
        AsyncStorage.setItem('loggedIn', 'true');
        AsyncStorage.setItem('data', JSON.stringify(responseData));
        setData(responseData)

      
        setLoggedIn(true);

      } else {
        
        Alert.alert('error')
        throw new Error('Error fetching data from the server');
        return null;
      }
    } catch (error) {
      Alert.alert('Error fetching data')
      console.error('Error fetching data:', error);
     throw new Error('An error occurred while fetching data');
      return null;
    }
  };

  const googleSignOut=async()=>{
    _signOutGoogle().then(()=>{
      console.log('=> success signed out')
      AsyncStorage.removeItem('photo')
    })
    setCount(count+1)
  }
  const googleSignIn = async () => {
    try {
      const data = await _signInWithGoogle();
  
      if (!data) {
        console.log('No data');
        return;
      }
  
      const { email, name } = data.user;
  
      // Set states and increment count
      setfedemail(email);
      setfedusername(name);
      setCount(count + 1);
  
      // Make API call
      setLoading(true);
      const response = await fetch(`https://abujacar.org/api/googlesignin/${email}/${name}`, {
        method: 'POST'
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
  
      const responseData = await response.json();

      // Handle response
      if (responseData.email) {
        setUsername(responseData.email);
        AsyncStorage.setItem('username', responseData.email);
        AsyncStorage.setItem('loggedIn', 'true');
        AsyncStorage.setItem('data', JSON.stringify(responseData));
        setData(responseData);
        setLoggedIn(true);
      }
    } catch (error) {
      console.error('Error during Google Sign In:', error);
      Alert.alert('Error during fetch');
      _signOutGoogle().then(() => {
        console.log('Successfully signed out');
        AsyncStorage.removeItem('photo');
        setCount(count + 1);
      });
    } finally {
      setLoading(false);
    }
  };
  ;
  const applesignIn=async()=>{
    

    try {
      const data=await onAppleButtonPress()
  
      if (!data) {
        console.log('No data');
        return;
      }
  

  
      // Set states and increment count
      setfedemail(data.additionalUserInfo.profile.email);
      setfedusername(data.additionalUserInfo.profile.email);
      setCount(count + 1);
  
      // Make API call
      setLoading(true);
      const response = await fetch(`https://abujacar.org/api/googlesignin/${data.additionalUserInfo.profile.email}/${data.additionalUserInfo.profile.email}`, {
        method: 'POST'
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
  
      const responseData = await response.json();

      // Handle response
      if (responseData.email) {
        setUsername(responseData.email);
        AsyncStorage.setItem('username', responseData.email);
        AsyncStorage.setItem('data', JSON.stringify(responseData));
        AsyncStorage.setItem('loggedIn', 'true');
        setData(responseData);
        setLoggedIn(true);
      }
    } catch (error) {
      console.error('Error during APPLE Sign In:', error);
   
    } finally {
      setLoading(false);
    }
  }
  
useEffect(() => {
  const fetchUri = async () => {
    try {
      const storedUri = await AsyncStorage.getItem('photo');
      if (storedUri) {
        setPhoto(storedUri);
      }
    } catch (error) {
      console.error('Error fetching username from AsyncStorage:', error);
    }
  };

  fetchUri();
}, [photo,count])

  const signIn = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://abujacar.org/api/individualogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          em,
          pass,
        }),
      });
      const data = await response.json();

      if (data.status === 'None') {
Navigation.navigate('verify',{email:data.email,verification:data.code})
      } else if (data.token) {
      fetchData(data.token)
      } else if (data.error) {
        setError(data.error);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred while logging in');
    } finally {
      setLoading(false);
    }
  };
useEffect(() => {
  const fetchUsername = async () => {
    try {
     
      const logIn = await AsyncStorage.getItem('loggedIn');
      if (logIn=='true') {
        setLoggedIn(true);
     
      }
    } catch (error) {
      console.error('Error fetching username from AsyncStorage:', error);
    }
  };

  fetchUsername();
}, [])
const setFalse=()=>{
  setLoggedIn(false)
}
if(loading){
  return <Loading />
}

  if (loggedIn) {
    // If logged in, display a message indicating success
    return (
    

      <View style={tw`flex`}>


      
      <View style={tw``} > 
       <Saved username={username} photo={photo} setFalse={setFalse}/></View>

        {/* You can optionally redirect or perform any other action here */}
      </View>
   
    );
  }
 
  
  return (
    <View style={tw`flex justify-center p-4 bg-[${snapshot.backgroundColor}] h-full`}>
      <View style={tw`bg-[${snapshot.backgroundColor}] border border-[${snapshot.text}] shadow p-4 m-2 rounded`}>
        <Input placeholder='Email'
         inputStyle={{ color: snapshot.text }} 
        onChangeText={setEmail} />
        <Input placeholder='Password' 
           inputStyle={{ color: snapshot.text }} 
        secureTextEntry={true} onChangeText={setPassword} />
        {error ? <Text style={tw`text-red-600 mb-2`}>{error}</Text> : null}
        <Button loading={loading} onPress={signIn} radius={'sm'} type='solid'>
          Login
        </Button>
       
       
{isSignedIn ? <>{<Button onPress={()=>googleSignOut()}>google Sign out </Button>}</>:<>{<View>
<TouchableOpacity style={tw`mt-2 border p-2  items-center border-[#d4d4d4] rounded `} onPress={()=>googleSignIn()}><Image style={tw`h-5 w-15`} source={{uri:`https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png`}} /></TouchableOpacity >

</View>}</>}
{Platform.OS=='ios'?<View  style={tw`mt-2 border p-1 bg-[#ffffff] items-center border-[#d4d4d4] rounded `}>
<AppleButton
      buttonStyle={AppleButton.Style.WHITE}
      buttonType={AppleButton.Type.SIGN_IN}
      style={{
        width: 160,
        height: 45,
      }}
      onPress={() => applesignIn()}
    />
    </View>:null}
<Text style={tw`text-[${snapshot.text}] underline`} onPress={() => Navigation.navigate('signup')}>
            Sign up
          </Text>
        <Text style={tw`my-4 text-[${snapshot.text}]`}>  
          Are you a seller?{' '}
          <Text style={tw`text-[${snapshot.text}] underline`} onPress={() => Navigation.navigate('Selllogin')}>
            Login here
          </Text>{' '}
          {'\n'}  {'\n'}

          <Text style={tw`mt-2 text-[${snapshot.text}]`}>Forgot Password?{' '}
          <Text style={tw`text-[${snapshot.text}] underline `} onPress={() => Navigation.navigate('Forgotpassword')}>
            Click here 
          </Text>
</Text>
        </Text>
      </View>
    </View>
  );
};

export default Login;
