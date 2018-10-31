import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getAudComments, addAudComment } from "../../../Ducks/audCommentReducer";
import AudComment from "../../../Components/AudComment/AudComment";
import "./RepStepFour.scss";

class RepStepFour extends Component {
  constructor() {
    super();
    this.state = {
      comment: "",
      gender: "default",
      age: 0
    }
  }

  componentDidMount() {
    const { report, getAudComments } = this.props;
    getAudComments(report[0] && +report[0].tr_id);
  }

  componentDidUpdate(prevProps) {
    const { getAudComments, audienceComments, audienceComment, report } = this.props;
    // console.log("comments:", pressComments,
    // "prevProps:", prevProps.pressComments);
    if (audienceComments.length !== prevProps.audienceComments.length || audienceComment !== prevProps.audienceComment) {
      getAudComments(report[0].tr_id);
    }
  }

  addAudienceComments = (e) => {
    const { addAudComment, report } = this.props;
    const { comment, gender, age } = this.state;
    addAudComment(gender, age, comment, report[0].tr_id);
    this.setState({ gender: "default", age: 0, comment: "" }); 
    e.preventDefault();   
  }

  renderAudComments = () => {
    const { audienceComments } = this.props;
    let audienceCommList = audienceComments.map((aComm, i) => (
      <div className="main-single-aComm-cont" key={i}>
        <AudComment aComm={aComm} />
      </div>
    ));
    return (<><h3>Addded Audience Comments</h3>{audienceCommList}</>); 
  }

  render() {
    const { comment, gender, age } = this.state;
    const { report, screening, audienceComments } = this.props;
    // console.log(this.state);
    // console.log(this.props);
    return (
      <div className="step4-cont">
        <h1>{screening[0] ? `${screening[0].title} - Audience Comments` : "Audience Comments"}</h1>
        <div className="aud-card-cont">
          <form className="top-aComm-cont" onSubmit={this.addAudienceComments}>
            <div className="aud-comm-cont">
              <p style={{"marginTop": "0"}}>Audience comment:</p>
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
                value={gender}
                required
                onChange={e => this.setState({ gender: e.target.value })}>
                <option disabled hidden value="default" >Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="age-btn-cont">
              <div className="age-comm-cont">
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
              type="submit"
              value="submit"
                // onClick={() => this.addAudienceComments()}
              >
                Add Comment
              </button>
            </div>
            <Link 
              to={`/admin/report/final/${report[0] && report[0].tr_id}`} 
              className="final-rev-btn">
              Review All Report Info
            </Link>
            <div className="link-cont">
              <Link to="/admin/report/step3" className="link-btn">
                {`< Previous Step`}
              </Link>
            </div>
          </form>
          <div className="bottom-aComm-cont">
            {!audienceComments[0] 
              ? <></>
              : this.renderAudComments()
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ 
  reportReducer, 
  userReducer, 
  audCommentReducer,
  screeningReducer }) => ({
  ...reportReducer,
  ...userReducer, 
  ...audCommentReducer,
  ...screeningReducer
});

export default withRouter(
  connect(
    mapStateToProps,
    { getAudComments, addAudComment }
  )(RepStepFour)
);
