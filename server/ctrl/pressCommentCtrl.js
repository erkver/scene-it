module.exports = {
  getPressComments: (req, res) => {
    const db = req.app.get("db");
    const { r } = req.query;
    db.comments.press
      .get_press_comments([r])
      .then(response => {
        console.log("get pComm success");
        return res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
  getPressComment: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    db.comments.press
      .get_press_comment([id])
      .then(response => {
        console.log("get pComm success");
        return res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
  addPressComment: (req, res) => {
    const db = req.app.get("db");
    const { name, outlet, reportId, comment } = req.body;
    db.comments.press
      .add_press_comment([name, outlet, reportId, comment])
      .then(response => {
        console.log("add pComm success");
        return res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
  editPressComment: (req, res) => {
    const db = req.app.get("db");
    const { name, outlet, comment } = req.body;
    const { id } = req.params;
    console.log("edit pComm success");
    db.comments.press
      .edit_press_comment([id, name, outlet, comment])
      .then(response => {
        console.log("edit pComm success");
        return res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
  deletePressComment: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    db.comments.press
      .delete_press_comment([id])
      .then(response => {
        console.log("delete pComm success");
        return res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  }
}