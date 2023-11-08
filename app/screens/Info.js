import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import baseStyle from "../styles/base.js";

export default function Info() {
  const students = global.data.data;
  const [currentPage, setCurrentPage] = useState({
    studentIndex: 0,
    categoryIndex: 0,
  });

  const navigateToNextPage = () => {
    if (currentPage.categoryIndex < students[currentPage.studentIndex].attributes.category.length - 1) {
      setCurrentPage({
        studentIndex: currentPage.studentIndex,
        categoryIndex: currentPage.categoryIndex + 1,
      });
    } else if (currentPage.studentIndex < students.length - 1) {
      setCurrentPage({
        studentIndex: currentPage.studentIndex + 1,
        categoryIndex: 0,
      });
    }
  };

  const navigateToPreviousPage = () => {
    if (currentPage.categoryIndex > 0) {
      setCurrentPage({
        studentIndex: currentPage.studentIndex,
        categoryIndex: currentPage.categoryIndex - 1,
      });
    } else if (currentPage.studentIndex > 0) {
      const prevStudentIndex = currentPage.studentIndex - 1;
      setCurrentPage({
        studentIndex: prevStudentIndex,
        categoryIndex: students[prevStudentIndex].attributes.category.length - 1,
      });
    }
  };

  const student = students[currentPage.studentIndex];
  const category = student.attributes.category[currentPage.categoryIndex];
  const information = category.information.data;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable onPress={navigateToPreviousPage}>
        <Text style={styles.button}>Previous</Text>
      </Pressable>
      
      <View key={student.id} style={styles.studentContainer}>
        <Text style={styles.studentName}>Student: {student.attributes.Name}</Text>
        <View key={category.id} style={styles.categoryContainer}>
          <Text style={styles.categoryName}>Category: {category.Category}</Text>
          <View style={styles.infoContainer}>
            {information.map((info) => (
              <View key={info.id} style={styles.infoCard}>
                <Text style={styles.infoTitle}>{info.attributes.Title}</Text>
                <Text style={styles.infoText}>{info.attributes.Text}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      
      <Pressable onPress={navigateToNextPage}>
        <Text style={styles.button}>Next</Text>
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
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  categoryContainer: {
    marginTop: 8,
  },
  categoryName: {
    fontSize: 16,
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
    fontSize: 14,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 14,
  },
};