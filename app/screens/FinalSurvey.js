import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import Survey from "../components/Survey.js";
import style from "../styles/survey";

export default function FinalSurvey({ navigation }) {
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");

  const updateUser = (survey) => {
    axios.put(global.api_url + "/app-user/" + global.uuid, {
      data: { FinalSurvey: survey },
    });
    navigation.reset({ routes: [{ name: "Home Screen" }] });
    AsyncStorage.setItem("finalSurveyComplete", "true");
    global.finalSurvey="true";
  };

  useEffect(() => {
    AsyncStorage.getItem("email").then((data) => setEmail(data));
    AsyncStorage.getItem("school").then((data) => setSchool(data));
  }, []);

  return (
    <Survey
      action={updateUser}
      navigation={navigation}
      userInfo={
        <View style={style.personalInfo}>
          <Text style={style.bigText}>Conclusionary Survey</Text>
          <Text style={style.smallText}>{email}</Text>
          <Text style={style.smallText}>{school}</Text>
        </View>
      }
    />
  );
}
