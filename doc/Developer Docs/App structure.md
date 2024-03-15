## React Native App Structure Documentation

## Overview
This document details the structure and key components of the "My Student Years" React Native application, which is designed to engage students with interactive content and quizzes.

## Directory Structure

- `_mocks_/`: Contains mock functions and objects for testing purposes.

- `_tests_/`: Holds the test cases for the application's screens and components.

- `assets/`: Stores static files like images and fonts. It includes a specific fonts directory containing the PlaypenSans.ttf font used throughout the app.

- `components/`: Contains reusable components, including PrettyButton, Survey, and Grade, among others.

- `coverage/`: Generated test coverage reports.

- `node_modules/`: Third-party libraries and dependencies.

- `screens/`: Holds all the screen components used for navigation, like Campus, Category, FinalSurvey, etc.

- `styles/`: Includes styling files corresponding to each screen, which are imported and used in the respective 
screen components.

- `app.js/`: The main entry point of the app that , fetches data from the CMS, initializes navigation, sets up theme and global states.

## Key Components and Functionality

## Navigation

The app utilizes `@react-navigation/native-stack` for navigation, structured in `App.js`. It dynamically selects between `InitialSurvey` and `FinalSurvey` based on the presence of a UUID in global state, it then guides the user through their journey from the home screen to quizzes and informational content.

## Global State Management

Using React Context (`CurrentStudentContext`, `CompletionContext`), the app tracks the current student profile and quiz completion status. These contexts are essential for navigating the user's progress and tailoring the content dynamically.

## Data Flow with Strapi

The app interacts with a Strapi CMS backend, fetching and updating data related to students, quizzes, and progress. Global URLs (`global.url` and `global.api_url`) are configured for backend communication, these are crucial for dynamic content rendering and recording quiz results.

**Example of fetching data in `FinalSurvey.js`**:

axios.put(global.api_url + "/app-user/" + global.uuid, {
  data: { FinalSurvey: survey },
});

## Theming and Styling

A base style defined in `styles/base.js` ensures consistent theming across the app. Components and screens import these styles, maintaining a cohesive look and feel. A custom font `PlaypensSans` enhances the user interface.

**Example from `base.js`**:

const baseStyle = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: colors.bg1,
    borderTopWidth: 3,
    borderTop: "solid",
    borderColor: colors.bg2,
    height: "100%",
  },
  bigText: {
    color: colors.text1,
    fontWeight: "600",
    fontSize: 25,
    textAlign: "center",
  },
});

## Testing and Mocks

The project employs React Testing Library and Jest for testing components and functionalities. The tests focus on user interactions and component rendering, ensuring the application behaves as expected.

**Example test case in `HomeScreen.test.js`**:

describe("<HomeScreen />", () => {
  it.skip("has children", () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree.children.length).toBeGreaterThan(0);
  });
});

## Coverage Reports

Generated coverage reports provide insight into the tested portions of the code. These reports help identify areas lacking tests, guiding future testing efforts to improve code reliability.