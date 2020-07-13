import React from "react";

const FormInput = ({ handleChange, label, type, ...otherProps }) => (
  <div className="group">
    {type === "textarea" ? (
      <textarea
        className="form-control"
        rows="6"
        onChange={handleChange}
        {...otherProps}
      />
    ) : (
      <input className="form-input" onChange={handleChange} {...otherProps} />
    )}

    {label ? (
      <label
        className={`${
          otherProps.value && otherProps.value.length ? "shrink" : ""
        } form-input-label`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
