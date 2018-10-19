module.exports = {
  getReports: (req, res) => {
    const db = req.app.get("db");
    db.reports
      .get_reports()
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
  getReport: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    db.reports
      .get_report([id])
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
  addReport: (req, res) => {
    const db = req.app.get("db");
    const { attendance, ratio, reaction, movieId } = req.body;
    db.reports
      .add_report([attendance, ratio, reaction, movieId])
      .then(response => {
        // console.log(response);
        return res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
  editReport: (req, res) => {
    const db = req.app.get("db");
    const { attendance, ratio, reaction } = req.body;
    const { tr_id } = req.params;
    db.reports
      .edit_report([tr_id, attendance, ratio, reaction])
      .then(response => {
        console.log(response);
        return res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
  deleteReport: (req, res) => {
    const db = req.app.get("db");
    const { tr_id } = req.params;
    db.reports
      .delete_report([tr_id])
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  }
};