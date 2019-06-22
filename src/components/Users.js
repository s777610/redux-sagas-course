import React from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { connect } from "react-redux";
import { deleteUserRequest } from "../actions/users";

const Users = ({ users, deleteUserRequest }) => {
  const onDeleteUser = userId => {
    // call action creator
    deleteUserRequest(userId);
  };

  return (
    <ListGroup>
      {users
        .sort((a, b) => {
          if (a.firstName > b.firstName) return 1;
          else if (a.firstName < b.firstName) return -1;
          else if (a.lastName > b.lastNmae) return 1;
          else return 0;
        })
        .map(user => {
          return (
            <ListGroupItem key={user.id}>
              <section className="user-section">
                <div className="user">
                  {user.firstName} {user.lastName}
                </div>
                <div>
                  <Button
                    outline
                    color="danger"
                    onClick={() => onDeleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </div>
              </section>
            </ListGroupItem>
          );
        })}
    </ListGroup>
  );
};

export default connect(
  null,
  { deleteUserRequest }
)(Users);
