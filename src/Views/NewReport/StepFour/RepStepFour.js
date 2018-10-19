import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { addAudComment } from "../../../Ducks/audCommentReducer";
import "./RepStepFour.scss";

class RepStepFour extends Component {
  constructor() {
    super();
    this.state = {
      comment: "",
      gender: "",
      age: 0
    };
  }
  render() {
    const { comment, gender, age } = this.state;
    const { report } = this.props;
    console.log(this.state);
    return (
      <div className="step4-cont">
        <h1>Create Report</h1>
        <div className="aud-card-cont">
          <div className="aud-comm-cont">
            <p>Audience comment:</p>
            <textarea
              required
              placeholder="Add one comment at a time"
              value={comment}
              rows="3"
              onChange={e => this.setState({ comment: e.target.value })}
            />
          </div>
          <div className="aud-comm-cont">
            <p>Gender:</p>
            <select
              defaultValue="default"
              onChange={e => this.setState({ gender: e.target.value })}>
              <option disabled hidden value="default" >Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div className="aud-comm-cont">
            <p>Age:</p>
            <input
              required
              placeholder="Age"
              type="number"
              value={age}
              onChange={e => this.setState({ age: e.target.value })}
            />
          </div>
          <button
            onClick={() => {
              addAudComment(gender, age, comment, report[0].tr_id);
              this.setState({ gender: "", age: 0, comment: "" });
            }}
          >
            Add Comment
          </button>
          <div className="link-cont">
            <Link to={`/admin/report/${report[0].tr_id}`} className="submit-btn">
              Review All Report Info
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ 
  reportReducer, 
  userReducer, 
  audCommentReducer }) => ({
  ...reportReducer,
  ...userReducer, 
  ...audCommentReducer
});

export default withRouter(
  connect(
    mapStateToProps,
    { addAudComment }
  )(RepStepFour)
);
