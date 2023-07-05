const connectToMongo = require('../backend/configs/db.config');
const express = require('express');
const app = express();

connectToMongo();


// require('../backend/routes/auth')(app);

app.use('/', require('../backend/routes/auth'))







app.get('/', (req, res) =>
{
  res.send('Hello World!')
});

app.listen(process.env.PORT, () => 
{
  console.log(`App listening on port : ${process.env.PORT}`)
})