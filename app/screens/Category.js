import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable } from "react-native";

import Info from "./Info.js";
import Question from "./Question.js";
import baseStyle from "../styles/base.js";

function Entrance({ route, navigation }) {
  const { id, student_id } = route.params;
  const category = global.data.data
    .find((s) => s.id === student_id)
    .attributes.category.find((c) => c.id === id);
  const infos = category.information.data;

  const handleInitialPress = () => {
    if (infos.length > 0) {
      navigation.navigate("Info", {
        index: 0,
        category_id: id,
        student_id,
      });
    }
  };

  return (
    <View style={baseStyle.view}>
      <Text style={baseStyle.bigText}>
        This is the {category.Category} section
      </Text>
      <Pressable onPress={handleInitialPress}>
        <Text style={baseStyle.button}>Start Reading </Text>
      </Pressable>
      <Pressable
        onPress={() =>
          navigation.navigate("Question", {
            category_id: id,
            student_id,
            question_index: 0,
          })
        }
      >
        <Text style={baseStyle.button}>Go to the quiz for this section</Text>
      </Pressable>
    </View>
  );
}

const CatStack = createNativeStackNavigator();

export default function Category() {
  return (
    <CatStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "fade",
        presentation: "transparentModal",
      }}
    >
      <CatStack.Screen name="Entrance" component={Entrance} />
      <CatStack.Screen name="Question" component={Question} />
      <CatStack.Screen name="Info" component={Info} />
    </CatStack.Navigator>
  );
}
