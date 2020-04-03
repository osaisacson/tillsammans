class Volunteer {
  constructor(
    id,
    gruppId,
    förnamn,
    efternamn,
    telefon,
    email,
    address,
    postkod,
    beskrivning,
    språk,
    födelseår,
    körkort,
    bil,
    mat,
    varor,
    ärenden,
    djur,
    prata,
    myndigheter,
    teknik,
    datum,
    status
  ) {
    this.id = id;
    this.gruppId = gruppId;
    this.förnamn = förnamn;
    this.efternamn = efternamn;
    this.telefon = telefon;
    this.email = email;
    this.address = address;
    this.postkod = postkod;
    this.beskrivning = beskrivning;
    this.språk = språk;
    this.födelseår = födelseår;
    this.körkort = körkort;
    this.bil = bil;
    this.mat = mat;
    this.varor = varor;
    this.ärenden = ärenden;
    this.djur = djur;
    this.prata = prata;
    this.myndigheter = myndigheter;
    this.teknik = teknik;
    this.datum = datum;
    this.status = status;
  }
}

export default Volunteer;
