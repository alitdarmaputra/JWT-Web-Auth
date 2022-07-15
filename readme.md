# Simple JWT Auth Web

MBKM selection task and learning JWT implementation.

## Description

A simple web with auth feature using JSON Web Token (JWT).

## Tech Stack

MongooDB, Express.js, Bootstrap, Node.js, 

## Design Patern

Model-View-Controller (MVC) design pattern. This pattern has clearly seperated application's concerns and provide convenience in debugging.

## Getting Started

### Dependencies

* Node.js
* MongooDB Server

### Installing

* Clone this repository
```
git clone https://github.com/alitdarmaputra/JWT-Web-Auth.git
```
* Install package with npm
```
npm install
```
* Change .env file value according to your own value. Variable description:

| Variable             | Description                          |
|----------------------|--------------------------------------|
| PORT                 | PORT where the app is listening      |
| DB_URI               | URI of your MongooDB database server |
| ACCESS_TOKEN_SECRET  | Private key of JWT access token      |
| REFRESH_TOKEN_SECRET | Private key of JWT refresh token     |

### Executing program

* Start the app
```
npm start
```
* Run dev mode
```
npm run dev
```
* Run test
```
npm run test
```
