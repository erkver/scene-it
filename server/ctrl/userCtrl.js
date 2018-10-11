const axios = require('axios');
const { API_KEY } = process.env;

module.exports = {
  getScreenings: (req, res) => {
    axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US`).then(response => {
      // console.log(response.data);
      return res.status(200).json(response.data);
    }).catch(err => {
      res.status(500).send({errorMessage: "Something went wrong"});
      console.log(err);
    });
  },
  addFavorite: (req, res) => {
    const db = req.app.get('db');
    const { movieId, 
      fav_title, 
      fav_img_url, 
      fav_release_date, 
      fav_synopsis, 
      fav_isScreening, 
      fav_screening_date, 
      fav_theatre_name, 
      fav_theatre_location, 
      fav_studio, 
      fav_genre,
      fav_mov_url, 
      fav_runtime, 
      userId } = req.body;
    db.favorites.add_favorite([
      movieId, 
      fav_title, 
      fav_img_url, 
      fav_release_date, 
      fav_synopsis, 
      fav_isScreening, 
      fav_screening_date, 
      fav_theatre_name, 
      fav_theatre_location, 
      fav_studio, 
      fav_genre,
      fav_mov_url, 
      fav_runtime,
      userId]).then(response => {
      return res.status(200).json(response);
    }).catch(err => {
      res.status(500).send({ errorMessage: "Something went wrong" });
      console.log(err);
    });
  },
  getScreening: (req, res) => {
    const { id } = req.params;
    // console.log(req.params.id);
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
      .then(response => {
        // console.log(response.data);
        return res.status(200).json(response.data);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
  getDbMovies: (req, res) => {
    const db = req.app.get('db');
    db.screenings.get_movies(response => {
      return res.status(200).json(response.data);
    }).catch(err => {
      res.status(500).send({ errorMessage: "Something went wrong" });
      console.log(err);
    });
  }
}