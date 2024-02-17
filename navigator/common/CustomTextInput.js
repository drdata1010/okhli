import { Image, Keyboard, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'

const CustomTextInput = ({ value, onChangeText, placeholder, icon, type ,keyboardType}) => {
    return (
        <View style={{ width: '85%', height: 60, borderWidth: 2, borderRadius: 10, alignSelf: 'center', marginTop: 30, flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingRight: 20 }}>

            <Image source={icon} style={{ width: 24, height: 24 }} />
            <TextInput value ={value} onChangeText={txt=>{onChangeText(txt);}} placeholder={placeholder} style={{ marginLeft: 10 }} secureTextEntry={type ? true : false} keyboardType={keyboardType ? keyboardType : 'default'}/>
        </View>
    )
}
 
export default CustomTextInput

const styles = StyleSheet.create({})