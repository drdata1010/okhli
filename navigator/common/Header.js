import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from "@react-native-async-storage/async-storage";

const Header = () => {
  const navigation = useNavigation();

  const Logout = async () => {
    await AsyncStorage.setItem("authToken", '0');
    navigation.replace('Login');
  }

  return (
    <View style={{ width: '100%', height: 70, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderBottomWidth: 0.2, borderBlockColor: '#8e8e8e', backgroundColor: '#fff' }}>
      <View style={{ width: '100%', height: 70, backgroundColor: '#fff', position: 'absolute', bottom: 0, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ width: '50%', fontWeight: '600', fontSize: 20, color: '#000', marginLeft: 20 }}>OKHLI</Text>

        <TouchableOpacity style={{ marginLeft: '45%', width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => { Logout(); }}>
          <Image source={require('../images/logout.png')} style={{ width: 28, height: 28 }} />
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity></TouchableOpacity> */}
    </View>




    // <View style={{ width: '100%', height: 70, backgroundColor: '#fff', position: 'absolute', bottom: 0, flexDirection: 'row', alignItems: 'center' }}>
    //     <TouchableOpacity style={{ width: '33%', height: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => { setSelectedTab(0) }}>
    //       <Image source={require('../images/hut.png')} style={{ width: 28, height: 28, tintColor: selectedTab == 0 ? 'green' : '#000' }} />
    //     </TouchableOpacity>
    //     <View style={{ width: '33%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
    //       <TouchableOpacity style={{ width: 47, height: 47, backgroundColor: selectedTab == 1 ? 'green' : '#000', borderRadius: 23, justifyContent: 'center', alignItems: 'center' }} onPress={() => { setSelectedTab(1) }}>
    //         <Image source={require('../images/cart.png')} style={{ width: 28, height: 28, tintColor: '#fff' }} />
    //       </TouchableOpacity>
    //     </View>
    //     <TouchableOpacity style={{ width: '33%', height: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => { setSelectedTab(2) }}>
    //       <Image source={require('../images/user.png')} style={{ width: 32, height: 32, tintColor: selectedTab == 2 ? 'green' : '#000' }} />
    //     </TouchableOpacity>
    //   </View>
  )
}

export default Header

const styles = StyleSheet.create({})