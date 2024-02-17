import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CustomTextInput from "../common/CustomTextInput";
import CommonButton from "../common/CommonButton";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";

const SignupScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [badName, setBadName] = useState(false);
  const [email, setEmail] = useState("");
  const [badEmail, setBadEmail] = useState(false);
  const [mobile, setMobile] = useState("");
  const [badMobile, setBadMobile] = useState(false);
  const [password, setPassword] = useState("");
  const [badPassword, setBadPassword] = useState(false);
  const [cnfPassword, setCnfPassword] = useState("");
  const [badCnfPassword, setBadCnfPassword] = useState(false);

  const handleSignup = async () => {
    console.log("hnde signup me hoon");
    const user = {
      name: name,
      phNo: mobile,
      email: email,
      password: password,
      cnfPassword: cnfPassword,
    };

    await axios.post("http://10.0.2.2:8000/register", user).then((response) => {
        navigation.navigate("OtpVer");
        Alert.alert(response.data.message);
      }).catch((error) => {
        console.error("Error registering data :", error);
        const mess = error.message.slice(-3);
        console.log(mess);
        if (mess == 401) {
          Alert.alert("Email already registered !");
        } else if (mess == 402) {
          Alert.alert("Mobile No. Already Registered");
        } else if (mess == 500) {
          Alert.alert("Entered Email is not valid");
        }
      });
  };

  const validate = () => {
    if (name == "") {
      setBadName(true);
    } else {
      setBadName(false);
    }
    if (email == "") {
      setBadEmail(true);
    } else {
      setBadEmail(false);
    }
    if (mobile == "") {
      setBadMobile(true);
    } else if (mobile.length < 10) {
      setBadMobile(true);
    } else {
      setBadMobile(false);
    }
    if (password == "") {
      setBadPassword(true);
    } else {
      setBadPassword(false);
    }
    if (cnfPassword == "") {
      setBadCnfPassword(true);
    } else if (cnfPassword !== password) {
      setBadCnfPassword(true);
    } else {
      setBadCnfPassword(false);
    }

    if (
      badEmail == false &&
      badName == false &&
      badMobile == false &&
      badPassword == false &&
      badCnfPassword == false
    ) {
      handleSignup();
    }
  };
  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View>
        <Image
          source={require("../images/playstore.png")}
          style={{
            height: 90,
            width: 90,
            borderRadius: 20,
            alignSelf: "center",
            marginTop: 50,
          }}
        />
        <Text
          style={{
            marginTop: 20,
            alignSelf: "center",
            fontSize: 24,
            fontWeight: 600,
            color: "#000",
          }}
        >
          Sign Up
        </Text>
        <CustomTextInput
          value={name}
          onChangeText={(txt) => {
            setName(txt);
          }}
          placeholder={"Enter Full Name"}
          icon={require("../images/user.png")}
        />
        {badName === true && (
          <Text style={{ marginTop: 10, marginLeft: 35, color: "red" }}>
            Please Enter Name
          </Text>
        )}
        <CustomTextInput
          value={email}
          onChangeText={(txt) => {
            setEmail(txt);
          }}
          placeholder={"Enter Email"}
          icon={require("../images/mail.png")}
        />
        {badEmail === true && (
          <Text style={{ marginTop: 10, marginLeft: 35, color: "red" }}>
            Please Enter Email ID
          </Text>
        )}
        <CustomTextInput
          keyboardType={"number-pad"}
          value={mobile}
          onChangeText={(txt) => {
            setMobile(txt);
          }}
          placeholder={"Enter Mobile No."}
          icon={require("../images/mobile.png")}
        />
        {badMobile === true && (
          <Text style={{ marginTop: 10, marginLeft: 35, color: "red" }}>
            Please Enter Mobile No.
          </Text>
        )}
        <CustomTextInput
          value={password}
          onChangeText={(txt) => {
            setPassword(txt);
          }}
          placeholder={"New Password"}
          icon={require("../images/padlock.png")}
          type={"password"}
        />
        {badPassword === true && (
          <Text style={{ marginTop: 10, marginLeft: 35, color: "red" }}>
            Please Enter Password
          </Text>
        )}
        <CustomTextInput
          value={cnfPassword}
          onChangeText={(txt) => {
            setCnfPassword(txt);
          }}
          placeholder={"Confirm Password"}
          icon={require("../images/padlock.png")}
          type={"password"}
        />
        {badCnfPassword === true && (
          <Text style={{ marginTop: 10, marginLeft: 35, color: "red" }}>
            Password not Matched
          </Text>
        )}
        <CommonButton
          title={"Sign Up"}
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
            marginBottom: 100,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          Already have an Account !
        </Text>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({});
