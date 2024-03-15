### Project Infrastructure and Architecture Documentation

## Infrastructure & Architecture Overview

**Frontend**
- Technology: React Native for cross-platform mobile app development.
  React-navigation is used to organise pages docs can be found
  [here](https://reactnavigation.org/docs/getting-started/).  React native
  reanimated is also used throughout the app, docs can be found
  [here](https://docs.swmansion.com/react-native-reanimated/).  Lodash is also
  used occasionally for some utility operations, docs
  [here](https://lodash.com/docs/4.17.15).  Async Storage is also used, its docs
  can be found
  [here](https://react-native-async-storage.github.io/async-storage/docs/install),
  this is a community package rather than the built-in since this is deprecated.
  Testing with these components can be complex, react-native-testing library is
  used along with, jest, jest-expo, and jest.  Refer to the docs for the
  relevant component you are testing for advice on how best to mock/test it.
- Codebase: Located under the `app/` directory in the repository.
- Main Entry Point: `App.js` intializes app setup and navigation


**Backend**
CMS: Strapi - A headless CMS to manage content dynamically.
Database: SQL (sqlite locally, postgres on the development server)
Server: Hosted on Digital Ocean with the backend accessible via RESTful API.
Analytics Plugin: Uses [nivo](https://nivo.rocks/) to display interactive
diagrams, uses [Strapi design system](https://github.com/strapi/design-system)
for other components.  As with most of strapi it's best to read source code over
documentation as the docs are sparse and often out of date.

**Technology Stack**
Frontend: React Native with Expo for building cross-platform mobile applications.
Backend: Strapi CMS, utilizing its REST API capabilities.
Database: SQL.
CI/CD: GitLab for continuous integration and delivery.
Cloud: Digital Ocean for hosting services.

**Infrastructure**

The Strapi CMS backend is hosted on Digital Ocean, ensuring reliable uptime and scalability.
The production environment variables are managed via .env files, as described in the development environment setup guide.

**Repository and Codebase Structure**

Main Directories:
-   `app/`: Contains the React Native application code.
-   `strapi/`: Contains the Strapi CMS code.

Main Branches:
-   prod: The production branch.
-   main: The development branch for features and tests.

**Build and Deployment**
- Defined in .gitlab-ci.yml with pipelines for testing, building, and deploying.

**Documentation**
Existing documentation is available under the Docs directory, including developer guides, App structure and Strapi CMS structure.
