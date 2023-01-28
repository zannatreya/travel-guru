import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../../../Contexts/Contexts/AuthProvider";

const Register = () => {
  const { createUser, updateUserProfile, verifyEmail } =
    useContext(AuthContext);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, email, password, photoURL);

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log("user", user);
        form.reset();
        setError("");
        handleUpdateUserProfile(name, photoURL);
        handleVerifyEmail();
      })
      .catch((error) => {
        console.error("error", error);
        setError(error.message);
      });
  };

  const handleVerifyEmail = () => {
    verifyEmail()
      .then(() => {})
      .catch((error) => {
        console.error("error", error);
      });
  };

  const handleUpdateUserProfile = (name, photoURL) => {
    const profile = {
      displayName: name,
      photoURL: photoURL,
    };
    updateUserProfile(profile)
      .then(() => {})
      .catch((e) => console.error(e));
  };
  return (
    <Form className="w-50 mx-auto" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Your Name</Form.Label>
        <Form.Control name="name" type="text" placeholder="Enter name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>PhotoURL</Form.Label>
        <Form.Control
          name="photoURL"
          type="text"
          placeholder="Enter PhotoURL"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control name="email" type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name="password" type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Register
      </Button>
      <Form.Text className="text-danger">{error}</Form.Text>
    </Form>
  );
};

export default Register;
