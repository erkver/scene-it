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
        return res.status(200).json([+result[0].male, +result[0].female]);
      } catch (err) {
        res
          .status(500)
          .send({ errorMessage: 'Get all users - gender query failed' });
        console.log(err);
      }
    } else if (req.query.a) {
      try {
        const genders = await db.users.get_genders([a]);
        let ageOne = Math.round(
          (result.filter(user => user.age <= 24).length / result.length) * 100
        );
        let ageTwo = Math.round(
          (result.filter(user => user.age >= 25 && user.age < 35).length /
            result.length) *
            100
        );
        let ageThree = Math.round(
          (result.filter(user => user.age >= 35 && user.age < 45).length /
            result.length) *
            100
        );
        let ageFour = Math.round(
          (result.filter(user => user.age >= 45 && user.age < 55).length /
            result.length) *
            100
        );
        let ageFive = Math.round(
          (result.filter(user => user.age >= 55).length / result.length) * 100
        );
        let maleAgeOne = Math.round(
          (males.filter(user => user.age <= 24).length / result.length) * 100
        );
        let maleAgeTwo = Math.round(
          (males.filter(user => user.age >= 25 && user.age < 35).length /
            result.length) *
            100
        );
        let maleAgeThree = Math.round(
          (males.filter(user => user.age >= 35 && user.age < 45).length /
            result.length) *
            100
        );
        let maleAgeFour = Math.round(
          (males.filter(user => user.age >= 45 && user.age < 55).length /
            result.length) *
            100
        );
        let maleAgeFive = Math.round(
          (males.filter(user => user.age >= 55).length / result.length) * 100
        );
        let femaleAgeOne = Math.round(
          (females.filter(user => user.age <= 24).length / result.length) * 100
        );
        let femaleAgeTwo = Math.round(
          (females.filter(user => user.age >= 25 && user.age < 35).length /
            result.length) *
            100
        );
        let femaleAgeThree = Math.round(
          (females.filter(user => user.age >= 35 && user.age < 45).length /
            result.length) *
            100
        );
        let femaleAgeFour = Math.round(
          (females.filter(user => user.age >= 45 && user.age < 55).length /
            result.length) *
            100
        );
        let femaleAgeFive = Math.round(
          (females.filter(user => user.age >= 55).length / result.length) * 100
        );
        let all = [ageOne, ageTwo, ageThree, ageFour, ageFive];
        let allMales = [
          maleAgeOne,
          maleAgeTwo,
          maleAgeThree,
          maleAgeFour,
          maleAgeFive
        ];
        let allFemales = [
          femaleAgeOne,
          femaleAgeTwo,
          femaleAgeThree,
          femaleAgeFour,
          femaleAgeFive
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
        let males = result.filter(user => user.gender.includes('Male'));
        let females = result.filter(user => user.gender.includes('Female'));
        let ethOne = Math.round(
          (result.filter(user => user.race.includes('Asain')).length /
            result.length) *
            100
        );
        let ethTwo = Math.round(
          (result.filter(user => user.race.includes('Hispanic')).length /
            result.length) *
            100
        );
        let ethThree = Math.round(
          (result.filter(user => user.race.includes('African')).length /
            result.length) *
            100
        );
        let ethFour = Math.round(
          (result.filter(user => user.race.includes('Caucasian')).length /
            result.length) *
            100
        );
        let ethFive = Math.round(
          (result.filter(user => user.race.includes('Native')).length /
            result.length) *
            100
        );
        let ethSix = Math.round(
          (result.filter(user => user.race.includes('Middle Eastern')).length /
            result.length) *
            100
        );
        let maleEthOne = Math.round(
          (males.filter(user => user.race.includes('Asain')).length /
            result.length) *
            100
        );
        let maleEthTwo = Math.round(
          (males.filter(user => user.race.includes('Hispanic')).length /
            result.length) *
            100
        );
        let maleEthThree = Math.round(
          (males.filter(user => user.race.includes('African')).length /
            result.length) *
            100
        );
        let maleEthFour = Math.round(
          (males.filter(user => user.race.includes('Caucasian')).length /
            result.length) *
            100
        );
        let maleEthFive = Math.round(
          (males.filter(user => user.race.includes('Native')).length /
            result.length) *
            100
        );
        let maleEthSix = Math.round(
          (males.filter(user => user.race.includes('Middle Eastern')).length /
            result.length) *
            100
        );
        let femaleEthOne = Math.round(
          (females.filter(user => user.race.includes('Asain')).length /
            result.length) *
            100
        );
        let femaleEthTwo = Math.round(
          (females.filter(user => user.race.includes('Hispanic')).length /
            result.length) *
            100
        );
        let femaleEthThree = Math.round(
          (females.filter(user => user.race.includes('African')).length /
            result.length) *
            100
        );
        let femaleEthFour = Math.round(
          (females.filter(user => user.race.includes('Caucasian')).length /
            result.length) *
            100
        );
        let femaleEthFive = Math.round(
          (females.filter(user => user.race.includes('Native')).length /
            result.length) *
            100
        );
        let femaleEthSix = Math.round(
          (females.filter(user => user.race.includes('Middle Eastern')).length /
            result.length) *
            100
        );
        let all = [ethOne, ethTwo, ethThree, ethFour, ethFive, ethSix];
        let allMales = [
          maleEthOne,
          maleEthTwo,
          maleEthThree,
          maleEthFour,
          maleEthFive,
          maleEthSix
        ];
        let allFemales = [
          femaleEthOne,
          femaleEthTwo,
          femaleEthThree,
          femaleEthFour,
          femaleEthFive,
          femaleEthSix
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
        const result = await db.users.get_all_users([genre]);
        let males = result.filter(user => user.gender.includes('Male'));
        let females = result.filter(user => user.gender.includes('Female'));
        let genOne = result.filter(user => user.fav_genre.includes('Action'));
        let genTwo = result.filter(user => user.fav_genre.includes('Comedy'));
        let genThree = result.filter(user => user.fav_genre.includes('Drama'));
        let genFour = result.filter(user => user.fav_genre.includes('Sci-Fi'));
        let genFive = result.filter(user => user.fav_genre.includes('Romance'));
        let sum =
          genOne.length +
          genTwo.length +
          genThree.length +
          genFour.length +
          genFive.length;
        let maleGenOne = Math.round(
          (males.filter(user => user.fav_genre.includes('Action')).length /
            sum) *
            100
        );
        let maleGenTwo = Math.round(
          (males.filter(user => user.fav_genre.includes('Comedy')).length /
            sum) *
            100
        );
        let maleGenThree = Math.round(
          (males.filter(user => user.fav_genre.includes('Drama')).length /
            sum) *
            100
        );
        let maleGenFour = Math.round(
          (males.filter(user => user.fav_genre.includes('Sci-Fi')).length /
            sum) *
            100
        );
        let maleGenFive = Math.round(
          (males.filter(user => user.fav_genre.includes('Romance')).length /
            sum) *
            100
        );
        let femaleGenOne = Math.round(
          (females.filter(user => user.fav_genre.includes('Action')).length /
            sum) *
            100
        );
        let femaleGenTwo = Math.round(
          (females.filter(user => user.fav_genre.includes('Comedy')).length /
            sum) *
            100
        );
        let femaleGenThree = Math.round(
          (females.filter(user => user.fav_genre.includes('Drama')).length /
            sum) *
            100
        );
        let femaleGenFour = Math.round(
          (females.filter(user => user.fav_genre.includes('Sci-Fi')).length /
            sum) *
            100
        );
        let femaleGenFive = Math.round(
          (females.filter(user => user.fav_genre.includes('Romance')).length /
            sum) *
            100
        );
        let genres = [
          Math.round((genOne.length / sum) * 100),
          Math.round((genTwo.length / sum) * 100),
          Math.round((genThree.length / sum) * 100),
          Math.round((genFour.length / sum) * 100),
          Math.round((genFive.length / sum) * 100)
        ];
        let maleGenres = [
          maleGenOne,
          maleGenTwo,
          maleGenThree,
          maleGenFour,
          maleGenFive
        ];
        let femaleGenres = [
          femaleGenOne,
          femaleGenTwo,
          femaleGenThree,
          femaleGenFour,
          femaleGenFive
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
