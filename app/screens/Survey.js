import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import RadioForm from "react-native-simple-radio-button";

import style from "../styles/survey";

export default function Survey({ navigation }) {
  const [input, setInput] = useState("");

  const [schools, setSchools] = useState("");
  const [selected, setSelected] = useState("");

  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = () => {
    Promise.all([
      fetch(global.api_url + "/schools?sort=schoolname")
        .then((response) => response.json())
        .then((data) =>
          setSchools(
            data.data.map((item) => ({
              key: item.id,
              value: item.attributes.schoolname,
            })),
          ),
        ),
      fetch(global.api_url + "/survey-questions")
        .then((response) => response.json())
        .then((data) => setQuestions(data.data)),
      fetch(global.api_url + "/survey-options")
        .then((response) => response.json())
        .then((data) => setOptions(data.data)),
    ])
      .then(() => {
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

  useFocusEffect(
    useCallback(() => {
      async function getResponse() {
        let tempResponse;
        try {
          const storedResponse = await AsyncStorage.getItem("survey");
          tempResponse = JSON.parse(storedResponse);

          if (tempResponse && tempResponse.data) {
            setSelected(tempResponse.data.school);
            setInput(tempResponse.data.Email);
          } else {
            const storedEmail = await AsyncStorage.getItem("saveEmail");
            const storedSchool = await AsyncStorage.getItem("saveSchool");

            if (storedEmail && storedSchool) {
              setSelected(JSON.parse(storedSchool));
              setInput(JSON.parse(storedEmail));
            }
          }
        } catch (e) {
          console.error("Failed to get response. " + e);
          tempResponse = null;
        }
        setResponse(tempResponse);
      }
      getResponse();
    }, []),
  );

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

  const createNewUser = (data) => {
    fetch(global.api_url + "/app-users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((user) => {
        global.uuid = user.data.attributes.UUID;
        AsyncStorage.setItem("uuid", user.data.attributes.UUID);
      })
      .catch((error) => {
        console.error(error);
      });
    storeResponse(data);
  };

  const updateUser = (data) => {
    fetch(global.api_url + "/app-user/" + global.uuid, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });
  };

  function process() {
    let route;
    if (response === null) {
      if (!/\S+@\S+\.\S+/.test(input)) {
        alert("Please enter a valid e-mail address.");
        return 0;
      } else if (selected === undefined) {
        alert("Please select a school.");
        return 0;
      }
    }

    for (let i = 0; i < questions.length; i++) {
      if (!selectedValues[questions[i].id]) {
        alert("Please answer all questions.");
        return 0;
      }
    }

    const survey = {
      Completed: Array.from(questions, (q) => ({
        survey_question: q.id,
        survey_option: selectedValues[q.id],
      })),
    };

    if (response === null) {
      createNewUser({
        data: {
          Email: input,
          school: schools.find((elt) => elt.value === selected).key,
          InitialSurvey: survey,
        },
      });
      route = [{ name: "Gatehouse" }];
    } else {
      updateUser({
        FinalSurvey: survey,
      });
      route = [{ name: "Home Screen" }];
    }
    navigation.dispatch(CommonActions.reset({ routes: route }));
  }

  async function handleNavigate(page) {
    if (input !== null && input !== undefined) {
      await AsyncStorage.setItem("saveEmail", JSON.stringify(input));
    }
    if (input !== null && input !== undefined) {
      await AsyncStorage.setItem("saveSchool", JSON.stringify(selected));
    }
    navigation.navigate(page);
  }

  if (isLoading) {
    return (
      <View style={style.view}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={style.view}>
        <Text style={style.bigText}>
          Failed to load data, make sure you have an internet connection and try
          again
        </Text>
        <Pressable onPress={fetchData}>
          <Text style={style.button}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={style.scrollView}>
      <View style={style.view}>
        {response === null ? (
          <View>
            <Text style={style.bigText}>Introductory Survey</Text>

            <TextInput
              style={style.input}
              placeholder="Enter your e-mail address"
              onChangeText={(text) => setInput(text)}
              value={input}
            />

            <View style={style.dropDown}>
              <SelectList
                id="dropdown"
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
            <Text style={style.smallText}>{response.data?.Email}</Text>
            <Text style={style.smallText}>
              {(
                schools &&
                schools.find((pair) => pair.key === response.data?.school)
              )?.value ?? null}
            </Text>
          </View>
        )}

        {questions.map((q) => (
          <View key={q.id} style={style.questionContainer}>
            <Text style={style.smallText}>{q.attributes.question} </Text>

            <RadioForm
              style={style.likertContainer}
              radio_props={options.map((o) => ({
                label: o.attributes.option,
                value: o.id,
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
          <Text onPress={() => handleNavigate("Terms & Conditions")} style={style.link}>
            Terms and Conditions
          </Text>
          , and{" "}
          <Text onPress={() => handleNavigate("Privacy Policy")} style={style.link}>
            Privacy Policy
          </Text>
          .
        </Text>

        <Pressable onPress={() => process()}>
          <Text style={style.submit}>Submit</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
