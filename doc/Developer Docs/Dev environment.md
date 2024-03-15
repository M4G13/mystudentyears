## Prerequisites
Node.js: Install the latest LTS version of Node.js from the official website. 
pnpm: Install pnpm globally using `npm install -g pnpm.`
Expo CLI: Install the Expo CLI globally using `npm install -g expo-cli.`
Git: Make sure Git is installed on your system to clone the repository. 

Links for prerequisites:
Git:        `https://git-scm.com/book/en/v2/Getting-Started-Installing-Git`
Node.js:    `https://nodejs.org/en/learn/getting-started/how-to-install-nodejs` 

## Environment Setup

Clone the present repository and Install dependencies: 

Navigate to the project's root directory from there do the following:

-Navigate to `app/`, run `pnpm install` 
-Navigate to `strapi/`  and run `pnpm install`.

This will install all the required dependencies.


## Environment Variables: 
Make sure that you change `/strapi/.env.example` to `/strapi/.env`.


## Run the project:
Execute expo start to run the project. Do this by running the following command within the `app/` directory: 

Run `pnpm expo start`

Once the Metro Bundler is running, you can run the app on your physical device
using the Expo Go app. If you havent already download the Expo Go App then
simply scan the bar code when it appears. If expo shows a dev build running you
can either build a dev build and run this on your device or switch to Expo Go by
pressing 's' once the app has built.

API and Backend Services Ensure that Strapi is running and accessible. Do this
by navigating to the strapi directory and run the following command:

`pnpm run develop`

Alternatively, place the following line inside `/app/.env` to use the production
server's data, this is preferable if you have no data locally.

```
EXPO_PUBLIC_API_URL="https://mystudentyears.co.uk/strapi"
```

When running Strapi locally, it is common that you will see a 403 (unauthorised)
error, in these cases navigate to settings>users & permissions plugin>public and
enable permissions for the relevant routes (when first starting expo this will
be most of them).

It is also possible to run Strapi within a docker container using the provided
docker-compose file, though this requires some additional set-up and database
migrations (since this configuration uses postgres).  This approach is
preferable when editing routes, controllers, or other backend components of the
CMS.  For support see [Strapi docs on
docker](https://docs.strapi.io/dev-docs/installation/docker), [Strapi docs on
postgres](https://docs.strapi.io/dev-docs/deployment/digitalocean#install-the-database-for-your-project)

## Code Editing and contributing
Ensure that all tests pass by running `pnpm run test` in `app/` directory.
Additionaly ensure that you run `pnpm run lint-fix` in `app/` and `strapi/` for
consistent styling. In the event that warnings or errors are generated fix
appropriately if they are not intentional.

Consider installing IDE/editor plugins/extensions for ESLint, Prettier, and any
other extensions that are useful for React Native development.  Some people
prefer to use a device simulator to run the app rather than using Expo Go but
note that the iOS simulator is only available on MacOS.

Refer to the documentation provided in Infrastructure and Development, other
useful docs include:
[reactnative.express](https://www.reactnative.express/) - Great docs/guide for
react native if you need to brush up on something. [expo go
docs](https://docs.expo.dev/) - Generally better docs than the react native
website.

NB: When working with extending Strapi it's often easier to just read the source
code rather than the documentation as it's often incomplete, out of date, or
incorrect.  Find this [here](https://github.com/strapi/strapi).
 
