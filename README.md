# MyStudentYears App

## Project Overview
An app to help students in the transitionary period from high school to University/College.  Provides students with extra support for everything from managing finances, cooking, and academic skills in a fun and engaging environment.

## Requirements
* Cross platform app (using react native).
* Quiz questions in 4 categories, with multiple sub-categories each.
* An element of choice for the user (pick which categories they work through, what order, etc.)
* Non-quiz elements for users to gain the knowledge they'll need to pass the quizzes (e.g. text info, videos, audio, etc.)
* Administrator should be able to create new quiz questions/categories/etc. in a no-code environment and have the app update with these automatically.
* Database should use DigitalOcean.
* App should return useful analytics data to the administrator (watch out for GDPR).

## Roadmap
- [ ] Create simple react app for quiz questions.
	- [ ] Create app to simply display quiz questions using react.
	- [ ] Create tests for this, ensure it works on multiple platforms.
- [ ] Allow react app to retrieve questions from DigitalOcean db.
	- [ ] Work out infrastructure
	- [ ] Create some mocked questions on the db for testing
	- [ ] Work out and implement the retrieval on the app (what happens to your progress if questions are changed?)
	- [ ] Ensure test suite is robust.
- [ ] Allow administrator to add to db with no-code env (e.g. SanityCMS hosted on MyStudentYears website).
	- [ ] Decide on which CMS to use (or if a CMS is even the right choice?), and on hosting options.
	- [ ] Work out how to interact with the DB from the CMS (access keys; security issues—find out!).
	- [ ] Make sure there's a useful preview on the CMS so admin can see what it will look like.
	- [ ] Rigorously test workflow (Publish on CMS -> upload to DB -> retrieve on app)
	- [ ] At this point the MVP is achieved but requirements are not met—needs to be expanded to fulfil all user requirements
	- [ ] Ensure test suite is robust.
- [ ] Expand the scope.
	- [ ] Add more question types.
	- [ ] Add more categories.
	- [ ] Improve UI (branching paths, etc.).
	- [ ] Create an analytics viewing page on the CMS (or elsewhere).
	- [ ] Conduct user tests—see what else could be improved.
	- [ ] Ensure a robust testing suite.
