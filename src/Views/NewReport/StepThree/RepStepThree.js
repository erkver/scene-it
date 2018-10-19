import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { addPressComment } from "../../../Ducks/reportReducer";
import "./RepStepThree.scss";


class RepStepThree extends Component {
  constructor() {
    super();
    this.state = {
      comment: '',
      name: '',
      outlet: ''
    }
  }
  render() {
    const { comment, name, outlet } = this.state;
    const { report } = this.props;
    // console.log(this.props);
    return (
      <div className="step3-cont">
        <h1>Create Report</h1>
        <div className="press-card-cont" >
          <div className="press-comm-cont">
            <p>Press comment:</p>
            <textarea
              required
              placeholder="Add one comment at a time"
              value={comment}
              rows="3"
              onChange={e => this.setState({ comment: e.target.value })}
            />
          </div>
          <div className="press-comm-cont">
            <p>Press Member:</p>
            <input
              required
              placeholder="Name"
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="press-comm-cont">
            <p>Outlet:</p>
            <input
              required
              placeholder="Oulet"
              value={outlet}
              onChange={e => this.setState({ outlet: e.target.value })}
            />
          </div>
          <button onClick={() => {
            addPressComment(name, outlet, report[0].tr_id, comment);
            this.setState({ name: "", outlet: "", comment: "" })
          }}
          >Add Comment</button>
          <div className="link-cont">
            <Link to='/admin/reports/review' className="submit-btn" >Review Report</Link>
            <Link
              to='/admin/add/report/step4'
              className="submit-btn" >Next Step</Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({
  reportReducer,
  userReducer
}) => ({
  ...reportReducer,
  ...userReducer
});

export default withRouter(connect(mapStateToProps, { addPressComment })(RepStepThree));