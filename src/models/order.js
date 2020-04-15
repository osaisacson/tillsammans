class Order {
  constructor(
    id,
    gruppId,
    volontärId,
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
    status,
    kommentarer,
    skickadBeställare,
    skickadGrupp,
    skickadVolontär
  ) {
    this.id = id;
    this.gruppId = gruppId;
    this.volontärId = volontärId;
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
    this.status = status;
    this.kommentarer = kommentarer;
    this.skickadBeställare = skickadBeställare;
    this.skickadGrupp = skickadGrupp;
    this.skickadVolontär = skickadVolontär;
  }
}

export default Order;
