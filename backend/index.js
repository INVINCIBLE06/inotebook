const connectToMongo = require('../backend/configs/db.config');
const express = require('express')
const app = express();

connectToMongo();


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
  console.log(`App listening on port : ${process.env.PORT}`)
})