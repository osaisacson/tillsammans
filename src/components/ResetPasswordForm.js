import React from 'react';
import FormInput from './FormInput';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ResetPasswordForm = (props) => {
    return (
    <div className="sign-in page-layout">
            {props.topHeader ? <h6>{props.topHeader}</h6> : null}
            <h2>{props.header}</h2>
            <p>{props.message}</p>

            <form onSubmit={props.handleSubmit}>
                <FormInput
                    name="email"
                    type="text"
                    value={props.email}
                    handleChange={props.handleChange}
                    label="E-mail"
                    required
                />
                <Button type="submit" block>
                    Skicka e-mail
                </Button>
                <br />
                <Link to="/login">
                    <Button block>Tillbaka till inloggningssidan</Button>
                </Link>
        </form>
    </div>
    )
}

export default ResetPasswordForm;