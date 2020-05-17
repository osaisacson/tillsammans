import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChangePassword from '../../components/ChangePassword';
import firebase from 'firebase/app';

const Account = props => {

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

    return( 
    
        <React.Fragment>
        <h3>Hej {user.email}</h3>
        <ChangePassword
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