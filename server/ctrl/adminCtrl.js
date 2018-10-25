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
    const { g, a } = req.query;
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
          console.log(all, allMales, allFemales)
          return res.status(200).json([all, allMales, allFemales]);
        })
        .catch(err => {
          res.status(500).send({ errorMessage: "Something went wrong" });
          console.log(err);
        });
    }
  }
}