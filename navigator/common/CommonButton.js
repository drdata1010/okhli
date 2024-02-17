import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const CommonButton = ({onPress,title,bgColor,textColor}) => {
  return (
    <TouchableOpacity style={{backgroundColor:bgColor,justifyContent:'center',alignItems:'center',width:'85%',height:60,borderRadius:10,alignSelf:'center',marginTop:50}}
         onPress={()=>{
            onPress()
         }}>
         <Text style={{color:textColor,fontWeight:900,}}>{title}</Text>
    </TouchableOpacity>
    
  )
}

export default CommonButton

const styles = StyleSheet.create({})