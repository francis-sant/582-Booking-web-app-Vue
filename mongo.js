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
  "mongodb+srv://francis-sant:JyDv3bbTdR0a2ijx@cluster0.tzdfzyh.mongodb.net/?retryWrites=true&w=majority";

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

app.get("/services/booked", async (req, res) => {
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

app.post("/services", async (req, res) => {
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

// app.put("/classes/booking", async (req, res) => {
//   const client = new MongoClient(uri);

//   try {
//     await client.connect();
//     const database = client.db("bookingApp");
//     // const collection = database.collection("student");

//     const collection = database.collection("bookedClasses");

//     const updatedData = {
//       // Keep the same information from the request body
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       phone: req.body.phone,
//       email: req.body.email,
//       className: req.body.className,
//       classType: req.body.classType,
//       duration: req.body.duration,
//       selectedDate: req.body.selectedDate,
//       selectedTime: req.body.selectedTime,
//       instructor: req.body.instructor,
//       // Add other fields as needed
//     };

//     const result = await collection.updateOne(
//       { _id: ObjectId(req.params.id) }, // Assuming you're using ObjectId for the _id field
//       { $set: updatedData }
//     );
//     res.send(result);
//   } catch (err) {
//     //The default error handler
//     console.error("Error retrieving data:", err);

//     res.status(500).json({ error: "An error occurred while retrieving data." });
//   } finally {
//     await client.close();
//   }
// });
// ... rest of your code ...

app.put("/classes/booking", async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("bookingApp");
    const collection = database.collection("bookedClasses");

    const result = await collection.updateOne(
      { id: req.body._id },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phone: req.body.phone,
          email: req.body.email,
          className: req.body.className,
          classType: req.body.classType,
          duration: req.body.duration,
          selectedDate: req.body.selectedDate,
          selectedTime: req.body.selectedTime,
          instructor: req.body.instructor,
        },
      }
    );
    res.send(result);
  } catch (err) {
    console.error("Error updating data:", err);
    res.status(500).json({ error: "An error occurred while updating data." });
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
