# MyStudentYears App

## Project Overview
An app to help students in the transitionary period from high school to University/College.  Provides students with extra support for everything from managing finances, cooking, and academic skills in a fun and engaging environment.

## Contributing
### Getting started
To run the app follow the READMEs in `app/` and `strapi/`.

### Pre-commit
Before committing ensure that any new components created have tests (jest is used for this but follow the relevant docs for your component, e.g., AsyncStorage has its own section on testing).  Also ensure that all tests pass by running `pnpm run test` in `app/`.  Also ensure that you run `pnpm run lint-fix` in `app/` for consistent styling.  Read the output of `lint-fix`, if warnings are generated check if they should be fixed or if they were intentional, if errors are generated the pipeline will fail (fix these).

Make sure you either reference the number of the ticket in the commit message or are on a feature branch which is prefixed with the ticket number.  Use good commit messages (if you needed a quick fix commit, tick the "squash commits" button when submitting a merge request.  Do not approve your own merge request (wait for someone else to review and approve).

### Useful Resources
[reactnative.express](https://www.reactnative.express/) - Great docs/guide for react native if you need to brush up on something.
[expo go docs](https://docs.expo.dev/) - Generally better docs than the react native website.

## Roadmap
- [x] Research + Stack Decisions
    - [x] Research + determine cross-platform app stack
    - [x] Research CMS options
    - [x] Prototype use of systems
- [x] Simple, base functionality
    - [x] Finalise structure of all pages
    - [x] Pipeline for static analysis
    - [x] App interface with strapi
    - [x] Standardise + improve app layout
    - [x] Create all question types
    - [x] App works with strapi
- [x] Extended end-user functionality
    - [ ] Full E2E + regression test suite
    - [x] Improve quiz functionality
    - [ ] Display + store progress
    - [ ] Form/survey at start + end of app flow
    - [ ] Analytics captured
    - [ ] Improved look + layout of whole app
- [ ] Dev build + deployment of CMS
    - [ ] Strapi deployed
    - [ ] App visuals improved, nearly finalised
    - [ ] Analytics displayed, visualised
    - [ ] Development build delivered to customer
- [ ] User testing, polish
    - [ ] App finalised
    - [ ] Flourishes + polish
    - [ ] User testing of app

## Requirements
* The app will open with some welcome screen > NEXT
* Enter name and email - plus link to privacy policy, terms and conditions, etc. > NEXT
* Simple in app Survey (see below) / or link to google docs (tho I would rather keep them "in-app" >  The user will fill out the survey > Submit
* The data will be stored in a database which product owner can access - opportunity for data visualisation
* The map will show a campus with a building (category) (money, wellbeing, studies, independence) Plus some text Welcome to Freedom Campus
* At the entrance to the Campus they will see  4 students (Sam, Lee, Molly and Ben) and be able to follow each student story -  each story will visit the 4 buildings - Lecture Hall, Medical Centre, Student Union and Finance Advisor. In each category the student stories are consistent  and approximately correspond to some level of complexity/ stage/ . The user starts with the first student story, then the second, third and fourth.
* Through each of the student's story they visit each of the buildings/ Categories and are taken through  3 information "screens" which have  3-4 paragraphs of text and 4-5 Links to podcast, youtube,  PDF, weblink,
* Before the user leaves the building/ category there is a quiz - marked out of 10 marks. Quizzes are composed of several questions of different types, these can include multiple choice, free input (number, text, etc.), ranking, etc. The quiz will be marked and credits awarded, and comments supplied if credits are below XX.
* The marks from the 4 quizzes in each story will be added  together to give a total of 30 credits for the one student story
* Once all complete 30 x 4 = 120 (clever eh) the total  shown to the user at then end with suggestions of further work if they get certain scores in certain categories - eg overall Money score is 50% then
* Once the user has completed all four student stories they will be given a survey to fill out which is similar to the first survey for analytics (e.g. confidence).
* The Survey data will be in format that product owner (Sally) can compare analytics from the first and second surveys, tied to a user id so that comparisons can be made (e.g. students are more confident after using the app).
* The quiz data answers will be stored in a database and able to be analysed, reported on , exported etc.
* The categories and map won't be changeable by the product owner but within each category (map building) the product owner can add any number of student stories and any number of information pages and quiz questions to that user story in that category.
