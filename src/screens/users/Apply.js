import React from 'react';

export default function Apply() {
  return (
    <div className="page-layout">
      <h2>Ansök om assistans</h2>
      <p>Här ska det vara ett formulär för att ansöka om hjälp</p>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
