import React, { useState } from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";

import { shuffle } from "../../common.js";
import style from "../../styles/question.js";

export default function RankOrderQ({ question, handleAnswer }) {
  const [data, setData] = useState(
    shuffle(JSON.parse(JSON.stringify(question.answers))),
  );

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          delayLongPress={0}
          disabled={isActive}
        >
          <Text style={style.bigText}>{item.answer}</Text>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <View>
      <View style={style.questionContainer}>
        <Text style={style.bigText}>{question.question}</Text>
      </View>
      <View style={style.optionsContainer}>
        <DraggableFlatList
          data={data}
          onDragEnd={({ data }) => setData(data)}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>

      <View style={style.optionsContainer}>
        <Pressable
          style={style.pressable}
          onPress={() => {
            handleAnswer(
              JSON.stringify(data) === JSON.stringify(question.answers),
            );
          }}
        >
          <Text style={style.button}>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
}
