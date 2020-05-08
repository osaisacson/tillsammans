import React from 'react';
import Badge from 'react-bootstrap/Badge';

const RenderBadge = props => (
  <Badge pill variant={props.bool ? 'success' : 'secondary'}>
    {props.bool ? 'JA' : 'NEJ'}
  </Badge>
);

export default RenderBadge;
