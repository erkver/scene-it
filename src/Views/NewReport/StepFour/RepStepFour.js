import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAudComments } from '../../../Ducks/audCommentReducer';
import AudComment from '../../../Components/AudComment/AudComment';
import axios from 'axios';
import './RepStepFour.scss';

class RepStepFour extends Component {
  constructor() {
    super();
    this.state = {
      comments: [],
      comment: '',
      gender: 'default',
      age: 0
    };
  }

  componentDidMount() {
    this.getAllComments();
  }

  componentDidUpdate(prevProps, prevState) {
    const { comments } = this.state;
    if (comments.length !== prevState.comments.length) {
      this.getAllComments();
    } else if (
      comments.length === 1 &&
      comments[0].gender !== prevState.comments[0].gender
    ) {
      this.getAllComments();
    } else if (
      comments.length === 1 &&
      comments[0].comment !== prevState.comments[0].comment
    ) {
      this.getAllComments();
    } else if (
      comments.length === 1 &&
      comments[0].age !== prevState.comments[0].age
    ) {
      this.getAllComments();
    }
  }

  getAllComments = () => {
    const { report, getAudComments } = this.props;
    getAudComments(report[0] && +report[0].tr_id)
      .then(res => this.setState({ comments: res.value.data }))
      .catch(err => console.log(err));
  };

  addAudienceComments = e => {
    e.preventDefault();
    const { comment, gender, age } = this.state;
    let reportId = this.props.report[0].tr_id;
    axios
      .post('/api/comment/audience', { gender, age, comment, reportId })
      .then(res => {
        this.setState({
          comments: res.data,
          gender: 'default',
          age: 0,
          comment: ''
        });
      });
  };

  editAudComment = (id, gender, age, comment) => {
    axios
      .put(`/api/comment/audience/${id}`, {
        gender,
        age,
        comment
      })
      .then(res => this.setState({ comments: res.data }))
      .catch(err => console.log(err));
  };

  deleteAudComment = id => {
    axios
      .delete(`/api/comment/audience/${id}`)
      .then(res => this.setState({ comments: res.data }))
      .catch(err => console.log(err));
  };

  renderAudComments = () => {
    const { audienceComments } = this.props;
    let audienceCommList = audienceComments.map((aComm, i) => (
      <div className="main-single-aComm-cont" key={i}>
        <AudComment
          aComm={aComm}
          getAllComments={this.getAllComments}
          editAudComment={this.editAudComment}
          deleteAudComment={this.deleteAudComment}
        />
      </div>
    ));
    return (
      <>
        <h3>Addded Audience Comments</h3>
        {audienceCommList}
      </>
    );
  };

  render() {
    const { comment, gender, age } = this.state;
    const { report, screening, audienceComments } = this.props;
    return (
      <div className="step4-cont">
        <h1>
          {screening[0]
            ? `${screening[0].title} - Audience Comments`
            : 'Audience Comments'}
        </h1>
        <div className="aud-card-cont">
          <form className="top-aComm-cont" onSubmit={this.addAudienceComments}>
            <div className="aud-comm-cont">
              <p style={{ marginTop: '0' }}>Audience comment:</p>
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
                onChange={e => this.setState({ gender: e.target.value })}
              >
                <option disabled hidden value="default">
                  Select Gender
                </option>
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
              className="final-rev-btn"
            >
              Review All Report Info
            </Link>
            <div className="link-cont">
              <Link to="/admin/report/step3" className="link-btn">
                {`< Previous Step`}
              </Link>
            </div>
          </form>
          <div className="bottom-aComm-cont">
            {!audienceComments[0] ? null : this.renderAudComments()}
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
  screeningReducer
}) => ({
  ...reportReducer,
  ...userReducer,
  ...audCommentReducer,
  ...screeningReducer
});

export default connect(
  mapStateToProps,
  { getAudComments }
)(RepStepFour);
