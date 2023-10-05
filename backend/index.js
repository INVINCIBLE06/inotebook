const connectToMongo = require('../backend/configs/db.config');
const express = require('express');
const app = express();
connectToMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Use router.use() instead of express.use()

app.use('/auth', require('./routes/auth.route'));
app.use('/notes', require('./routes/notes.route'));



app.get('/', (req, res) =>
{
  res.send('Hello World!')
});

app.listen(process.env.PORT, () => 
{
  console.log(`App listening on port : ${process.env.PORT}`)
})


/**
 * There is a term called rainbow table. In which people store the most common password along
 * with there hashed value for years
 */