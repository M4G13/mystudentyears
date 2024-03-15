import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

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
          school: selectedSchool.id,
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
    AsyncStorage.setItem("school", selectedSchool.attributes.schoolname).catch(
      (e) => console.error(e),
    );

    navigation.reset({ routes: [{ name: "Gatehouse" }] });
  };

  return (
    <Survey
      action={createNewUser}
      navigation={navigation}
      fetchSchools={() =>
        axios
          .get(global.api_url + "/schools?sort=schoolname")
          .then((response) => setSchools(response.data.data))
      }
      userInfo={
        <View style={{ width: "90%", gap: 15 }}>
          <Text style={style.bigText}>Introductory Survey</Text>

          <TextInput
            style={style.input}
            placeholder="Enter your e-mail address"
            placeholderTextColor={style.colors.text1}
            onChangeText={setEmail}
            value={email}
            inputMode="email"
            autoComplete="email"
            keyboardType="email-address"
          />

          <View style={style.dropDown}>
            <Dropdown
              onChange={setSelectedSchool}
              data={schools}
              labelField="attributes.schoolname"
              valueField="id"
              search
              value={selectedSchool}
              style={style.boxStyle}
              inputSearchStyle={style.dropdownInput}
              placeholderStyle={style.dropdownInput}
              selectedTextStyle={style.dropdownInput}
              containerStyle={style.boxStyle}
              itemTextStyle={style.schoolsText}
              activeColor={style.colors.bg3}
              // renderLeftIcon={() =>
              //   <Image
              //     source={require("../assets/search.png")}
              //     resizeMode="contain"
              //     style={{ width: 16, height: 16 }}
              //   />
              // }
              searchPlaceholder="Search..."
              placeholder="Select your school"
            />
          </View>
        </View>
      }
    />
  );
}
