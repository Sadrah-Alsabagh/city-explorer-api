const express = require('express');
require ('dotenv').config();
const cors = require('cors');

const app = express();
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
    
}
res.send({cityArr})
 //   console.log("Hello from API");
//res.send(searchQuery,lat,lon)
})

class ForeCast{
    constructor(day){
        this.date=day.valid_date;
        this.description=day.weather.description;
    }
}
app.listen(process.env.PORT, ()=>{
    console.log('Server is working');
})