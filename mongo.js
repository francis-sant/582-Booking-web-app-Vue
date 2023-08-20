// this create a web server and handle HTTP requests and responses
const express = require('express');
const bodyParser = require('body-parser');
// this allows the interaction with Mongo db 
const { MongoClient } = require('mongodb');


//app will initialize express in and which port will start
const app = express();
const port = 3000;

// MongoDB connection URI
const uri = "mongodb+srv://francis-sant:password@cluster0.tzdfzyh.mongodb.net/?retryWrites=true&w=majority";

//it will parse the income request body into json for all requests
app.use(bodyParser.json());

//Read route-get request for the route 
app.get('/name/:name/age/:age', async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('mongodemo');
    const collection = database.collection('student');
  
    // const result = await collection.find({}).toArray();
    const result = await collection.findOne(req.params);

    console.log(result);
    res.json(result);

  } catch (err) {
    //The default error handler
    console.error('Error retrieving data:', err);

    res.status(500).json({ error: 'An error occurred while retrieving data.' });

  } finally {
    await client.close();
  }
});

app.post('/', async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('mongodemo');
    const student = database.collection('student');
    
    const result = await student.insertOne(req.body); // Use req.body instead of req.params
    
    console.log(result);
    res.send('Data inserted successfully.');
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).json({ error: 'An error occurred while inserting data.' });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
