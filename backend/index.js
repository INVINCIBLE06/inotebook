const connectToMongo = require('../backend/configs/db.config');
const express = require('express');
const app = express();

connectToMongo();

app.use(express.json())

app.use('/auth', require('../backend/routes/auth'))


app.get('/', (req, res) =>
{
  res.send('Hello World!')
});

app.listen(process.env.PORT, () => 
{
  console.log(`App listening on port : ${process.env.PORT}`)
})


/**
 * There is a term callled rainbow table. In which people store the most common password along
 * with there hashed value for years
 */