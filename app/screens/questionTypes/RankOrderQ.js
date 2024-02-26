import React, { useState } from "react";
import { View, Text, Pressable, TouchableOpacity, Image } from "react-native";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";

import style from "../../styles/rankorderq.js";
import SubmitButton from "../../components/SubmitButton.js";
import { hasImage } from "../Question.js";

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
        source={hasImage(question)
        ? { uri: global.url + question.image.url }
        : { uri: global.url + "/uploads/thumbnail_default_2d0864170d.png" }
    }
        style={ style.image } 
        
        resizeMode="contain"
      />
    </View>

      <DraggableFlatList
        data={data}
        onDragEnd={({ data }) => setData(data)}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <SubmitButton
        onPressOut={() => {
          handleAnswer(_.isEqual(data, question.answers));
        }}
      />
    </View>
  );
}
