module.exports = {
  getTheatres: (req, res) => {
    const db = req.app.get('db');
    db.theatres
      .get_theatres().then(response => {
        // console.log(response);
        return res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },

}