module.exports = {
  getReports: (req, res) => {
    const db = req.app.get('db');
    db.reports.get_reports().then(response => {
      return res.status(200).json(response);
    }).catch(err => {
      res.status(500).send({ errorMessage: "Something went wrong" });
      console.log(err);
    });
  },
  getReport: (req, res) => {
    const db = req.app.get('db');
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
    const db = req.app.get('db');
    const { 
      attendance,
      ratio,
      reaction,
      movieId
     } = req.body;
    db.reports.add_report([
      attendance,
      ratio,
      reaction,
      movieId
    ]).then(response => {
      // console.log(response);
      return res.status(200).json(response);
      }).catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
  addScene: (req, res) => {
    const db = req.app.get("db");
    const { scene, reportId } = req.body;
    db.scenes.add_scenes([scene, reportId]).then(response => {
      console.log(response);
      return res.status(200).json(response);
    }).catch(err => {
      res.status(500).send({ errorMessage: "Something went wrong" });
      console.log(err);
    });
  },
  addPressComment: (req, res) => {
    const db = req.app.get("db");
    const { 
      name, 
      outlet, 
      reportId, 
      comment
    } = req.body;
    db.comments.press.add_press_comment([
      name,
      outlet,
      reportId,
      comment]).then(response => {
        console.log(response);
        return res.status(200).json(response);
      }).catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
  addAudComment: (req, res) => {
    const db = req.app.get("db");
    const {
      gender,
      age,
      comment,
      reportId
    } = req.body;
    db.comments.audience.add_audience_comment([
      gender,
      age,
      comment,
      reportId
      ]).then(response => {
        console.log(response);
        return res.status(200).json(response);
      }).catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  }
}