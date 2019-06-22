/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUsersRequest, usersError } from "../actions/users";
import Users from "./Users";
import NewUserForm from "./NewUserForm";
import { Alert } from "reactstrap";

function App(props) {
  useEffect(() => {
    props.getUsersRequest();
  }, []);

  const handleCloseAlert = () => {
    props.usersError({
      error: ""
    });
  };

  return (
    <div className="app">
      <Alert
        color="danger"
        isOpen={!!props.users.error}
        toggle={handleCloseAlert}
      >
        {props.users.error}
      </Alert>
      <NewUserForm />
      <Users users={props.users.items} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

export default connect(
  mapStateToProps,
  {
    getUsersRequest,
    usersError
  }
)(App);
