import React from 'react'
import CardSkeleton from './CardSkeleton'
import {View,ScrollView} from "react-native"
import { state } from '../state/store'
import { useSnapshot } from 'valtio';

export default function MainSkeleton() {
    const snapshot = useSnapshot(state);
  return (
    <ScrollView style={{flex:1,backgroundColor:snapshot.backgroundColor,padding:10,}}>
    <View style={{marginVertical:10,}}>
    <CardSkeleton height={300} width={370} borderRadius={5} />
    </View>
    <View style={{marginVertical:10,marginLeft:10}}>

    <CardSkeleton height={20} width={90} borderRadius={5} />
    </View>
    <View style={{marginVertical:5,marginLeft:10}}>

    <CardSkeleton height={25} width={223} borderRadius={5}/>
    </View>
    <View style={{marginVertical:5,marginLeft:10}}>

    <CardSkeleton height={20} width={367} borderRadius={5}/>
    </View>
    <View style={{marginVertical:5,marginLeft:10,marginLeft:10}}>

    <CardSkeleton height={32} width={110} borderRadius={25} />
    </View>
    <View style={{flexDirection:"row",marginVertical:20}}>
    <View style={{marginLeft:20}}>
<CardSkeleton height={60} width={60} borderRadius={50} />
</View>
<View style={{marginLeft:30}}>
<CardSkeleton height={60} width={60} borderRadius={50} />
</View>
<View style={{marginLeft:30}}>
<CardSkeleton height={60} width={60} borderRadius={50} />
</View>
<View style={{marginLeft:30}}>
<CardSkeleton height={60} width={60} borderRadius={50} />
</View>
</View> 
 </ScrollView>

  )
}