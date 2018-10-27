import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { sendEmailAll } from "../../Ducks/adminReducer";
import "./NewEmail.scss";


class NewEmail extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     message: ""
  //   }
  // }

  // componentDidMount() {
  //   const { getUsersByParams } = this.props;
    
  // }

  handleSubmit(e) {
    e.preventDefault();
    const message = document.getElementById('message').value;
    const subject = document.getElementById('subject').value;
    const { sendEmailAll, users } = this.props;
    let emails = [];
    users.map(user => emails.push(user.email));
    console.log(emails, subject);
    sendEmailAll(emails, message, subject).then((response) => {
      if (response.data.msg === 'success') {
        alert("Message Sent.");
        this.resetForm()
      } else if (response.data.msg === 'fail') {
        alert("Message failed to send.")
      }
    })
  }

  render() {
    // const { users, sendEmailAll } = this.props;
    // const { message } = this.state;
    console.log(this.props);
    return (
      <div className="main-email-cont">
        <h1>Send Email</h1>
        <div className="email-cont">
          <form className="form-cont" onSubmit={this.handleSubmit.bind(this)}>
            <label>Subject:</label>
            <input className="form-control" id="subject" placeholder="Subject"></input>
            <label>Message:</label>
            <textarea className="form-control" rows="5" id="message" placeholder="Message"></textarea>
            <button type="submit" className="btn btn-primary">Send Email</button>
          </form>
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

export default withRouter(connect(mapStateToProps, {sendEmailAll})(NewEmail));