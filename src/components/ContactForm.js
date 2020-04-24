import React, { Component } from 'react';
import firebase from 'firebase/app';

class ContactForm extends Component {
  handleSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const sendEmailThroughForm = firebase
      .functions()
      .httpsCallable('sendEmailThroughForm');

    sendEmailThroughForm({
      email: email,
      subject: subject,
      message: message,
    })
      .then(function (result) {
        // Read result of the Cloud Function.
        const email = result.data.email;
        const subject = result.data.subject;
        const message = result.data.message;
        alert(`email: ${email}, subject: ${subject}, message: ${message}`);
      })
      .catch(function (error) {
        // Getting the Error details.
        var code = error.code;
        var message = error.message;
        var details = error.details;
        console.log('Error when trying to send email through form: ');
        console.log('code: ', code);
        console.log('message: ', message);
        console.log('details: ', details);
      });
  }

  resetForm() {
    document.getElementById('contact-form').reset();
  }

  render() {
    return (
      <div>
        <form id="contact-form" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input type="text" className="form-control" id="subject" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea className="form-control" rows="5" id="message"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default ContactForm;
