import React, { useEffect, useState } from "react";

import firebase from "firebase/app";
import "firebase/firestore";

import { Editor } from "@tinymce/tinymce-react";
import Button from "react-bootstrap/Button";
import moment from "moment";

import Volunteer from "./../models/volunteer";

import FormInput from "./FormInput";

const FormToEmail = (props) => {
  let currentGroup;
  let defaultEmail = "";
  let defaultSubject = "";
  let volunteersForGroup;
  let title;
  let formTemplate;

  const { actionInForm, groupData, formData } = props;

  if (actionInForm === "sendAndUpdateGroup") {
    currentGroup = groupData.find((data) => data.id === formData.gruppId);
    title = `Skicka information om beställningen till gruppledare och reserv för ${currentGroup.gruppnamn}`;
    defaultEmail = `${currentGroup.email}, ${currentGroup.reservEmail}`;
    defaultSubject = `Ny beställning mottagen från ${formData.förnamn} ${formData.efternamn}`;
    formTemplate = ""; //TBD: Template for sending order to a group
  }

  if (actionInForm === "sendAndUpdateToConfirmed") {
    title = `Skicka bekräftelse till ${formData.förnamn} ${formData.efternamn} att vi mottagit deras beställning`;
    defaultEmail = formData.email;
    defaultSubject = `Tack för din beställning!`;
    formTemplate = ""; //TBD: Template for sending a confirmation of receipt to the ordering individual
  }

  if (actionInForm === "sendAndUpdateVolunteer") {
    if (formData.gruppId && formData.gruppId !== "0") {
      volunteersForGroup = getVolunteers(formData.groupId);
    }
    formTemplate = ""; //TBD: Template for sending a confirmation of receipt to the ordering individual
  }

  const [email, setEmail] = useState(defaultEmail);
  const [subject, setSubject] = useState(defaultSubject);
  const [html, setHtml] = useState("Välj ovan för att se mail mallar");
  const [resultMessage, setResultMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const firestore = firebase.firestore();

  //Get group data
  async function getVolunteers(groupId) {
    const volunteers = [];
    const querySnapshot = await firestore.collection("volunteers").get();
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      const resData = doc.data();
      const readableDate = moment(new Date(resData.datum)).format("lll");

      volunteers.push(
        new Volunteer(
          doc.id,
          readableDate,
          resData.gruppnamn,
          resData.länkNamn,
          resData.kontakt,
          resData.kommentarer,
          resData.telefon,
          resData.email,
          resData.reserv,
          resData.reservTelefon,
          resData.reservEmail,
          resData.address,
          resData.postkod,
          resData.status
        )
      );
    });

    const currentVolunteers = volunteers.find(
      (data) => data.gruppId === groupId
    );
    return currentVolunteers;
  }

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "subject") {
      setSubject(value);
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

  const handleEditorChange = (content, editor) => {
    setHtml(content);
    console.log("Content was updated:", content);
  };

  return (
    <>
      <div className="page-layout">
        <h4>Skicka email</h4>
        <p>{title}</p>

        <form onSubmit={handleSubmit}>
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
          <Editor
            apiKey="xofwa8g6vmgtapxbm8yb9vr3ho8qghrlss2oplxwybnop9z6"
            initialValue={`<p>${html}</p>`}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
            }}
            onEditorChange={handleEditorChange}
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

export default FormToEmail;
