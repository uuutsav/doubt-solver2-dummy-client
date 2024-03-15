const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

var cors = require('cors')
app.use(cors()) // Use this after the variable declaration
app.use(bodyParser.json());

// Secret key for JWT signing
const secretKey = 'your_secret_key';

// Dummy user data (replace this with your actual user authentication logic)
const users = [
  { id: 1, username: 'user1@gmail.com', password: 'password1' },
  { id: 2, username: 'user2@gmail.com', password: 'password2' }
];

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  // console.log("got it")
  console.log("Username: " + email + "\nPassword: " + password);
  console.log(req.body)

  // Dummy authentication logic (replace this with your actual authentication logic)
  const user = users.find(u => u.username === email && u.password === password);

  if (!user) {
    console.log("Invalid")
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

  // Send the token as a response
  res.json({ token });
  console.log("Logged in")
});


// Signup endpoint
app.post('/api/auth/signup', (req, res) => {
  // const { name, password } = req.body;
  console.log(req.body)
  // // console.log("got it")
  // // console.log("Username: " + username + "\nPassword: " +password);
  // console.log("Name: ", name)

  // // Dummy authentication logic (replace this with your actual authentication logic)
  // const user = users.find(u => u.username === username && u.password === password);

  // // if (!user) {
  // //   return res.status(401).json({ message: 'Invalid username or password' });
  // // }

  // Generate JWT token
  // const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

  // Send the token as a response
  res.json({ token: "hehe" });
  console.log("Logged in")
});

// Protected route example
app.get('/protected', verifyToken, (req, res) => {
  // If the token is verified, return some protected data
  res.json({ message: 'This is protected data!' });
});


app.post('/api/ask', (req, resp) => {
  // Send array of users (that match the subject expertise). Users will have name, rating and cgpa 

  //1. receive question
  //2. assign a qusestion id to it 
  //3. and send status(true if saved to database/f if failed to save to database) and qid to client 

  //1 
  const question = req.body;
  console.log(question)
  //2. assign a qusestion id to it and send status and qid to client 

  const temp = 1;

  //3.
  const response = {
    status: true,
    questionID: temp
  }
  resp.json(response)
})


app.post('/api/ask/solverslist', (req, resp) => {
  const tempArr = [{
    dp: '/images/dp.jpeg',
    name: 'Hehe',
    description: "This guy just HEHEd the whole code as if it's a monosyllable."
  },
  {
    dp: 'https://i.pinimg.com/736x/eb/ee/03/ebee037eba08e25d5920ee10d4c2d76d.jpg',
    name: 'Not Hehe',
    description: "This guy cannot HEHE the whole code as if it's a monosyllable."
  },]

  const data = {
    status: true,
    users: tempArr
  }

  resp.json(data)
});

app.post('/api/handleDoubtRequest', (req, resp) => {
  
  const data = {
    status: true
  }

  resp.json(data)
})

app.get('/api/getRequests', (res, resp) => {
  const tempArr = [{
    id: 1,
    image: '/images/dp.jpeg',
    username: 'ehe',
    name: 'hehe',
    title: 'Hehe ?',
    description: 'some hehe description here'
  },
  {
    id: 2,
    image: '/images/dp.jpeg',
    username: 'ehe',
    name: 'hehe',
    title: 'Hehe ?',
    description: 'some hehe description here'
  },
  {
    id: 3,
    image: '/images/dp.jpeg',
    username: 'ehe',
    name: 'hehe',
    title: 'Hehe ?',
    description: 'some hehe description here'
  },
  {
    id: 4,
    image: '/images/dp.jpeg',
    username: 'ehe',
    name: 'hehe',
    title: 'Hehe ?',
    description: 'some hehe description here'
  }]

  const data = {
    size: tempArr.length,
    requests: tempArr
  }

  resp.json(data)
})


// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = decoded;
    next();
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
