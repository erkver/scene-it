module.exports = {
  addFavorite: (req, res) => {
    const db = req.app.get('db');
    const { movieId,
      fav_title,
      fav_img_url,
      fav_release_date,
      fav_synopsis,
      fav_isScreening,
      fav_screening_date,
      fav_theatre_name,
      fav_theatre_location,
      fav_studio,
      fav_genre,
      fav_mov_url,
      fav_runtime,
      userId } = req.body;
    db.favorites.add_favorite([
      movieId,
      fav_title,
      fav_img_url,
      fav_release_date,
      fav_synopsis,
      fav_isScreening,
      fav_screening_date,
      fav_theatre_name,
      fav_theatre_location,
      fav_studio,
      fav_genre,
      fav_mov_url,
      fav_runtime,
      userId]).then(response => {
        return res.status(200).json(response);
      }).catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
}