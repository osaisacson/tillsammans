class Order {
  constructor(
    id,
    datum,
    typ,
    beskrivning,
    swish,
    kontant,
    faktura,
    tidsrymd,
    telefon,
    förnamn,
    efternamn,
    email,
    address,
    postkod,
    grupp,
    status
  ) {
    this.id = id;
    this.datum = datum;
    this.typ = typ;
    this.beskrivning = beskrivning;
    this.swish = swish;
    this.kontant = kontant;
    this.faktura = faktura;
    this.tidsrymd = tidsrymd;
    this.telefon = telefon;
    this.förnamn = förnamn;
    this.efternamn = efternamn;
    this.email = email;
    this.address = address;
    this.postkod = postkod;
    this.grupp = grupp;
    this.status = status;
  }
}

export default Order;
