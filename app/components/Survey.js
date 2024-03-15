import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";

import Loading from "./Loading.js";
import PrettyButton from "../components/PrettyButton.js";
import RadioButton from "../components/RadioButton.js";
import style from "../styles/survey";

export default function Survey({
  userInfo,
  action,
  navigation,
  fetchSchools = () => {},
}) {
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = () => {
    Promise.all([
      fetchSchools(),
      axios
        .get(global.api_url + "/survey-questions")
        .then((response) => setQuestions(response.data.data)),
      axios
        .get(global.api_url + "/survey-options")
        .then((response) => setOptions(response.data.data)),
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

  function process() {
    for (const q of questions) {
      if (!selectedValues[q.id]) {
        alert("Please answer all questions.");
        return;
      }
    }

    const survey = {
      Completed: Array.from(questions, (q) => ({
        survey_question: q.id,
        survey_option: selectedValues[q.id],
      })),
    };

    action(survey);
  }

  return (
    <Loading isError={error} isLoading={isLoading} retry={fetchData}>
      <ScrollView contentContainerStyle={style.scrollView}>
        <View style={style.view}>
          {userInfo}
          {questions.map((q) => (
            <View style={style.radioContainer} key={q.id}>
              <View style={style.questionContainer}>
                <Text style={style.questionText}>{q.attributes.question}</Text>
              </View>
              <View>
                {options.map((o) => (
                  <RadioButton
                    text={o.attributes.option}
                    key={o.id}
                    selected={selectedValues[q.id] === o.id}
                    action={() =>
                      setSelectedValues({ ...selectedValues, [q.id]: o.id })
                    }
                  />
                ))}
              </View>
            </View>
          ))}

          <Text style={style.smallerText}>
            By continuing, you agree to our{" "}
            <Text
              onPress={() => navigation.navigate("Terms & Conditions")}
              style={style.link}
            >
              Terms and Conditions
            </Text>
            , and{" "}
            <Text
              onPress={() => navigation.navigate("Privacy Policy")}
              style={style.link}
            >
              Privacy Policy
            </Text>
            .
          </Text>

          <PrettyButton onPress={() => process()} style={style.prettyButton}>
            Submit
          </PrettyButton>
        </View>
      </ScrollView>
    </Loading>
  );
}
