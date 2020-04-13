import React, { useState, useRef } from 'react';
import Chevron from './Chevron';

function Accordion(props) {
  const [setActive, setActiveState] = useState('');
  const [setHeight, setHeightState] = useState('0px');
  const [setRotate, setRotateState] = useState('accordion-icon');

  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === '' ? 'active' : '');
    setHeightState(
      setActive === 'active' ? '0px' : `${content.current.scrollHeight}px`
    );
    setRotateState(
      setActive === 'active' ? 'accordion-icon' : 'accordion-icon rotate'
    );
  }

  return (
    <div className="flex-column">
      <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
        <p className="accordion-title">{props.title}</p>
        <Chevron className={`${setRotate}`} width={10} fill={'#fff'} />
      </button>
      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className="accordion-content"
      >
        <div
          className="accordion-text"
          dangerouslySetInnerHTML={{ -html: props.content }}
        />
      </div>
    </div>
  );
}

export default Accordion;
