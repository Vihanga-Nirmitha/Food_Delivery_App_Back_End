const express = require('express')
const app = express()
const hostname = '0.0.0.0';
const port = 5000

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000");
  res.header(
    'Access-Control-Allow-Headers',
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})
const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://vihanganirmitha200:Nirmithamongodb@cluster0.saaop4p.mongodb.net/gofood?retryWrites=true&w=majority'
const connectionparams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(mongoURI, connectionparams)
  .then(async () => {
    console.info("connected to DB")
    const foodItemsCollection = mongoose.connection.db.collection("food_items");
    const foodCategoryCollection = mongoose.connection.db.collection("foodCategory");
    try {
      const data = await foodItemsCollection.find({}).toArray();
      try {
        const catdata = await foodCategoryCollection.find({}).toArray();
        global.food_category = catdata;

      } catch (error) {
        console.error("Error:", error);
      }
      global.food_items = data;

    } catch (error) {
      console.error("Error:", error);
    }

  }).catch((e) => {
    console.log("Error:", e)
  });


app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json())
app.use("/api", require("./Routes/CreateUser"))
app.use("/api", require("./Routes/DisplayData"))
app.use("/api", require("./Routes/OrderData"))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})