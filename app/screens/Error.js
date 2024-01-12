import React from "react";
import { View, Text, Pressable} from "react-native";

export default function Error({ error, plaintxt, navigation }) {

  const retry = () => {
    try{
      navigation.navigate("Homescreen")
    } catch (e){
      navigation.navigate("Error", {e, plaintxt:"Retry failed, please relauch app."})
    }
    
  };

  return (
    <View style={style.view}>
      <Text>Oops, looks like something went wrong! {plaintxt} Error caused by {error}</Text>
      <Pressable onPress={retry}>
        <Text style={style.button}>Retry</Text>
      </Pressable>
    </View>
  );
}
