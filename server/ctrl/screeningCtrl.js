const axios = require('axios');
const { API_KEY } = process.env;

module.exports = {
  getScreenings: (req, res) => {
    const db = req.app.get('db');
    db.screenings.get_screenings().then(response => {
      // console.log(response);
      return res.status(200).json(response);
    }).catch(err => {
      res.status(500).send({errorMessage: "Something went wrong"});
      console.log(err);
    });
  },
  getScreening: (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    db.screenings.get_screening([id]).then(response => {
      console.log(response);
      return res.status(200).json(response);
    }).catch(err => {
      res.status(500).send({ errorMessage: "Something went wrong" });
      console.log(err);
    });
  },
  getScreeningInfo: (req, res) => {
    const { id } = req.params;
    console.log(req.params.id);
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
      .then(response => {
        console.log(response);
        return res.status(200).json(response.data);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
  createScreening: (req, res) => {
    // console.log(req.body);
    const db = req.app.get('db');
    const {
      title,
      img_url,
      release_date,
      synopsis,
      isScreening,
      screening_date,
      userId,
      studio,
      genre,
      mov_url,
      runtime,
      theatreId,
      seat_count
    } = req.body;
    db.screenings
      .add_screening([
        title,
        img_url,
        release_date,
        synopsis,
        isScreening,
        screening_date,
        userId,
        studio,
        genre,
        mov_url,
        runtime,
        theatreId,
        seat_count
      ])
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  }
}