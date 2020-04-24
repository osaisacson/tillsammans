import React, { useState } from 'react';
import axios from 'axios';

import firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase.firestore();

const ContactForm = (props) => {
  const [formData, setFormData] = useState({});

  const updateInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    sendEmail();
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };
  const sendEmail = () => {
    axios
      .post(
        'https://us-central1-sverige-tillsammans.cloudfunctions.net/submit',
        formData
      )
      .then((res) => {
        alert('This seems to have gone well!');
        console.log('res: ', res);
        // db.collection('emails').add({
        //   name: formData.name,
        //   email: formData.email,
        //   message: formData.message,
        //   time: new Date(),
        // });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={updateInput}
          value={formData.name || props.name}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={updateInput}
          value={formData.email || props.email}
        />
        <textarea
          type="text"
          name="message"
          placeholder="Message"
          onChange={updateInput}
          value={formData.message || props.message}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default ContactForm;
