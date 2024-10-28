const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors());

const dbURI = 'mongodb+srv://user1:radhika@se.w6ti5.mongodb.net/?retryWrites=true&w=majority&appName=SE'
mongoose.connect(dbURI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

app.post('/login',(req,res)=>{
    const {email, password} = req.body;
    UserModel. findOne ({email: email})
    .then(user => {
        if(user) {
            if(user .password === password) {
                res.json("Success")
            } else
                res. json("the password is incorrect")
        } else {
            res. json ("No record existed")
        }
    })
})
// app.get('/', (req, res) => {
//     res.send('Welcome to the API!');
// });
app.post('/sign',(req,res)=>{
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.listen(3001, ()=>{
    console.log("Server is running")
})