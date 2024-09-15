import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import {useSnapshot} from 'valtio'
import { state } from '../state/store';

const Loading = () => {
    const snapshot=useSnapshot(state)
  const navigation = useNavigation();
 
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Signin'); // Replace 'Home' with your target screen
    }, 3000); // Duration of the splash screen in milliseconds

    return () => clearTimeout(timer);
  }, [navigation]);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: snapshot.backgroundColor,
    },
  });
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/loading.json')}
        autoPlay
        loop={false}
      />
    </View>
  );
};




export default Loading;
