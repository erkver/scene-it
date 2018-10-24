import React, { Component } from "react";
import { connect } from "react-redux";
import { getReport, getReports } from "../../Ducks/reportReducer";
import { withRouter } from "react-router-dom";
import SingleReport from "../../Components/SingleReport/SingleReport";
import "./Reports.scss";

class Reports extends Component {
  componentDidMount() {
    const { getReports } = this.props;
    getReports();
  }

  render() {
    const { reports } = this.props;
    console.log(this.props);
    let reportList = reports.map((report, i) => (
      <div className="main-report-cont" key={i}>
        <SingleReport
          report={report}
          getReport={getReport}
        />
      </div>
    ));
    return (
      <div className="report-list-cont">
        <div>
          <h1>Reports</h1>
        </div>
        {reportList}
      </div>
    );
  }
}

const mapStateToProps = ({
  userReducer,
  reportReducer }) => ({
    ...userReducer,
    ...reportReducer
  });

export default withRouter(connect(mapStateToProps, { getReports, getReport })(Reports));