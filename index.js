const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const urlRoutes = require('./routes/urlRoutes');

app.use(express.json());
app.use(cors({ origin: 'https://url-shortener-three-sigma.vercel.app' }));

app.get('/', (req, res) => {
  res.send('');
});

app.use('/', urlRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
