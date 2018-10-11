import React, {Component} from "react";
import { Link } from "react-router-dom";
import "./Dropdown.scss";
import { connect } from "react-redux";

class Dropdown extends Component {
  render() {
    console.log(this.props);
    const { REACT_APP_LOGOUT } = process.env;
    const { visibility, handleClick, user } = this.props;
    return (
      <div id="main-dropdown-cont" className={visibility}>
        {!(user.data && user.data.isadmin)
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
            to="/"
            onClick={() => handleClick()}>View Reports</Link>
          <Link
            className="menu-link"
            to="/watchlist"
            onClick={() => handleClick()}>Add New Screening</Link>
          <Link
            className="menu-link"
            to="/profile"
            onClick={() => handleClick()}>Create New Report</Link>
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

const mapStateToProps = ({ userReducer }) => ({ ...userReducer });

export default connect(mapStateToProps)(Dropdown);