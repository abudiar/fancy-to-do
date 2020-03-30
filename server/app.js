const express = require('express');
const router = require('./routes/router');

const app = express();
const port = 3000;

// Pass by JSON on POST
app.use(express.urlencoded({ extended: true }));

// Router
app.use(router);

app.listen(port, () => console.log(`Listening on port ${port}`));