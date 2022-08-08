const express = require('express');
require ('dotenv').config();
const cors = require('cors');
const axios = require('axios');   
const {handleWeather} = require('./module/weather');
const {handleMovie}= require('./module/movie')

const app = express(); //create our app from express library, it invoke express and have it inside app.

app.use(cors());
app.get('/weather',handleWeather);
app.get('/movies',handleMovie)

// const weatherData =require('./data/weather.json');



app.get('*', (req,res)=>{res.status(404).send('Page not found')})

function errorHandler(error,res){
res.status(500).send({error: 'Something went wrong'})
}



const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server is working ${port}`);
})