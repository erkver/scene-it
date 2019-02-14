module.exports = {
  getScenes: async (req, res) => {
    try {
      const db = req.app.get('db');
      const { r } = req.query;
      const result = await db.scenes.get_scenes([+r]);
      console.log('get request scene success');
      return res.status(200).json(result);
    } catch (err) {
      res.status(500).send({ errorMessage: 'Get scenes failed' });
      console.log(err);
    }
  },
  getScene: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await req.app.get('db').scenes.get_scene([id]);
      console.log('get scene success');
      return res.status(200).json(result);
    } catch (err) {
      res.status(500).send({ errorMessage: 'Get scene failed' });
      console.log(err);
    }
  },
  addScene: async (req, res) => {
    try {
      const { scene, reportId } = req.body;
      const result = await req.app
        .get('db')
        .scenes.add_scenes([scene, reportId]);
      console.log('add scene success');
      return res.status(200).json(result);
    } catch (err) {
      res.status(500).send({ errorMessage: 'Add scene failed' });
      console.log(err);
    }
  },
  editScene: async (req, res) => {
    try {
      const { scene, reportId } = req.body;
      const { id } = req.params;
      const result = await req.app
        .get('db')
        .scenes.edit_scene([id, scene, reportId]);
      console.log('edit scene success');
      return res.status(200).json(result);
    } catch (err) {
      res.status(500).send({ errorMessage: 'Edit scene failed' });
      console.log(err);
    }
  },
  deleteScene: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await req.app.get('db').scenes.delete_scene([id]);
      console.log('delete scene success');
      return res.status(200).json(result);
    } catch (err) {
      res.status(500).send({ errorMessage: 'Delete scene failed' });
      console.log(err);
    }
  }
};
