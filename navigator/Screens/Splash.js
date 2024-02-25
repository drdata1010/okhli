import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Login");
    }, 3000)
  }, [])
  return (
    <View style={styles.mainContainer}>
      <Image source={require('../images/playstore.png')} style={{ width: 150, height: 150, borderRadius: 70 }} />
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({

  mainContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})
