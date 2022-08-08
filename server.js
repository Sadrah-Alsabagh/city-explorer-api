const express = require('express');
require ('dotenv').config();
const cors = require('cors');
const axios = require('axios');

const app = express(); //create our app from express library, it invoke express and have it inside app.

app.use(cors());

const weatherData =require('./data/weather.json');

app.get('/weather', async (req,res) =>{
const searchQuery=req.query.searchQuery;
const lat =req.query.lat;
const  lon =req.query.lon;

// const cityArr = weatherData.find(item=>item.city_name.toLocaleLowerCase()===searchQuery.toLocaleLowerCase())   
//console.log(cityArr);

const cityArr = await axios.get(`
https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}
`)
try {
    const cityData = cityArr.data.map(item => new ForeCast(item));
    console.log(cityData);
    res.status(200).send(cityData)
    
} catch (error) {
    errorHandler(error, res);
}

//res.send({cityArr})
//    console.log("Hello from API");
//res.send(searchQuery,lat,lon)
});

app.get('/movies',async (req, res)=>{
    const searchQuery=req.query.searchQuery;
    const movieArr = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`)

    try {
        const movieData = movieArr.data.results.map(item=>new Movie(item));
        res.status().send(movieData)
    } catch (error) {
        errorHandler(error,res)
        
    }
})

app.get('*', (req,res)=>{res.status(404).send('Page not found')})

function errorHandler(error,res){
res.status(500).send({error: 'Something went wrong'})
}

class ForeCast{
    constructor(day){
        this.date=day.valid_date;
        this.description=day.weather.description;
    }
}

class Movie{
    constructor(movie){
        this.title =movie.title,
        this.overview =movie.overview,
        this.average_votes= movie.vote_average,
        this.total_votes =movie.vote_count,
        this.image_url =movie.poster_path,
        this.popularity =movie.popularity,
        this.released_on=movie.released_on
      
    }
}
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server is working ${port}`);
})