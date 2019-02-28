import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearReports } from '../../Ducks/reportReducer';
import { clearScreenings } from '../../Ducks/screeningReducer';
import { clearAudComments } from '../../Ducks/audCommentReducer';
import { clearPressComments } from '../../Ducks/pressCommentReducer';
import { clearScenes } from '../../Ducks/sceneReducer';
import './Dropdown.scss';

class Dropdown extends Component {
  clearAllReportData = () => {
    this.props.clearReports();
    this.props.clearAudComments();
    this.props.clearPressComments();
    this.props.clearScenes();
    this.props.clearScreenings();
    this.props.handleClick();
  };

  render() {
    const { REACT_APP_LOGOUT } = process.env;
    const { visible, handleClick, user, clearScreenings } = this.props;
    return (
      <div
        id="main-dropdown-cont"
        ref={node => {
          this.node = node;
        }}
        className={visible ? 'show' : 'hide'}
      >
        {!(user && user.isadmin) ? (
          <>
            <Link className="menu-link" to="/" onClick={() => handleClick()}>
              Home
            </Link>
            <Link
              className="menu-link"
              to="/watchlist"
              onClick={() => handleClick()}
            >
              My Watchlist
            </Link>
            <a
              className="menu-link"
              href={REACT_APP_LOGOUT}
              onClick={() => handleClick()}
            >
              Logout
            </a>
          </>
        ) : (
          <>
            <Link
              className="menu-link"
              to="/"
              onClick={() => this.clearAllReportData()}
            >
              Home
            </Link>
            <Link
              className="menu-link"
              to="/admin/reports"
              onClick={() => this.clearAllReportData()}
            >
              View Reports
            </Link>
            <Link
              className="menu-link"
              to="/admin/add/screening"
              onClick={() => {
                clearScreenings();
                this.clearAllReportData();
              }}
            >
              Add New Screening
            </Link>
            <Link
              className="menu-link"
              to="/admin/report/step1"
              onClick={() => this.clearAllReportData()}
            >
              Create New Report
            </Link>
            <a
              className="menu-link"
              href={REACT_APP_LOGOUT}
              onClick={() => handleClick()}
            >
              Logout
            </a>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer }) => ({ ...userReducer });

export default connect(
  mapStateToProps,
  {
    clearReports,
    clearScreenings,
    clearAudComments,
    clearPressComments,
    clearScenes
  }
)(Dropdown);
