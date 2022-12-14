const axios = require('axios');
async function handleMovie(req, res){
    const searchQuery=req.query.searchQuery;
    if (movieCache[searchQuery]!==undefined) {
        res.send(200).send(movieCache[searchQuery]);

      } else {

    const movieArr = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`)

    try {
        const movieData = movieArr.data.results.map(item=>new Movie(item));
        res.status().send(movieData)
    } catch (error) {
        errorHandler(error,res)
        
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
}
module.exports={handleMovie};