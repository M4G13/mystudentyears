import axios from "axios";
import React, { useState, useEffect } from "react";
import { Text, ScrollView } from "react-native";

import Loading from "../components/Loading.js";
import baseStyle from "../styles/base";

export default function Terms({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [termsContent, setTermsContent] = useState("");

  const fetchData = () => {
    axios
      .get(global.api_url + "/t-and-c")
      .then((response) => {
        setTermsContent(response.data.data.attributes.TermsAndConditions);
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
      <ScrollView>
        <Text style={baseStyle.smallText}>{termsContent}</Text>
      </ScrollView>
    </Loading>
  );
}
