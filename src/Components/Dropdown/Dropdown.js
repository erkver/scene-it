import React, {Component} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { clearReports } from "../../Ducks/reportReducer";
import { clearScreenings } from "../../Ducks/screeningReducer";
import { clearAudComments } from "../../Ducks/audCommentReducer";
import { clearPressComments } from "../../Ducks/pressCommentReducer";
import { clearScenes } from "../../Ducks/sceneReducer";
import "./Dropdown.scss";

class Dropdown extends Component {

  clearAllReportData = () => {
    const { clearReports, clearAudComments, clearPressComments, clearScenes, clearScreenings, handleClick } = this.props;
    handleClick();
    clearReports(); 
    clearAudComments(); 
    clearPressComments(); 
    clearScenes();
    clearScreenings();
  }
  render() {
    // console.log(this.props);
    const { REACT_APP_LOGOUT } = process.env;
    const {
      visibility,
      handleClick,
      user,
      clearScreenings
    } = this.props;
    return (
      <div id="main-dropdown-cont" ref={node => {this.node = node}} className={visibility}>
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
            <Link className="menu-link" to="/" onClick={() => handleClick()}>
              Home
            </Link>
            <Link
              className="menu-link"
              to="/admin/reports"
              onClick={() => handleClick()}
            >
              View Reports
            </Link>
            <Link
              className="menu-link"
              to="/admin/add/screening"
              onClick={() => {
                clearScreenings();
                handleClick();
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

const mapStateToProps = ({ 
  userReducer,
  screeningReducer,
  reportReducer, 
  sceneReducer, 
  audCommentReducer, 
  pressCommentReducer }) => ({ 
  ...userReducer,
  ...screeningReducer,
  ...reportReducer, 
  ...sceneReducer, 
  ...audCommentReducer, 
  ...pressCommentReducer });

export default connect(mapStateToProps, { clearReports, clearScreenings, clearAudComments, clearPressComments, clearScenes})(Dropdown);