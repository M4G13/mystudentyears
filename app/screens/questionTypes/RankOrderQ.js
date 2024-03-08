import isEqual from "lodash/isEqual";
import shuffle from "lodash/shuffle";
import React, { useState } from "react";
import { View, Text, Pressable, TouchableOpacity, Image } from "react-native";

import PrettyButton from "../../components/PrettyButton.js";
import style from "../../styles/rankorderq.js";

export default function RankOrderQ({ question, handleAnswer }) {
  const [data, setData] = useState(shuffle(question.answers));
  return (
    <View style={style.questionWrapper}>
      <View style={style.questionContainer}>
        <Text style={style.bigText}>{question.question}</Text>
      </View>
      {question.image && (
        <View style={style.imageContainer}>
          <Image
            source={{ uri: global.url + question.image?.url }}
            style={style.image}
            resizeMode="contain"
          />
        </View>
      )}
      {/* Draggable flatlist removed until we re-implement it */}
      <PrettyButton
        backgroundColor={style.colors.fg2}
        onPress={() => {
          handleAnswer(isEqual(data, question.answers));
        }}
      >
        Submit
      </PrettyButton>
    </View>
  );
}
