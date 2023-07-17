const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.use(require('./routes'));

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server for ${activity} running on port ${PORT}!`);
    });
  });




app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));