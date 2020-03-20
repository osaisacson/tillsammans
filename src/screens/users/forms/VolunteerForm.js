import React from 'react';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

// The following component is an example of your existing Input Component
const Input = ({ label, register, required, placeholder, errorKey }) => (
  <>
    {/* <label>{label}</label> */}
    <Form.Group controlId={label}>
      <Form.Control
        name={label}
        placeholder={placeholder ? placeholder : label}
        ref={register({ required })}
      />
      {/* errors will return when field validation fails  */}
      {errorKey && <span className="error-text">{label} är inte ifyllt</span>}
    </Form.Group>
  </>
);

export default function VolunteerForm() {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    console.log(data);
  };

  console.log(watch('example')); // watch input value by passing the name of it

  return (
    <div className="form">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Row>
          <Col>
            <Input
              label="Förnamn"
              register={register}
              errorKey={errors.Förnamn}
              required
            />
          </Col>
          <Col>
            <Input
              label="Efternamn"
              register={register}
              errorKey={errors.Efternamn}
              required
            />
          </Col>
        </Form.Row>
        <h3>Var når vi dig?</h3>
        <Form.Row>
          <Col>
            <Input
              label="Telefonnummer"
              register={register}
              errorKey={errors.Telefonnummer}
              required
            />
          </Col>
          <Col>
            <Input
              label="Email"
              placeholder="e-post"
              type="email"
              register={register}
              errorKey={errors.Email}
              required
            />
          </Col>
        </Form.Row>
        <h3>Var bor du?</h3>
        <Form.Row>
          <Col>
            <Input
              label="Address"
              register={register}
              errorKey={errors.Address}
              required
            />
          </Col>
          <Col>
            <Input
              label="Postkod"
              register={register}
              errorKey={errors.Postkod}
              required
            />
          </Col>
        </Form.Row>

        <h3>Skriv en kort beskrivning av dig själv</h3>
        <Form.Group controlId="t-1">
          <Form.Control
            as="textarea"
            rows="3"
            name="Beskrivning"
            // defaultValue={'tidigare värde'} Såhär fixar vi edit form senare
            placeholder="Jag har inget körkort men en cykel och väldigt starka ben..."
            ref={register}
          />
        </Form.Group>

        <Button type="submit" variant="secondary" size="lg" block>
          Skicka
        </Button>

        <h4>
          Du kommer bli kontaktad av en stödsamordnare så snart som möjligt
        </h4>
      </Form>
    </div>
  );
}
