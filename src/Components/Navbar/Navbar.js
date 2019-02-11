import React, { Component } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Navbar.scss';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      visible: false
    };
  }

  handleClick = () => {
    this.setState({ visible: true }, () => {
      document.addEventListener('click', this.handleOutsideClick);
    });
  };

  handleOutsideClick = () => {
    this.setState({ visible: false }, () => {
      document.removeEventListener('click', this.handleOutsideClick);
    });
  };

  render() {
    const { isAuthed, user } = this.props;
    const { visible } = this.state;
    const { REACT_APP_LOGIN } = process.env;
    return (
      <div className="nav-cont">
        <div className="inner-nav-cont">
          {!isAuthed ? (
            <>
              <a className="login-link" href={REACT_APP_LOGIN}>
                Login
              </a>
            </>
          ) : (
            <>
              <button
                className={`hamburger hamburger--3dx ${
                  !visible ? '' : 'is-active'
                }`}
                onClick={this.handleClick}
              >
                <span className="hamburger-box">
                  <span className="hamburger-inner" />
                </span>
              </button>
              <Dropdown handleClick={this.handleClick} visible={visible} />
            </>
          )}
          <Link to="/" className="title-treatment">
            SceneIt
          </Link>
          {!user ? <p /> : <p>{user.name}</p>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer }) => ({ ...userReducer });

export default connect(mapStateToProps)(Navbar);
