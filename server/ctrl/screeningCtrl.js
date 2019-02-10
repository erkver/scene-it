const axios = require('axios');
const { API_KEY } = process.env;

module.exports = {
  getScreenings: async (req, res) => {
    const db = req.app.get('db');
    const { q } = req.query;
    if(q) {
      try {
        const result = await db.screenings.screening_search([`%${q}%`]);
        console.log("GET screenings query success");
        return res.status(200).json(result);
      } catch(err){
        res.status(500).send({ errorMessage: "Get screenings search query failed" });
        console.log(err);
      };
    } else {
      try {
        const result = await db.screenings.get_screenings();
        console.log("GET all screenings success" );
        return res.status(200).json(result);
      } catch(err)  {
        res.status(500).send({errorMessage: "Get screenings failed"});
        console.log(err);
      };
    }
  },
  getScreening: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await req.app.get('db').screenings.get_screening([id]);
      console.log("get screening success ");
      return res.status(200).json(result);
    } catch(err) {
      res.status(500).send({ errorMessage: "Get screening failed" });
      console.log(err);
    };
  },
  getScreeningInfo: async (req, res) => {
    try {
      const { id } = req.params;
      // console.log(req.params.id);
      const result = await axios
      .get(`https://api.themoviedb.org/1/movie/${id}?api_key=${API_KEY}&language=en-US`);
        console.log(result);
      return res.status(200).json(result.data);
    } catch(err) {
      res.status(500).send({ errorMessage: "Get screening info failed" });
      console.log(err);
    };
  },
  createScreening: async (req, res) => {
    // console.log(req.body);
    try {
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
      const result = await req.app.get('db').screenings.add_screening([
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
      ]);
      console.log("POST screening success")
      return res.status(200).json(result);
      } catch(err) {
        res.status(500).send({ errorMessage: "Add screening failed" });
        console.log(err);
      };
  },
  editScreening: async (req, res) => {
    try {
      const { screening_date, theatreId, seat_count } = req.body;
      const { id } = req.params;
      const result = await req.app.get('db').screenings.edit_screening([id,screening_date, theatreId, seat_count]);
      console.log("PUT screening success");
      return res.status(200).json(result);
    } catch(err)  {
      res.status(500).send({ errorMessage: "Edit screening failed" });
      console.log(err);
    };
  }
}