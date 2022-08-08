const express = require('express');
require ('dotenv').config();
const cors = require('cors');

const app = express(); //create our app from express library, it invoke express and have it inside app.

app.use(cors());

const weatherData =require('./data/weather.json');

app.get('/weather', (req,res) =>{
const searchQuery=req.query.searchQuery;
const lat =req.query.lat;
const  lon =req.query.lon;

const cityArr = weatherData.find(item=>item.city_name.toLocaleLowerCase()===searchQuery.toLocaleLowerCase())
//console.log(cityArr);
try {
    const cityData = cityArr.data.map(item => new ForeCast(item.data));
    console.log(cityData);
    res.status(200).send(cityData)
    
} catch (error) {
    errorHandler(error, res);
}

res.send({cityArr})
//    console.log("Hello from API");
res.send(searchQuery,lat,lon)
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
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server is working ${port}`);
})