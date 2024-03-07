import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { View, Text, TextInput, Image } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

import Survey from "../components/Survey.js";
import style from "../styles/survey";

export default function InitialSurvey({ navigation }) {
  const [email, setEmail] = useState("");
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("");

  const createNewUser = (survey) => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid e-mail address.");
      return;
    }
    if (!selectedSchool) {
      alert("Please select a school.");
      return;
    }

    axios
      .post(global.api_url + "/app-users", {
        data: {
          Email: email,
          school: schools.find((elt) => elt.value === selectedSchool).key,
          InitialSurvey: survey,
        },
      })
      .then((response) => {
        global.uuid = response.data.data.attributes.UUID;
        AsyncStorage.setItem("uuid", response.data.data.attributes.UUID);
      })
      .catch((error) => {
        console.error(error);
      });

    AsyncStorage.setItem("email", email).catch((e) => console.error(e));
    AsyncStorage.setItem("school", selectedSchool).catch((e) =>
      console.error(e),
    );

    navigation.dispatch(
      CommonActions.reset({ routes: [{ name: "Gatehouse" }] }),
    );
  };

  return (
    <Survey
      action={createNewUser}
      navigation={navigation}
      fetchSchools={() =>
        axios
          .get(global.api_url + "/schools?sort=schoolname")
          .then((response) =>
            setSchools(
              response.data.data.map((item) => ({
                key: item.id,
                value: item.attributes.schoolname,
              })),
            ),
          )
      }
      userInfo={
        <View>
          <Text style={style.bigText}>Introductory Survey</Text>

          <TextInput
            style={style.input}
            placeholder="Enter your e-mail address"
            onChangeText={setEmail}
            value={email}
          />

          <View style={style.dropDown}>
            <SelectList
              id="dropdown"
              setSelected={setSelectedSchool}
              data={schools}
              boxStyles={style.boxStyle}
              inputStyles={style.dropdownOption}
              dropdownStyles={style.dropdownOption}
              dropdownTextStyles={style.dropdownOption}
              dropdownItemStyles={style.dropdownOption}
              searchicon={
                <Image
                  source={require("../assets/search.png")}
                  resizeMode="contain"
                  style={{ width: 17, height: 17 }}
                />
              }
              arrowicon={
                <Image
                  source={require("../assets/arrow.png")}
                  resizeMode="contain"
                  style={{ width: 17, height: 17 }}
                />
              }
              closeicon={
                <Image
                  source={require("../assets/close.png")}
                  resizeMode="contain"
                  style={{ width: 17, height: 17 }}
                />
              }
              placeholder="Select your school"
              searchPlaceholder="Search"
              save="value"
            />
          </View>
        </View>
      }
    />
  );
}
