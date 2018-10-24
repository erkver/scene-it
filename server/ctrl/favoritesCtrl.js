module.exports = {
  getFavorites: (req, res) => {
    const db = req.app.get('db');
    const { u } = req.query;
    console.log("favs: ", req.query)
    if (req.query.u) {
      db.favorites
        .get_favorites(u)
        .then(response => {
          console.log("query:", response);
          return res.status(200).json(response);
        })
        .catch(err => {
          res.status(500).send({ errorMessage: "Something went wrong" });
          console.log(err);
        });
    } else {
      db.favorites
        .get_favorites()
        .then(response => {
          console.log("get:", response);
          return res.status(200).json(response);
        })
        .catch(err => {
          res.status(500).send({ errorMessage: "Something went wrong" });
          console.log(err);
        });
    }
  },
  addFavorite: (req, res) => {
    const db = req.app.get('db');
    const { movieId, userId } = req.body;
    db.favorites.add_favorite([movieId, userId]).then(response => {
        return res.status(200).json(response);
      }).catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
}