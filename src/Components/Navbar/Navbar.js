import React, { Component } from "react";
import "./Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "../Dropdown/Dropdown";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      visible: false
    };
  }

  handleClick = () => {
    this.setState({ visible: !this.state.visible }); 
  }

  render() {
    const { isAuthed } = this.props;
    const { REACT_APP_LOGIN } = process.env;
    console.log(this.props);
    let visibility = "hide";
    if (this.state.visible) {
      visibility = "show";
    }
    return (
      <div className="nav-cont">
        {!isAuthed ? (
          <div className="login-cont">
            <a
              className="login-link"
              href={REACT_APP_LOGIN}
              onClick={() => this.handleClick()}
            >
              Login
            </a>
          </div>
        ) : (
          <div className="icon-cont">
            <FontAwesomeIcon
              icon="circle-notch"
              className={`nav-icon ${visibility}`}
              onClick={() => this.setState({ visible: !this.state.visible })}
            />
            <Dropdown
              visibility={visibility}
              handleClick={this.handleClick}
              // handleOutsideClick={this.handleOutsideClick}
            />
          </div>
        )}
        <Link to="/" className="title-treatment">
          SceneIt
        </Link>
        <FontAwesomeIcon icon="search-plus" className="search-icon" />
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer }) => ({ ...userReducer });

export default connect(mapStateToProps)(Navbar);
