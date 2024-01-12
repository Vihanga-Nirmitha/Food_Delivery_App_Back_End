const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://vihanganirmitha200:Nirmithamongodb@cluster0.saaop4p.mongodb.net/?retryWrites=true&w=majority'
const connectionparams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose.connect(mongoURI,connectionparams)
.then(() =>{
    console.info("connected to DB")
}).catch((e) => {
    console.log("Error:",e)
});
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})