const express = require('express');
const cors = require('cors');
const ClientRoute = require('./routes/client.route');
const ErrorHandler = require('./utils/errorHandler');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use(ClientRoute);

app.use(ErrorHandler.handle);

app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`)
);
