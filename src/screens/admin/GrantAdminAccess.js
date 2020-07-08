import React, { useState } from "react";

import firebase from "firebase/app";
import "firebase/firestore";

import Button from "react-bootstrap/Button";
import FormInput from "../../components/FormInput";

const GrantAdminAccess = (props) => {
  // Allows main admins to grant main admin or group admin privileges to any registered user account
  return (
    <React.Fragment>
      <h3>Här kan du sätta/ändra privilegier för antingen...</h3>
      <GrantGroupAdmin groups={props.groups} />
      <h3>...eller:</h3>
      <GrantMainAdmin />
    </React.Fragment>
  );
};

const GrantMainAdmin = (props) => {
  const [email, setEmail] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setResultMessage("Uppdaterar...");
    var addAdmin = firebase.functions().httpsCallable("addAdmin");
    addAdmin({ email: email })
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

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === "email") {
      setEmail(value);
    }
  };

  return (
    <div className="page-layout">
      <h4>Huvudadminprivilegier</h4>
      <p>
        Denna användare kan då komma in på alla sidor. Används sällan, och ska
        bara vara för de som har huvudansvaret för hela siten - exempelvis
        samordnare.
      </p>
      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="text"
          handleChange={handleChange}
          value={email}
          label="E-post till den som ska bli huvudadministratör"
          required
        />
        <Button type="submit" block>
          Jag vet vad jag gör, ge ovan huvudprivilegier
        </Button>
        <p>
          {resultMessage} {errorMessage}
        </p>
      </form>
    </div>
  );
};

const GrantGroupAdmin = (props) => {
  const [email, setEmail] = useState("");
  const [groupID, setgroupID] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setResultMessage("Jobbar...");
    var addAdmin = firebase.functions().httpsCallable("addGroupAdmin");
    addAdmin({ email: email, groupID: groupID })
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

  const handleChange = (event) => {
    const { value, name } = event.target;

    if (name === "email") {
      setEmail(value);
    }
    if (name === "groupID") {
      setgroupID(value);
    }
  };

  return (
    <div className="page-layout">
      <h4>Gruppadminprivilegier</h4>
      <p>Används för gruppadmins och deras suppleanter</p>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="text"
          handleChange={handleChange}
          value={email}
          label="E-post till den som ska bli gruppadmin"
          required
        />

        <p> Välj för vilken grupp</p>
        {props.groups.map((item) => {
          return (
            <div className="form-check" key={item.id}>
              <label>
                <input
                  type="radio"
                  name={"groupID"}
                  value={item.id}
                  checked={groupID === item.id}
                  className="form-check-input"
                  onChange={handleChange}
                />
                {item.gruppnamn}
              </label>
            </div>
          );
        })}
        <Button type="submit" block>
          Ge ovan gruppadminprivilegier
        </Button>
        <p>
          {resultMessage} {errorMessage}
        </p>
      </form>
    </div>
  );
};

export default GrantAdminAccess;
