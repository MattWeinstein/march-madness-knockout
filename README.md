# March Madness Knockout Pool

## Description
This application is intended to serve users participating in a March Madness Knockout Pool. This knockout pool runs during the NCAA March Madness tournament. Transitioning from a previous manual, Excel based platform this website will be quick, user friendly, and automatic. 

This Knockout pool works as follows:
1. Pay to play
2. Select 2 teams each of the first 4 days, 1 team for each day following
3. Once you have used a team, you cannot reuse that team
4. Last person standing wins

## Objectives
Allow users to sign into their own account in a secure fashion with 'forgot my password' capabilities.

Each user will have a profile displaying their information as well as a team selector interface. Users will be able to view all the games for that day, and be restricted to only picking teams they have not used yet.

Games for each day, as well as game results will be automated through an API to reduce manual enforcement of the website. A backup (feature flag) should be made readily available to revert to a non-API data transfer strategy. 

A page for every user to view all other users picks will be made available after tip-off each day.

## Project Management

- React.js | Frontend library
- Styled Components | Styling
- Node.js | Development environment
- SQL | Database
- GitGuardian | Secrets security

# Get Started

## Procedure to run this app locally
1. `Git` must be installed on your local machine
2. Run `git clone` to get a local copy of this repo
3. Run `npm ci` to download node modules

The client and server must be started in separate terminals.
4. Run `npm start` to start the application on localhost:3000
5. Open a different terminal and run `npm run server` to start the server on localhost:3001
6. Pat yourself on the back
