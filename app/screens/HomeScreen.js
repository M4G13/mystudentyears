import { View, Text, Pressable, Image } from "react-native";

import style from "../styles/homescreen.js";

export default function HomeScreen({ navigation }) {
  return (
    <View style={style.view}>
      <Image
        source={require("../assets/msy-logo.png")}
        style={style.mainImage}
      />
      <Text style={style.bigText}>Welcome to My Student Years</Text>
      <Pressable onPress={() => navigation.navigate("Gatehouse")}>
        <Text style={style.button}>Go to Gatehouse</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Terms & Conditions")}>
        <Text style={style.button}>Go to Terms and Conditions</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Privacy Policy")}>
        <Text style={style.button}>Go to Privacy Policy</Text>
      </Pressable>
    </View>
  );
}
