import React, {Component} from "react";
import { Link } from "react-router-dom";
import "./Dropdown.scss";
import { connect } from "react-redux";

class Dropdown extends Component {
  render() {
    // console.log(this.props);
    const { REACT_APP_LOGOUT } = process.env;
    const { visibility, handleClick } = this.props;
    return (
      <div id="main-dropdown-cont" className={visibility}>
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
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer }) => ({ ...userReducer });

export default connect(mapStateToProps)(Dropdown);