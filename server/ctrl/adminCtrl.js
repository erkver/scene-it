const axios = require('axios');
const { API_KEY } = process.env;

module.exports = {
  getMovies: async (req, res) => {
    try {
      const response = await  axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=4`);
      // console.log(response.data);
      return res.status(200).json(response.data);
    } catch(err) {
      res.status(500).send({ errorMessage: "Something went wrong" });
      console.log(err);
    };
  },
  getMovie: (req, res) => {
    const { id } = req.params;
    // console.log(req.params.id);
    try{
      const response = axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
        // console.log(response.data);
      return res.status(200).json(response.data);
    } catch(err) {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
    };
  },
  getAllUsers: (req, res) => {
    const db = req.app.get("db");
    const { g, a, e, genre, mov, gender, eth, minage, maxage, fav } = req.query;
    if(req.query.g) {
      db.users.get_all_users([g]).then(response => {
        // console.log(response);
        let males = Math.round((response.filter(user => user.gender.includes('Male')).length / response.length) * 100);
        let females = Math.round((response.filter(user => user.gender.includes('Female')).length / response.length) * 100);
        let percentage = [males, females]
        return res.status(200).json(percentage);
      }).catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
    } else if(req.query.a) {
      db.users
        .get_all_users([a])
        .then(response => {
          // console.log(response);
          let males = response.filter(user => user.gender.includes('Male'));
          let females = response.filter(user => user.gender.includes('Female'));
          let ageOne = Math.round((response.filter(user => user.age <= 24).length / response.length) * 100);
          let ageTwo = Math.round((response.filter(user => user.age >= 25 && user.age < 35).length / response.length) * 100);
          let ageThree = Math.round((response.filter(user => user.age >= 35 && user.age < 45).length / response.length) * 100);
          let ageFour = Math.round((response.filter(user => user.age >= 45 && user.age < 55).length / response.length) * 100);
          let ageFive = Math.round((response.filter(user => user.age >= 55).length / response.length) * 100);
          let maleAgeOne = Math.round((males.filter(user => user.age <= 24).length / response.length) * 100);
          let maleAgeTwo = Math.round((males.filter(user => user.age >= 25 && user.age < 35).length / response.length) * 100);
          let maleAgeThree = Math.round((males.filter(user => user.age >= 35 && user.age < 45).length / response.length) * 100);
          let maleAgeFour = Math.round((males.filter(user => user.age >= 45 && user.age < 55).length / response.length) * 100);
          let maleAgeFive = Math.round((males.filter(user => user.age >= 55).length / response.length) * 100);
          let femaleAgeOne = Math.round((females.filter(user => user.age <= 24).length / response.length) * 100);
          let femaleAgeTwo = Math.round((females.filter(user => user.age >= 25 && user.age < 35).length / response.length) * 100);
          let femaleAgeThree = Math.round((females.filter(user => user.age >= 35 && user.age < 45).length / response.length) * 100);
          let femaleAgeFour = Math.round((females.filter(user => user.age >= 45 && user.age < 55).length / response.length) * 100);
          let femaleAgeFive = Math.round((females.filter(user => user.age >= 55).length / response.length) * 100);
          let all = [ageOne, ageTwo, ageThree, ageFour, ageFive];
          let allMales = [maleAgeOne, maleAgeTwo, maleAgeThree, maleAgeFour, maleAgeFive];
          let allFemales = [femaleAgeOne, femaleAgeTwo, femaleAgeThree, femaleAgeFour, femaleAgeFive];
          console.log("age q success")
          return res.status(200).json([all, allMales, allFemales]);
        })
        .catch(err => {
          res.status(500).send({ errorMessage: "Something went wrong" });
          console.log(err);
        });
    } else if(req.query.e) {
      db.users.get_all_users([e]).then(response => {
        console.log('eth success');
        let males = response.filter(user => user.gender.includes('Male'));
        let females = response.filter(user => user.gender.includes('Female'));
        let ethOne = Math.round((response.filter(user => user.race.includes('Asain')).length / response.length) * 100);
        let ethTwo = Math.round((response.filter(user => user.race.includes('Hispanic')).length / response.length) * 100);
        let ethThree = Math.round((response.filter(user => user.race.includes('African')).length / response.length) * 100);
        let ethFour = Math.round((response.filter(user => user.race.includes('Caucasian')).length / response.length) * 100);
        let ethFive = Math.round((response.filter(user => user.race.includes('Native')).length / response.length) * 100);
        let ethSix = Math.round((response.filter(user => user.race.includes('Middle Eastern')).length / response.length) * 100);
        let maleEthOne = Math.round((males.filter(user => user.race.includes('Asain')).length / response.length) * 100);
        let maleEthTwo = Math.round((males.filter(user => user.race.includes('Hispanic')).length / response.length) * 100);
        let maleEthThree = Math.round((males.filter(user => user.race.includes('African')).length / response.length) * 100);
        let maleEthFour = Math.round((males.filter(user => user.race.includes('Caucasian')).length / response.length) * 100);
        let maleEthFive = Math.round((males.filter(user => user.race.includes('Native')).length / response.length) * 100);
        let maleEthSix = Math.round((males.filter(user => user.race.includes('Middle Eastern')).length / response.length) * 100);
        let femaleEthOne = Math.round((females.filter(user => user.race.includes('Asain')).length / response.length) * 100);
        let femaleEthTwo = Math.round((females.filter(user => user.race.includes('Hispanic')).length / response.length) * 100);
        let femaleEthThree = Math.round((females.filter(user => user.race.includes('African')).length / response.length) * 100);
        let femaleEthFour = Math.round((females.filter(user => user.race.includes('Caucasian')).length / response.length) * 100);
        let femaleEthFive = Math.round((females.filter(user => user.race.includes('Native')).length / response.length) * 100);
        let femaleEthSix = Math.round((females.filter(user => user.race.includes('Middle Eastern')).length / response.length) * 100);
        let all = [ethOne, ethTwo, ethThree, ethFour, ethFive, ethSix];
        let allMales = [maleEthOne, maleEthTwo, maleEthThree, maleEthFour, maleEthFive, maleEthSix];
        let allFemales = [femaleEthOne, femaleEthTwo, femaleEthThree, femaleEthFour, femaleEthFive, femaleEthSix];
        console.log("eth success");
        return res.status(200).json([all, allMales, allFemales]);
      }).catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
    } else if(req.query.genre) {
      db.users
        .get_all_users([genre])
        .then(response => {
          let males = response.filter(user => user.gender.includes('Male'));
          let females = response.filter(user => user.gender.includes('Female'));
          let genOne = response.filter(user => user.fav_genre.includes('Action'));
          let genTwo = response.filter(user => user.fav_genre.includes('Comedy'));
          let genThree = response.filter(user => user.fav_genre.includes('Drama'));
          let genFour = response.filter(user => user.fav_genre.includes('Sci-Fi'));
          let genFive = response.filter(user => user.fav_genre.includes('Romance'));
          let sum = genOne.length + genTwo.length + genThree.length + genFour.length + genFive.length
          let maleGenOne = Math.round((males.filter(user => user.fav_genre.includes('Action')).length / sum) * 100);
          let maleGenTwo = Math.round((males.filter(user => user.fav_genre.includes('Comedy')).length / sum) * 100);
          let maleGenThree = Math.round((males.filter(user => user.fav_genre.includes('Drama')).length / sum) * 100);
          let maleGenFour = Math.round((males.filter(user => user.fav_genre.includes('Sci-Fi')).length / sum) * 100);
          let maleGenFive = Math.round((males.filter(user => user.fav_genre.includes('Romance')).length / sum) * 100);
          let femaleGenOne = Math.round((females.filter(user => user.fav_genre.includes('Action')).length / sum) * 100);
          let femaleGenTwo = Math.round((females.filter(user => user.fav_genre.includes('Comedy')).length / sum) * 100);
          let femaleGenThree = Math.round((females.filter(user => user.fav_genre.includes('Drama')).length / sum) * 100);
          let femaleGenFour = Math.round((females.filter(user => user.fav_genre.includes('Sci-Fi')).length / sum) * 100);
          let femaleGenFive = Math.round((females.filter(user => user.fav_genre.includes('Romance')).length / sum) * 100);
          let genres = [Math.round((genOne.length / sum) * 100), Math.round((genTwo.length / sum) * 100), Math.round((genThree.length / sum) * 100), Math.round((genFour.length / sum) * 100), Math.round((genFive.length / sum) * 100)];
          let maleGenres = [maleGenOne, maleGenTwo, maleGenThree, maleGenFour, maleGenFive]
          let femaleGenres = [femaleGenOne, femaleGenTwo, femaleGenThree, femaleGenFour, femaleGenFive]
          console.log("genres success")
          return res.status(200).json([genres, maleGenres, femaleGenres]);
        })
        .catch(err => {
          res.status(500).send({ errorMessage: "Something went wrong" });
          console.log(err);
        });
    } else if (req.query.mov || req.query.gender || req.query.eth || req.query.minage || req.query.maxage || req.query.fav) {
      // console.log(mov, gender, eth, minage, maxage, fav);
      db.users
        .get_user_emails([+mov, gender, eth, minage, maxage, fav])
        .then(response => {
          console.log("get emails success");
          return res.status(200).json(response);
        })
        .catch(err => {
          res.status(500).send({ errorMessage: "Something went wrong" });
          console.log(err);
        });
    }
  }
}