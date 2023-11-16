import { View, Text, Pressable, ImageBackground } from "react-native";

import style from "../styles/categories.js";

export default function Categories({ route, navigation }) {
  const { student_id } = route.params;
  const categories = global.data.data.find((s) => s.id === student_id)
    .attributes.category;
  const locs = {
    Finance: [80, 160],
    Wellbeing: [240, 230],
    Academics: [40, 400],
    Independence: [250, 520],
  };

  const imageSource = require("../assets/temp_map.png");

  return (
    <View style={style.view}>
      <ImageBackground
        source={imageSource}
        resizeMode="cover"
        style={style.map}
      >
        {categories.map((c) => (
          <Pressable
            key={c.id}
            onPress={() =>
              navigation.navigate("Category", {
                id: c.id,
                student_id,
              })
            }
            style={[
              style.pressable,
              {
                left: locs[c.Category][0],
                top: locs[c.Category][1],
              },
            ]}
          >
            <Text style={style.button}>{c.Category}</Text>
          </Pressable>
        ))}
      </ImageBackground>
    </View>
  );
}
