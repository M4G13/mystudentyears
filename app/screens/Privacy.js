import axios from "axios";
import React, { useState, useEffect } from "react";
import {  Text, ScrollView } from "react-native";

import Loading from "../components/Loading.js";
import baseStyle from "../styles/base";

export default function Privacy({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [privacyContent, setPrivacyContent] = useState("");

  const fetchData = () => {
    axios
      .get(global.api_url + "/privacy-policy")
      .then((response) => {
        setPrivacyContent(response.data.data.attributes.privacyPolicy);
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

  return (
    <Loading isLoading={isLoading} isError={error} retry={fetchData}>
      <ScrollView >
        <Text style={baseStyle.smallText}>{privacyContent}</Text>
      </ScrollView>
    </Loading>
  );
}
