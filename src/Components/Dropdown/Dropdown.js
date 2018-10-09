import React, {Component} from "react";
import { Link } from "react-router-dom";
import "./Dropdown.scss";


class Dropdown extends Component {
  render() {
    const { REACT_APP_LOGIN } = process.env;
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
          href={REACT_APP_LOGIN}
          onClick={() => handleClick()}>Login</a>
      </div>
    );
  }
}

export default Dropdown;