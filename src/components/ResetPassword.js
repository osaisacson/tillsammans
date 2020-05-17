import React, { useState } from 'react';
import firebase from 'firebase/app';
import ResetPasswordForm from './ResetPasswordForm';

const ResetPassword = props => {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = event => {
        const { value, name } = event.target;
        if (name === 'email') {
            setEmail(value);
        }
    }
    
    const handleSubmit = event => {
        event.preventDefault();
        var auth = firebase.auth();
        setMessage("Processing...");
        auth.sendPasswordResetEmail(email).then(() => {
            setMessage("Email sent.");
        })
        .catch((err) => {
            setMessage(`${err.message}`);
        })
    }

    return (
        <ResetPasswordForm
            header={"Återställ ditt lösenord"}
            email={email}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            message={message}
        />
    )
}



export default ResetPassword;