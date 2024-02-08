import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import RadioForm from "react-native-simple-radio-button";

import style from "../styles/survey";

export default function Survey({ navigation }) {
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [schools, setSchools] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selectedValues, setSelectedValues] = useState(Array(4).fill(-1));

  const fetchData = () => {
    fetch(global.api_url + "/schools?sort=Name")
      .then((response) => response.json())
      .then((data) => {
        const temp = data.data.map((item) => ({
          key: item.id,
          value: item.attributes.Name,
        }));

        setSchools(temp);
        setIsLoading(false);
        setError(false);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
        setIsLoading(false);
      });
    fetch(global.api_url + "/survey-questions?populate=*")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.data);
        setIsLoading(false);
        setError(false);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function storeResponse(response) {
    try {
      await AsyncStorage.setItem("survey", JSON.stringify(response));
    } catch (e) {
      console.error("Failed to save progress. " + e);
    }
  }

  const [response, setResponse] = useState({});
  useFocusEffect(
    useCallback(() => {
      async function getResponse() {
        let tempResponse;
        try {
          const storedResponse = await AsyncStorage.getItem("survey");
          tempResponse = JSON.parse(storedResponse);
          setSelected(tempResponse?.data?.school);
          setInput(tempResponse?.data?.email);
        } catch (e) {
          console.error("Failed to get response. " + e);
          tempResponse = null;
        }
        setResponse(tempResponse);
      }
      getResponse();
    }, []),
  );

  const handlePostData = (data) => {
    fetch(global.api_url + "/app-users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((user) => {
        console.log(user);
        global.uuid = user.data.attributes.UUID;
        AsyncStorage.setItem("uuid", global.uuid);
      })
      .catch((error) => {
        console.log(error);
      });
    storeResponse(data);
  };

  function process() {
    if (!/\S+@\S+\.\S+/.test(input) && response !== null) {
      alert("Please enter a valid e-mail address.");
      return 0;
    }

    if (selected === "" && response !== null) {
      alert("Please select a school.");
      return 0;
    }
    const data = {
      data: {
        Email: input,
        school: schools.find((elt) => elt.value === selected).key,
        InitialSurvey: {
          Completed: Array.from(questions, (q) => ({
            survey_question: q.id,
            answer: q.attributes.option[selectedValues[q.id]].option,
          })),
        },
      },
    };

    handlePostData(data);
    navigation.navigate("Gatehouse");
  }

  return (
    <ScrollView contentContainerStyle={style.scrollView}>
      <View style={style.view}>
        {response === null ? (
          <View>
            <Text style={style.bigText}>Introductary Survey</Text>

            <TextInput
              style={style.input}
              placeholder="Enter your e-mail address"
              onChangeText={(text) => setInput(text)}
              value={input}
            />

            <View style={style.dropDown}>
              <SelectList
                setSelected={(val) => {
                  setSelected(val);
                }}
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
        ) : (
          <View style={style.personalInfo}>
            <Text style={style.bigText}>Conclusionary Survey</Text>
            <Text style={style.smallText}>{response.data?.email}</Text>
            <Text style={style.smallText}>{response.data?.school}</Text>
          </View>
        )}

        {questions.map((q) => (
          <View key={q.id} style={style.questionContainer}>
            <Text style={style.smallText}>{q.attributes.question} </Text>

            <RadioForm
              style={style.likertContainer}
              radio_props={q.attributes.option.map((o, i) => ({
                label: o.option,
                value: i,
              }))}
              initial={-1} // Set initial to -1 to have no button initially selected
              labelStyle={style.option}
              buttonStyle={{ borderRadius: 1000 }}
              onPress={(value) => {
                const newSelectedValues = { ...selectedValues };
                newSelectedValues[q.id] = value;
                setSelectedValues(newSelectedValues);
              }}
            />
          </View>
        ))}

        <Text style={style.smallerText}>
          By continuing, you agree to our{" "}
          <Text onPress={() => navigation.navigate("Terms & Conditions")}>
            <Text style={style.link}>Terms and Conditions</Text>
          </Text>
          , and{" "}
          <Text onPress={() => navigation.navigate("Privacy Policy")}>
            <Text style={style.link}>Privacy Policy</Text>
          </Text>
          .
        </Text>

        <Pressable onPress={() => process()}>
          <Text style={style.submit}>Continue to campus</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
