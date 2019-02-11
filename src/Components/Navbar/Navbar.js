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
    const app = document.getElementById('main-react-app');
    this.setState({ visible: !this.state.visible }, () => {
      app.removeEventListener('click', this.handleClick);
      // app.addEventListener('click', this.handleOutsideClick);
    });
  };

  handleOutsideClick = () => {
    const app = document.getElementById('main-react-app');
    this.setState({ visible: false }, () => {
      app.removeEventListener('click', this.handleOutsideClick);
      // app.addEventListener('click', this.handleClick);
    });
  };

  render() {
    const { isAuthed, user } = this.props;
    const { visible } = this.state;
    const { REACT_APP_LOGIN } = process.env;
    console.log(visible);
    return (
      <div className="nav-cont">
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
                className={`hamburger hamburger--3dx ${
                  !visible ? '' : 'is-active'
                }`}
                onClick={() => this.handleClick()}
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
