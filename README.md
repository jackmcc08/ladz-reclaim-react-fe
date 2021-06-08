# Reclaim Web App
## A React.js frontend application
## Makers Academy Final Project - Team LADZ

## Summary

The Reclaim web application is a loyalty card application that rewards users for recycling pacakging and promotes small businesses.

The app is comprised of two independent programs - a front end react web app and a backend ruby on rails API.

This is the frontend created with React.js. It is a browser based frontend where the user can sign in, obtain stamps and claim rewards.

[Video Demo](https://youtu.be/0LR2igzIuHQ)

The development team:
- Will Spencer (willspencer16)
- Jack Hooper (crotchetycrow)
- Alec Yates (Yates101)
- Jack McCarthy (jackmcc08)


## To Use

#### Development Mode
- git clone to your local machine
- run `npm install` to install dependencies
- in the root folder of the project create a `.env.local` file and add the following:`REACT_APP_API_URL="https://reclaim-api.herokuapp.com"`
- `yarn start` - starts app in browser
  - Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.
- `yarn test-coverage` - runs tests and gives coverage.
- You can sign in and create a profile and then explore. 
- To add stamps use the code 'abcd'

## Tech Stack
- Javascript
- React.js
- React Router, JQuery, Axios
- Jest & ESlint

## Development Summary

Team LADZ worked over a two week period to develop this loyalty card application. We worked throughout in an Agile manner, running two day sprints with daily morning stand-ups and evening retros. We used a Trello board to manage our work and ensure we had visiual representation of our activities. 

In the initial stages of the project we did a group brainstorm to identify ideas for the project and concluded we wanted to build a front end application which interacted with a backend API. We also wanted the challenge of learning a new technology (React) and cementing our prior learning (Rails). 

We choose React for the frontend as we wanted to learn a new technology. Getting started with React was surprisingly simple, and we managed to build out several features in a short space of time. One of the cool elements of this project is the use of React Router to simulate a multi page website. 

An addition feature we implemented was the use of JWT - JSON Web Tokens. These AuthTokens are generated on login by the API and then stored at the browser local storage, each request to the API is then validated with this AuthToken which enhanced the security of the product.

We defined and completed out MVP by the third day of the project, following the principle of building a skateboard and not a car door. By this time we had hosted the backend API on Heroku so we could simulate working with a live API product. 

We had a strong focus on learning as a team and shared our learning and demoed the features we built. 

In the architecture of the program we broke up the react frontend by components and also seperated out the API interactions into seperate files in order to try and impelement SRP and also ensure we could test each part in isolation. 

By the end of the two weeks, we had implemented a functioning API which could interact with our front end and store the data we needed. 

