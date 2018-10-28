import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "../Dropdown/Dropdown";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./Navbar.scss";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
    };
  }

  handleClick = () => {
    this.setState({ visible: !this.state.visible }); 
  }

 

  render() {
    const { isAuthed, user} = this.props;
    const { visible } = this.state;
    const { REACT_APP_LOGIN } = process.env;
    console.log(this.props);
    let visibility = "hide";
    if (this.state.visible) {
      visibility = "show";
    }
    return (
      <div className="nav-cont" >
      <div className="inner-nav-cont">
        {!isAuthed ? (
          <>
            <a
              className="login-link"
              href={REACT_APP_LOGIN}
              onClick={() => this.handleClick()}
            >
              Login
            </a>
            </>

        ) : (
          <>
            <button 
              className={`hamburger hamburger--3dx ${!visible ? "" : "is-active"}`}
              onClick={() => this.handleClick()}>
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
            <Dropdown
              visibility={visibility}
              handleClick={this.handleClick}
            />
          </>
        )}
        <Link to="/" className="title-treatment">
          SceneIt
        </Link>
        {!user ? <p></p> : <p>{user.name}</p>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer }) => ({ ...userReducer });

export default connect(mapStateToProps)(Navbar);
