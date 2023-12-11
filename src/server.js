const express = require('express');
const fs = require('fs');
const cors = require('cors');
const { JsxEmit } = require('typescript');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/saveTasks', (req, res) => {
  const tasks = req.body;
  console.log(tasks);
  fs.writeFile('tasks.json', JSON.stringify(tasks, null, 2), err => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving tasks');
    } else {
      res.status(200).send('Tasks saved');
    }
  });
});

app.get('/loadTasks', (req, res) => {
    fs.readFile('tasks.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Error reading tasks');
        } else {
            console.log('Read data:', data);
            try {
                const tasks = data ? JSON.parse(data) : [];
                res.send(tasks);
            } catch (parseError) {
                console.error('Error parsing data:', parseError);
                res.status(500).send('Error parsing tasks');
            }
        }
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});