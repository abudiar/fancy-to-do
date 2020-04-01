const express = require('express');
const router = require('./routes');
const cors = require('cors');
const { WebError } = require('./middleware');

const app = express();
const port = 3000;

// Pass by JSON on POST
app.use(express.urlencoded({ extended: true }));

// Cross-origin
app.use(cors());

// Router
app.use(router);

// Error handler
app.use(WebError.errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));