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
  getScreening: (req, res) => {
    const { id } = req.params;
    console.log(req.params.id);
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
      .then(response => {
        console.log(response.data);
        return res.status(200).json(response.data);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  }
}