import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getReport } from '../../Ducks/reportReducer';
import SingleReport from '../../Components/SingleReport/SingleReport';
import axios from 'axios';
import Spinner from '../../Components/Spinner/Spinner';
import './Reports.scss';

class Reports extends Component {
  constructor() {
    super();
    this.state = {
      reports: []
    };
  }

  componentDidMount() {
    this.getReports();
  }

  componentDidUpdate(prevProps, prevState) {
    const { reports } = this.state;
    if (reports.length !== prevState.reports.length) {
      this.getReports();
    }
  }

  getReports = () => {
    axios
      .get('/api/reports')
      .then(res => {
        this.setState({ reports: res.data });
      })
      .catch(err => alert(err));
  };

  renderContent = () => {
    let reportList = this.state.reports.map((report, i) => (
      <div className="main-report-cont" key={i}>
        <SingleReport report={report} getReport={this.props.getReport} />
      </div>
    ));
    return <>{reportList}</>;
  };

  render() {
    const { reports } = this.state;
    return (
      <div className="report-list-cont">
        <h1>Reports</h1>
        {reports[0] ? this.renderContent() : <Spinner />}
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer }) => ({ ...userReducer });

export default connect(
  mapStateToProps,
  { getReport }
)(Reports);
