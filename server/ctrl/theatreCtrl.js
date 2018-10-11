module.exports = {
  getTheatres: (req, res) => {
    const db = req.app.get('db');
    db.theatres
      .get_theatres(response => {
        console.log(response);
        return res.status(200).json(response.data);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },

}