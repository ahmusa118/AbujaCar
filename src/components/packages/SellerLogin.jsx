import React,{useState} from 'react'
import {StyleSheet,Text,View,Image,Dimensions, TouchableOpacity, ScrollView,Linking} from 'react-native'
import Carousel,{Pagination} from 'react-native-snap-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons'
import tw from 'twrnc'
import Lightbox from 'react-native-lightbox-v2'
import { useSnapshot } from 'valtio';
import {state} from '../state/store'

import {Skeleton} from '@rneui/themed'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons' 
const SellerLogin = ({route}) => {
  const snapshot = useSnapshot(state);
const [activeSlide,setActiveSlide]=useState(0)
const { width: screenWidth } = Dimensions.get('window');
const {item}=route.params

  const renderItem = ({ item }) => (
<Lightbox >
           <Image source={{ uri: `https://abujacar.org/api/indcar/${item}` }} style={tw`w-full h-90  `} />
           </Lightbox>

       );

       const pagination=()=>{
        return( <Pagination
          dotsLength={item.images.length}
          activeDotIndex={activeSlide}
          containerStyle={tw` bg-black opacity-50 rounded-full absolute bottom-1 p-2`}
          dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.92)'
          }}
          inactiveDotStyle={{
            width: 8,
            height: 8,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.92)'
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />)
       }
       const itemAddress =item.address+" "+item.location
       const message = `Check out ${item.requestno} on our app because I am interested in the car`;
      const formatphone=(key)=>{
        if (!key.startsWith('+234')) {
          // If not, add the prefix '+234'
          return '+234' + key;
        }
      
      }

       const whatsappLink = `https://wa.me/${formatphone(item.phone)}?text=${message}`

      const makePhoneCall = () => {
        const phoneNumber = item.phone; // Assuming you pass the phone number as a prop
        const phoneCallLink = `tel:${phoneNumber}`;
        Linking.openURL(phoneCallLink);
      }
  return (
    <ScrollView>
    <View style={tw`bg-[${snapshot.backgroundColor}]`}>
   <View  style={tw`flex justify-center items-center w-full`}>
<Carousel


  data={item.images}
  renderItem={renderItem}
  sliderWidth={screenWidth}
  itemWidth={screenWidth}
  layout={'tinder'}

   layoutCardOffset={9}
 style={tw`relative w-full`}
 onSnapToItem={(index) => setActiveSlide(index)}
/>
{pagination()}



   </View>
   <View style={tw`p-5 `}>
   <Text style={[tw` font-semibold text-3xl text-[#da9100]`,styles2.text]}>₦{item.price.toLocaleString()}</Text>
   <Text style={[tw`text-3xl mb-2 font-semibold text-[${snapshot.text}]`,styles2.text]}>{item.make.replace(item.make[0],item.make[0].toUpperCase())} {item.model} {item.year}</Text>
   <View style={tw`flex flex-row gap-2`}><TouchableOpacity style={tw` bg-[#ADD8E6] p-2  rounded-full border border-[#808080] shadow-md`}><Text style={tw`uppercase text-[#ffffff]`}>{item.make}</Text></TouchableOpacity>
   <TouchableOpacity style={tw` bg-[#ADD8E6] p-2  rounded-full border border-[#808080] shadow-md `}><Text style={tw`uppercase text-[#ffffff] `}>{item.model}</Text></TouchableOpacity>
    </View>
   <Text style={tw`text-[#808080] mb-3 mt-3`}>Posted {new Date(item.timestamp).toUTCString()}</Text>
   <View style={{ borderBottomWidth: 1, borderBottomColor: '#808080' }} />
<Text style={[tw`text-3xl font-semibold my-6 text-[${snapshot.text}]`,styles2.text]}>Details</Text>
<View>
<View style={tw`flex flex-row items-center  justify-between border-b border-[#d3d3d3] pb-2 mb-6`}>
  <Text style={[tw`text-base font-semibold text-[${snapshot.text}]`,styles2.text]}>Year</Text> 
<Text style={[tw`mt-1 text-[${snapshot.text}]`,styles2.text]}>{item.year}</Text>
</View>
<View style={tw`flex flex-row items-center justify-between border-b border-[#d3d3d3] pb-2 mb-6`}>
  <Text style={[tw`text-base font-semibold text-[${snapshot.text}] `,styles2.text]}>Kilometer</Text> 
<Text style={[tw`mt-1 text-[${snapshot.text}]`,styles2.text]}>{item.mileage.toLocaleString()}</Text>
</View>

<View style={tw`flex flex-row items-center  justify-between border-b border-[#d3d3d3] pb-2 mb-6`}>
  <Text style={[tw`text-base font-semibold text-[${snapshot.text}]`,styles2.text]}>Transmission</Text> 
<Text style={[tw`mt-1 text-[${snapshot.text}]`,styles2.text]}>{item.transmission}</Text>
</View>

<View style={tw`flex flex-row items-center  justify-between border-b border-[#d3d3d3] pb-2 mb-6`}>
  <Text style={[tw`text-base font-semibold text-[${snapshot.text}]`,styles2.text]}>Category</Text> 
<Text style={[tw`mt-1 text-[${snapshot.text}]`,styles2.text]}>{item.category}</Text>
</View>

<View style={tw`flex flex-row items-center  justify-between border-b border-[#d3d3d3] pb-2 mb-6`}>
  <Text style={[tw`text-base font-semibold text-[${snapshot.text}]`,styles2.text]}>Usage</Text> 
<Text style={[tw`mt-1 text-[${snapshot.text}]`,styles2.text]}>{item.used}</Text>
</View>


<View style={tw`flex flex-row items-center  justify-between border-b border-[#d3d3d3] pb-2 mb-6`}>
  <Text style={[tw`text-base font-semibold text-[${snapshot.text}]`,styles2.text]}>Exterior Color</Text> 
<Text style={[tw`mt-1 text-[${snapshot.text}]`,styles2.text]}>{item.color.replace(item.color[0],item.color[0].toUpperCase())}</Text>
</View>
</View>
<Text style={[tw`text-3xl font-semibold mt-2 mb-2 text-[${snapshot.text}]`,styles2.text]}>Location</Text>
<View style={tw`flex flex-row gap-1 `}><MaterialIcons name='location-pin' color={`${snapshot.text}`}  size={25} />
<TouchableOpacity onPress={()=>Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(itemAddress)}`)} style={tw`text-base`}>
  <Text style={[tw`underline text-[${snapshot.text}]`,styles2.text]}>{item.address}, {item.location}</Text></TouchableOpacity>
</View>

<View style={tw`flex flex-row gap-2 w-full mt-2 justify-between mb-6`}>

<TouchableOpacity onPress={makePhoneCall} style={tw` flex flex-row border-2 items-center p-2 border-[#ff0000] gap-2`}>
  <Text style={tw`text-[#ff0000]`}><MaterialCommunityIcons name='phone' color='#ff0000'  size={15}/> Call</Text>
</TouchableOpacity>

<TouchableOpacity onPress={()=>Linking.openURL(whatsappLink)} style={tw` flex flex-row border-2 items-center p-2 border-[#008000] gap-2`}>
  <Text style={tw`text-[#008000]`}><MaterialCommunityIcons name='whatsapp' color='#008000' size={15}/> WhatsApp</Text>
</TouchableOpacity>


</View>

   </View>
   </View>
   </ScrollView>
  )
}
const styles2 = StyleSheet.create({
  text: {
    // Add the following lines to add fonts in your Text component
    fontFamily: 'Quicksand',
   
  
  }})

export default SellerLogin