import isEqual from "lodash/isEqual";
import shuffle from "lodash/shuffle";
import React, { useState } from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
/*import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";*/

import style from "../../styles/rankorderq.js";

export default function RankOrderQ({ question, handleAnswer }) {
  const [data, setData] = useState(shuffle(question.answers));

  /*const renderItem = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          delayLongPress={0}
          disabled={isActive}
          style={style.listItem}
        >
          <Text style={style.bigText}>{item.answer}</Text>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };*/

  return (
    <View style={style.questionWrapper}>
      <View style={style.questionContainer}>
        <Text style={style.bigText}>{question.question}</Text>
      </View>
      {/*Removed for now as it doesn't play nice with the removal of
      react-native-gesture handler and has been causing lots of
      bugs (see #78)*/}
      {/*<DraggableFlatList
        data={data}
        onDragEnd={({ data }) => setData(data)}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />*/}
      <View style={style.submitButtonContainer}>
        <Pressable
          style={style.submitButton}
          onPress={() => {
            handleAnswer(isEqual(data, question.answers));
          }}
        >
          <Text style={style.button}>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
}
