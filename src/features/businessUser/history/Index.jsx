import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useReducer } from "react";
import { StatusBar as Status } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import theme from "../../../Config/theme/Index";
import axios from "../../../helpers/http-helper";
import { useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";

const History = () => {
  const user = useSelector((state) => state.user);

  const [value, setValue] = useReducer(
    (state, diff) => ({ ...state, ...diff }),
    {
      data: {},
      data1: [],
    }
  );

  const { data, data1 } = value;

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = () => {
    SecureStore.getItemAsync("jwt").then((token) => {
      console.log("Hello getHistory");
      axios
        .get(`/qr/history/generate/${user?.data?.id}?redeemed=0&limit=10`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res?.data?.data);
          setValue({ data: res?.data?.data });
          for (const item in data) {
            data1.push(item);
          }
          console.log(data1);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const HistoryCard = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            marginVertical: 10,
            width: "95%",
            backgroundColor: "#fff",
            borderRadius: 30,
            padding: 10,
            flexDirection: "row",
          }}
        >
          <Image
            style={{
              padding: 20,
              borderRadius: 20,
              backgroundColor: "#f0f0f0",
              width: 100,
              height: 100,
            }}
            resizeMode="contain"
            source={require("../../../assets/logoGreenbuilt1.png")}
          />
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Name of the Product Here
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Points : 100/UOM
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>UOM :10</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Status style="light" />
      <LinearGradient colors={["#0a2c3c", "#00404c"]} style={{ flex: 1 }}>
        <Text style={styles.text1}>History</Text>
        <FlatList data={data1} renderItem={HistoryCard} />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: "#000",
  },
  text1: {
    fontSize: 35,
    fontWeight: "bold",
    color: theme.colors.white,
    marginVertical: 10,
    textAlign: "center",
  },
});
