import React, { useState } from "react";

import firebase from "firebase/app";
import "firebase/firestore";
import FormInput from "../components/FormInput";
import Button from "react-bootstrap/Button";

const ContactForm = (props) => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [html, setHtml] = useState("");

  const [resultMessage, setResultMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "subject") {
      setSubject(value);
    }
    if (name === "html") {
      setHtml(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendEmail();
  };

  const sendEmail = () => {
    var sendEmailFromForm = firebase
      .functions()
      .httpsCallable("sendEmailFromForm");
    sendEmailFromForm({ email: email, subject: subject, html: html })
      .then(function (result) {
        var resultMessage = result.data.result;
        setResultMessage(resultMessage);
      })
      .catch(function (error) {
        var code = error.code;
        var errorMessage = error.message;
        var details = error.details;
        setErrorMessage(`${code}: ${errorMessage} - ${details}`);
      });
  };

  return (
    <>
      <div className="page-layout">
        <h4>Sätt grupp och skicka email</h4>
        <p>Välj grupp beställningen ska gå till nedan</p>
        <form onSubmit={handleSubmit}>

  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
  <label className="form-check-label" for="exampleRadios1">
    Default radio
  </label>

          
          <FormInput
            name="email"
            type="text"
            handleChange={handleChange}
            value={email}
            label="Mottagarens email"
            required
          />
          <FormInput
            name="subject"
            type="text"
            handleChange={handleChange}
            value={subject}
            label="Ämne"
            required
          />
          <FormInput
            name="html"
            type="textarea"
            handleChange={handleChange}
            value={html}
            label="Innehåll"
            required
          />
          <Button type="submit" block>
            Skicka mail
          </Button>
          <p>
            {resultMessage} {errorMessage}
          </p>
        </form>
      </div>
    </>
  );
};

export default ContactForm;
