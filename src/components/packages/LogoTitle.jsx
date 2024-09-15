import React from 'react';
import { Image,  } from 'react-native';
import tw from 'twrnc'

const LogoTitle = () => {
  return (
    <Image
    style={{ width: 40, height: 40, borderRadius: 20 }}// Adjust the size as needed
      source={require('../../assets/abujacarnormal.jpeg')}
      resizeMode="contain"
    />
  );
};
export default LogoTitle

