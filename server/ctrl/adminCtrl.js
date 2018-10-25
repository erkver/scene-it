const axios = require('axios');
const { API_KEY } = process.env;

module.exports = {
  getMovies: (req, res) => {
    axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=4`).then(response => {
      // console.log(response.data);
      return res.status(200).json(response.data);
    }).catch(err => {
      res.status(500).send({ errorMessage: "Something went wrong" });
      console.log(err);
    });
  },
  getMovie: (req, res) => {
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
  getAllUsers: (req, res) => {
    const db = req.app.get("db");
    const { mov } = req.query;
    if(req.query.mov) {
      db.users.get_all_users([mov]).then(response => {
        // console.log(response);
        let males = ((response.filter(user => user.gender.includes('Male')).length / response.length) * 100);
        let females = ((response.filter(user => user.gender.includes('Female')).length / response.length) * 100);
        let percentage = [Math.round(males), Math.round(females)]
        return res.status(200).json(percentage);
      }).catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
    }
  }
}