import React, {Component} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { clearReports } from "../../Ducks/reportReducer";
import { clearScreenings } from "../../Ducks/screeningReducer";
import "./Dropdown.scss";

class Dropdown extends Component {
  render() {
    // console.log(this.props);
    const { REACT_APP_LOGOUT } = process.env;
    const { visibility, handleClick, user, clearReports, clearScreenings } = this.props;
    return (
      <div id="main-dropdown-cont" className={visibility}>
        {!(user && user.isadmin)
        ? <>
            <Link
              className="menu-link"
              to="/"
              onClick={() => handleClick()}>Home</Link>
              <p className="menu-link" >Message Board</p>
            <Link
              className="menu-link"
              to="/watchlist"
              onClick={() => handleClick()}>My Watchlist</Link>
            <Link
              className="menu-link"
              to="/profile"
              onClick={() => handleClick()}>Profile</Link>
            <a
              className="menu-link"
              href={REACT_APP_LOGOUT}
              onClick={() => handleClick()}>Logout</a>
          </>
        : <>
            <Link
              className="menu-link"
              to="/"
              onClick={() => handleClick()}>Home</Link>
            <Link
              className="menu-link"
              to="/admin/reports"
              onClick={() => handleClick()}>View Reports</Link>
            <Link
              className="menu-link"
              to="/admin/add/screening"
              onClick={() => {clearScreenings(); handleClick()}}>Add New Screening</Link>
            <Link
              className="menu-link"
              to="/admin/report/step1"
              onClick={() => {clearReports(); handleClick()}}>Create New Report</Link>
            <a
              className="menu-link"
              href={REACT_APP_LOGOUT}
              onClick={() => handleClick()}>Logout</a>
          </>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ 
  userReducer,
  screeningReducer,
  reportReducer }) => ({ 
  ...userReducer,
  ...screeningReducer,
  ...reportReducer });

export default connect(mapStateToProps, {clearReports, clearScreenings})(Dropdown);