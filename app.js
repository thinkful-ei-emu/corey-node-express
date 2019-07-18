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


//DRILL 1//
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


//DRILL 2//
app.get('/cipher', (req, res) => {
  const { text, shift } = req.query;

  // validation: both values are required, shift must be a number
  if(!text) {
    return res
      .status(400)
      .send('text is required');
  }

  if(!shift) {
    return res
      .status(400)
      .send('shift is required');
  }

  const numShift = parseFloat(shift);

  if(Number.isNaN(numShift)) {
    return res
      .status(400)
      .send('shift must be a number');
  }

  // all valid, perform the task
  // Make the text uppercase for convenience
  // the question did not say what to do with punctuation marks
  // and numbers so we will ignore them and only convert letters.
  // Also just the 26 letters of the alphabet in typical use in the US
  // and UK today. To support an international audience we will have to
  // do more
  // Create a loop over the characters, for each letter, covert
  // using the shift

  const base = 'A'.charCodeAt(0);  // get char code 

  //alphabet 26 chars
  //take in query text
  //iterate over query string
  //shift: change each letter to the next letter in the alphabet
  //res.send(encrpyted string)

  const cipher = text

    .toUpperCase()
    .split('') // create an array of characters
    .map(char => { // map each original char to a converted char
      const code = char.charCodeAt(0); //get the char code

      // if it is not one of the 26 letters ignore it
      if(code < base || code > (base + 26)) {
        return char;
      }
    
      // otherwise convert it
      // get the distance from A
      let diff = code - base;
      diff = diff + numShift; 
    
      // in case shift takes the value past Z, cycle back to the beginning
      diff = diff % 26;

      // convert back to a character
      const shiftedChar = String.fromCharCode(base + diff);
      return shiftedChar;
    })
    .join(''); // construct a String from the array

  // Return the response
  res
    .status(200)
    .send(cipher);
});


//DRILL 3//
app.get('/lotto', (req, res) => {
  const { numbers } = req.query; 

  // validation: 
  // 1. the numbers array must exist
  if(!numbers) {
    return res
      .status(200)
      .send('numbers is required');
  }
  // 2. must be an array
  if(!Array.isArray(numbers)) {
    return res
      .status(200)
      .send('numbers must be an array');
  }

  const guesses = numbers
    .map(n => parseInt(n))
    .filter(n => !Number.isNaN(n) && (n >= 1 && n <= 20));
  
  // 3. must be 6 numbers
  // 4. numbers must be between 1 and 20
  if(guesses.length !== 6) {
    return res
      .status(400)
      .send('numbers must contain 6 integers between 1 and 20');
  }

  // fully validated numbers

  // here are the 20 numbers to choose from
  const stockNumbers = Array(20).fill(1).map((_, i) => i + 1);

  //randomly choose 6
  const winningNumbers = [];
  for(let i = 0; i < 6; i++) {
    const ran = Math.floor(Math.random() * stockNumbers.length);
    winningNumbers.push(stockNumbers[ran]);
    stockNumbers.splice(ran, 1);
  }

  //compare the guesses to the winning number
  let diff = winningNumbers.filter(n => !guesses.includes(n));

  // construct a response
  let responseText;

  switch(diff.length){
  case 0: 
    responseText = 'Wow! Unbelievable! You could have won the mega millions!';
    break;
  case 1:   
    responseText = 'Congratulations! You win $100!';
    break;
  case 2:
    responseText = 'Congratulations, you win a free ticket!';
    break;
  default:
    responseText = 'Sorry, you lose';  
  }


  // uncomment below to see how the results ran

  // res.json({
  //   guesses,
  //   winningNumbers,
  //   diff,
  //   responseText
  // });

  res.send(responseText);
});


app.listen(8000, () => {
  console.log('Express server is listening on port 8000... still');
});