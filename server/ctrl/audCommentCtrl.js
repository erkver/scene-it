module.exports = {
  getAudComments: async (req, res) => {
    try{
      const { r } = req.query;
      const response = await req.app.get('db').comments.audience.get_audience_comments([r]); 
      console.log("get aComm success");
      return res.status(200).json(response);
    } catch(err) {
      res.status(500).send({ errorMessage: "Something went wrong" });
      console.log(err);
    };
  },
  getAudComment: async (req, res) => {
    try{
      const { tAC_id } = req.params;  
      const response = await req.app.get("db").comments.audience.get_audience_comment([tAC_id]);
      console.log("get aComm success");
      return res.status(200).json(response);
    } catch(err) {
      res.status(500).send({ errorMessage: "Something went wrong" });
      console.log(err);
    };
  },
  addAudComment: async (req, res) => {
    try{
      const { gender, age, comment, reportId } = req.body;
      const response = await req.app.get("db").comments.audience.add_audience_comment([gender, age, comment, reportId]);
      return res.status(200).json(response.data);
    } catch(err) {
      res.status(500).send({ errorMessage: "Something went wrong" });
      console.log(err);
    };
  },
  editAudComment: async (req, res) => {
    try {
      const { gender, age, comment } = req.body;
      const { id } = req.params;
      const response = await req.app.get("db").comments.audience.edit_audience_comment([id, gender, age, comment]);
      console.log("edit aComm success");
      return res.status(200).json(response);
    } catch(err) {
      res.status(500).send({ errorMessage: "Something went wrong" });
      console.log(err);
    };
  },
  deleteAudComment: async (req, res) => {
    try{
      const { id } = req.params;
      const response = await req.app.get("db").comments.audience.delete_audience_comment([id]);
      console.log("delete aComm success");
      return res.status(200).json(response);
    } catch(err) {
      res.status(500).send({ errorMessage: "Something went wrong" });
      console.log(err);
    };
  }
};