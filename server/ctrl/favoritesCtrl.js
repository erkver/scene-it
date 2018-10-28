module.exports = {
  getFavorites: (req, res) => {
    const db = req.app.get('db');
    const { u, m } = req.query;
    console.log("favs: ", req.query.m)
    if (req.query.u) {
      db.favorites
        .get_favorites(u)
        .then(response => {
          console.log("favorites q success");
          return res.status(200).json(response);
        })
        .catch(err => {
          res.status(500).send({ errorMessage: "Something went wrong" });
          console.log(err);
        });
    } else if(req.query.m) {
      db.favorites.get_fill([m]).then(response => {
        console.log("get fill success");
        return res.status(200).json(response[0].total);
      }).catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
    } else {
      db.favorites
        .get_favorites()
        .then(response => {
          console.log("get favs success");
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
  deleteFavorite: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    console.log(id);
    db.favorites.delete_favorite([id]).then(response => {
      console.log("delete fav success");
      return res.status(200).json(response);
    }).catch(err => {
      res.status(500).send({ errorMessage: "Something went wrong" });
      console.log(err);
    });
  }
}