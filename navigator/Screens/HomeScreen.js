import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Loader from '../common/Loader';
import Cart from '../bottom/Cart';
import Profile from '../bottom/Profile';
import Main from '../bottom/Main';


const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState(0);



  const ImageButton = () => {

    return (<TouchableOpacity style={{ width: '33%', height: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => { setSelectedTab(0) }}>
      <Image source={require('../images/hut.png')} style={{ width: 28, height: 28, tintColor: selectedTab == 0 ? 'green' : '#000' }} />
    </TouchableOpacity>)
  }

  return (
    <View style={{ flex: 1 }}>
      {selectedTab == 0 ? (<Main />) : selectedTab == 1 ? (<Cart />) : (<Profile />)}
      <View style={{ width: '100%', height: 70, backgroundColor: '#fff', position: 'absolute', bottom: 0, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity style={{ width: '33%', height: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => { setSelectedTab(0) }}>
          <Image source={require('../images/hut.png')} style={{ width: 28, height: 28, tintColor: selectedTab == 0 ? 'green' : '#000' }} />
        </TouchableOpacity>
        <View style={{ width: '33%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={{ width: 47, height: 47, backgroundColor: selectedTab == 1 ? 'green' : '#000', borderRadius: 23, justifyContent: 'center', alignItems: 'center' }} onPress={() => { setSelectedTab(1) }}>
            <Image source={require('../images/cart.png')} style={{ width: 28, height: 28, tintColor: '#fff' }} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ width: '33%', height: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => { setSelectedTab(2) }}>
          <Image source={require('../images/user.png')} style={{ width: 32, height: 32, tintColor: selectedTab == 2 ? 'green' : '#000' }} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({

})