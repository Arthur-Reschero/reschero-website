/* =====================================================================
   EINSTELLUNGEN – hier ändern Sie die wichtigsten Angaben der Seite.
   Nur den Text zwischen den Anführungszeichen ändern. Komma am Ende
   jeder Zeile stehen lassen.
   ===================================================================== */

window.EINSTELLUNGEN = {

  // Adresse der Seite (ohne Schrägstrich am Ende)
  webadresse: "https://reschero.de",

  // Geheimer Zugang: Die Seite öffnet sich nur mit diesem Link:
  //   https://reschero.de/?zugang=messe-lnpwm8zzto
  // Wer den Link einmal geöffnet hat, kommt auf diesem Gerät auch ohne
  // den Zusatz wieder rein. Leer lassen ("") = Seite für alle offen.
  // Hinweis: Das ist ein Sichtschutz, kein echter Passwortschutz.
  zugangsschluessel: "messe-lnpwm8zzto",

  // Ihre E-Mail-Adresse  >>> BITTE PRÜFEN <<<
  email: "kontakt@reschero.de",

  // Ihr Name, wie er auf der Seite stehen soll
  name: "Arthur Reschke",

  // Messe-Hinweis oben auf der Startseite. Leer lassen = kein Hinweis.
  messeHinweis: "",

  // Minijob-Verdienstgrenze pro Monat in Euro (2026: 603, ab 2027: 633)
  minijobGrenze: 603,

  // Impressum und Datenschutz unten auf der Seite verlinken?
  // true = anzeigen, false = ausblenden. Vorher die Platzhalter in
  // impressum.html und datenschutz.html ausfüllen!
  impressumAnzeigen: false,

  // Messe-Modus: Nach so vielen Minuten ohne Berührung springt die Seite
  // zurück zur Startseite (nur wenn der Messe-Modus eingeschaltet ist).
  messeModusZurueckNachMinuten: 3
};
