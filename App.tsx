/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Splash from './src/components/packages/Splash';
import SellerLogin from './src/components/packages/SellerLogin'
import Unlogin from './src/components/packages/Unlogin';
import Searchresult from './src/components/packages/Searchresult'
import DeepLinkHandler from './src/components/packages/DeepLinkHandler'
import Verifyme from './src/components/packages/Verifyme'
import Signup from './src/components/packages/Signup'
import SellLogin from './src/components/packages/SellLogin';
import Forgotpassword from './src/components/packages/Forgotpassword'
import Settings from './src/components/packages/Settings'
import Saved from './src/components/packages/Saved';
import Login from './src/components/packages/Login'
import Logo from './src/components/packages/LogoTitle';
import { useSnapshot } from 'valtio';
import {state} from './src/components/state/store'

  const Stack = createNativeStackNavigator();

const config={
  screens:{
    Root:"Root",
    Deeplinkhandler:{
      path: 'buy/:id',
      parse: {
        id: (id) => `${id}`,
      }
    }
  }
}
 //abujacar://app/user/80ee42af
 messaging().setBackgroundMessageHandler(async remoteMessage=>{
  console.log('Message handled in the background!', remoteMessage);
 })
 async function requestUserPermission() {
  const authorizationStatus = await messaging().requestPermission();

  if (authorizationStatus) {
    console.log('Permission status:', authorizationStatus);
  }
}


function App(){
  useEffect(()=>{
    const setup=async()=>{
      requestUserPermission()
      const token = await messaging().getToken()
      console.log('token is '+ token )
    }
    setup()
  },[])
  const snapshot = useSnapshot(state);

  return (  <NavigationContainer
  linking={{
    prefixes:["https://abujacar.org","abujacar.org/"],
    config
  }}
  
  >
    <Stack.Navigator initialRouteName="Splash" screenOptions={{
headerStyle: {
backgroundColor: `${snapshot.headcolor}`, // Set the header background color
},

headerTintColor: '#ccc', // Set the header text and icons color to white
headerTitleStyle: {
fontWeight: 'bold',
},
}}>
     <Stack.Screen name="Splash" options={{headerShown:false}} component={Splash} />
<Stack.Screen name="Signin" component={Unlogin} 
 options={{ 
  headerLeft: () => <Logo />,
  headerTitle: 'AbujaCar', // Optional: Center align the logo
  headerTitleStyle: {
    color: snapshot.text, // Replace with your color code or variable
  }
}}
/>
<Stack.Screen name="Root" component={SellerLogin} 
 options={{ 
  headerTitle: () => <Logo />,
  headerTitleAlign: '', // Optional: Center align the logo
}}
/>
<Stack.Screen name="Searchresult" component={Searchresult} 
 options={{ 
  headerTitle: () => <Logo />,
  headerTitleAlign: 'center', // Optional: Center align the logo
}}
/>
<Stack.Screen name="Deeplinkhandler" component={DeepLinkHandler}
 options={{ 
  headerTitle: () => <Logo />,
  headerTitleAlign: 'center', // Optional: Center align the logo
}}
/>
<Stack.Screen name="verify" component={Verifyme} 
 options={{ 
  headerTitle: () => <Logo />,
  headerTitleAlign: 'center', // Optional: Center align the logo
}}
/>
<Stack.Screen name="signup" component={Signup}
 options={{ 
  headerTitle: () => <Logo />,
  headerTitleAlign: 'center', // Optional: Center align the logo
}}
/>
<Stack.Screen name="Selllogin" component={SellLogin} 
 options={{ 
  headerTitle: () => <Logo />,
  headerTitleAlign: 'center', // Optional: Center align the logo
}}
/>
<Stack.Screen name="Forgotpassword" component={Forgotpassword} 
 options={{ 
  headerTitle: () => <Logo />,
  headerTitleAlign: 'center', // Optional: Center align the logo
}}
/>
<Stack.Screen name="Settings" component={Settings} />
<Stack.Screen name="saved" component={Saved} />
<Stack.Screen name="login" component={Login} />
</Stack.Navigator>
  </NavigationContainer>)
}
export default App;

