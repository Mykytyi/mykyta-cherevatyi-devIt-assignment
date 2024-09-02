const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Home Route');
});
app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`)
);
