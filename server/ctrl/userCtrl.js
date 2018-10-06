const axios = require('axios');
let movies = [];

module.exports = {
  getAllMoviesToDb: (req, res) => {
    axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=0e1d3316d7a437ac6e0b9a5701b5f087&language=en-US').then(res => {
      console.log(res.data);
      movies = res.data;
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
  getMovies: (req, res) => {
    const db = req.app.get('db');
    db.get_movies().then(movies => {
      return res.status(200).json(movies);
    }).catch(err => {
      res.status(500).send({ errorMessage: "Something went wrong" });
      console.log(err);
    });
  }
}