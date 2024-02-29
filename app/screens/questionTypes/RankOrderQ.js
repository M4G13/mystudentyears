import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";

import PrettyButton from "../../components/PrettyButton.js";
import style from "../../styles/rankorderq.js";

const _ = require("lodash");

export default function RankOrderQ({ question, handleAnswer }) {
  const [data, setData] = useState(_.shuffle(question.answers));

  const renderItem = ({ item, drag, isActive }) => {
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
  };

  return (
    <View style={style.questionWrapper}>
      <View style={style.questionContainer}>
        <Text style={style.bigText}>{question.question}</Text>
      </View>

      <View style={style.imageContainer}>
        <Image
          source={
            question.image
              ? { uri: global.url + question.image.url }
              : require("../../assets/star_filled.png")
          }
          style={style.image}
          resizeMode="contain"
        />
      </View>
      <View style={style.listContainer}>
        <DraggableFlatList
          data={data}
          onDragEnd={({ data }) => setData(data)}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
      <PrettyButton
        width="80%"
        backgroundColor={style.colors.fg2}
        marginLeft="10%"
        onPressOut={() => {
          handleAnswer(_.isEqual(data, question.answers));
        }}
      >
        Submit
      </PrettyButton>
    </View>
  );
}
