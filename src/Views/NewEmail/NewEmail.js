import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getUsersByParams, sendEmailAll } from "../../Ducks/adminReducer";
import axios from "axios";
// import { addPressComment, getPressComments } from "../../../Ducks/pressCommentReducer";
import "./NewEmail.scss";


class NewEmail extends Component {
  constructor() {
    super();
    this.state = {
      gender: 'default',
      ageRange: 'default',
      favGanre: 'default',
      eth: "default"
    }
  }

  componentDidMount() {
    const { getUsersByParams } = this.props;
    getUsersByParams(83, null, 'Asian', 18, 100, null);
  }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   const name = document.getElementById('name').value;
  //   const email = document.getElementById('email').value;
  //   const message = document.getElementById('message').value;
  //   axios({
  //     method: "POST",
  //     url: "http://localhost:3001/send",
  //     data: {
  //       name: name,
  //       email: email,
  //       messsage: message
  //     }
  //   }).then((response) => {
  //     if (response.data.msg === 'success') {
  //       alert("Message Sent.");
  //       this.resetForm()
  //     } else if (response.data.msg === 'fail') {
  //       alert("Message failed to send.")
  //     }
  //   })
  // }

  render() {
    const { users, sendEmailAll } = this.props;
    console.log(this.props);
    let test = users.map((user, i) => (
      <div key={i}>
        {user.email}
      </div>
    ))
    return (
      <div className="step3-cont">
      {test}
        <h1>Send Email</h1>
        <div className="press-card-cont" >
          <div className="press-comm-add-cont">
            <form id="contact-form" 
            // onSubmit={this.handleSubmit.bind(this)} method="POST"
            >
              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
              </div>
              <div className="form-group">
                <label for="message">Message</label>
                <textarea className="form-control" rows="5" id="message"></textarea>
              </div>
              <button type="submit" onClick={() => sendEmailAll(['erkver250@gmail.com'], 'test')} className="btn btn-primary">Submit</button>
            </form>
            <div className="link-cont">
              <Link
                to='/'
                className="link-btn" >{`< Previous Step`}</Link>
              <Link
                to='/admin/report/step4'
                className="link-btn" >Next Step ></Link>
            </div>
          </div>
          <div className="bottom-prComm-cont">
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({
  adminReducer,
  userReducer,
  screeningReducer
}) => ({
  ...adminReducer,
  ...userReducer,
  ...screeningReducer
});

export default withRouter(connect(mapStateToProps, {getUsersByParams, sendEmailAll})(NewEmail));