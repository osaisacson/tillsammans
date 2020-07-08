import React, { useEffect, useState } from "react";

import firebase from "firebase/app";
import "firebase/firestore";

import { Editor } from "@tinymce/tinymce-react";
import Button from "react-bootstrap/Button";
import moment from "moment";

import Group from "./../models/group";

import FormInput from "./FormInput";

const FormToEmail = (props) => {
  const [groupData, setGroupData] = useState({
    currentGroup: [],
  });

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [html, setHtml] = useState("Välj ovan för att se mail mallar");
  const [resultMessage, setResultMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const firestore = firebase.firestore();

  //Get group data
  async function getGroups() {
    const groups = [];
    const querySnapshot = await firestore.collection("groups").get();
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      const resData = doc.data();
      const readableDate = moment(new Date(resData.datum)).format("lll");

      groups.push(
        new Group(
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

    //set current group data as the object which matches the passed group id
    setGroupData({
      currentGroup: groups.find((data) => data.id === props.groupId),
    });
  }

  useEffect(() => {
    getGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <h4>Sätt grupp och skicka email</h4>
        <p>Välj grupp beställningen ska gå till nedan</p>

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
