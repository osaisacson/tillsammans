import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ChangePasswordForm from '../../components/ChangePasswordForm';
import firebase from 'firebase/app';

const Account = props => {

  // Admin account panel

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const user = useSelector((state) => state.auth.user);

  console.log(user);

  const handleChange = event => {
    const { value, name } = event.target;
    if (name === 'newPassword') {
      setNewPassword(value);
    }
    if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (newPassword === confirmPassword) {
      setMessage("Processing...")
      var user = firebase.auth().currentUser;
      user.updatePassword(newPassword).then(() => {
        setMessage("Password updated successfully.");
      })
        .catch((err) => {
          setMessage(`${err.message}`)
        })
    } else {
      setMessage("Passwords must match.");
    }
  }

  return (

    <React.Fragment>
      <h3>Hej {user.email}</h3>
      <Link to="/admin"><Button>Gå till admin</Button></Link>
      <ChangePasswordForm
        header={'Ändra ditt lösenord'}
        message={message}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        newPassword={newPassword}
        confirmPassword={confirmPassword} />
    </React.Fragment>
  )
}

export default Account;