const axios = require('axios');   
const weatherCach={};

async function handleWeather (req,res) {
    const searchQuery=req.query.searchQuery;
    const lat =req.query.lat;
    const  lon =req.query.lon;
    
    // const cityArr = weatherData.find(item=>item.city_name.toLocaleLowerCase()===searchQuery.toLocaleLowerCase())   
    //console.log(cityArr);
    if (weatherCach[searchQuery]!==undefined){
        res.status(200).send(weatherCach[searchQuery]);
      } else{
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
    };
}
    class ForeCast{
        constructor(day){
            this.date=day.valid_date;
            this.description=day.weather.description;
        }
    }
    module.exports={handleWeather}