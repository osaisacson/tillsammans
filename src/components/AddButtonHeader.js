import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const AddButtonHeader = ({
  headerText,
  buttonTextSimple,
  buttonText,
  formForModal,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="flex-spread">
      {headerText ? <h2>{headerText}</h2> : null}
      <Button className="add-button" onClick={handleShow}>
        {buttonTextSimple ? buttonTextSimple : `+ Lägg till ny ${buttonText}`}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>{formForModal}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Stäng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddButtonHeader;
