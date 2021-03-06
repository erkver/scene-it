module.exports = {
  getAudComments: async (req, res) => {
    try {
      const { r } = req.query;
      const response = await req.app
        .get('db')
        .comments.audience.get_audience_comments([r]);
      console.log('get aComm success');
      return res.status(200).json(response);
    } catch (err) {
      res.status(500).send({ errorMessage: 'Get audience comments failed' });
      console.log(err);
    }
  },
  getAudComment: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await req.app
        .get('db')
        .comments.audience.get_audience_comment([id]);
      console.log('get aComm success');
      return res.status(200).json(response);
    } catch (err) {
      res.status(500).send({ errorMessage: 'Get audience comment failed' });
      console.log(err);
    }
  },
  addAudComment: async (req, res) => {
    try {
      const { gender, age, comment, reportId } = req.body;
      const response = await req.app
        .get('db')
        .comments.audience.add_audience_comment([
          gender,
          age,
          comment,
          reportId
        ]);
      console.log('Add aComm success');
      return res.status(200).json(response);
    } catch (err) {
      res.status(500).send({ errorMessage: 'Add audience comment failed' });
      console.log(err);
    }
  },
  editAudComment: async (req, res) => {
    try {
      const { gender, age, comment } = req.body;
      const { id } = req.params;
      const response = await req.app
        .get('db')
        .comments.audience.edit_audience_comment([id, gender, age, comment]);
      console.log('edit aComm success');
      return res.status(200).json(response);
    } catch (err) {
      res.status(500).send({ errorMessage: 'Edit audience comment failed' });
      console.log(err);
    }
  },
  deleteAudComment: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await req.app
        .get('db')
        .comments.audience.delete_audience_comment([id]);
      console.log('delete aComm success');
      return res.status(200).json(response);
    } catch (err) {
      res.status(500).send({ errorMessage: 'Delete audience comment failed' });
      console.log(err);
    }
  }
};
