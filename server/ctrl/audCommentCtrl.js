module.exports = {
  getAudComments: (req, res) => {
    const db = req.app.get("db");
    const { r } = req.query;
    db.comments.audience
      .get_audience_comments([r])
      .then(response => {
        console.log("get aComm success");
        return res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
  getAudComment: (req, res) => {
    const db = req.app.get("db");
    const { tAC_id } = req.params;
    db.comments.audience
      .get_audience_comment([tAC_id])
      .then(response => {
        console.log("get aComm success");
        return res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
  addAudComment: (req, res) => {
    const db = req.app.get("db");
    const { gender, age, comment, reportId } = req.body;
    db.comments.audience
      .add_audience_comment([gender, age, comment, reportId])
      .then(response => {
        console.log("add aComm success");
        db.comments.audience
        .get_audience_comments([response[0].reportId])
        .then(resp => {
          return res.status(200).json(resp);
        })
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
  editAudComment: (req, res) => {
    const db = req.app.get("db");
    const { gender, age, comment } = req.body;
    const { id } = req.params;
    db.comments.audience
      .edit_audience_comment([id, gender, age, comment])
      .then(response => {
        console.log("edit aComm success");
        return res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
  deleteAudComment: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    db.comments.audience
      .delete_audience_comment([id])
      .then(response => {
        console.log("delete aComm success");
        return res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  }
};