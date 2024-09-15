import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { WebView } from 'react-native-webview';
export default class Forgotpassword extends Component {
  render() {
return <WebView source={{ uri: 'https://abujacar.com/forgotuserpassword' }} style={{ flex: 1 }} />;

  }
}