
# News provider

Here admin have all the permission to create,read,update,delete article's & authore's using a Bearer-Token. All API's tested using Postman.



## Installation

Install all required NPM(Node Package Manager)

// first init package.json 

npm init -y 

npm install express body-parser dotenv crypto-js express-validator jsonwebtoken mysql2 nodemon


## open mysql command-line

### create admin and article table

// admin table

create table admin ( 
id int auto_increment primary key,
firstname varchar(255) not null , 
lastname varchar(255) not null, 
email varchar(255) not null unique,
password varchar(255) not null, 
role varchar(255) default "Visitor", 
picture varchar(255) default "hhtps://img.jpg"
);


// article table

create table article(
author_id int, 
art_id int auto_increment primary key, 
title varchar(255) not null,
category varchar(255) not null, 
paragraph1 varchar(255) not null, 
paragraph2 varchar(255), 
paragraph3 varchar(255)
);

    
## Public API'S

 GET get articles for Anonymous users

#### http://localhost:3000/api/articles


POST  sign-up

#### http://localhost:3000/api/sign-up

Raw(json)

{   

    "firstname": "xyz",
    "lastname": "xyz",
    "email":"xyz@gmail.com",
    "password":"Xyz@123"
}


POST    Login

#### http://localhost:3000/api/login

###  Raw

{
  
    "email":"xyz@gmail.com",
    "password":"Xyz@123"
}

### Response =>

{

    "id": 11,
    "email-id": "XYZ@gmail.com",
    "password": "6243effb808af94184b444f71f944cea59c2ce240688a4f94192f08393e20c1e",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTY0MjU4NzcyNywiZXhwIjoxNjQyNTkxMzI3fQ.
    yEcsMAZaB5q2JkSWdc3X1KPZnCYRiRG-JsASMkqRAdE"
}

## Restricted API's / Protected API's

After logged  in it create accessToken as Bearer token to use protected APIs.

## Authorization 
APIs use authorization to ensure that client requests access data securely. This can involve authenticating the sender of a request and verifying that they have permission to access or manipulate the relevant data. If you're building an API, you can choose from a variety of auth models. If you're integrating a third-party API, the required authorization will be specified by the API provider.

### select type -  Bearer Token
and paste token in box.
#### The authorization header will be automatically generated when you send the request.

ex.  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJpZCI6MTEsImlhdCI6MTY0MjU4NzcyNywiZXhwIjoxNjQyNTkxMzI3fQ.
yEcsMAZaB5q2JkSWdc3X1KPZnCYRiRG-JsASMkqRAdE"

 ### a.	/api/admin/authors   

  Get a single author with author id


  #### http://localhost/3000/api/admin/authors/:id

  ### Response =>
{

    "author": 
    [
        {
            "id": 10,
            "firstname": "John",
            "lastname": "Carter",
            "email": "john@gmail.com",
            "password": "d8be212f063a2edfffaa1309d9c5489950a96bd19d46c60667ea9ea6c2e6c19a",
            "role": "Visitor",
            "picture": "http://picture4.jpg"
        }
    ]
}


  Get all authors

  #### http://localhost/3000/api/admin/authors

  ### Response =>
{

    "author":
     [
        {
            "id": 10,
            "firstname": "John",
            "lastname": "Carter",
            "email": "john@gmail.com",
            "password": "d8be212f063a2edfffaa1309d9c5489950a96bd19d46c60667ea9ea6c2e6c19a",
            "role": "Visitor",
            "picture": "http://picture4.jpg"
        },

        {

        },
        .....
    ]
}


   Delete a author

  #### http://localhost/3000/api/admin/authors/delete/:id

  ### Response =>

  {

    "status": "Success",
    "error": "Author deleted successfully"
  }


  

   Update a author

  #### http://localhost/3000/api/admin/authors/update/:id

  ### Response =>

  {

    "status": "Success",
    "error": "Author Updated successfully"
  }



  ###  b.  	/api/admin/articles	     

  Get single article with article id

 #### http://localhost/3000/api/admin/articles/:id

### Response =>

{

    "Article": 
    [
        {
            "author_id": 11,
            "art_id": 1,
            "title": "Cricket News",
            "category": "cricket",
            "paragraph1": "A DRS-assisted reprieve to the South African captain cost India their composure at a crucial juncture, and hence the match and a shot at a historic series win",
            "paragraph2": "A DRS-assisted reprieve to the South African captain cost India their composure at a crucial juncture, and hence the match and a shot at a historic series win",
            "paragraph3": "A DRS-assisted reprieve to the South African captain cost India their composure at a crucial juncture, and hence the match and a shot at a historic series win"
        }
    ]
}

  Get all articles

  #### http://localhost/3000/api/admin/articles/all


{

    "Article": 
    [
        {
            "author_id": 11,
            "art_id": 1,
            "title": "Cricket News",
            "category": "cricket",
            "paragraph1": "A DRS-assisted reprieve to the South African captain cost India their composure at a crucial juncture, and hence the match and a shot at a historic series win",
            "paragraph2": "A DRS-assisted reprieve to the South African captain cost India their composure at a crucial juncture, and hence the match and a shot at a historic series win",
            "paragraph3": "A DRS-assisted reprieve to the South African captain cost India their composure at a crucial juncture, and hence the match and a shot at a historic series win"
        },
        {

        },
        ....
    ]
}
  ### Response =>

  Create article 

 #### http://localhost/3000/api/admin/articles/add  

 Raw(json) =>
  
  {
  
    "title":"India vs Shri-Lanka",
    "category":"Football",
    "paragraph1":"India won",
    "paragraph2":"India made a great history against shri-lanka",
    "paragraph3":""
  }

 ### Response =>

  {

    "status": "Success",
    "error": "New article added successfully"
  }

  Delete article

 #### http://localhost/3000/api/admin/articles/delete/:id

 ### Response =>

  {
    "status": "Error",
    "error": "Article deleted successfully"
  }

  Update article

 #### http://localhost/3000/api/admin/articles/update/:id	

### Response =>

  {

    "status": "Success",
    "error": "Article Updated successfully"
  }


