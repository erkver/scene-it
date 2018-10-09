import React, { Component } from "react";
import "./Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "../Dropdown/Dropdown";
import { Link } from "react-router-dom";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      visible: false
    }
  }

  handleClick = () => {
    this.setState({visible: !this.state.visible})
  }
  render() {
    let visibility = 'hide';
    if (this.state.visible) {
      visibility = 'show';
    }
    return (
      <div className="nav-cont">
        <FontAwesomeIcon
          icon="circle-notch"
          className={`nav-icon ${visibility}`}
          onClick={() => this.setState({ visible: !this.state.visible })} />
        <Dropdown 
          visibility={visibility}
          handleClick={this.handleClick}
        />
        <Link to='/' className="title-treatment">SceneIt</Link>
        <FontAwesomeIcon icon="search-plus" className="search-icon" />
      </div>
    );
  }
}

export default Navbar;
