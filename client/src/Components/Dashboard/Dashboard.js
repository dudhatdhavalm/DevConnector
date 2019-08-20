import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getCurrentUserProfile,
  deleteAccount
} from "../../Actions/ProfileActions";
import Spinner from "../Common/Spinner";
import { Link } from "react-router-dom";
import ProfilActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";

class Dashboard extends Component {
  onDeleteClick = e => {
    this.props.deleteAccount();
  };

  render() {
    const { user } = this.props.authReducer;
    const { profile, loading } = this.props.profileReducer;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check profile object empty
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-nuted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfilActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div style={{ marginBottom: 60 }} />
            <button className="btn btn-danger" onClick={this.onDeleteClick}>
              DELETE MY ACCOUNT
            </button>
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-nuted">Welcome {user.name}</p>
            <p>
              You have not yet setup your profile, Please add your information
            </p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="col-md-12">
            <h1 className="display-4">DashBoard </h1>
            {dashboardContent}
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.getCurrentUserProfile();
  }
}

Dashboard.propTypes = {
  getCurrentUserProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profileReducer: PropTypes.object.isRequired,
  authReducer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profileReducer: state.profileReducer,
  authReducer: state.authReducer
});

const mapDispatchToProps = {
  getCurrentUserProfile,
  deleteAccount
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
