import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import Login from './Login';
import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Settings from './Setting';
const Tab = createBottomTabNavigator();


function Unlogin() {
  return (
    <Tab.Navigator 
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        paddingTop:4,
        backgroundColor: 'rgba(60, 60, 60, 0.7)', // Dark gray with 70% opacity
        borderTopWidth: 0,
        position: 'absolute',
        elevation: 0, // Remove shadow
      },
      tabBarActiveTintColor:'#da9100'
    }}
    
  >
    <Tab.Screen
  name="Home"
  component={HomeScreen}
  options={{
    tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="home-assistant" color={color} size={35} />
    )
  }}
/>
      <Tab.Screen name="Profile" component={Login} 
      options={{
        tabBarIcon: ({ color, size }) => (
          <EvilIcons name="user" color={color} size={40} />
        )
      }}
      
      />
      <Tab.Screen
  name="Settings"
  component={Settings}
  options={{
    tabBarIcon: ({ color, size }) => (
      <EvilIcons name='gear' size={40}  color={color} />
    )
  }}
/>
    </Tab.Navigator>
  );
}
export default Unlogin