module.exports = {
  getFavorites: async (req, res) => {
    const db = req.app.get('db');
    const { u, m } = req.query;
    if (req.query.u) {
      try {
        const userResult = await db.favorites.get_favorites(u);
        console.log("favorites q success");
        return res.status(200).json(userResult);
      } catch(err) {
        res.status(500).send({ errorMessage: "Get user favorites failed" });
        console.log(err);
      };
    } else if(req.query.m) {
      try {
        const fillResult = await db.favorites.get_fill([m]);
        console.log("get fill success");
        return res.status(200).json(fillResult[0].total);
      } catch(err) {
        res.status(500).send({ errorMessage: "Get fill results failed" });
        console.log(err);
      };
    } else {
      try {
        const favoritesResult = await db.favorites.get_favorites();
        console.log("get favs success");
        return res.status(200).json(favoritesResult);
      } catch(err) {
        res.status(500).send({ errorMessage: "Get favorites failed" });
        console.log(err);
      };
    }
  },
  addFavorite: async (req, res) => {
    const { movieId, userId } = req.body;
    try {
      const result = await req.app.get('db').favorites.add_favorite([movieId, userId]);
      console.log("add fav success");
      return res.status(200).json(result);
    } catch(err) {
      res.status(500).send({ errorMessage: "Add favorite failed" });
      console.log(err);
    };
  },
  deleteFavorite: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await req.app.get('db').favorites.delete_favorite([id]);
      console.log("delete fav success");
      return res.status(200).json(result);
    } catch(err) {
      res.status(500).send({ errorMessage: "Delete favorite failed" });
      console.log(err);
    };
  }
}