BEBEYOGINI - Express/MongoDB/React/Redux

## Table of Contents

* [Create your keys.js](#create-keys.js)
* [iniciate the project](#Initiate-the-project)
* [How it Work](#[How-it-Work)
* [Back End](#[Back-end)
* [Middleware](#[Middleware)
* [Front End](#[Front-end)

## Create your keys.js

* clone the repository
* you first need to create a file keys.js that you will put in the config folder
* cd config
* touch keys.js
* then add the folowing content

```

const keys = {
  user : '<user>',
  password : ''<password>',
  secret: ''<secret>',
  url : function() {
    return `mongodb://${this.user}:${this.password}@<yourmongodburl>`
  },
  options : {
    useNewUrlParser: true,
  },
}

exports.keys = keys

```
* You will have to ensure that you have a mongoDB mlab account. Then create there a db and define a user.
* Copy the url MongoDB URI and replace it on the previous code with the correct yourmongodburl field (just the end of it).
* do the same with the user and password field that you should get when creating a user for this database
* save the file

## Initiate the project

* npm install
* npm i --save concurrently
* cd client
* npm install
* Launch both servers with 'npm run dev' on repository root
* You are now running the application

## How it Work

* Coming soon

## Back End

* Coming soon

## Middleware

* Coming soon

## Front End

* Coming soon
