// this create a web server and handle HTTP requests and responses
const express = require("express");
const bodyParser = require("body-parser");
// this allows the interaction with Mongo db
const { MongoClient } = require("mongodb");

//app will initialize express in and which port will start
const app = express();
const port = 3000;

// MongoDB connection URI
const uri =

//it will parse the income request body into json for all requests
app.use(bodyParser.json());

//use this when i install cors npm install cors --save
var cors = require("cors");
app.use(cors());

app.post("/", async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("mongodemo");
    const student = database.collection("services");

    const result = await student.insertOne(req.body);

    console.log(result);
    res.send("Data inserted successfully.");
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).json({ error: "An error occurred while inserting data." });
  } finally {
    await client.close();
  }
});

app.get("/teacherclasses/booked", async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("bookingApp");
    // const collection = database.collection("student");

    const collection = database.collection("teacher");
    const result = await collection.find({}).toArray();
    // const result = await collection.insertOne(req.params);

    console.log(result);
    res.json(result);
  } catch (err) {
    //The default error handler
    console.error("Error retrieving data:", err);

    res.status(500).json({ error: "An error occurred while retrieving data." });
  } finally {
    await client.close();
  }
});

app.post("/services/teacher", async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("bookingApp");
    // const collection = database.collection("student");

    const collection = database.collection("services");
    // const result = await collection.find({}).toArray();
    const result = await collection.insertOne(req.body);

    console.log(result);
    res.json(result);
    // res.write("Data inserted successfully.");
  } catch (err) {
    //The default error handler
    console.error("Error retrieving data:", err);

    res.status(500).json({ error: "An error occurred while retrieving data." });
  } finally {
    await client.close();
  }
});

//Read route-get request for the route
app.get("/classes", async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("bookingApp");
    // const collection = database.collection("student");
    const collection = database.collection("services");
    const result = await collection.find({}).toArray();
    // const result = await collection.deleteMany(req.params);

    console.log(result);
    res.json(result);
  } catch (err) {
    //The default error handler
    console.error("Error retrieving data:", err);

    res.status(500).json({ error: "An error occurred while retrieving data." });
  } finally {
    await client.close();
  }
});

app.post("/classes/booking", async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("bookingApp");
    // const collection = database.collection("student");

    const collection = database.collection("bookedClasses");
    // const result = await collection.find({}).toArray();
    const result = await collection.insertOne(req.body);

    console.log(result);
    res.json(result);
  } catch (err) {
    //The default error handler
    console.error("Error retrieving data:", err);

    res.status(500).json({ error: "An error occurred while retrieving data." });
  } finally {
    await client.close();
  }
});

app.get("/classes/booking/bookedclasses", async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("bookingApp");
    // const collection = database.collection("student");

    const collection = database.collection("bookedClasses");
    const result = await collection.find({}).toArray();
    // const result = await collection.insertOne(req.params);

    console.log(result);
    res.json(result);
  } catch (err) {
    //The default error handler
    console.error("Error retrieving data:", err);

    res.status(500).json({ error: "An error occurred while retrieving data." });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
