const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

router.get('/api/table-rows', (req, res) => {
  const totalRows = req.query.totalRows;
  const result = [];
  for (let i = 0; i < totalRows; i++) {
    const num = Math.floor((Math.random() * totalRows) + 1);
    result.push(num);
  }

  res.json(result);
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!');
});

app.use(router);
app.use(express.static('scripts'));
