import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { sendEmailAll } from '../../Ducks/adminReducer';
import './NewEmail.scss';

class NewEmail extends Component {
  handleSubmit(e) {
    // e.preventDefault();
    const message = document.getElementById('message').value;
    const subject = document.getElementById('subject').value;
    const { sendEmailAll, users } = this.props;
    let emails = [];
    users.map(user => emails.push(user.email));
    sendEmailAll(emails, message, subject).then(() => this.resetForm());
  }

  render() {
    return (
      <div className="main-email-cont">
        <h1>Send Email</h1>
        <div className="email-cont">
          <form className="form-cont" onSubmit={this.handleSubmit.bind(this)}>
            <label>Subject:</label>
            <input
              className="form-control"
              id="subject"
              placeholder="Subject"
            />
            <label>Message:</label>
            <textarea
              className="form-control"
              rows="5"
              id="message"
              placeholder="Message"
            />
            <Link
              onClick={e => this.handleSubmit(e)}
              to="/"
              className="btn btn-primary"
            >
              Send Email
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ adminReducer, userReducer, screeningReducer }) => ({
  ...adminReducer,
  ...userReducer,
  ...screeningReducer
});

export default connect(
  mapStateToProps,
  { sendEmailAll }
)(NewEmail);
