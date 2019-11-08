require('dotenv/config');
const express = require('express');
const routes = require('./src/routes');

require('./src/database');

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
