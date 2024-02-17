import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Header = () => {
  return (
    <View style={{width:'100%',height:70,justifyContent:'space-between',alignItems:'center',flexDirection:'row',borderBottomWidth:0.2,borderBlockColor:'#8e8e8e',backgroundColor:'#fff'}}>
      <Text style={{fontWeight:'600',fontSize:20,color:'#000',marginLeft:20}}>OKHLI</Text>
      {/* <TouchableOpacity></TouchableOpacity> */}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})