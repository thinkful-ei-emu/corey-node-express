/* eslint-disable no-console */

const express = require('express');
const morgan = require('morgan');

const app = express();

//this is middleware
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello Express Homies!, This renders to the browser!');
});

app.get('/burgers', (req, res) => {
  res.send('We have juicy cheese burgers!');
});

app.get('/pizza/pineapple', (req, res) => {
  res.send('We always serve pineapple on pizza! No haters.');
});

app.get('/queryViewer', (req, res) => {
  console.log(req.query);
  res.end();
});

app.get('/echo', (req, res) => {
  const responseText = `Here are some details of your request:
    Base URL: ${req.baseUrl}
    Host: ${req.hostname}
    Path: ${req.path}
    IP: ${req.ip}
    Method: ${req.method}
    Stale: ${req.stale}
    Xhr: ${req.xhr}
  `;
  res.send(responseText);
});

app.get('/greetings', (req, res) => {
  //1 get values from request
  const name = req.query.name;
  const race = req.query.race;

  //2 validate the values
  if(!name) {
    //3 name was not provided
    return res.status(400).send('Please provide a name');
  }

  if(!race) {
    //3 race was not provided
    return res.status(400).send('Please provide a race');
  }
  //4 and 5 both name and race are valid so add to inputs
  const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;
  //6 send the response
  res.send(greeting);
});

app.get('/sum', (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  let sum = a + b;
      
  res.send(`The sum of ${a} and ${b} is ${sum}`);
});

app.get('/madLibs', (req, res) => {
  const verb = req.query.verb;
  const adj = req.query.adj;
  const noun = req.query.noun;
    
  res.send(`Today a ${noun} walked past ${adj} while ${verb} its umbrella around`);
});

app.get('/cipher', (req, res) => {
  const text = req.query.text;
  const shift = req.query.shift;
  //alpha 26
  //take in query text
  //iterate over query string
  //shift: change each letter to the next letter in the alphabet
  //res.send(encrpyted string)

});



app.listen(8000, () => {
  console.log('Express server is listening on port 8000... still');
});