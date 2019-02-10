module.exports = {
  getTheatres: async (req, res) => {
    try {
      const result = await req.app.get('db').theatres.get_theatres();
      console.log("GET theatres success");
      return res.status(200).json(result);
    } catch(err) {
      res.status(500).send({ errorMessage: "Get theatres failed" });
      console.log(err);
    };
  },
  getTheatre: async (req, res) => {
    try {
      const { id } = req.params
      const result = await req.app.get('db').theatres.get_theatre([id]);
      return res.status(200).json(result);
    } catch(err) {
      res.status(500).send({ errorMessage: "Get theatre failed" });
      console.log(err);
    };
  }
}