require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const PORT = process.env.PORT;
const DOMAINS = process.env.DOMAINS;

// Parse application/json
app.use(bodyParser.json());

app.use(cors({
  origin: DOMAINS,
}));

// Routes
app.use(routes);

// DB connection
mongoose.connect(process.env.URL_DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}, (err) => {
  if (err) throw err;
  console.log('Database online!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});