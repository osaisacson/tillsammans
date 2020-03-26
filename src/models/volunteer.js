class Volunteer {
  constructor(
    id,
    förnamn,
    efternamn,
    telefon,
    email,
    address,
    beskrivning,
    grupp,
    datum,
    status
  ) {
    this.id = id;
    this.förnamn = förnamn;
    this.efternamn = efternamn;
    this.telefon = telefon;
    this.email = email;
    this.address = address;
    this.beskrivning = beskrivning;
    this.grupp = grupp;
    this.datum = datum;
    this.status = status;
  }
}

export default Volunteer;
