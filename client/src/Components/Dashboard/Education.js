import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteProfileEducation } from "../../Actions/ProfileActions";

class Education extends Component {
  onDelete = id => {
    this.props.deleteProfileEducation(id);
  };

  render() {
    const education = this.props.education.map(edu => {
      return (
        <tr key={edu._id}>
          <td>{edu.school}</td>
          <td>{edu.degree}</td>
          <td>
            <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
            {edu.to == null ? (
              "Now"
            ) : (
              <Moment format="YYYY/MM/DD">{edu.to}</Moment>
            )}
          </td>
          <td>
            <button
              onClick={() => this.onDelete(edu._id)}
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
        <h4 className="mb-4"> Education </h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteProfileEducation: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  deleteProfileEducation
};

export default connect(
  null,
  mapDispatchToProps
)(Education);
