const express = require('express')
const db = require('../db')
const router = express.Router()
const crypto = require("crypto-js")
const jwt=require('jsonwebtoken');
const dotenv = require('dotenv').config()

// GET ALL ARTICLES(Anonymous)    http://localhost:3000/api/articles
router.get('/articles', (request, response) => 
{
 
    const statement = `select admin.firstname,admin.lastname,
    article.category,article.title,article.paragraph1 as summary
     from admin inner join article on admin.id = article.author_id;`
    db.query(statement, (error,result) =>
    {
      if(error)
      {
        response.status(404).send({status:'Error', error:'No records found'}) 
        console.log(error)  
      }
      else 
      {   
          response.status(200).send({Author:result});
      }
  
    });
  
});



// SIGN-UP              http://localhost:3000/api/sign-up
router.post('/sign-up', (request, response) => {
  
  const {firstname,lastname,email,password} = request.body;

  const emailToValidate = email;
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const E_validate=emailRegexp.test(emailToValidate);

  const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
  const pp = reg.test(password);
  const encryptedpassword = crypto.SHA256(password); 

  if (firstname == null ||  firstname.length == 0 || lastname == null || lastname.length == 0 )
  {
      response.status(400).send({status: 'Error', error: 'firstname & lastname is required'})
  }
  else if (email == null || email.length == 0 || E_validate == false)
  {
    response.status(400).send({status: 'Error', error: 'Please Enter Valid E-mail'})
  }
  else if (password == null || pp == false)
  {
    response.status(400).send({status: 'Error', error: 'Password must contain Minimum 8 and maximum 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character'})
  }
  
  else
  {
    
    const statement = `insert into admin (firstname,lastname,email,password) values(
      '${firstname}','${lastname}' , '${email}' , '${encryptedpassword}')`
     
     db.query(statement, (error,result) => 
     {
         if(error)
         {
             response.status(400).send({status: 'Error', error: 'User is already exist, Please try with different email'})  
         }
         else
         {
            response.status(201).send({status: 'Success', message: 'User Registered Successfully'})      
         }
  
      });
  
  }
  
});





// Login            http://localhost:3000/api/login
router.post('/login', (request, response) => {
  const {email,password} = request.body;
  const encryptedpassword = crypto.SHA256(password);
 
   if (email == null && password == null)
  {
    response.status(400).send({status: 'Error', error: 'Please Enter Email And Password'})
  }
  else if (email == null || email.length == 0)
  {
    response.status(400).send({status: 'Error', error: 'Please Enter email'})
  }
  else if (password == null || password.length == 0)
  {
    response.status(400).send({status: 'Error', error: 'Please Enter password'})
  }
  else
  {
    const statement = `select * from admin where email = '${email}' and password = '${encryptedpassword}';`
    db.query(statement, (error, result) =>
    {
      if(result == 0)
      {
        response.status(401).send({status: 'Error', error: 'Invalid Credentials'})
      }
      else  
      {  
          response.status(200).send(
          {
            "id":result[0].id,
            "email-id":result[0].email,
            "password" : result[0].password,
            "accessToken":jwt.sign({id:result[0]['id']},process.env.secret_key,{expiresIn :'1h'})
          }); 
      }
  
    });
  }
})


// GET ALL AUTHORS           http://localhost:3000/api/admin/authors/all
router.get('/all', (request, response) => 
{
  const statement =  `select * from admin`
  
  db.query(statement, (error,result) =>
  {
    if(error)
    {
        response.status(404).send({status:'Error', error:`No Author exists`});
    }
    else 
    {   
        response.status(200).send({Authors:result});
    }
    
  });

});



// GET A SINGLE AUTHOR           http://localhost:3000/api/admin/authors/:id
router.get('/:id', (request, response) => 
{
 
  const {id} = request.params;
    const statement =  `select * from admin where id = ${id}`
    
    db.query(statement, (error,result) =>
    {
      if(result.length===0)
      {
          response.status(404).send({status:'Error', error:`Author does not exists`});
      }
      else 
      {   
          response.status(200).send({ author:result})
      }
      
    });
  
});





// Create a new author              http://localhost:3000/api/admin/authors/add
router.post('/add', (request, response) => {
  
  const {firstname,lastname,email,password,role} = request.body;

  const emailToValidate = email;
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const E_validate=emailRegexp.test(emailToValidate);

  const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
  const pp = reg.test(password);
  const encryptedpassword = crypto.SHA256(password); 

  if (firstname == null ||  firstname.length == 0 || lastname == null || lastname.length == 0 )
  {
      response.status(400).send({status: 'Error', error: 'Name is required'})
  }
  else if (email == null || email.length == 0 || E_validate == false)
  {
    response.status(400).send({status: 'Error', error: 'Please Enter Valid E-mail'})
  }
  else if (password == null || pp == false)
  {
    response.status(400).send({status: 'Error', error: 'Password must contain Minimum 8 and maximum 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character'})
  }
  else if (role == null || role.length == 0)
  {
    response.status(400).send({status: 'Error', error: 'Role is required'})
  }
  
  else
  {
    
    const statement = `insert into admin (firstname,lastname,email,password,role) values(
      '${firstname}','${lastname}' , '${email}' , '${encryptedpassword}','${role}')`
     
     db.query(statement, (error,result) => 
     {
         if(error)
         {
             response.status(400).send({status: 'Error', error: 'Author is already exist, Please try with different email'})  
         }
         else
         {
            response.status(201).send({status: 'Success', message: 'Author created successfully'})      
         }
  
      });
  
  }
  
});


// DELETE EXISTING AUTHOR       http://localhost:3000/api/admin/authors/delete/:id
router.delete('/delete/:id', (request, response) => 
{
 
  const {id}= request.params;

    const statement =  `delete from admin where id = ${id}`;
    db.query(statement, (error,result) =>
    {
      if(result.affectedRows===0)
      {
        response.status(404).send({status: 'Error', error: `Author does not exists`})
      }
      else 
      {   
        response.status(200).send({status: 'Success', message: 'Author deleted Successfully'})
      }
  
    });
  
});



// Update an existing author        http://localhost:3000/api/admin/authors/update/:id
router.patch('/update/:id', (request, response) => {
  const {id} = request.params;

  db.query('UPDATE admin SET ? WHERE id = ?', [request.body, id], (error, result) => {
    if(result.affectedRows==0)
    {
      response.status(404).send({status :'Error', error: `Author does not exists `});
    }
    else 
    { 
      response.status(200).send({status :'Success', message: `Author Updated Successfully` });
    }
  });
});


module.exports = router;