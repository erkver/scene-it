module.exports = {
  getAudComments: (req, res) => {
    const db = req.app.get("db");
    const { reportId } = req.body;
    db.comments.audience
      .get_audience_comments([reportId])
      .then(response => {
        console.log(response);
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
        console.log(response);
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
        console.log(response);
        return res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
  editAudComment: (req, res) => {
    const db = req.app.get("db");
    const { gender, age, comment, reportId } = req.body;
    const { tAC_id } = req.params;
    db.comments.audience
      .edit_audience_comment([tAC_id, gender, age, comment, reportId])
      .then(response => {
        console.log(response);
        return res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
  deleteAudComment: (req, res) => {
    const db = req.app.get("db");
    const { tAC_id } = req.params;
    db.comments.audience
      .delete_audience_comment([tAC_id])
      .then(response => {
        console.log(response);
        return res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  }
};