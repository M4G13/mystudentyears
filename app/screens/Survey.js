import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import Constants from "expo-constants"; // REMOVE IN PRODUCTION
import React, { useState, useCallback, useEffect } from "react";
import { View, Text, ScrollView, TextInput, Pressable, Image } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import RadioForm from "react-native-simple-radio-button";

import style from "../styles/survey";

export default function Survey({ navigation }) {
  const [input, setInput] = useState("");
  const [selected, setSelected] = React.useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [schools, setSchools] = useState("");


  const fetchData = () => {
    fetch(
      "http://" +
        Constants.expoConfig.hostUri.split(":").shift() +
        ":1337/api/schools/?populate=deep",
    )
      .then((response) => response.json())
      .then((data) => {
        data =  data.data.map(item => item.attributes.Name);
        data.sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'accent' }))

        data = data.map((str, index) => ({
          key: index + 1, 
          value: str
        }));

        setSchools(data);
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

  const handlePostData = async (data) => {
    try {
      const response = await fetch(
        "http://" +
          Constants.expoConfig.hostUri.split(":").shift() +
          ":1337/api/survey-data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Response Body:", errorBody);
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }

    storeResponse(data);
  };

  const categories = [
    "How confident are you with student finance and managing your money?",
    "How confident are you with managing your personal health and wellbeing in first year?",
    "How confident are you with first-year teaching and assessment methods?",
    "How confident are you with dealing with being more independent after leaving school?",
  ];

  const likertOptions = [
    "Fully confident",
    "Quite confident",
    "Not very confident",
    "Not at all confident",
  ];

  const [selectedValues, setSelectedValues] = useState(Array(4).fill("NULL"));

  const radioProps = likertOptions.map((option, index) => ({
    label: option,
    value: index,
  }));

  function process() {
    if (!/\S+@\S+\.\S+/.test(input) && response !== null) {
      alert("Please enter a valid e-mail address.");
      return 0;
    }

    if (selected === "" && response !== null) {
      alert("Please select a school.");
      return 0;
    }

    for (let i = 0; i < 4; i++) {
      if (likertOptions[selectedValues[i]] === undefined) {
        alert("Please answer all questions.");
        return 0;
      }
    }

    const data = {
      data: {
        email: input,
        school: selected,
        responseNo: response === null ? 1 : 2,
        confidence: [
          {
            id: 1,
            category: "Finance",
            confidence: likertOptions[selectedValues[0]],
          },
          {
            id: 2,
            category: "Wellbeing",
            confidence: likertOptions[selectedValues[1]],
          },
          {
            id: 3,
            category: "Academics",
            confidence: likertOptions[selectedValues[2]],
          },
          {
            id: 4,
            category: "Independence",
            confidence: likertOptions[selectedValues[3]],
          },
        ],
      },
    };

    handlePostData(data);
    navigation.navigate("Gatehouse");
  }

  function handleLinkPress(){
    return 0;
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
                searchicon = {<Image source={require('../assets/search.png')}resizeMode='contain'style={{width:17,height:17}}/>}
                arrowicon  = {<Image source={require('../assets/arrow.png')}resizeMode='contain'style={{width:17,height:17}}/>}
                closeicon  = {<Image source={require('../assets/close.png')}resizeMode='contain'style={{width:17,height:17}}/>}
                placeholder="Select your school"
                searchPlaceholder= "Search"
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

        {categories.map((category, index) => (
          <View key={index} style={style.questionContainer}>
            <Text style={style.smallText}>{category} </Text>

            <RadioForm
              style={style.likertContainer}
              radio_props={radioProps}
              initial={-1} // Set initial to -1 to have no button initially selected
              labelStyle={style.option}
              buttonStyle={{ borderRadius: 1000 }}
              onPress={(value) => {
                const newSelectedValues = [...selectedValues];
                newSelectedValues[index] = value;
                setSelectedValues(newSelectedValues);
              }}
            />
          </View>
        ))}

        <Text style={style.smallerText} >By continuing, you agree to our{' '}
        <Text onPress={() => navigation.navigate("Terms & Conditions")}>
          <Text style={ style.link }>Terms and Conditions</Text>
        </Text>
        , and{' '}
        <Text onPress={() => navigation.navigate("Privacy Policy")}>
          <Text style={ style.link }>Privacy Policy</Text>
        </Text>
        .</Text>



        <Pressable onPress={() => process()}>
          <Text style={style.submit}>Continue to campus</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
