const axios = require('axios');
const { API_KEY } = process.env;

module.exports = {
  getMovies: async (req, res) => {
    try {
      const result = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=4`
      );
      console.log('Get movies success');
      return res.status(200).json(result.data);
    } catch (err) {
      res.status(500).send({ errorMessage: 'Get movies failed' });
      console.log(err);
    }
  },
  getMovie: async (req, res) => {
    const { id } = req.params;
    // console.log(req.params.id);
    try {
      const result = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      console.log('GET movie success');
      return res.status(200).json(result.data);
    } catch (err) {
      res.status(500).send({ errorMessage: 'Get movie failed' });
      console.log(err);
    }
  },
  getAllUsers: async (req, res) => {
    const db = req.app.get('db');
    const { g, a, e, genre, mov, gender, eth, minage, maxage, fav } = req.query;
    if (req.query.g) {
      try {
        const result = await db.users.get_genders([g]);
        console.log(result);
        return res.status(200).json([+result[0].male, +result[0].female]);
      } catch (err) {
        res
          .status(500)
          .send({ errorMessage: 'Get all users - gender query failed' });
        console.log(err);
      }
    } else if (req.query.a) {
      try {
        const result = await db.users.get_all_ages([a]);
        let all = [
          +result[0].age_one,
          +result[0].age_two,
          +result[0].age_three,
          +result[0].age_four,
          +result[0].age_five
        ];
        let allMales = [
          +result[0].m_age_one,
          +result[0].m_age_two,
          +result[0].m_age_three,
          +result[0].m_age_four,
          +result[0].m_age_five
        ];
        let allFemales = [
          +result[0].f_age_one,
          +result[0].f_age_two,
          +result[0].f_age_three,
          +result[0].f_age_four,
          +result[0].f_age_five
        ];
        console.log('age q success');
        return res.status(200).json([all, allMales, allFemales]);
      } catch (err) {
        res
          .status(500)
          .send({ errorMessage: 'Could not get users - age query failed' });
        console.log(err);
      }
    } else if (req.query.e) {
      try {
        const result = await db.users.get_all_users([e]);
        console.log('eth success');
        let all = [
          +result[0].eth_one,
          +result[0].eth_two,
          +result[0].eth_three,
          +result[0].eth_four,
          +result[0].eth_five,
          +result[0].eth_six
        ];
        let allMales = [
          +result[0].m_eth_one,
          +result[0].m_eth_two,
          +result[0].m_eth_three,
          +result[0].m_eth_four,
          +result[0].m_eth_five,
          +result[0].m_eth_six
        ];
        let allFemales = [
          +result[0].f_eth_one,
          +result[0].f_eth_two,
          +result[0].f_eth_three,
          +result[0].f_eth_four,
          +result[0].f_eth_five,
          +result[0].f_eth_six
        ];
        console.log('eth success');
        return res.status(200).json([all, allMales, allFemales]);
      } catch (err) {
        res
          .status(500)
          .send({ errorMessage: 'Get all users - ethnicity query failed' });
        console.log(err);
      }
    } else if (req.query.genre) {
      try {
        const result = await db.users.get_all_genres([genre]);
        let genres = [
          +result[0].genre_one,
          +result[0].genre_two,
          +result[0].genre_three,
          +result[0].genre_four,
          +result[0].genre_five
        ];
        let maleGenres = [
          +result[0].m_genre_one,
          +result[0].m_genre_two,
          +result[0].m_genre_three,
          +result[0].m_genre_four,
          +result[0].m_genre_five
        ];
        let femaleGenres = [
          +result[0].f_genre_one,
          +result[0].f_genre_two,
          +result[0].f_genre_three,
          +result[0].f_genre_four,
          +result[0].f_genre_five
        ];
        console.log('genres success');
        return res.status(200).json([genres, maleGenres, femaleGenres]);
      } catch (err) {
        res
          .status(500)
          .send({ errorMessage: 'Get users - genre query failed' });
        console.log(err);
      }
    } else if (
      req.query.mov ||
      req.query.gender ||
      req.query.eth ||
      req.query.minage ||
      req.query.maxage ||
      req.query.fav
    ) {
      try {
        const result = await db.users.get_user_emails([
          +mov,
          gender,
          eth,
          minage,
          maxage,
          fav
        ]);
        console.log('get emails success');
        console.log(result);
        return res.status(200).json(result);
      } catch (err) {
        res
          .status(500)
          .send({ errorMessage: 'Get users - emails query failed' });
        console.log(err);
      }
    }
  }
};
