import { Component, useState, useEffect, useRef } from "react";
import { Alert, StyleSheet, View, Text, Pressable, Image } from "react-native";

import baseStyle from "../styles/base.js";

export default function Home() {
  const [options, setOptions] = useState([
    { id: 1, content: 'A', sets: '3x10' },
    { id: 2, content: 'B', sets: '3x10' },
    { id: 3, content: 'C', sets: '3x10' },
    { id: 4, content: 'D', sets: '3x10' },
  ])

  const dragOption = useRef<number>(0)
  const draggedOverOption = useRef<number>(0)

  function handleSort() {
    const optionClone = [...options]
    const temp = optionClone[dragOption.current]
    peopleClone[dragOption.current] = optionClone[draggedOverOption.current]
    peopleClone[draggedOverOption.current] = temp
    setPeople(optionClone)
  }

  return (
    <main className="flex min-h-screen flex-col items-center space-y-4">
      <h1 className="text-xl font-bold mt-4">List</h1>
      {people.map((person, index) => (
        <div className="relative flex space-x-3 border rounded p-2 bg-gray-100"
          draggable
          onDragStart={() => (dragPerson.current = index)}
          onDragEnter={() => (draggedOverPerson.current = index)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
        >
          <p>{person.name}</p>
        </div>
      ))}
    </main>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#272522",
  },

  questionContainer: {
    flex: 0,
    width: "100%",
    padding: 30,
    paddingBottom: 50,
    alignItems: "center",
  },

  questionText: {
    textAlign: "center",
    width: "100%",
    fontSize: 30,
    color: "#ffffff",
  },

  buttonRow: {
    margin: 30,
    marginTop: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    textTransform: 0,
  },

  answerButton: {
    backgroundColor: "#4488dd",
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 5,
    width: "45%",
  },

  answerText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
  },

  selectButton: {
    backgroundColor: "#05b4ff",
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 5,
    width: "45%",
  },
});
