import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../common/Header'

const Main = () => {
  return (
    <View style={{flex:1}}>
        <Header/>
        <View style ={{marginTop:5,alignItems:'center',justifyContent:'center'}}>
        <Image source={require('../images/Okhli.jpg')} style={{width:'98%',height:230,borderRadius:5}}/>
        </View>
        <View style={{marginTop:5}}>
          <Text style={{fontWeight:"500",fontSize:20,color:'#8e8e8e',marginLeft:10}}>Our Products</Text>
        </View>
        <ScrollView style={{flex:1}}>
          <View>
            
          </View>
        </ScrollView>
    </View>
  )
}

export default Main

const styles = StyleSheet.create({})