module.exports = {
  getScenes: (req, res) => {
    const db = req.app.get("db");
    const { r } = req.query;
    console.log("get request scene success");
    db.scenes
      .get_scenes([+r])
      .then(response => {
        console.log("get request:", response);
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
        console.log("get scene success");
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
        console.log("add scene success");
        return res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
  editScene: (req, res) => {
    const db = req.app.get("db");
    const { scene } = req.body;
    const { id } = req.params;
    db.scenes
      .edit_scene([id, scene])
      .then(response => {
        console.log("edit scene success");
        return res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  },
  deleteScene: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    console.log(id);
    db.scenes
      .delete_scene([id])
      .then(response => {
        console.log("delete scene success");
        return res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong" });
        console.log(err);
      });
  }
}