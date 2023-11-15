import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";

import baseStyle from "../styles/base.js";

export default function Info({ route, navigation }) {
  const { student_id, category_id } = route.params;
  const students = global.data.data;
  const student = students.find((s) => s.id === student_id);
  const category = student.attributes.category.find((c) => c.id === category_id);
  const information = category.information.data;

  const [currentPage, setCurrentPage] = useState(0);
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === information.length - 1;

  const navigateToNextPage = () => {
    if (isLastPage) {
      navigation.navigate("Question", {
        category_id,
        student_id,
      });
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const navigateToPreviousPage = () => {
    if (!isFirstPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!isFirstPage && (
        <Pressable onPress={navigateToPreviousPage}>
          <Text style={styles.button}>Previous</Text>
        </Pressable>
      )}

      <View key={student.id} style={styles.studentContainer}>
        <Text style={styles.studentName}>
          Student: {student.attributes.Name}
        </Text>
        <View key={category.id} style={styles.categoryContainer}>
          <Text style={styles.categoryName}>Category: {category.Category}</Text>
          <View style={styles.infoContainer}>
            <View key={information[currentPage].id} style={styles.infoCard}>
              <Text style={styles.infoTitle}>Title: {information[currentPage].attributes.Title}
              </Text>
              <Text style={styles.infoText}>
                {information[currentPage].attributes.Text}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <Pressable onPress={navigateToNextPage}>
        <Text style={styles.button}>{isLastPage ? "Go to Quiz" : "Next"}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = {
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  button: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
    margin: 10,
  },
  studentContainer: {
    marginBottom: 16,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  studentName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  categoryContainer: {
    marginTop: 8,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  infoContainer: {
    marginTop: 8,
  },
  infoCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
  },
};
