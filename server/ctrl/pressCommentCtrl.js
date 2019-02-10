module.exports = {
  getPressComments: async (req, res) => {
    try {
      const { r } = req.query;
      const result = await req.app.get("db").comments.press.get_press_comments([r]);
        console.log("get pComm success");
        return res.status(200).json(result);
      } catch(err) {
        res.status(500).send({ errorMessage: "Could not get press comments" });
        console.log(err);
      };
  },
  getPressComment: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await req.app.get("db").comments.press.get_press_comment([id]);
      console.log("get pComm success");
      return res.status(200).json(result);
    } catch(err) {
      res.status(500).send({ errorMessage: "Something went wrong" });
      console.log(err);
    };
  },
  addPressComment: async (req, res) => {
    try {
      const { name, outlet, reportId, comment } = req.body;
      const result = await req.app.get("db").comments.press
      .add_press_comment([name, outlet, reportId, comment]);
      console.log("add pComm success");
      return res.status(200).json(result);
    } catch(err) {
      res.status(500).send({ errorMessage: "Something went wrong" });
      console.log(err);
    };
  },
  editPressComment: async (req, res) => {
    try {
      const { name, outlet, comment } = req.body;
      const { id } = req.params;
      console.log("edit pComm success");
      const result = await req.app.get("db").comments.press
      .edit_press_comment([id, name, outlet, comment]);
      console.log("edit pComm success");
      return res.status(200).json(result);
    } catch(err) {
      res.status(500).send({ errorMessage: "Something went wrong" });
      console.log(err);
    };
  },
  deletePressComment: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await req.app.get("db").comments.press
      .delete_press_comment([id]);
      console.log("delete pComm success");
      return res.status(200).json(result);
    } catch(err) {
      res.status(500).send({ errorMessage: "Something went wrong" });
      console.log(err);
    };
  }
}