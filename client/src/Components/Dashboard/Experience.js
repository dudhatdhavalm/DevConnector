import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteProfileExperience } from "../../Actions/ProfileActions";

class Experience extends Component {
  onDelete = id => {
    this.props.deleteProfileExperience(id);
  };

  render() {
    const experience = this.props.experience.map(exp => {
      return (
        <tr key={exp._id}>
          <td>{exp.company}</td>
          <td>{exp.title}</td>
          <td>
            <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
            {exp.to == null ? (
              "Now"
            ) : (
              <Moment format="YYYY/MM/DD">{exp.to}</Moment>
            )}
          </td>
          <td>
            <button
              onClick={() => this.onDelete(exp._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
    return (
      <div>
        <h4 className="mb-4"> Experience </h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteProfileExperience: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  deleteProfileExperience
};

export default connect(
  null,
  mapDispatchToProps
)(Experience);
