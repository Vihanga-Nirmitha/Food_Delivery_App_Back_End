const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://vihanganirmitha200:Nirmithamongodb@cluster0.saaop4p.mongodb.net/gofood?retryWrites=true&w=majority'
const connectionparams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose.connect(mongoURI,connectionparams)
.then(async () =>{
    console.info("connected to DB")
    const foodItemsCollection = mongoose.connection.db.collection("food_items");
    try {
      const data = await foodItemsCollection.find({}).toArray();
      console.log();
    } catch (error) {
      console.error("Error:", error);
    }
    
}).catch((e) => {
    console.log("Error:",e)
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json())
app.use("/api", require("./Routes/CreateUser"))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})