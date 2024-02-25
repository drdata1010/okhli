import { View, Text, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const SignUpFire = () => {


    useEffect(() => {
        // Initialize GoogleSignin
        GoogleSignin.configure({
            // Add your web client ID here
            webClientId: '259249234282-rlvq482e8ju91ji7e6qbomc943127spg.apps.googleusercontent.com',
        });
    }, []);

    const signIn = async () => {
        console.log("in Sign In");
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log('User Info:', userInfo);
        } catch (error) {
            console.log('Google Sign-In Error:', error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <GoogleSigninButton
                style={{ width: 200, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={signIn}
            />
        </View>
    );

}


export default SignUpFire;
const styles = StyleSheet.create({});