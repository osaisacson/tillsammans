class Volunteer {
  constructor(
    id,
    datum,
    förnamn,
    efternamn,
    beskrivning,
    email,
    telefon,
    address,
    postkod,
    grupp,
    status
  ) {
    this.id = id;
    this.datum = datum;
    this.förnamn = förnamn;
    this.efternamn = efternamn;
    this.beskrivning = beskrivning;
    this.email = email;
    this.telefon = telefon;
    this.address = address;
    this.postkod = postkod;
    this.grupp = grupp;
    this.status = status;
  }
}

export default Volunteer;
