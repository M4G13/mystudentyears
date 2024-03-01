import React, { useState } from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
// import DraggableFlatList, {
//   ScaleDecorator,
// } from "react-native-draggable-flatlist";

import style from "../../styles/rankorderq.js";

const _ = require("lodash");

export default function RankOrderQ({ question, handleAnswer }) {
  const [data, setData] = useState(_.shuffle(question.answers));

  // const renderItem = ({ item, drag, isActive }) => {
  //   return (
  //     <ScaleDecorator>
  //       <TouchableOpacity
  //         onLongPress={drag}
  //         delayLongPress={0}
  //         disabled={isActive}
  //         style={style.listItem}
  //       >
  //         <Text style={style.bigText}>{item.answer}</Text>
  //       </TouchableOpacity>
  //     </ScaleDecorator>
  //   );
  // };

  return (
    <View style={style.questionWrapper}>
      <View style={style.questionContainer}>
        <Text style={style.bigText}>{question.question}</Text>
      </View>
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
            handleAnswer(_.isEqual(data, question.answers));
          }}
        >
          <Text style={style.button}>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
}
