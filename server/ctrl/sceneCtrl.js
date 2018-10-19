module.exports = {
  getScenes: (req, res) => {
    const db = req.app.get("db");
    const { reportId } = req.body;
    db.scenes
      .get_scenes([reportId])
      .then(response => {
        console.log(response);
        return res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
  getScene: (req, res) => {
    const db = req.app.get("db");
    const { tS_id } = req.params;
    db.scenes
      .get_scene([tS_id])
      .then(response => {
        console.log(response);
        return res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
  addScene: (req, res) => {
    const db = req.app.get("db");
    const { scene, reportId } = req.body;
    db.scenes
      .add_scenes([scene, reportId])
      .then(response => {
        console.log(response);
        return res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
  editScene: (req, res) => {
    const db = req.app.get("db");
    const { scene, reportId } = req.body;
    const { tS_id } = req.params;
    db.scenes
      .edit_scene([tS_id, scene, reportId])
      .then(response => {
        console.log(response);
        return res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
  deleteScene: (req, res) => {
    const db = req.app.get("db");
    const { tS_id } = req.params;
    db.scenes
      .delete_scene([tS_id])
      .then(response => {
        console.log(response);
        return res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  }
}