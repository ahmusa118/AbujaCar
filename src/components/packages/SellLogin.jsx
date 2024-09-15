import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { WebView } from 'react-native-webview';
export default class SellLogin extends Component {
  render() {
  return <WebView source={{ uri: 'https://abujacar.com/sellerLogin' }} style={{ flex: 1 }} />;
  }
}