const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const jwt=require('jsonwebtoken')
const dotenv = require('dotenv').config()
const port = process.env.PORT;


// routes
const author = require('./routes/Author');
const article = require('./routes/Article');

const { request, response } = require('express');

// get input from user using request.body
app.use(bodyParser.json());

//Middleware Code 
function getUserId(request, response, next) {

   // do not check for token 
  if (  
         request.url == '/api/sign-up' 
      || request.url == '/api/login'
      || request.url == '/api/articles'
 
      )
       {
        next()
       } 
  else {

    try {
      let token = request.headers.authorization;
      let token1 = token.split(" ")
      let token2 = token1[1]

      const data = jwt.verify(token2, process.env.secret_key)

      // UserId with logged in user's id
     request.id=data.id;

      // go to the actual route
      next();
      
    } catch (ex) {
      response.status(401).send({status: 'Error', error: 'Protected API'})
    }
  }
}
app.use(getUserId)

// add routes to the application
app.use('/api',author);
app.use('/api/admin/authors',author);
app.use('/api/admin/articles',article);

app.listen(port, 'localhost', () => {
  console.log(`server started on port ` + port)
})