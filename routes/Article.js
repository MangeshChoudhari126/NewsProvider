const express = require('express')
const db = require('../db')
const router = express.Router()

// GET ALL ARTICLES             http://localhost:3000/api/admin/articles/all
router.get('/all', (request, response) => 
{
    const statement =  `select author_id,art_id,title,category,paragraph1, 
    ifnull(paragraph2,paragraph1)as paragraph2, ifnull(paragraph3,paragraph1) as paragraph3 
    from article`
    
    db.query(statement, (error,result) =>  
    {
      if(error)
      {
          response.status(404).send({status:'Error', error:`No articles Found`});
          console.log(error)
      }
      else 
      {   
          response.status(200).send({"Article":result})
      }
  
    });
  
});


// GET A SINGLE ARTICLE       http://localhost:3000/api/admin/articles/:id
router.get('/:id', (request, response) => 
{
    const {id}= request.params;
    const statement =  `select author_id,art_id,title,category,paragraph1, 
    ifnull(paragraph2,paragraph1)as paragraph2, ifnull(paragraph3,paragraph1) as paragraph3 
    from article where art_id = ${id}`
    
    db.query(statement, (error,result) =>
    {
      if(result.length == 0)
      {
          response.status(404).send({status:'Error', error:`Article with ID ${id} does not exists`});
      }
      else 
      {   
          response.status(200).send({"Article":result})
      }
  
    });
  
});



// DELETE AN article            http://localhost:3000/api/admin/articles/delete/:id
router.delete('/delete/:id', (request, response) => 
{
 
  const {id}= request.params;

    const statement =  `delete from article where art_id = ${id}`;
    db.query(statement, (error,result) =>
    {
      if(result.affectedRows==0)
      {
        response.status(404).send({status: 'Error', error: `No article Exists`})
      }
      else 
      {   
        response.status(200).send({status: 'Success', message: 'Article deleted successfully'})
      }
  
    });
  
});



// Update an existing article        http://localhost:3000/api/admin/articles/update/:id
router.patch('/update/:id', (request, response) => {
  const {id} = request.params;

  db.query('UPDATE article SET ? WHERE art_id = ?', [request.body, id], (error, result) => {
    if(result.affectedRows == 0)
    {
      response.status(404).send({status :'Error', error: `Article does not exists`});
    }
    else 
    { 
      response.status(200).send({status :'Success', message: `Author Updated Successfully` });
    }
  });
});


// Create a new article              http://localhost:3000/api/admin/article /add
router.post('/add', (request, response) => {

  const id = request.id
  console.log(id);
  const {title,category,paragraph1,paragraph2,paragraph3} = request.body;

  

  if (title == null ||  title.length == 0)
  {
      response.status(400).send({status: 'Error', error: 'Title is required'})
  }
  else if (category == null || category.length == 0)
  {
    response.status(400).send({status: 'Error', error: 'Category is required'})
  }
  else if (paragraph1 == null || paragraph1.length == 0)
  {
    response.status(400).send({status: 'Error', error: 'Atleast one paragraph(i.e. paragraph1,paragraph2,paragraph3) is required'})
  }
  
  else
  {
    
    const statement = `insert into article (title,category,paragraph1,paragraph2,paragraph3,author_id ) values(
      '${title}','${category}' , '${paragraph1}' , '${paragraph2}','${paragraph3}','${id}')`
     
     db.query(statement, (error,result) => 
     {
         if(error)
         {
             response.status(400).send({status: 'Error', error: 'Enter all required data'})  
         }
         else
         {
            response.status(201).send({status: 'Success', message: 'Article created successfully'})      
         }
  
      });
  
  }
  
});


















  












module.exports = router;