// this create a web server and handle HTTP requests and responses
const express = require("express");
const bodyParser = require("body-parser");
// this allows the interaction with Mongo db
const { MongoClient, ObjectId } = require("mongodb");

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

// ---------------------------------------------------------------------------------------------
// app.delete("/services/booked/:id", async (req, res) => {
//   const client = new MongoClient(uri);

//   try {
//     await client.connect();
//     const database = client.db("mongodemo");
//     const collection = database.collection("services");
//     const result = await collection.deleteOne({ id: req.body.id });
//     res.send(result);
//   } catch (err) {
//     //The default error handler
//     console.error("Error retrieving data:", err);

//     res.status(500).json({ error: "An error occurred while retrieving data." });
//   } finally {
//     await client.close();
//   }
// });

// ---------------------------------------------------------------------------------------------
// app.get("/services/booked/", async (req, res) => {
//   const client = new MongoClient(uri);

//   try {
//     await client.connect();
//     const database = client.db("bookingApp");
//     // const collection = database.collection("student");

//     const collection = database.collection("services");

//     const result = await collection.find({}).toArray();
//     // const result = await collection.insertOne(req.params);

//     console.log(result);
//     res.json(result);
//   } catch (err) {
//     //The default error handler
//     console.error("Error retrieving data:", err);

//     res.status(500).json({ error: "An error occurred while retrieving data." });
//   } finally {
//     await client.close();
//   }
// });
// ---------------------------------------------------------------------------------------------
app.post("/instructor/booking", async (req, res) => {
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
// ---------------------------------------------------------------------------------------------
app.get("/instructor", async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("bookingApp");
    // const collection = database.collection("student");

    const collection = database.collection("services");

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

// ---------------------------------------------------------------------------------------------

app.put("/student/rescheduled/:id", async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("bookingApp");
    const collection = database.collection("bookedClasses");
    const { id } = req.params;
    const updatedStudentData = req.body;

    // Set isRescheduled to true
    updatedStudentData.isRescheduled = true;

    const updatedStudent = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updatedStudentData },
      { returnOriginal: false }
    );

    res.send(updatedStudent);
  } catch (err) {
    console.error("Error updating data:", err);
    res.status(500).json({ error: "An error occurred while updating data." });
  } finally {
    await client.close();
  }
});

// --------------------------------------------------------------------------------------
app.post("/student/booking", async (req, res) => {
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
// --------------------------------------------------------------------------------------

// /classes/booking/bookedclasses
app.get("/student/booking", async (req, res) => {
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

// --------------------------------------------------------------------------------------

//Read route-get request for the route
app.get("/", async (req, res) => {
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

// ---------------------------------------------------------------------------------------------

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// app.delete("/", (req, res) => {
//   console.log(req.body);
//   const client = new MongoClient(uri);
//   async function run() {
//     try {
//       const database = client.db("localparks");
//       const parks = database.collection("parks");
//       const result = await parks.deleteOne({ id: req.body.id });
//       res.send(result);
//     } finally {
//       await client.close();
//     }
//   }
//   run().catch(console.dir);
// });
