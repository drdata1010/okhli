import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import CustomTextInput from "../common/CustomTextInput";
import CommonButton from "../common/CommonButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../common/Loader";

const LoginScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [badEmail, setBadEmail] = useState(false);
  const [badPassword, setBadPassword] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token != '0') {
          navigation.replace("Home");
          // await axios
          //   .post("http://10.0.2.2:8000/auth", token)
          //   .then((response) => {
          //     console.log(response);
          //     // Alert.alert(response.data.message);
          //     console.log("Auth api is working fine");
          //   })
          //   .catch((error) => {
          //     console.error("Error Logging in  :", error);
          //   });
        }

      } catch (error) {
        console.log("Error msg : ", error);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    const user = {
      email: email,
      password: password,
    };
    await axios
      .post("http://10.0.2.2:8000/login", user)
      .then((response) => {
        if (response.data.code == 401) {
          setTimeout(() => {
            setModalVisible(false);
            Alert.alert(response.data.message);
          }, 1000);
        } else if (response.data.code == 402) {
          setTimeout(() => {
            setModalVisible(false);
            Alert.alert(response.data.message);
          }, 1000);
        } else {
          const token = response.data.token;
          AsyncStorage.setItem("authToken", token);
          setTimeout(() => {
            setModalVisible(false);
            navigation.replace("Home");
          }, 1000);
        }
      })
      .catch((error) => {
        console.error("Error Logging in  :", error);
        Alert.alert("Mail or Password is incorrect. Please try again.");
      });
  };
  const validate = () => {
    if (email == "") {
      setModalVisible(false);
      setBadEmail(true);
    } else {
      if (password == "") {
        setModalVisible(false);
        setBadEmail(false);
        setBadPassword(true);
      } else {
        setModalVisible(true);
        setBadEmail(false);
        handleLogin();
      }
    }
  };

  return (
    <View>
      <Image
        source={require("../images/playstore.png")}
        style={{
          height: 90,
          width: 90,
          borderRadius: 20,
          alignSelf: "center",
          marginTop: 90,
        }}
      />
      <Text
        style={{
          marginTop: 50,
          alignSelf: "center",
          fontSize: 24,
          fontWeight: 600,
          color: "#000",
        }}
      >
        Login
      </Text>
      <CustomTextInput
        value={email}
        onChangeText={(txt) => {
          setEmail(txt);
        }}
        placeholder={"Enter Registered Email"}
        icon={require("../images/mail.png")}
      />
      {badEmail === true && (
        <Text style={{ marginTop: 10, marginLeft: 35, color: "red" }}>
          Please Enter Email ID
        </Text>
      )}
      <CustomTextInput
        value={password}
        onChangeText={(txt) => {
          setPassword(txt);
        }}
        placeholder={"Enter Your Password"}
        icon={require("../images/padlock.png")}
        type={"password"}
      />
      {badPassword === true && (
        <Text style={{ marginTop: 10, marginLeft: 35, color: "red" }}>
          Please Enter Password
        </Text>
      )}
      <CommonButton
        title={"Login"}
        bgColor={"green"}
        textColor={"white"}
        onPress={() => {
          validate();
        }}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: 800,
          alignSelf: "center",
          marginTop: 20,
          textDecorationLine: "underline",
        }}
        onPress={() => {
          navigation.navigate("Signup");
        }}
      >
        Create New Account !
      </Text>
      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
