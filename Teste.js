let fs = require('fs');

// API endpoint to get list of songs
app.get('/songs', (req, res) => {
  fs.readdir('songs', (err, files) => {
    if (err) {
      res.status(500).send('Error reading song files');
    } else {
      res.json({ files });
    }
  });
});