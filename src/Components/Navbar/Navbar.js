import React, { Component } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Navbar extends Component {

  // toggleSpinner = () => {
  // const icon = querySelector('.nav-icon');
  // if (icon.className.contains('spinner')) {
  //   icon.className.remove('spinner');
  // } else {
  //   icon.className.add('spinner');
  // }
  render() {
    return (
      <div className="nav-cont">
        <FontAwesomeIcon icon="circle-notch" className="nav-icon" onClick={() => this.toggleSpinner()} />
        <h1 className="title-treatment">SceneIt</h1>
        <FontAwesomeIcon icon="search-plus" className="search-icon" />
      </div>
    );
  }
}

export default Navbar;
