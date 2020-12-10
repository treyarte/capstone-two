# <b>My Droplist Mobile</b>

#####[Android Download](https://play.google.com/store/apps/details?id=com.treyvionjohnson.mydroplist)

My Droplist is a mobile application for android built with Node.JS, Express.js, and React Native. This app is for my second capstone project at Springboards Software Engineering Career Track.

### Background Information

In my first capstone project, I created a web application that solved some of the core problems of the company I work for (Capstone one project proposal). This mobile version sets out to be an improvement of the web version. My Droplist web app used responsive design to make using it feel natural on the phone. Since it was a web application, features such as swiping and notifications could not be utilized, thus making the app not a truly mobile experience.

The mobile app’s new features will include droplist notifications, a new swiping feature to view items in a droplist, and a simplified method of creating droplists. These features will give users a truly mobile experience and will encourage more people to utilize the app.

### Features

- The status of each droplist updates based on what action the receiving forklift driver takes.

- Users can create and send droplists to forklift drivers.

- Forklift drivers can accept, decline and complete droplists.

- Users can swap roles.

### User Flow

Users can sign up as either stocker or forklift driver. A stocker can create a droplist and send it to a forklift driver, and forklift drivers can accept, decline, and complete a droplist.

### API

The API is created with Node.js/Express.js and is currently hosted on heroku.

#### Endpoints

- /users
- /items
- /droplists
- /login
- /sign-up

[Repo](https://github.com/treyarte/capstone-two/tree/master/mydroplist-backend)
[API](https://mydroplistmobile.herokuapp.com/)

### Tools

- React Native
- Express.js
- Node.js
- Bcrypt
- Json Web Token
- PostgreSQL
- Axios
- JavaScript
- SuperTest
- Jest

### Requirements

- PostgreSQL 12.2 or Higher
- Node.js v12.18.3 or Higher
- Expo CLI 4.0.11 or Higher
- NPM 6.14.9
- nodemon

### Installation

##### Backend

Navigate to the mydroplist-backend folder and open a command line tool such as Git Bash.

##### Create the Databases

You will need to create two databases in PostgreSQL. One for the application and another for testing.

##### App Database

```sh
    createdb mydroplist-mobile
    psql mydroplist-mobile < data.sql
```

##### Test Database

```sh
    createdb mydroplist-mobile-test
    psql mydroplist-mobile < data.sql
```

Install dependencies

```sh
    npm install
```

Run test

```sh
    jest __test__/integration/specified-test-name
    jest __test__/unit/specified-test-name
```

Start server

```sh
    nodemon server.js
```

Or

```sh
    npm start
```

##### Frontend

Navigate to the mydroplist-frontend folder in your command line tool

Install dependencies

```sh
    npm install
```

Make sure Expo is installed and run the command

```sh
    npm start
```

Expo will open a browser window, which will allow you to run the app either through an android simulator or using a physical device with the expo app installed.
