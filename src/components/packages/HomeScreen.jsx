import React, { useState, useEffect, useRef } from 'react';
import { View,Switch, TextInput,ActivityIndicator, FlatList, Image,ScrollView, TouchableOpacity,Dimensions,Linking,Share ,Alert ,StyleSheet, RefreshControl } from 'react-native';
import FastImage from 'react-native-fast-image';
import Text from 'react-native-fontext'
import Loading from './Loading';
import LinearGradient from 'react-native-linear-gradient';
import tw from 'twrnc'
import Spinner from 'react-native-loading-spinner-overlay'
import Lightbox from 'react-native-lightbox-v2'
import Banner from './Banner'
import MainSkeleton from './MainSkeleton';
import Search from './Search'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'

import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { useSnapshot } from 'valtio';
import {state} from '../state/store'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// Get the full width of the device


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons' 
import Carousel from 'react-native-snap-carousel';
import { Skeleton  } from '@rneui/themed';
const HomeScreen = () => {
  const snapshot = useSnapshot(state);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading1,setLoading1]=useState(false)
  const [isSearchModalVisible, setSearchModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [username, setUsername] = useState('');
  const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(false);
  const { width: screenWidth } = Dimensions.get('window');
const Navigation=useNavigation()
  const fetchData = async () => {

    let apiUrl = `https://abujacar.org/api/improvedcars?page=${currentPage}&search=${searchQuery}`;
    setLoading(true)
    fetch(apiUrl,{
      method:'GET',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      }
    }).then((res)=>res.json())
    .then((json)=>
    setOrderData([...orderData,...json]))
    .catch((error)=>console.error(error))
    .finally(()=>setLoading(false))
  };
  const handleshare = async (key) => {
    try {
      const url = `https://abujacar.org/buy/${key}`;
      const message = `Check out this link: ${url}`;
      
      const result = await Share.share({
        message: message,
      });

      if (result.action === Share.sharedAction) {
        console.log('Shared successfully');
      } else if (result.action === Share.dismissedAction) {
        console.log('Share cancelled');
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  }
 const scrollViewRef = useRef();

  const scrollToTop = () => {
    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
  };
useEffect(() => {
  const fetchUsername = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    } catch (error) {
      console.error('Error fetching username from AsyncStorage:', error);
    }
  };

  fetchUsername();
}, [username])



const deleteBookmark = async (email, reqno) => {
  const response = await fetch(`https://abujacar.org/api/delete/${email}/${reqno}`, {
    method: 'DELETE'
  });
  const data = await response.json();

  if (response.ok) {
    // Handle success response
   Alert.alert(data.success); // You can log or handle the response data here
    return data; // You can return the data if needed
  } else {
    // Handle error response
    throw new Error(data.error || 'Failed to delete bookmark');
  }
};




  const handleFilter = async (filters) => {
    try {
      
      // Convert price and mileage arrays to string
      const filtersString = JSON.stringify(filters);
      setLoading1(true)
      const response = await fetch('https://abujacar.org/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: filtersString,
      });
      const data = await response.json();
      if (data) {
        // Handle the search results (e.g., update state with the search results)
        Navigation.navigate('Searchresult',{state:data,filter:filtersString})
      } else {
 
        console.log('Failed. Please try again')
      }
    } catch (error) {
      console.error('Error searching cars:', error);
    }
    finally{
      setLoading1(false)
    }
  };
  const handleCancel = () => {
    setSearchModalVisible(false);
  };
  const showModal = () => {
    setSearchModalVisible(true);
  };
  useEffect(() => {
   

    fetchData();
  }, [currentPage, searchQuery]);

  useEffect(() => {
    const fetchTotalItems = async () => {
      try {
        const response = await fetch('https://abujacar.org/api/totalOrderItems');
        const data = await response.json();

        if (response.ok) {
          setTotalItems(data.totalItems);
        } else {
          Alert.alert(`Error fetching total items: ${data.error}`);
        }

      } catch (error) {
        Alert.alert('Error fetching total items');
      }
    };

    fetchTotalItems();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = async (text) => {
    setSearchQuery(text);
  
    try {
      // Reset the orderData to an empty array before fetching new data
      setOrderData([]);
      setCurrentPage(1); // Reset the page number to 1 for the new search
  
      const url = `https://abujacar.org/api/improvedcars?page=1&search=${text}`;
      const response = await fetch(url);
  
      if (response.ok) {
        const data = await response.json();
        setOrderData(data); // Set the fetched data into the state
      } else {
        console.error('Error fetching data:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  ;
const handlePress=async(key)=>{

try {
 const data=await AsyncStorage.getItem('username')
 if(data==null){
  alert('Please Login')
 }
 else{
try {

const data2=await fetch(`https://abujacar.org/api/save/${data}`,{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(key),
})
const response=await  data2.json() 






if(response.success){

  Alert.alert(response.success)
}else if (response.alert) {
  // Show a custom alert with "Yes" and "No" options
  Alert.alert(
    'Remove from bookmarks?',
    response.alert,
    [
      {
        text: 'Yes',
        onPress: () => {
          
          deleteBookmark(data,key.requestno)
        },
      },
      {
        text: 'No',
        onPress: () => {
          // Do nothing or handle the "No" option
          console.log('User pressed No');
        },
        style: 'cancel',
      },
    ],
    { cancelable: false }
  )
}

else {
  console.log(response)
  alert(response.error)
}
} catch (error) {
  console.log(error)
  alert('Internal server errors')
}

}
} catch (error) {
  console.log(error)
  alert('Internal server Errors')
}
}


  const SIZE = 3;
  const totalPages = Math.ceil(totalItems / SIZE);
  
  const [refreshing, setRefreshing] = useState(false);
  const [triggeredOnce, setTriggeredOnce] = useState(false);
  const onRefresh = () => {
    if (!triggeredOnce) {
      setRefreshing(true);
      setTriggeredOnce(true);

      handlePageChange(currentPage + 1); // Fetch next page data
     

      setTimeout(() => {
        setRefreshing(false);
        setTriggeredOnce(false); // Reset flag after refresh
      }, 2000); // Simulating network request
    }
  };

  const handleScroll = ({ nativeEvent }) => {
    // Check if loading is true and currentPage is 1, if so, return early
    if (loading && currentPage === 1) {
      return;
    }
  
    const paddingToBottom = 20;
    if (nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >= nativeEvent.contentSize.height - paddingToBottom) {
      onRefresh();
    }
  };
  if(loading1){return <Loading />}
  const renderItem = ({ item }) => {
 
    return(
    <TouchableOpacity disabled={item.status === 'Sold'}  onPress={()=>hc(item.details)} style={tw`relative flex items-center justify-center`}>

      <FastImage
        source={{ uri: `https://abujacar.org/api/indcar/${item.image}` }} 
        style={{ width: screenWidth, height: 400, resizeMode: 'cover' }} 
      />
   

   <Banner 
        message={`${item.status=='Pending'?'AbujaCar':item.status}`}
        style={{
          color: 'black', 
          backgroundColor: `${item.status === 'Sold' 
          ? '#FF6666' 
          : 'yellow'}`, 
          fontWeight: 'bold',
        }}
      />

   
    </TouchableOpacity >)
}
  
  const hc=(key)=>{
Navigation.navigate('Root',{item:key})
  }
  
 const makePhoneCall = (phone) => {
    const phoneNumber = phone; // Assuming you pass the phone number as a prop
    const phoneCallLink = `tel:${phoneNumber}`;
    Linking.openURL(phoneCallLink);
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


const handPress=(key)=>{

 const filter= {"category": key, "location": "", "make": "", "mileage": ["", ""], "model": "", "price": ["", ""], "used": ""}
handleFilter(filter)
}


{/*orderData.forEach((item, index) => {
  console.log(`Item ${index + 1}: ${item.subType}`);
})*/}

  return (
    <ScrollView 

    onScroll={handleScroll}
    scrollEventThrottle={16}

    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    ref={ scrollViewRef} style={tw`bg-[${snapshot.backgroundColor}] h-full `}>
    <View>
      <View style={tw`relative`}>
    <TextInput
  placeholder="Search for car, make or model"
  placeholderTextColor={`${snapshot.searchtextcolor}`}
  onChangeText={handleSearch}
  style={{
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    backgroundColor:`${snapshot.searchcolor}`,
    marginTop:10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }}
/>
<View style={tw`absolute right-0 top-[14%] bg-[#da9100] h-[57%]  rounded-r-full`}><MaterialIcons name='search' onPress={showModal}  size={25} color='white' style={tw`pt-2 px-2`}/></View>



</View>

<Text style={[tw`text-xl font-bold ml-4 mb-4 text-[${snapshot.text}]`,styles2.text]}>Suggestions</Text>
<View style={tw`flex flex-row`}>
  <ScrollView horizontal={true}>
    
<View style={tw`ml-4 mb-4 bg-[#faf9f6] rounded-lg w-20 h-22 `}>
  <TouchableOpacity onPress={()=>handPress('Sedan')}>
<Image style={tw`w-20 h-20 rounded-lg relative`} source={require(`../../assets/sedan.jpg`)}/>
<Text style={[tw`text-sm font-bold text-center text-[#000000] absolute bottom-0 left-5`,styles2.text]}>Sedan</Text>
</TouchableOpacity>
</View>



<View style={tw`ml-4 mb-4 bg-[#faf9f6] rounded-lg h-22 `}>
  <TouchableOpacity onPress={()=>handPress('Suv')}>
<Image style={tw`w-20 h-18 rounded-lg relative`} source={require(`../../assets/suv.jpg`)}/>
<Text style={[tw`text-sm font-bold text-center text-[#000000] absolute top-15 left-5`,styles2.text]}>Suv</Text>
</TouchableOpacity>
</View>


<View style={tw`ml-4 mb-4 bg-[#faf9f6] rounded-lg h-22 `}>
  <TouchableOpacity onPress={()=>handPress('Bus')}>
<Image style={tw`w-20 h-18 rounded-lg relative`} source={require(`../../assets/bus.jpg`)}/>
<Text style={[tw`text-sm font-bold text-center text-[#000000] absolute top-16 left-6`,styles2.text]}>Bus</Text>
</TouchableOpacity>
</View>
<View style={tw`ml-4 mb-4 bg-[#faf9f6] rounded-lg p-1`}>
  <TouchableOpacity onPress={()=>handPress('Pick-up Truck')}>
<Image style={tw`w-20 h-18 rounded-lg relative`} source={require(`../../assets/pickup.jpg.webp`)}/>
<Text style={[tw`text-sm font-bold text-center text-[#000000] `,styles2.text]}>Pick-up Truck</Text>
</TouchableOpacity>
</View>



<View style={tw`ml-4 mb-4 bg-[#faf9f6] rounded-lg  pt-2`}>
  <TouchableOpacity onPress={()=>handPress('Motorcycle')}>
<Image style={tw`w-18 h-16 m-auto  rounded-lg relative`} source={require(`../../assets/motorcycle.png`)}/>
<Text style={[tw`text-sm font-bold text-center text-[#000000] p-1`,styles2.text]}>Motorcycle</Text>
</TouchableOpacity>
</View>


<View style={tw`ml-4 mb-4 bg-[#faf9f6] rounded-lg  `}>
  <TouchableOpacity onPress={()=>handPress('Hatchback')}>
<Image style={tw`w-20 h-18 rounded-lg relative`} source={require(`../../assets/volkswagen3d.jpg`)}/>
<Text style={[tw`text-sm font-bold text-center text-[#000000] p-1`,styles2.text]}>Hatchback</Text>
</TouchableOpacity>
</View>


<View style={tw`ml-4 mb-4 bg-[#faf9f6] rounded-lg p-1 `}>
  <TouchableOpacity onPress={()=>handPress('Coupe')}>
<Image style={tw`w-20 h-18 rounded-lg relative`} source={require(`../../assets/porsche.jpg`)}/>
<Text style={[tw`text-sm font-bold text-center text-[#000000] `,styles2.text]}>Coupe</Text>
</TouchableOpacity>
</View>



<View style={tw`ml-4 mb-4 bg-[#faf9f6] rounded-lg  `}>
  <TouchableOpacity onPress={()=>handPress('Station Wagon')}>
<Image style={tw`w-20 h-18 rounded-lg relative mx-auto`} source={require(`../../assets/stationwagon2.png`)}/>
<Text style={[tw`text-sm font-bold text-center text-[#000000] p-1`,styles2.text]}>Station Wagon</Text>
</TouchableOpacity>
</View>

<View style={tw`ml-4 mb-4 bg-[#faf9f6] rounded-lg p-1`}>
  <TouchableOpacity onPress={()=>handPress('Minivan')}>
<Image style={tw`w-20 h-18 rounded-lg relative`} source={require(`../../assets/minivan.jpg`)}/>
<Text style={[tw`text-sm font-bold text-center text-[#000000] `,styles2.text]}>Minivan</Text>
</TouchableOpacity>
</View>

<View style={tw`ml-4 mb-4 bg-[#faf9f6] rounded-lg  `}>
  <TouchableOpacity onPress={()=>handPress('Hybrid')}>
<Image style={tw`w-20 h-18 rounded-lg relative`} source={require(`../../assets/hybrid.jpg`)}/>
<Text style={[tw`text-sm font-bold text-center text-[#000000] `,styles2.text]}>Hybrid</Text>
</TouchableOpacity>
</View>
</ScrollView>
</View>

      {loading && currentPage==1?<MainSkeleton />:<FlatList
        data={orderData}
        scrollEnabled={false}

        renderItem={({ item }) => (
          
            <>




<View style={tw`flex justify-center items-center `}>


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

</View>


<View style={tw`absolute items-center top-87 left-5 flex flex-row bg-black p-1  rounded opacity-70 gap-2`}>
<MaterialCommunityIcons name='file-image-marker' size={30} color='#ffffff' />
<Text style={tw`text-[#ffffff]`}>{item.images.length}</Text>
</View>

<View style={tw`absolute top-3 left-1  flex flex-row gap-1 bg-black p-1 rounded opacity-70`}>
<TouchableOpacity onPress={()=>handleshare(item.requestno)} >
<MaterialCommunityIcons name='share-all-outline' size={35}  color='#ffffff'/>
</TouchableOpacity>

<TouchableOpacity>
<MaterialCommunityIcons name='bookmark-multiple-outline' onPress={()=>handlePress(item)} size={30}  color='#ffffff'/>



</TouchableOpacity>
</View>

<View style={tw`pl-2 pr-2 pb-2`}>
           <View style={tw`flex flex-row  justify-between mt-2 mb-2 `}> 
            <Text style={[tw`font-semibold text-xl text-[#da9100]`,styles2.text]} >₦ {item.price.toLocaleString()}</Text>
        
          </View>
          
          <View style={tw``}>
           
         <ScrollView horizontal={true} contentContainerStyle={tw`flex flex-row items-center gap-2 `}> 
          <View style={[tw`rounded-full border border-[#da9100] p-1 opacity-80 bg-[${snapshot.backgroundColor}] px-2 flex flex-row items-center gap-1 `]}><MaterialIcons size={20} color='#da9100' name='directions-car'/><Text style={[tw`text-base shadow font-bold`, { color: snapshot.text }]}>{item.make.replace(item.make[0],item.make[0].toUpperCase())} </Text></View>
          <View style={[tw`rounded-full border border-[#da9100] p-1  opacity-80 bg-[${snapshot.backgroundColor}] pr-2 flex flex-row items-center gap-1`]}><MaterialIcons size={20} color='#da9100' name='model-training'/><Text style={[tw`uppercase text-base opacity-100 text-[${snapshot.text}] font-bold`]}> {item.model}</Text></View>

          <View style={[tw`rounded-full border border-[#da9100] p-1  opacity-80 bg-[${snapshot.backgroundColor}] pr-2 flex flex-row items-center gap-1`]}>
            <MaterialCommunityIcons name='speedometer' color={`#da9100`} size={20}/>
             <Text style={[tw`text-[${snapshot.text}]  text-base`]}>{item.mileage.toLocaleString()} km</Text></View>
         </ScrollView >
        { item.state!=='Sold'  && <View style={tw`my-1`}>
          <TouchableOpacity  style={tw`flex flex-row gap-2`} onPress={()=>hc(item)}>
            <MaterialCommunityIcons  name='eye-arrow-right-outline' color={`${snapshot.text}`} size={20} /> 
            <Text style={[tw`text-[${snapshot.text}] text-base `,styles2.text]} >View details</Text>
             </TouchableOpacity>
         </View>}
         <View style={[tw`flex-row items-center gap-2 mb-1 bg-[#808080] rounded-full pr-2 shadow-xl my-1`, styles.container]}>
      <View style={tw`bg-[#d4d4d4] rounded-l-full h-full p-1 `}>
      <MaterialCommunityIcons name='star-outline' color='#da9100' size={20} />
      </View>
      <Text style={[tw`text-[#ffffff] text-base`,styles2.text]}>{item.used}</Text>
    </View>
         <View style={tw`flex flex-row gap-2 mb-1`}>
          <MaterialCommunityIcons name='calendar-multiple-check' color={`${snapshot.text}`} size={20}/>
            <Text style={[tw` text-[${snapshot.text}] text-base`,styles2.text]}>{item.year}</Text>

            </View>


             <View style={tw`flex flex-row gap-2`}>
              <MaterialIcons name='location-history' color={`${snapshot.text}`} size={20} />
              <Text style={[tw`text-base`, styles2.text, { color: snapshot.text }]} >{item.address}</Text>
             </View>
           {item.state!=='Sold' && <View style={tw`flex flex-row  justify-between w-full mt-2`}>

           <TouchableOpacity
  onPress={() => makePhoneCall(item.phone)}
  style={tw`flex flex-row border-2 items-center p-2 border-[#ff0000] gap-2`}
>
  <MaterialCommunityIcons name='phone' color='#ff0000' size={15} />
  <Text style={tw`text-[#ff0000]`} >Call</Text>
</TouchableOpacity>
           
            <TouchableOpacity
  onPress={() => sendMessage(item.phone, item.requestno)}
  style={tw`flex flex-row border-2 items-center p-2 border-[#008000] gap-2`}
>
  <MaterialCommunityIcons name='whatsapp' color='#008000' size={15} />
  <Text style={styles.buttonText}>WhatsApp</Text>
</TouchableOpacity>
           
           </View>}
    
           <Search
          
          visible={isSearchModalVisible}
          onSearch={handleFilter}
          onCancel={handleCancel}
        />
     
          </View>

          </View>
</>



     
        )}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<MaterialCommunityIcons name='emoticon-frown-outline' color={`${snapshot.text}`} size={50} style={tw`mx-auto`}/>}
        refreshing={loading}
        onRefresh={() => fetchData()}
        ListFooterComponent={
          <View style={styles.footerContainer}>
      {   loading ? (
          <View style={styles.spinnerTextStyle}>
            <ActivityIndicator size="large" color={`${snapshot.text}`} />
          </View>
        ) : null}
        
        </View>
        }
      />
      
    //end of flatlist
    }
    </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1000,
  },
  spinner: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    padding: 20,
  },
  spinnerTextStyle: {

    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',

  },
  footerContainer: {
    flexDirection: 'column',
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
  pageNumber:{
    fontWeight:'bold'
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
   fontWeight:'bold'
  
  }})
export default HomeScreen;





