import React, { useState, useEffect } from 'react';
import FastImage from 'react-native-fast-image';
import { View, Text, TextInput, FlatList, Image,ScrollView,StyleSheet, TouchableOpacity,Dimensions,Linking } from 'react-native';
import { Button } from 'react-native-elements';
import tw from 'twrnc'
import Banner from './Banner';
import LinearGradient from 'react-native-linear-gradient';
import { useSnapshot } from 'valtio';
import MainSkeleton from './MainSkeleton';
import {state} from '../state/store'
import Search from './Search'
import {Skeleton} from '@rneui/themed'
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons' 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons' 
import Carousel from 'react-native-snap-carousel';
const Searchresult = ({route}) => {
  const snapshot = useSnapshot(state);
  const { width: screenWidth } = Dimensions.get('window');
    const [currentPage, setCurrentPage] = useState(1);
const [loading,setLoading]=useState(false)
const Navigation=useNavigation()
const [data,setData]=useState(route.params.state)
const hc=(key)=>{

    Navigation.navigate('Root',{item:key})
      }


      const fetchData = async (page) => {
        // Fetch data for the specified page
        // You need to implement the logic to fetch data based on the page number
 
            try {
              const response = await fetch(`https://abujacar.org/api/search?page=${page}`,{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: route.params.filter,
              });
              const data = await response.json();
      
              if (response.ok) {
                setData(data);
              } else {
                console.error(`Error fetching data`);
              }
            } catch (error) {
              console.error('Error fetching data', error);
            }
          
      }

      const handlePrevPage = () => {
        if (currentPage > 1) {
          const prevPage = currentPage - 1;
          setCurrentPage(prevPage);
          fetchData(prevPage);
        }
      };
    
      const handleNextPage = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        fetchData(nextPage);
      }
       
      const sendMessage = (phone, id) => {
       
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
      const renderItem = ({ item }) => {
 
        return(
        <TouchableOpacity disabled={item.status === 'Sold'}  onPress={()=>hc(item.details)} style={tw`relative flex items-center justify-center`}>
    
          <FastImage
            source={{ uri: `https://abujacar.org/api/indcar/${item.image}` }} 
            style={{ width: screenWidth, height: 400, resizeMode: 'cover' }} 
          />
       
       <Banner 
        message={`AbujaCar`}
        style={{
          color: 'black', 
          backgroundColor: `#da9100`, 
          fontWeight: 'bold',
        }}
      />
       
        </TouchableOpacity >)
    }
       
  return (
    <View style={tw`  bg-[${snapshot.backgroundColor}] h-full`}>
                  

    {loading? <MainSkeleton />: <FlatList
       data={data}
      
       renderItem={({ item }) => (
   
<View style={tw``}>

           {/* Render each item's details */}
     
       
<Carousel
  data={item.images.map((image, index) => ({ image:item.images[0], subType: item.subType,status:item.state,details:item }))}
  renderItem={renderItem}
  sliderWidth={screenWidth}
  itemWidth={screenWidth}
  layout={'tinder'}
  scrollEnabled={false} 
  layoutCardOffset={9}
  style={tw`relative w-full`}
/>
<View style={tw`absolute top-87 left-5 flex flex-row bg-black p-1 rounded opacity-70`}>
<MaterialCommunityIcons name='file-image-marker' size={30} color='#ffffff' />
<Text style={tw`pt-2 text-white pl-2`}>{item.images.length}</Text>
</View>
<View style={tw`absolute right-3 top-3 bg-black px-2 rounded opacity-70 `} >
<MaterialCommunityIcons color='#d4d4d4' name='bookmark-off-outline' onPress={()=>deleteBookmark(item.requestno)} size={30}  />
</View>
<View style={tw` p-2`}>
<Text style={[tw`font-semibold text-xl text-[#da9100]`,styles2.text]} >₦{parseInt(item.price).toLocaleString()}</Text>


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
         onPress={() => handlePrevPage()}
         
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

        {data.length<3?null:<TouchableOpacity
         title="Front"
         style={[styles.button, loading && styles.disabledButton]}
         onPress={() => handleNextPage ()}
        
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
  )
}



const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
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
  container: {
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    zIndex: 1,  
  },
  textconatainer:{
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    zIndex: 1,  
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
    fontFamily: 'QuicksandLight',
    fontSize: 20,
  },
  quicksandRegular: {
    fontFamily: 'QuicksandRegular',
    color:"#848484"
  },
});

const styles2 = StyleSheet.create({
  text: {
    // Add the following lines to add fonts in your Text component
    fontFamily: 'Quicksand',
   
  
  },
  container: {
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    zIndex: 1,  
  },
  container2: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    zIndex: 1,  
  }

})
export default Searchresult