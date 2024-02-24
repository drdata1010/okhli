import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import CustomTextInput from "../common/CustomTextInput";
import CommonButton from "../common/CommonButton";

const OtpVerify = () => {
  const [otp, setOtp] = useState("");
  const [badOtp, setBadOtp] = useState(false);
  const navigation = useNavigation();

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post("http://10.0.2.2:8000/verify-otp", {
        otp,
      });

      console.log("in Handle verify OTP", response.status);
      if (response.status == 200) {
        Alert.alert(response.data.message);
        navigation.replace("Login");
      } else {
        Alert.alert(response.data.message);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const validate = async () => {
    if (otp == "") {
      setBadOtp(true);
    } else if (otp.length != 6) {
      setBadOtp(true);
    } else {
      setBadOtp(false);
    }
    console.log("Bad OTP is ", badOtp);
    if (badOtp == false) {
      handleVerifyOtp();
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
        OTP Verification
      </Text>
      <CustomTextInput
        value={otp}
        onChangeText={(txt) => {
          setOtp(txt);
        }}
        placeholder={"Enter six Digit OTP"}
        icon={require("../images/mail.png")}
      />
      {badOtp === true && (
        <Text style={{ marginTop: 10, marginLeft: 35, color: "red" }}>
          OTP is of six digit
        </Text>
      )}
      <CommonButton
        title={"Verify"}
        bgColor={"green"}
        textColor={"white"}
        onPress={() => {
          validate();
        }}
      />
    </View>
  );
};

export default OtpVerify;

const styles = StyleSheet.create({});
