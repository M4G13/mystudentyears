### Project Infrastructure and Architecture Documentation

## Infrastructure & Architecture Overview

**Frontend**
- Technology: React Native for cross-platform mobile app development
- Codebase: Located under the `app/` directory in the repository.
- Main Entry Point: `App.js` intializes app setup and navigation

**Backend**
CMS: Strapi - A headless CMS to manage content dynamically.
Database: SQL
Server: Hosted on Digital Ocean with the backend accessible via RESTful API.

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
