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
    </View>
  );
}
