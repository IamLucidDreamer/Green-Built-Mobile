import React, { useRef } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { StatusBar as Status } from "expo-status-bar";
import Feather from "react-native-vector-icons/Feather";
import GradientText from "../../components/GradientText";
import QRCode from "react-native-qrcode-svg";
import theme from "../../../Config/theme/Index";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { captureRef } from "react-native-view-shot";
import * as Share from "expo-sharing";

const Receipt = ({ route, navigation }) => {
  const viewRef = useRef();

  const { receiptData } = route.params;
  console.log(receiptData, "Hello");
  const user = useSelector((state) => state.user);
  const firstName = (str) => str.split(/\|/).map((s) => s.split(/\s+/)[0]);

  const date = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

    const onShare = async () => {
    try {
      const uri = await captureRef(viewRef, { format: "png", quality: 0.7 });
      console.log(uri);
      await Share.shareAsync(uri);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Status style="dark" />
      <LinearGradient colors={["#0a2c3c", "#00404c"]} style={styles.container}>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 20,
            }}
          ></View>
          <View
            ref={viewRef}
            style={{
              backgroundColor: "#FFF",
              paddingVertical: 15,
              paddingHorizontal: 15,
              marginHorizontal: 10,
              marginBottom: 30,
              borderRadius: 10,
              shadowColor: theme.colors.greenMain,
              elevation: 5,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontSize: 17,
                  color: theme.colors.primaryBg,
                  marginBottom: 15,
                }}
              >
                {firstName(user?.data?.name)}
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  color: theme.colors.primaryBg,
                  marginBottom: 15,
                }}
              >
                {`${date}/${month + 1}/${year}`}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 19,
                color: theme.colors.purple,
                padding: 10,
                marginBottom: 30,
                textAlign: "center",
                fontWeight: "bold",
                borderBottomWidth: 1,
                borderColor: theme.colors.purple,
                borderStyle: "dashed",
              }}
            >
              GREEN CARD
            </Text>
            <Text
              style={{
                marginBottom: 20,
                fontSize: 22,
                color: theme.colors.purple,
                padding: 2,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {receiptData?.data?.title}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 17, color: theme.colors.purple }}>
                Points Earned
              </Text>
              <Text style={{ fontSize: 17, color: theme.colors.purple }}>
                {receiptData?.pointsConsumed} unit
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 17, color: theme.colors.purple }}>
                CO2 offset
              </Text>
              <Text style={{ fontSize: 17, color: theme.colors.purple }}>
                {Math.round(receiptData?.pointsConsumed * 0.935)} Kg
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 30,
              }}
            >
              <Text style={{ fontSize: 17, color: theme.colors.purple }}>
                H2O Saved
              </Text>
              <Text style={{ fontSize: 17, color: theme.colors.purple }}>
                {Math.round(receiptData?.pointsConsumed * 2.59)} Ltr
              </Text>
            </View>
          </View>

          <View>
            <TouchableOpacity
              onPress={onShare}
              style={{ alignSelf: "flex-end", paddingHorizontal: 25 }}
            >
              <Text style={{ color: theme.colors.white, fontSize: 18 }}>
                Share
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.buttonText}>Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText}>Scan Again</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Receipt;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  text1: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#446C24",
  },
  button: {
    alignSelf: "center",
    width: "95%",
    paddingVertical: 17,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.primaryGreen,
    borderRadius: 10,
    shadowColor: "#000",
    elevation: 4,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: theme.colors.white,
    fontWeight: "bold",
    marginRight: 20,
    textAlign: "center",
  },
});
