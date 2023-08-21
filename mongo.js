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
  "mongodb+srv://francis-sant:YDBfL4OvlJagtV670000@cluster0.tzdfzyh.mongodb.net/?retryWrites=true&w=majority";

//it will parse the income request body into json for all requests
app.use(bodyParser.json());

//CORS, or Cross Origin Resource Sharing, is a mechanism for browsers to let a site running at origin A to request resources from origin B.
// preciso definir o dominio para permitir meu app vue aqui, por exemplo, tenho o mongodb rodando na porta 3000 e o vue na 8080, preciso definir o dominio para permitir o acesso
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//Read route-get request for the route
app.get("/items", async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("mongodemo");
    // const collection = database.collection("student");
    const collection = database.collection("items");
    const result = await collection.find({}).toArray();
    // const result = await collection.findOne(req.params);

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

app.post("/", async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("mongodemo");
    const student = database.collection("student");

    const result = await student.insertOne(req.body); // Use req.body instead of req.params

    console.log(result);
    res.send("Data inserted successfully.");
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).json({ error: "An error occurred while inserting data." });
  } finally {
    await client.close();
  }
});

// // Definir rotdas CRUD aqui
// app.get("/items/:name", async (req, res) => {
//   const client = new MongoClient(uri);
//   const database = client.db("mongodemo");
//   const collection = database.collection("items");

//   const items = await collection.find().toArray();
//   res.json(items);
// });

// app.post("/items", async (req, res) => {
//   const client = new MongoClient(uri);
//   const database = client.db("mongodemo");
//   const collection = database.collection("items");

//   const newItem = req.body;
//   await collection.insertOne(newItem);
//   res.status(201).json(newItem);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
