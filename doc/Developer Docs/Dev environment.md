## Prerequisites
Node.js: Install the latest LTS version of Node.js from the official website. 
pnpm: Install pnpm globally using `npm install -g pnpm.`
Expo CLI: Install the Expo CLI globally using `npm install -g expo-cli.`
Git: Make sure Git is installed on your system to clone the repository. 

Links for prerequisites:
Git:        `https://git-scm.com/book/en/v2/Getting-Started-Installing-Git`
Node.js:    `https://nodejs.org/en/learn/getting-started/how-to-install-nodejs` 

## Environment Setup
Clone the repository: Run `git clone https://stgit.dcs.gla.ac.uk/team-project-h/2023/sh10/sh10-main.git` to clone the project onto your local machine.

Install dependencies: 
Navigate to the project's root directory from there do the following:

-Navigate to `app/`, run `pnpm install` 
-Navigate to `strapi/`  and run `pnpm install`.

This will install all the required dependencies.


## Environment Variables: 
Make sure that you change `.env.example` to `.env`.


## Run the project:
Execute expo start to run the project. Do this by running the following command within the `app/` directory: 

Run `pnpm expo start`

Once the Metro Bundler is running, you can run the app on your physical device using the Expo Go app. If you havent already download the Expo Go App then simply scan the bar code when it appears.

API and Backend Services
Ensure that Strapi is running and accessible. Do this by navigating to the strapi directory and run the following command:

`pnpm run develop`

## Code Editing and contributing
Use Visual Studio Code or any preferred IDE that supports JavaScript and React Native. Optionally consider installing extensions for ESLint, Prettier, and any other extensions that are useful for React Native development.

Ensure that all tests pass by running `pnpm run test` in `app/` directory.  Additionaly ensure that you run `pnpm run lint-fix` in `app/` for consistent styling. In the event that warnings or errors are generated fix appropriately if they are not intentional.

