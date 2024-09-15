import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { WebView } from 'react-native-webview';
export default class Signup extends Component {
  render() {
    return <WebView source={{ uri: 'https://abujacar.com/usersignup' }} style={{ flex: 1 }} />;
  }
}