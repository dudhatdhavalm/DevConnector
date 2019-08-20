import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../Common/Spinner";
import { getAllProfiles } from "../../Actions/ProfileActions";
import ProfileItem from "./ProfileItem";

class Profiles extends Component {
  render() {
    const { profiles, loading } = this.props.profileReducer;
    let profileItems;
    if (profiles == null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => {
          return <ProfileItem key={profile._id} profile={profile} />;
        });
      } else {
        profileItems = <h4>No Profile Found...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and Connect to developer
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.getAllProfiles();
  }
}

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profileReducer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profileReducer: state.profileReducer
});

const mapDispatchToProps = {
  getAllProfiles
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profiles);
