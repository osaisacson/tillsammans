class Group {
  constructor(
    id,
    datum,
    gruppnamn,
    länkNamn,
    kontakt,
    kommentarer,
    telefon,
    email,
    reserv,
    reservTelefon,
    reservEmail,
    address,
    postkod,
    status
  ) {
    this.id = id;
    this.datum = datum;
    this.gruppnamn = gruppnamn;
    this.länkNamn = länkNamn;
    this.kontakt = kontakt;
    this.kommentarer = kommentarer;
    this.telefon = telefon;
    this.email = email;
    this.reserv = reserv;
    this.reservTelefon = reservTelefon;
    this.reservEmail = reservEmail;
    this.address = address;
    this.postkod = postkod;
    this.status = status;
  }
}

export default Group;
