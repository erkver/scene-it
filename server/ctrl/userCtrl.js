const axios = require('axios');
let movies = [];
const { API_KEY } = process.env;

module.exports = {
  getMovies: (req, res) => {
    axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US`).then(response => {
      movies = response.data;
      // console.log(movies);
      return res.status(200).json(movies);
    }).catch(err => {
      res.status(500).send({errorMessage: "Something went wrong"});
      console.log(err);
    });
  },
  createMoviesDb: (req, res) => {
    const db = req.app.get('db');
    const { title, img_url, release_date, synopsis } = req.body;
    db.create_movies_tbl([title, img_url, release_date, synopsis]).then(movies => {
      return res.status(200).json(movies);
    }).catch(err => {
      res.status(500).send({ errorMessage: "Something went wrong" });
      console.log(err);
    });
  },
  getMoviesDb: (req, res) => {
    const db = req.app.get('db');
    db.get_movies().then(movies => {
      return res.status(200).json(movies);
    }).catch(err => {
      res.status(500).send({ errorMessage: "Something went wrong" });
      console.log(err);
    });
  }
}