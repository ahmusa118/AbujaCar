
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList,TouchableOpacity,StyleSheet,Linking, RefreshControl,Dimensions, ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel'
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient';
import {Card }from '@rneui/themed'
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons' 
import MainSkeleton from './MainSkeleton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import tw from 'twrnc'
import { useSnapshot } from 'valtio';
import {state} from '../state/store'
const Saved = ({setFalse}) => {
  const snapshot = useSnapshot(state);
  const { width: screenWidth ,height: screenHeight} = Dimensions.get('window');
  const [savedData, setSavedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [details,setDetails]=useState([])
const [mapp,setMap]=useState([])
const [totalPages,setTotalPages]=useState('');
const [name,setName]=useState('')
const [count,setCount]=useState(0)
const Navigation=useNavigation()

const handlePageChange = (page) => {
    setCurrentPage(page);

  };

  



  const getdata = async () => {
    try {
      setLoading(true);
      const storedUsername = await AsyncStorage.getItem('username');

      if (storedUsername) {
        setName(storedUsername)
      }
      const response = await fetch(`https://abujacar.org/api/getsavedata/${name}?page=${currentPage}`, { method: 'POST' });
  
      if (response.ok) {
        const data = await response.json();
        setMap(data.data);
    
      }
    } catch (error) {
      console.log(error)
      alert('Internal server error');
    } finally {
      setLoading(false);
    }
  };
  
useEffect(()=>{

    getdata()
},[currentPage,details,name,count])




    const deleteBookmark = async (reqno) => {
      const ftch=await AsyncStorage.getItem('username')
      if(ftch==null){
        setFalse()
       setCount(count+1)
      }else {
        const response = await fetch(`https://abujacar.org/api/delete/${name}/${reqno}`, {
          method: 'DELETE'
        });
        const data = await response.json();
      
        if (response.ok) {
          // Handle success response
         alert(data.success); // You can log or handle the response data here
         getdata()
          return data; // You can return the data if needed
        } else {
          // Handle error response
          throw new Error(data.error || 'Failed to delete bookmark');
        }
      }
      };

      

      const makePhoneCall = async(phone) => {
        const ftch=await AsyncStorage.getItem('username')
        if(ftch==null){
          setFalse()
          
        }else {
        const phoneNumber = phone; // Assuming you pass the phone number as a prop
        const phoneCallLink = `tel:${phoneNumber}`;
        Linking.openURL(phoneCallLink);
        }
      }
      const sendMessage = async(phone, id) => {
        const ftch=await AsyncStorage.getItem('username')
        if(ftch==null){
          setFalse()
        }

        else{
        const message = `Check out ${id} on our app because I am interested in the car`;
        let formattedPhone = phone;
      
        // Check if the phone number starts with '+234'
        if (!phone.startsWith('+234')) {
          // If not, add the prefix '+234'
          formattedPhone = '+234' + phone;
        }
      
        // Open the WhatsApp URL with the formatted phone number and encoded message
        Linking.openURL(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`);
      };
    }
      
    
  const renderItem = ({ item }) => (
    <View >
           <FastImage
        
          source={{ uri: `https://abujacar.org/api/indcar/${item}` }} style={{  width: screenWidth, height: 400, resizeMode: 'cover'}} />
           
           </View>
       );


  return (
    <View style={tw`  bg-[${snapshot.backgroundColor}] h-full`}>
                  

       {loading? <MainSkeleton />: <FlatList
          data={mapp}
         

          refreshControl={<RefreshControl
          refreshing={loading} onRefresh={getdata} />}
          renderItem={({ item }) => (
      
   <View style={tw``}>

              {/* Render each item's details */}
        
             <Carousel
  data={item.images}
  renderItem={renderItem}
  sliderWidth={screenWidth}
  itemWidth={screenWidth}
  layout={'tinder'}
   layoutCardOffset={9}
 style={tw`relative `}
/>
<View style={tw`absolute top-87 left-5 flex flex-row bg-black p-1 rounded opacity-70`}>
<MaterialCommunityIcons name='file-image-marker' size={30} color='#ffffff' />
<Text style={tw`pt-2 text-white pl-2`}>{item.images.length}</Text>
</View>
<View style={tw`absolute right-3 top-3 bg-black px-2 rounded opacity-70 `} >
<MaterialCommunityIcons color='#d4d4d4' name='bookmark-off-outline' onPress={()=>deleteBookmark(item.requestno)} size={30}  />
</View>
<View style={tw` p-2`}>
<Text style={[tw`font-semibold text-xl text-[#da9100]`,styles2.text]} >₦{parseInt(item.newPrice).toLocaleString()}</Text>

<ScrollView horizontal={true} contentContainerStyle={tw`flex flex-row items-center gap-2 `}> 
          <View style={[tw`rounded-full border border-[#da9100] p-1 opacity-80 bg-[${snapshot.backgroundColor}] px-2 flex flex-row items-center gap-1 `]}><MaterialIcons size={20} color='#da9100' name='directions-car'/><Text style={[tw`text-base shadow font-bold`, { color: snapshot.text }]}>{item.make.replace(item.make[0],item.make[0].toUpperCase())} </Text></View>
          <View style={[tw`rounded-full border border-[#da9100] p-1  opacity-80 bg-[${snapshot.backgroundColor}] pr-2 flex flex-row items-center gap-1`]}><MaterialIcons size={20} color='#da9100' name='model-training'/><Text style={[tw`uppercase text-base opacity-100 text-[${snapshot.text}] font-bold`]}> {item.model}</Text></View>

          <View style={[tw`rounded-full border border-[#da9100] p-1  opacity-80 bg-[${snapshot.backgroundColor}] pr-2 flex flex-row items-center gap-1`]}>
            <MaterialCommunityIcons name='speedometer' color={`#da9100`} size={20}/>
             <Text style={[tw`text-[${snapshot.text}]  text-base`]}>{item.mileage.toLocaleString()} km</Text></View>
         </ScrollView >
      
         <View style={tw`flex flex-row gap-2 my-1 `}>
          <MaterialCommunityIcons color={`${snapshot.text}`} name='calendar-multiple-check' size={20}/>
            <Text style={[tw`text-[${snapshot.text}]`,styles2.text]}>{item.year}</Text>

            </View>


             <View style={tw`flex flex-row gap-2`}>
              <MaterialIcons color={`${snapshot.text}`} name='location-history' size={20} />
              <Text style={[tw`text-[${snapshot.text}]`,styles2.text]} >{item.address}</Text>
             </View>

             </View>
        
            <View style={tw`flex flex-row justify-between w-full  mb-2 mt-1 p-2`}>

           <TouchableOpacity
  onPress={() => makePhoneCall(item.phone)}
  style={tw`flex flex-row border-2 items-center p-2 border-[#ff0000]`}
>
  <MaterialCommunityIcons name='phone' color='#ff0000' size={15} />
  <Text style={styles.buttonText2}>Call</Text>
</TouchableOpacity>
           
            <TouchableOpacity
  onPress={() => sendMessage(item.phone, item.requestno)}
  style={tw`flex flex-row border-2 items-center p-2 border-[#008000]`}
>
  <MaterialCommunityIcons name='whatsapp' color='#008000' size={15} />
  <Text style={styles.buttonText}>WhatsApp</Text>
</TouchableOpacity>
           
           </View>
          
  </View>

          )}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={
            <View style={styles.footerContainer}>
            {currentPage<=1?'':
            <>
            <TouchableOpacity  onPress={()=>setCurrentPage(1)}>
              <Text style={[tw`text-[${snapshot.text}]`,styles2.text]}>
                Back to first page
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
          
          style={[styles.button, loading && styles.disabledButton]}
            onPress={() => handlePageChange(currentPage - 1)}
            disabled={loading || currentPage === totalPages}
          >
              <LinearGradient
                colors={['#2c3e50', '#34495e', '#2c3e50']} 
                style={styles.gradientButton}
              >
                <MaterialIcons name='arrow-back' color={`#fff`} size={20}/>
        
              </LinearGradient>
             </TouchableOpacity>
             
             </>
             }
             <Text style={[styles.pageNumber, { color: snapshot.text }]}>{currentPage}</Text>
          {
            <>

           {mapp.length<3?null:<TouchableOpacity
            title="Front"
            style={[styles.button, loading && styles.disabledButton]}
            onPress={() => handlePageChange(currentPage + 1)}
           
          >
            <LinearGradient
                colors={['#2c3e50', '#34495e', '#2c3e50']} 
                style={styles.gradientButton}
              >
                    <MaterialIcons name='arrow-forward' color={`#fff`} size={20}/>
              </LinearGradient>


          </TouchableOpacity>}
          </>
          }
          </View>
        }
          // Add pagination controls if needed
        />}
  
    </View>
  );

};
const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  marginBottom:100
  },
  button: {
    marginHorizontal: 10,
  },
  gradientButton: {
    padding: 10,
    borderRadius: 5,
  },
  icon: {
    textAlign: 'center',
  },
  pageInput: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
    width: 60,
    marginHorizontal: 10,
    fontSize: 16,
  },
  pageText: {
    color: '#fff',
    fontSize: 16,
  },
    whatsappButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#808080',
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 8,
      backgroundColor: '#fff', // Background color
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    buttonText: {
      marginLeft: 5,
      color: '#008000', // Text color
      fontSize: 15,
    },
    callButton: {
      borderWidth: 1,
      borderColor: '#808080',
      borderRadius: 5,
      paddingHorizontal: 20,
      paddingVertical: 5,
      backgroundColor: '#fff', // Background color
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      ...tw`border border-[#808080] rounded px-10 py-1`, // Include tailwind styles
    },
    buttonText2: {
      marginLeft: 5,
      marginRight: 5,
      flexDirection: 'row',
      alignItems: 'center',
      color: '#ff0000', // Text color
      fontSize: 15,
      ...tw`flex-row gap-2`, // Include tailwind styles
    },
    quicksandLight: {
      fontFamily: 'Quicksand-Light',
      fontSize: 20,
    },
    quicksandRegular: {
      fontFamily: 'Quicksand-Regular',
      color:'#000000'
      
    },
  });

  const styles2 = StyleSheet.create({
    text: {
      // Add the following lines to add fonts in your Text component
      fontFamily: 'Quicksand',
     fontWeight:'bold'
    
    }})
export default Saved;

