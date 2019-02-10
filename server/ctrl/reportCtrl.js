module.exports = {
  getReports: async (req, res) => {
    const db = req.app.get("db");
    const { r } = req.query;
    console.log("report: ", req.query)
    if(req.query.r) {
      try {
        const result = await db.reports.get_reports(r);
        console.log("report query sucess");
        return res.status(200).json(result);
      } catch(err) {
        res.status(500).send({ errorMessage: "Get reports query failed" });
        console.log(err);
      };
    } else {
      try {
        const result = await db.reports.get_reports();
        console.log("get all reports success");
        return res.status(200).json(result);
      } catch(err) {
        res.status(500).send({ errorMessage: "Get reports failed" });
        console.log(err);
      };
    }
  },
  getReport: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await req.app.get("db").reports.get_report([id]);
      console.log("GET report success");
      return res.status(200).json(result);
    } catch(err) {
      res.status(500).send({ errorMessage: "Get report failed" });
      console.log(err);
    };
  },
  addReport: async (req, res) => {
    try {
      const { attendance, ratio, reaction, movieId } = req.body;
      const result = await req.app.get("db").reports.add_report([attendance, ratio, reaction, movieId]);
      console.log("add report sucess");
      return res.status(200).json(result);
    } catch(err) {
      res.status(500).send({ errorMessage: "Add report failed" });
      console.log(err);
    };
  },
  editReport: async (req, res) => {
    try {
      const { attendance, ratio, reaction } = req.body;
      const { id } = req.params;
      const result = await req.app.get("db").reports.edit_report([id, attendance, ratio, reaction]);
      console.log("edit report success");
      return res.status(200).json(result);
    } catch(err) {
      res.status(500).send({ errorMessage: "Edit report failed" });
      console.log(err);
    };
  },
  deleteReport: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await req.app.get("db").reports.delete_report([id]);
      console.log("Delete report success");
      return res.status(200).json(result);
    } catch(err) {
      res.status(500).send({ errorMessage: "Delete report failed" });
      console.log(err);
    };
  }
};