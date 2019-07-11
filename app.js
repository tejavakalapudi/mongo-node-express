const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(bodyParser());

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });

const PersonModel = mongoose.model('person', {
  firstname: String,
  lastname: String
});

app.get('/people', async (request, response) => {
  try {
    var result = await PersonModel.find().exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get('/person/:id', async (request, response) => {
  try {
    var person = await PersonModel.findById(request.params.id).exec();
    response.send(person);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post('/person', async (request, response) => {
  try {
    var person = new PersonModel(request.body);
    var result = await person.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
