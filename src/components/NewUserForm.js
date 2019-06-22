import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import {connect} from 'react-redux';
import {createUserRequest} from '../actions/users';

function NewUserForm(props) {
  const [state, setState] = useState({
    firstName: '',
    lastName: ''
  });

  const onChangeInput = e => {
    setState({...state, [e.target.name]: e.target.value})
  };

  const handleSubmit = e => {
    e.preventDefault();
    const {firstName, lastName} = state;

    // make http requests
    props.createUserRequest({
      firstName,
      lastName
    });

    setState({
      firstName: '',
      lastName: ''
    })
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>
          First name
        </Label>
        <Input name="firstName"
               placeholder="First Name"
               onChange={onChangeInput}
               value={state.firstName}
               required
        />
      </FormGroup>
      <FormGroup>
        <Label>
          Last name
        </Label>
        <Input name="lastName"
               placeholder="Last Name"
               onChange={onChangeInput}
               value={state.lastName}
               required
        />
      </FormGroup>
      <FormGroup>
        <Button block outline type="submit" color="primary">
          Create
        </Button>
      </FormGroup>
    </Form>
  );
}

export default connect(null, {createUserRequest})(NewUserForm);