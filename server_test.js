// perform imports
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

//code for local
//const url = 'mongodb://localhost/Team15'

// initiate app
const app = express()
mongoose
  .connect(
    "mongodb+srv://team15cluster.6pb9r.mongodb.net/?retryWrites=true&w=majority",
    {
      dbname: "team15+",
      user: "dbUser",
      pass: "$Q8!wfZ8G_.wKMk",

      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Mongodb connected....");
  });

// app use
app.use(express.json())
app.use(bodyParser.json())
app.use('/user', require('./routes/users'))
app.use('/account', require('./routes/account'))
app.use('/homepage', require('./routes/homepage'))




app.post('/user', async(req, res) =>{
    console.log(req.body)
})



// make sure we are connected 
app.listen(9000, () =>{
    console.log('server started')
})