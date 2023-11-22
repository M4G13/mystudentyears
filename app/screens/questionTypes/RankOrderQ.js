import React, { useState } from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";

import style from "../../styles/openresponseqs.js";

//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(a) {
  const array = JSON.parse(JSON.stringify(a));
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export default function RankOrderQ({ question, handleAnswer }) {
  const [data, setData] = useState(shuffle(question.answers));

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
