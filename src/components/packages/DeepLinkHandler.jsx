import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView, Linking } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import {  useRoute, useIsFocused,useNavigation } from '@react-navigation/native';
import { useSnapshot } from 'valtio';
import { state } from '../state/store';
import { Skeleton,Button } from '@rneui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DeepLinkHandler = () => {
  const snapshot = useSnapshot(state);
  const [activeSlide, setActiveSlide] = useState(0);
  const [itm, setItm] = useState(null);
  const route = useRoute();
  const isFocused = useIsFocused();
  const navigation=useNavigation()
  const [showBackButton, setShowBackButton] = useState(false);
  const { width: screenWidth } = Dimensions.get('window');
  useEffect(() => {
    if (isFocused) {
      const state = navigation.getState();
      // Show back button if there is no previous route in the stack
      if (route.path.startsWith('/buy')) {
        setShowBackButton(true);
      } else {
        setShowBackButton(false);
      }
    }
  }, [isFocused, navigation, route]);


  const fetchData = async () => {
    try {
      const response = await fetch(`https://abujacar.org/api/getcardetail/${route.params.id}`, {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setItm(data); // Set the data using setItm
    } catch (error) {
      console.error(error.message);
      // Handle the error, such as displaying an error message to the user
    }
  };

  useEffect(() => {
    fetchData(); // Call fetchData once when component mounts
  }, []);

  const renderItem = ({ item }) => (
    <Image
      loadingIndicatorSource={
        <View style={tw`flex flex-row gap-6 mt-2`}>
          <Skeleton animation="pulse" circle width={80} height={80} />
          <View style={tw`flex flex-col gap-2`}>
            <Skeleton animation="wave" width={180} height={10} />
            <Skeleton animation="wave" width={180} height={10} />
            <Skeleton animation="wave" width={180} height={10} />
            <Skeleton animation="wave" width={180} height={10} />
            <Skeleton animation="wave" width={180} height={10} />
          </View>
        </View>
      }
      source={{ uri: `https://abujacar.org/api/indcar/${item}` }}
      style={tw`w-full h-90`}
    />
  );

  const pagination = () => {
    return (
      <Pagination
        dotsLength={itm ? itm.images.length : 0}
        activeDotIndex={activeSlide}
        containerStyle={tw`bg-black opacity-50 rounded-full absolute bottom-1 p-2`}
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
      />
    );
  };

  const formatphone = (key) => {
    if (!key.startsWith('+234')) {
      // If not, add the prefix '+234'
      return '+234' + key;
    }
    return key;
  };

  if (!itm) {
    return <View style={tw`bg-[${snapshot.backgroundColor}] h-full`}>
      
    <View style={tw`mb-10 flex justify-center items-center mt-5`}>
    <View style={tw`flex flex-row gap-6 mt-2 `}>
   
  
   <Skeleton 
    animation="pulse"
  
   circle width={100} height={100} />
   <View style={tw`flex flex-col gap-2`}>
   <Skeleton
    
     animation="wave"
     width={180}
     height={10}
  
  
   />
    <Skeleton
    
    animation="wave"
    width={180}
    height={10}
  
  
  />
  <Skeleton
    
    animation="wave"
    width={180}
    height={10}
  
  
  />
  <Skeleton
    
    animation="wave"
    width={180}
    height={10}
  
  
  />
  <Skeleton
    
    animation="wave"
    width={180}
    height={10}
  
  
  />
  <Skeleton
    
    animation="wave"
    width={180}
    height={10}
  
  
  />
  
  
  
   </View>
  </View>
  </View>
  </View>// Or any other loading indicator you prefer
  }

  const itmAddress = `${itm.address} ${itm.location}`;
  const message = `Check out ${itm.requestno} on our app because I am interested in the car`;
  const whatsappLink = `https://wa.me/${formatphone(itm.phone)}?text=${message}`;

  const makePhoneCall = () => {
    const phoneNumber = itm.phone; // Assuming you pass the phone number as a prop
    const phoneCallLink = `tel:${phoneNumber}`;
    Linking.openURL(phoneCallLink);
  };
  return (
    <ScrollView>
      <View style={tw`bg-[${snapshot.backgroundColor}]`}>
  
        <View style={tw`flex justify-center items-center w-full`}>
          <Carousel
            data={itm.images}
            renderItem={renderItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
            layout={'tinder'}
            layoutCardOffset={9}
            style={tw`relative w-full`}
            onSnapToItem={(index) => setActiveSlide(index)}
          />
          {pagination()}
          <View style={tw`absolute top-0  left-0`}>
          {showBackButton && (
         <Button
         type="outline"
         title="Back to Home"
         icon={<MaterialCommunityIcons name='chevron-left'  color='#da9100' size={25}/>}
         onPress={() => navigation.navigate('Signin')}
         buttonStyle={{ borderColor: '#da9100', paddingHorizontal: 10 }} // Adjust padding to fit content
         titleStyle={{ color: '#da9100' }} // Text color
         // Align the button to the start
       />
      )}
      </View>
        </View>
        <View style={tw`p-5`}>
          <Text style={[tw`font-semibold text-3xl text-[#da9100]`, styles2.text]}>₦{itm.price.toLocaleString()}</Text>
          <Text style={[tw`text-3xl mb-2 font-semibold text-[${snapshot.text}]`, styles2.text]}>
            {itm.make.replace(itm.make[0], itm.make[0].toUpperCase())} {itm.model} {itm.year}
          </Text>
          <View style={tw`flex flex-row gap-2`}>
            <TouchableOpacity style={tw`bg-[#ADD8E6] p-2 rounded-full border border-[#808080] shadow-md`}>
              <Text style={tw`uppercase text-[#ffffff]`}>{itm.make}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`bg-[#ADD8E6] p-2 rounded-full border border-[#808080] shadow-md`}>
              <Text style={tw`uppercase text-[#ffffff]`}>{itm.model}</Text>
            </TouchableOpacity>
          </View>
          <Text style={tw`text-[#808080] mb-3 mt-3`}>Posted {new Date(itm.timestamp).toUTCString()}</Text>
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#808080' }} />
          <Text style={[tw`text-3xl font-semibold my-6 text-[${snapshot.text}]`, styles2.text]}>Details</Text>
          <View>
            <View style={tw`flex flex-row items-center justify-between border-b border-[#d3d3d3] pb-2 mb-6`}>
              <Text style={[tw`text-base font-semibold text-[${snapshot.text}]`, styles2.text]}>Year</Text>
              <Text style={[tw`mt-1 text-[${snapshot.text}]`, styles2.text]}>{itm.year}</Text>
            </View>
            <View style={tw`flex flex-row items-center justify-between border-b border-[#d3d3d3] pb-2 mb-6`}>
              <Text style={[tw`text-base font-semibold text-[${snapshot.text}]`, styles2.text]}>Kilometer</Text>
              <Text style={[tw`mt-1 text-[${snapshot.text}]`, styles2.text]}>{itm.mileage.toLocaleString()}</Text>
            </View>
            <View style={tw`flex flex-row items-center justify-between border-b border-[#d3d3d3] pb-2 mb-6`}>
              <Text style={[tw`text-base font-semibold text-[${snapshot.text}]`, styles2.text]}>Transmission</Text>
              <Text style={[tw`mt-1 text-[${snapshot.text}]`, styles2.text]}>{itm.transmission}</Text>
            </View>
            <View style={tw`flex flex-row items-center justify-between border-b border-[#d3d3d3] pb-2 mb-6`}>
              <Text style={[tw`text-base font-semibold text-[${snapshot.text}]`, styles2.text]}>Usage</Text>
              <Text style={[tw`mt-1 text-[${snapshot.text}]`, styles2.text]}>{itm.used}</Text>
            </View>
            <View style={tw`flex flex-row items-center justify-between border-b border-[#d3d3d3] pb-2 mb-6`}>
              <Text style={[tw`text-base font-semibold text-[${snapshot.text}]`, styles2.text]}>Exterior Color</Text>
              <Text style={[tw`mt-1 text-[${snapshot.text}]`, styles2.text]}>
                {itm.color.replace(itm.color[0], itm.color[0].toUpperCase())}
              </Text>
            </View>
          </View>
          <Text style={[tw`text-3xl font-semibold mt-2 mb-2 text-[${snapshot.text}]`, styles2.text]}>Location</Text>
          <View style={tw`flex flex-row gap-1`}>
            <Ionicons name='location' color={`${snapshot.text}`} size={25} />
            <TouchableOpacity
              onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(itmAddress)}`)}
              style={tw`text-base`}
            >
              <Text style={[tw`underline text-[${snapshot.text}]`, styles2.text]}>
                {itm.address}, {itm.location}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={tw`flex flex-row gap-2 w-full mt-2 justify-between mb-6`}>
            <TouchableOpacity onPress={makePhoneCall} style={tw`flex flex-row border-2 items-center p-2 border-[#ff0000] gap-2`}>
              <Text style={tw`text-[#ff0000]`}><MaterialCommunityIcons name='phone' color='#ff0000' size={15} /> Call</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL(whatsappLink)} style={tw`flex flex-row border-2 items-center p-2 border-[#008000] gap-2`}>
              <Text style={tw`text-[#008000]`}><MaterialCommunityIcons name='whatsapp' color='#008000' size={15} /> WhatsApp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles2 = StyleSheet.create({
  text: {
    fontFamily: 'Quicksand',
  },
});

export default DeepLinkHandler;
