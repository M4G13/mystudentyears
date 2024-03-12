import { View, Text, Image, StatusBar } from "react-native";

import PrettyButton from "../components/PrettyButton.js";
import style from "../styles/homescreen.js";

export default function HomeScreen({ navigation }) {
  StatusBar.setBackgroundColor("#7bcef4");

  return (
    <View style={style.view}>
      <View style={style.bgContainer}>
        <Image
          source={require("../assets/HomeScreenBG.png")}
          style={style.bgImage}
        />
      </View>
      <View style={style.logoContainer}>
        <Image
          source={require("../assets/Molly1.png")}
          style={style.mainImage}
        />
      </View>
      <Text style={style.bigText}>Welcome to My Student Years!</Text>
      {global.uuid ? (
        <PrettyButton
          style={style.prettyButton}
          onPress={() => {
            StatusBar.setBackgroundColor(style.colors.bg1);
            navigation.navigate("Gatehouse");
          }}
        >
          <Text style={style.button}>Go to Gatehouse</Text>
        </PrettyButton>
      ) : (
        <PrettyButton
          style={style.prettyButton}
          onPress={() => {
            StatusBar.setBackgroundColor(style.colors.bg1);
            navigation.navigate("Survey");
          }}
        >
          <Text style={style.button}>Take the Survey</Text>
        </PrettyButton>
      )}
    </View>
  );
}
