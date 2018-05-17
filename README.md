# Jaquen Classroom

Realtime student assessment and learning management platform with a focus on empowering teachers in their classroom

![Teacher Quiz Dashboard](https://i.imgur.com/CRMj6Sn.gif)

###### Teacher Quiz Dashboard (2x Speed)

&nbsp;

<a href="http://www.youtube.com/watch?feature=player_embedded&v=wGcndHj-gFs
" target="_blank"><img src="https://img.youtube.com/vi/wGcndHj-gFs/0.jpg" 
alt="Document Creation" width="240" height="180" border="10" /></a>

###### Demo Video of realtime Teacher-Student interaction

## Team

  - __Product Owner__: Riley Alsman
  - __Scrum Master__: Juan Galan
  - __Development Team Members__: Alex Levine, Ara Nguyen, Juan Galan, Riley Alsman

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
1. [Team](#team)

## Usage

Users must have an account made for them by their organization to login to the platform. Once logged on, the available features will depend on if they are designated as a Student or as a Teacher.

Teachers can:
- Create Classes & Add students to a class
- Create quiz questions
- Construct quizzes from existing or new questions (seeing data about how that question has performed in the past)
- View a dasboard with student's grades and participation in a class
- Launch a class to go live where they can:
  - See which students are present
  - Launch a "thumb poll" to get quick student feedback on a good-ok-bad type question
  - Launch a quiz seeing in real-time studnent's current question, current grade and completinon status in an easy to read dasobhard
- End a class persisting live data to the main database

Students can:
- View their classes seeing which ones are live
- See past performance in classes that are not live
- Enter a live class in session where they will be shown:
  - live polls, quizzes, etc.
- "Raise their hand" in a class that will alert the teacher
- NOT change their view in a class - this is all controlled by the teacher



## Requirements
React
Redux
Firebase
PostgreSQL
Grommet.io
Grommet.io Extras
Moment
(See package.json for more dependencies)

## Development

```sh
npm run react-dev
npm run server-dev
```

To set up PostgreSQL for development:

```sh
Start a postgres server
CREATE DATABASE classroom;
npm run server-dev (loads schema into database)
```

To set up Firebase for development:

  You will need to create your own Firebase for testing purposes and include those credetials in the `server/config.js` file

To set up JWT authentication:

  Simply add a string for your secret in the `server/config.js` file

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)

