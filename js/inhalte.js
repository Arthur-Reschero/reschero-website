/* =====================================================================
   INHALTE – alle Texte der Seite. Sie können hier jeden Text ändern.
   Regeln: Text steht zwischen "Anführungszeichen". Nach jedem Eintrag
   ein Komma. Ein Anführungszeichen im Text so schreiben: \"
   Bei den automatischen Schritten bedeutet:
     typ: "auto"   = passiert automatisch (grün)
     typ: "mensch" = Sie schauen drüber (orange)
   Zeiten stehen in Stunden pro Monat, Kommazahlen mit Punkt: 2.5
   ===================================================================== */

window.INHALTE = {

  start: {
    ueberschrift: "Weniger Papierkram. Mehr Zeit fürs Handwerk.",
    unterzeile: "Ich schaue mir an, wie Ihr Büro heute arbeitet. Dann automatisiere ich die Schritte, die Zeit fressen. Sie arbeiten weiter mit Ihren gewohnten Programmen.",
    kachelHinweis: "Tippen Sie auf einen Bereich. Sie sehen den Ablauf heute, den Ablauf automatisiert und ein Rechenbeispiel.",
    beispielHinweis: "Alle Beispiele nutzen einen erfundenen Betrieb: Holzmann Haustechnik (Heizung und Sanitär, 5 Mitarbeiter, 40 Rechnungen pro Monat). Alle Zeitangaben sind Beispielrechnungen mit offenen Annahmen, keine Versprechen."
  },

  bereiche: [

    /* ------------------------------------------------------------- */
    {
      id: "rechnungen",
      titel: "Rechnungen",
      symbol: "rechnung",
      kurz: "Aus Stunden und Material wird automatisch ein Rechnungsentwurf.",
      heute: {
        schritte: [
          "Monteur schreibt Stunden und Material auf einen Zettel oder ins Auftragsbuch.",
          "Zettel liegen im Auto, im Büro oder in der Jackentasche.",
          "Abends oder am Wochenende sucht der Chef die Zettel zusammen.",
          "Stunden und Material werden ins Rechnungsprogramm abgetippt.",
          "Materialpreise werden in Lieferantenrechnungen nachgeschlagen.",
          "Bei Unklarheiten: Anruf beim Monteur. „Wie lange wart ihr da?“",
          "Die Rechnung geht raus, oft Wochen nach dem Einsatz."
        ],
        probleme: ["Zettel gehen verloren", "Material wird vergessen", "Fahrtzeit fehlt", "Tippfehler", "Geld kommt spät rein"]
      },
      automatisch: [
        { typ: "auto", text: "Monteur trägt den Einsatz am Handy ein: Kunde, Stunden, Material. Dauert etwa 1 Minute." },
        { typ: "auto", text: "Stunden und Beträge werden sofort berechnet." },
        { typ: "auto", text: "Am Monatsende (oder nach jedem Auftrag) entsteht ein Rechnungsentwurf in Lexware. Eine Position pro Einsatz." },
        { typ: "mensch", text: "Sie prüfen den Entwurf und klicken auf „Freigeben“." },
        { typ: "auto", text: "Abgerechnete Einsätze werden markiert. Nichts wird doppelt abgerechnet." }
      ],
      merksatz: "Keine Rechnung geht ohne Ihre Freigabe raus.",
      optionen: [
        { titel: "Rechnung aus Zeiterfassung", text: "Die Einsätze der Mitarbeiter werden zu Rechnungsentwürfen." },
        { titel: "Serienrechnung", text: "Gleiche Rechnung jeden Monat, z. B. Wartungsvertrag oder Hausmeister-Pauschale." },
        { titel: "Mahnwesen", text: "Nach z. B. 14 Tagen ohne Zahlung entsteht ein Entwurf für eine freundliche Zahlungserinnerung. Sie geben ihn frei." },
        { titel: "Belegerfassung", text: "Lieferantenrechnungen werden ausgelesen. Das Material landet direkt beim richtigen Auftrag." }
      ],
      beispiel: {
        titel: "Musterrechnung",
        untertitel: "Holzmann Haustechnik an Muster-Hausverwaltung. Heizkörpertausch, 2 Einsätze. Frei erfunden.",
        kopf: ["Position", "Menge", "Einzelpreis", "Betrag"],
        zeilen: [
          ["Arbeitszeit Monteur", "6,5 Std.", "58,00 €", "377,00 €"],
          ["Arbeitszeit Helfer", "6,5 Std.", "42,00 €", "273,00 €"],
          ["Anfahrt pauschal", "2 ×", "35,00 €", "70,00 €"],
          ["Kupferrohr 15 mm", "10 m", "9,80 €", "98,00 €"],
          ["Pressfittings 15 mm", "12 Stück", "4,20 €", "50,40 €"],
          ["Thermostatkopf", "2 Stück", "24,90 €", "49,80 €"]
        ],
        summen: [
          ["Summe netto", "918,20 €"],
          ["zzgl. 19 % MwSt.", "174,46 €"],
          ["Gesamt brutto", "1.092,66 €"]
        ],
        text: "Jede Zeile kommt aus einem Handy-Eintrag des Monteurs. Abtippen entfällt."
      },
      zeit: {
        annahme: "Annahme: 40 Rechnungen pro Monat",
        zeilen: [
          ["Zettel suchen, abtippen, Preise nachschlagen", "8 Std.", "–"],
          ["Rückfragen bei Monteuren", "2 Std.", "0,5 Std."],
          ["Entwürfe prüfen und freigeben", "–", "2 Std."]
        ],
        vorher: 10, nachher: 2.5
      }
    },

    /* ------------------------------------------------------------- */
    {
      id: "mitarbeiter",
      titel: "Mitarbeiter",
      untertitel: "Zeiterfassung & Lohn",
      symbol: "mitarbeiter",
      kurz: "Zeiten am Handy erfassen. Stunden und Lohn rechnen sich selbst.",
      heute: {
        schritte: [
          "Mitarbeiter füllen Stundenzettel aus, oft erst am Ende der Woche aus dem Gedächtnis.",
          "Zettel werden eingesammelt. Einige fehlen, andere sind unleserlich.",
          "Der Chef tippt die Stunden in eine Excel-Liste.",
          "Pausen, Überstunden und Minijob-Grenze werden von Hand nachgerechnet.",
          "Die Stundenliste geht per Mail ans Lohnbüro oder den Steuerberater."
        ],
        probleme: ["Stunden werden geschätzt", "Rückfragen kosten Zeit", "Minijob-Grenze übersehen", "Kein sauberer Nachweis"]
      },
      automatisch: [
        { typ: "auto", text: "Jeder Mitarbeiter hat einen persönlichen Link aufs Handy. Keine App, kein Passwort." },
        { typ: "auto", text: "Er trägt Beginn, Ende, Pause und Baustelle ein. Direkt vor Ort." },
        { typ: "auto", text: "Stunden, Überstunden und Lohn werden sofort berechnet." },
        { typ: "auto", text: "Bei Minijobbern wird die Verdienstgrenze beachtet. Was darüber liegt, geht als Stunden in den Folgemonat." },
        { typ: "auto", text: "Am Monatsletzten kommt die Lohnübersicht per E-Mail." },
        { typ: "mensch", text: "Sie prüfen die Übersicht und schicken sie ans Lohnbüro." }
      ],
      merksatz: "Die Lohnabrechnung selbst macht weiter Ihr Lohnbüro. Sie bekommen nur eine fertige, saubere Übersicht.",
      optionen: [
        { titel: "Zeiterfassung am Handy", text: "Arbeitszeit mit Pause, oder Einsatz mit Objekt und Adresse." },
        { titel: "Lohnübersicht fürs Lohnbüro", text: "Fertig zusammengestellt, jeden Monat automatisch." },
        { titel: "Minijob-Wächter", text: "Warnung, bevor die Grenze erreicht ist, und Stundenübertrag in den Folgemonat." },
        { titel: "Erinnerung", text: "Wer bis 18 Uhr nichts eingetragen hat, bekommt eine kurze Nachricht." }
      ],
      beispiel: {
        titel: "Minijobber im März",
        untertitel: "Frei erfunden. Die Grenze kommt aus den Einstellungen.",
        kopf: ["", "Wert"],
        zeilen: [
          ["Stundenlohn", "15,00 €"],
          ["Gearbeitet im März", "44 Std."],
          ["Minijob-Grenze", "{minijobGrenze} € pro Monat"],
          ["Ausgezahlt im März", "40 Std. = 600,00 €"],
          ["Übertrag in den April", "4 Std."]
        ],
        summen: [],
        text: "Ob und wie Stunden übertragen werden dürfen, klären Sie bitte mit Ihrem Lohnbüro."
      },
      zeit: {
        annahme: "Annahme: 5 Mitarbeiter, Stundenzettel auf Papier",
        zeilen: [
          ["Zettel einsammeln und nachfragen", "2 Std.", "0,5 Std."],
          ["Stunden abtippen (5 × 45 Min.)", "3,75 Std.", "–"],
          ["Lohnliste erstellen und prüfen", "1,25 Std.", "1 Std."]
        ],
        vorher: 7, nachher: 1.5
      }
    },

    /* ------------------------------------------------------------- */
    {
      id: "buchhaltung",
      titel: "Buchhaltung",
      untertitel: "Belege & Großhändler-Rechnungen",
      symbol: "buchhaltung",
      kurz: "Rechnungen vom Großhändler landen vollständig und sauber in Lexware.",
      heute: {
        schritte: [
          "Rechnungen kommen auf vielen Wegen: Papier im Auto, PDF per Mail, Tankquittung im Geldbeutel.",
          "Einmal im Monat wird alles zusammengesucht und in Lexware oder einen Ordner gebracht.",
          "E-Rechnungen vom Großhändler lassen sich oft nicht einfach öffnen oder lesen.",
          "Fehlende Belege werden gesucht oder beim Lieferanten nachgefragt.",
          "Der Steuerberater fragt Wochen später nach, was noch fehlt."
        ],
        probleme: ["Belege fehlen", "E-Rechnung nicht lesbar", "Suche kostet Stunden", "Rückfragen Wochen später"]
      },
      automatisch: [
        { typ: "auto", text: "Rechnungen von Lieferanten kommen per Mail in ein eigenes Postfach." },
        { typ: "auto", text: "PDF-Rechnungen und E-Rechnungen werden gelesen: Lieferant, Datum, Betrag." },
        { typ: "auto", text: "Der Beleg landet in Lexware Office mit dem Hinweis „zu prüfen“. Doppelte werden erkannt." },
        { typ: "auto", text: "Belege und Kontobewegungen ordnet Lexware selbst zu. Das kann Lexware schon." },
        { typ: "mensch", text: "Sie schauen nur auf das, was unklar ist." },
        { typ: "auto", text: "Am Monatsende kommt eine Liste: Diese Belege fehlen noch." }
      ],
      merksatz: "Was Lexware schon selbst kann, nutzen wir. Ich sorge dafür, dass alles vollständig und sauber dort ankommt.",
      optionen: [
        { titel: "Belegpostfach", text: "Lieferanten schicken Rechnungen an eine feste Adresse. Der Rest läuft von allein." },
        { titel: "E-Rechnungen lesen", text: "Das neue Pflichtformat vom Großhändler wird ausgelesen und lesbar abgelegt." },
        { titel: "Fehlende-Belege-Liste", text: "Einmal im Monat, mit Betrag und Datum." },
        { titel: "Material zum Auftrag", text: "Positionen aus Großhändler-Rechnungen werden dem richtigen Auftrag zugeordnet." }
      ],
      infokasten: {
        titel: "Gut zu wissen: E-Rechnung",
        text: "Seit 1.1.2025 müssen alle Betriebe E-Rechnungen von Geschäftskunden empfangen können, zum Beispiel vom Großhändler. Eine PDF per E-Mail zählt nicht als E-Rechnung. Wer selbst Rechnungen an Geschäftskunden schreibt, muss ab 1.1.2027 (über 800.000 € Vorjahresumsatz) bzw. ab 1.1.2028 (alle) E-Rechnungen ausstellen. Rechnungen an Privatkunden sind ausgenommen. Stand: November 2026.",
        quellen: [
          ["IHK Stuttgart", "https://www.ihk.de/stuttgart/fuer-unternehmen/recht-und-steuern/steuerrecht/steuermeldungen/e-rechnungen-5864496"],
          ["IHK Rhein-Neckar", "https://www.ihk.de/rhein-neckar/recht/steuerrecht/umsatzsteuer/e-rechnungspflicht-5931752"],
          ["IHK Essen", "https://www.ihk.de/meo/recht-und-steuern/steuerrecht/umsatzsteuer/e-rechnung-ab-01-01-2025-6277246"]
        ]
      },
      beispiel: {
        titel: "Belege im März",
        untertitel: "Frei erfunden.",
        kopf: ["", "Anzahl"],
        zeilen: [
          ["Eingangsbelege gesamt", "60"],
          ["per Mail automatisch eingegangen", "42"],
          ["per Handyfoto erfasst", "18"],
          ["automatisch einer Zahlung zugeordnet", "54"],
          ["zur Prüfung durch den Chef", "6"]
        ],
        summen: [],
        text: "Statt 60 Belege von Hand zu sortieren, schauen Sie nur auf 6."
      },
      zeit: {
        annahme: "Annahme: 60 Eingangsbelege pro Monat",
        zeilen: [
          ["Belege sammeln und sortieren", "3 Std.", "0,5 Std."],
          ["Abgleich mit dem Kontoauszug", "2 Std.", "1 Std."],
          ["Fehlende Belege suchen", "1 Std.", "0,5 Std."]
        ],
        vorher: 6, nachher: 2
      }
    },

    /* ------------------------------------------------------------- */
    {
      id: "material",
      titel: "Bestellliste & Material",
      symbol: "material",
      kurz: "Material von der Baustelle melden. Die Bestellliste füllt sich selbst.",
      heute: {
        schritte: [
          "Der Monteur merkt auf der Baustelle: „Uns fehlen Fittings.“",
          "Er ruft den Chef an oder schreibt eine WhatsApp.",
          "Der Chef sammelt die Meldungen im Kopf oder auf einem Zettel.",
          "Bestellung beim Großhändler per Telefon, Mail oder Onlineshop.",
          "Der Lieferschein kommt. Wer weiß noch, für welche Baustelle das war?"
        ],
        probleme: ["Bestellungen vergessen", "Extrafahrten zum Großhändler", "Doppelt bestellt", "Material fehlt auf der Rechnung"]
      },
      automatisch: [
        { typ: "auto", text: "Der Monteur meldet Material am Handy: Artikel, Menge, Baustelle." },
        { typ: "auto", text: "Alle Meldungen landen in einer Bestellliste, sortiert nach Lieferant." },
        { typ: "mensch", text: "Sie prüfen die Liste einmal am Tag und klicken auf „Bestellen“." },
        { typ: "auto", text: "Die Bestellung geht als Mail an den Lieferanten. Erst nach Ihrer Freigabe." },
        { typ: "auto", text: "Das Material wird der Baustelle zugeordnet und taucht später im Rechnungsentwurf auf." }
      ],
      merksatz: "Keine Bestellung geht ohne Ihren Klick raus.",
      optionen: [
        { titel: "Materialmeldung vom Handy", text: "Statt Anruf oder WhatsApp." },
        { titel: "Sammelbestellung je Lieferant", text: "Einmal am Tag statt zehnmal am Tag." },
        { titel: "Lager-Mindestbestand", text: "Erinnerung, wenn Standardteile knapp werden." },
        { titel: "Lieferschein-Abgleich", text: "Bestellt und geliefert werden verglichen. Abweichungen kommen auf eine Liste." }
      ],
      beispiel: {
        titel: "Bestellliste Dienstag",
        untertitel: "Frei erfunden.",
        kopf: ["Artikel", "Menge", "Baustelle", "Gemeldet von"],
        zeilen: [
          ["Pressfitting Bogen 15 mm", "20 Stück", "Bad Ringstraße", "Monteur A"],
          ["Kupferrohr 15 mm", "25 m", "Bad Ringstraße", "Monteur A"],
          ["Heizkörperventil", "4 Stück", "MFH Lindenweg", "Monteur B"],
          ["Silikon sanitär weiß", "6 Kartuschen", "Lager", "Chef"]
        ],
        summen: [],
        text: "Ergebnis: 1 Sammelbestellung beim Großhändler statt 4 Anrufe."
      },
      zeit: {
        annahme: "Annahme: 16 Bestellungen pro Monat",
        zeilen: [
          ["Meldungen sammeln und bestellen", "5 Std.", "1 Std."],
          ["Lieferscheine zuordnen und prüfen", "2 Std.", "1 Std."]
        ],
        vorher: 7, nachher: 2,
        zusatz: "Nicht eingerechnet: Extrafahrten der Monteure zum Großhändler. Die fallen oft zusätzlich weg."
      }
    },

    /* ------------------------------------------------------------- */
    {
      id: "baustellen",
      titel: "Baustellen",
      symbol: "baustelle",
      kurz: "Fotos, Stunden und Material landen automatisch bei der richtigen Baustelle.",
      heute: {
        schritte: [
          "Fotos liegen auf den Handys der Monteure, verteilt in WhatsApp-Gruppen.",
          "Notizen stehen im Auftragsbuch oder auf Zetteln.",
          "Stunden und Material einer Baustelle sucht der Chef aus mehreren Quellen zusammen.",
          "Ob die Baustelle im Rahmen des Angebots liegt, merkt man oft erst am Ende.",
          "Bei Reklamationen fehlen Fotos oder Nachweise."
        ],
        probleme: ["Kein schneller Überblick", "Mehraufwand ohne Nachtrag", "Abschläge zu spät"]
      },
      automatisch: [
        { typ: "auto", text: "Jede Baustelle bekommt eine eigene digitale Mappe." },
        { typ: "auto", text: "Fotos und Notizen vom Handy landen direkt in der richtigen Mappe, mit Datum." },
        { typ: "auto", text: "Stunden aus der Zeiterfassung und Material aus der Bestellliste werden der Baustelle zugeordnet." },
        { typ: "auto", text: "Einmal pro Woche kommt eine Übersicht: geplant gegen tatsächlich." },
        { typ: "mensch", text: "Sie sehen Abweichungen früh und entscheiden: Nachtrag, Abschlag oder weiter so." }
      ],
      merksatz: "Sie sehen in Woche 2, was sonst erst bei der Schlussrechnung auffällt.",
      optionen: [
        { titel: "Digitale Baustellenmappe", text: "Fotos, Notizen und Dokumente an einem Ort." },
        { titel: "Tagesbericht automatisch", text: "Wer war wann da, was wurde gemacht." },
        { titel: "Soll-Ist-Vergleich", text: "Stunden und Material gegen das Angebot." },
        { titel: "Abschlags-Erinnerung", text: "Ist ein Bauabschnitt fertig, entsteht ein Entwurf für die Abschlagsrechnung." }
      ],
      beispiel: {
        titel: "Soll-Ist „Bad Ringstraße“",
        untertitel: "Frei erfunden. Stand nach Woche 2.",
        kopf: ["", "Laut Angebot", "Bisher tatsächlich", "Abweichung"],
        zeilen: [
          ["Arbeitsstunden", "24 Std.", "28 Std.", "+4 Std."],
          ["Material", "1.200 €", "1.310 €", "+110 €"]
        ],
        summen: [],
        text: "Der Chef kann mit dem Kunden über einen Nachtrag sprechen, bevor die Arbeit fertig ist."
      },
      zeit: {
        annahme: "Annahme: 6 laufende Baustellen",
        zeilen: [
          ["Fotos, Notizen und Stunden zusammensuchen", "6 Std.", "–"],
          ["Stand abfragen und nachkalkulieren", "3 Std.", "3 Std."]
        ],
        vorher: 9, nachher: 3
      }
    },

    /* ------------------------------------------------------------- */
    {
      id: "angebote",
      titel: "Angebote",
      symbol: "angebot",
      kurz: "Angebote aus Vorlagen. Automatische Erinnerung zum Nachfassen.",
      heute: {
        schritte: [
          "Der Kunde ruft an oder schreibt. Der Chef macht einen Termin vor Ort.",
          "Abends wird das Angebot geschrieben, oft von einem alten Angebot kopiert.",
          "Preise werden im Katalog oder beim Großhändler nachgeschaut.",
          "Das Angebot geht per Mail raus.",
          "Nachfassen? Wird im Alltag oft vergessen."
        ],
        probleme: ["Angebote kosten Abende", "Alte Preise kopiert", "Kein Nachfassen", "Aufträge gehen verloren"]
      },
      automatisch: [
        { typ: "auto", text: "Vor Ort tippen Sie die Eckdaten ins Handy: Kunde, Leistung, Mengen." },
        { typ: "auto", text: "Aus Vorlagen und Ihrer Preisliste entsteht ein Angebotsentwurf in Lexware." },
        { typ: "mensch", text: "Sie prüfen, passen an und geben frei." },
        { typ: "auto", text: "Nach 10 Tagen ohne Antwort bekommen Sie eine Erinnerung zum Nachfassen." },
        { typ: "auto", text: "Sagt der Kunde zu, wird aus dem Angebot ein Auftrag mit eigener Baustellenmappe." }
      ],
      merksatz: "Kein Angebot geht ohne Ihre Freigabe raus.",
      optionen: [
        { titel: "Angebot aus Vorlagen", text: "Feste Bausteine für Ihre häufigsten Leistungen." },
        { titel: "Preisliste aktuell halten", text: "Materialpreise aus der letzten Lieferantenrechnung." },
        { titel: "Nachfass-Erinnerung", text: "Damit kein Angebot einfach liegen bleibt." },
        { titel: "Angebot wird Auftrag", text: "Kunde, Positionen und Baustelle werden übernommen." }
      ],
      beispiel: {
        titel: "Musterangebot Bad-Teilsanierung",
        untertitel: "Holzmann Haustechnik an einen Privatkunden. Frei erfunden.",
        kopf: ["Position", "Menge", "Einzelpreis", "Betrag"],
        zeilen: [
          ["Demontage alte Sanitärobjekte", "8 Std.", "58,00 €", "464,00 €"],
          ["Vorwandelement mit Wand-WC montieren", "1 pauschal", "890,00 €", "890,00 €"],
          ["Waschtisch montieren und anschließen", "1 pauschal", "320,00 €", "320,00 €"],
          ["Kleinmaterial", "1 pauschal", "145,00 €", "145,00 €"],
          ["Entsorgung", "1 pauschal", "95,00 €", "95,00 €"]
        ],
        summen: [
          ["Summe netto", "1.914,00 €"],
          ["zzgl. 19 % MwSt.", "363,66 €"],
          ["Gesamt brutto", "2.277,66 €"]
        ],
        text: "Die Positionen kommen aus Bausteinen. Sie ändern nur, was bei diesem Kunden anders ist."
      },
      zeit: {
        annahme: "Annahme: 15 Angebote pro Monat",
        zeilen: [
          ["Angebote schreiben (15 × 40 Min. vorher, 15 × 15 Min. nachher)", "10 Std.", "3,75 Std."],
          ["Nachfassen organisieren", "1 Std.", "0,25 Std."]
        ],
        vorher: 11, nachher: 4
      }
    },

    /* ------------------------------------------------------------- */
    {
      id: "termine",
      titel: "Termine & Einsatzplanung",
      symbol: "termine",
      kurz: "Wochenplan an einem Ort. Jeder Mitarbeiter sieht seinen Plan am Handy.",
      heute: {
        schritte: [
          "Der Wochenplan steht auf einer Tafel, im Kalender oder im Kopf des Chefs.",
          "Am Abend werden die Monteure angerufen: „Morgen fährst du zu …“",
          "Ein Kunde sagt ab. Alles muss per Telefon umgeplant werden.",
          "Adressen und Hinweise werden per WhatsApp hinterhergeschickt.",
          "Kunden fragen nach: „Kommen Sie heute noch?“"
        ],
        probleme: ["Viele Telefonate", "Doppelt verplant", "Falsche Adresse", "Kunde nicht informiert"]
      },
      automatisch: [
        { typ: "mensch", text: "Sie planen die Woche in einer einfachen Übersicht: wer, wann, wo." },
        { typ: "auto", text: "Jeder Mitarbeiter sieht seinen Plan mit Adresse und Hinweisen am Handy." },
        { typ: "auto", text: "Ändert sich etwas, bekommt nur der Betroffene eine Nachricht." },
        { typ: "mensch", text: "Auf Wunsch geben Sie eine Terminbestätigung an den Kunden frei." },
        { typ: "auto", text: "Der Einsatz ist schon in der Zeiterfassung vorbereitet. Der Monteur tippt nur noch die Zeiten." }
      ],
      merksatz: "Die Planung bleibt Ihre Entscheidung. Automatisch wird nur das Verteilen der Information.",
      optionen: [
        { titel: "Wochenplan am Handy", text: "Für jeden Mitarbeiter sein eigener Plan." },
        { titel: "Änderungs-Nachricht", text: "Nur an die Betroffenen, nicht an alle." },
        { titel: "Terminbestätigung an Kunden", text: "Als Entwurf, Sie geben frei." },
        { titel: "Wartungstermine", text: "Erinnerung, wenn die jährliche Wartung fällig wird." }
      ],
      beispiel: {
        titel: "Wochenplan Montag",
        untertitel: "Frei erfunden.",
        kopf: ["Mitarbeiter", "Uhrzeit", "Einsatz", "Ort"],
        zeilen: [
          ["Monteur A + Helfer", "7:30–16:00", "Bad-Teilsanierung", "Ringstraße"],
          ["Monteur B", "7:30–11:00", "Heizkörpertausch", "MFH Lindenweg"],
          ["Monteur B", "12:00–15:00", "Wartung Gastherme", "Am Bach"],
          ["Monteur C", "8:00–16:00", "Neubau Rohinstallation", "Gewerbegebiet Süd"]
        ],
        summen: [],
        text: "Sagt der Kunde Am Bach ab, bekommt nur Monteur B eine Nachricht mit dem neuen Plan."
      },
      zeit: {
        annahme: "Annahme: 5 Mitarbeiter, Planung jede Woche",
        zeilen: [
          ["Wochenplanung (4 Wochen)", "6 Std.", "4 Std."],
          ["Umplanen per Telefon und WhatsApp", "4 Std.", "1,5 Std."]
        ],
        vorher: 10, nachher: 5.5
      }
    },

    /* ------------------------------------------------------------- */
    {
      id: "anfragen",
      titel: "Kundenanfragen",
      symbol: "anfragen",
      kurz: "Alle Anfragen in einer Liste. Keine geht mehr verloren.",
      heute: {
        schritte: [
          "Anfragen kommen per Telefon, Mail, Anrufbeantworter, Webseite und WhatsApp.",
          "Notiert wird auf Zetteln, im Handy oder gar nicht.",
          "Zurückgerufen wird, wenn Zeit ist.",
          "Niemand weiß genau, welche Anfrage schon beantwortet ist."
        ],
        probleme: ["Anfragen gehen unter", "Kunden warten zu lange", "Kein Überblick"]
      },
      automatisch: [
        { typ: "auto", text: "Mails und Formular-Anfragen landen automatisch in einer Liste." },
        { typ: "auto", text: "Telefon-Anfragen tragen Sie in 30 Sekunden am Handy ein." },
        { typ: "auto", text: "Der Kunde bekommt eine kurze Eingangsbestätigung. Der Text ist vorher von Ihnen freigegeben." },
        { typ: "mensch", text: "Sie entscheiden: Termin, Angebot oder Absage." },
        { typ: "auto", text: "Jede Anfrage hat einen Status: neu, Termin, Angebot, erledigt." }
      ],
      merksatz: "Jede verlorene Anfrage ist ein verlorener Auftrag.",
      optionen: [
        { titel: "Eine Liste für alle Kanäle", text: "Mail, Formular und Telefonnotiz an einem Ort." },
        { titel: "Eingangsbestätigung", text: "Mit einem Text, den Sie einmal freigeben." },
        { titel: "Erinnerung bei offenen Anfragen", text: "Nach 2 Tagen ohne Antwort." },
        { titel: "Anfrage wird Angebot", text: "Die Kundendaten werden übernommen." }
      ],
      beispiel: {
        titel: "Anfragenliste diese Woche",
        untertitel: "Frei erfunden.",
        kopf: ["Eingang", "Weg", "Anliegen", "Status"],
        zeilen: [
          ["Mo 8:12", "Mail", "Heizung macht Geräusche", "Termin Mi"],
          ["Mo 17:40", "Formular", "Angebot neues Bad", "Angebot raus"],
          ["Di 10:05", "Telefon", "Wasserhahn tropft", "erledigt"],
          ["Di 19:30", "Mail", "Wartungsvertrag", "neu"]
        ],
        summen: [],
        text: "Ein Blick reicht: Eine Anfrage ist noch offen."
      },
      zeit: {
        annahme: "Annahme: 30 Anfragen pro Monat",
        zeilen: [
          ["Notieren, sortieren, nachhalten", "3 Std.", "1 Std."],
          ["Verlorene Anfragen suchen, nachtelefonieren", "1 Std.", "–"]
        ],
        vorher: 4, nachher: 1
      }
    }
  ],

  /* ---------------------------------------------------------------- */
  rechner: {
    ueberschrift: "Was spart Automatisierung in Ihrem Betrieb?",
    einleitung: "Wählen Sie Ihr Gewerk, passen Sie die Zahlen an und wählen Sie die Abläufe, die es bei Ihnen gibt. Dann sehen Sie für jeden Ablauf, wie viel Zeit sich sparen lässt und wie die Zahl zustande kommt.",
    vorsichtigFaktor: 0.5,
    hinweis: "Das ist eine Beispielrechnung, kein Versprechen. Die Minutenwerte sind Schätzungen für typische Betriebe, keine Messungen. Einrichtung und Betreuung kosten Geld und sind nicht abgezogen. Meist startet man mit einem Ablauf, nicht mit allen gleichzeitig. Wie viel es bei Ihnen wirklich ist, zeigt die kostenlose Erstanalyse.",

    /* Die Arbeitsabläufe. "je" sagt, womit multipliziert wird:
       mitarbeiter, auftrag, angebot. Minuten pro Einheit und Monat. */
    prozesse: {
      zeit:      { titel: "Zeiterfassung & Lohn",        je: "mitarbeiter", bereich: "mitarbeiter", text: "Stunden am Handy statt Stundenzettel. Lohnübersicht kommt fertig ans Lohnbüro.", warum: "Stundenzettel müssen nicht mehr eingesammelt, abgetippt und nachgerechnet werden." },
      termine:   { titel: "Einsatzplanung",              je: "mitarbeiter", bereich: "termine",     text: "Jeder sieht seinen Plan am Handy. Änderungen gehen nur an die Betroffenen.", warum: "Weniger Anrufe und WhatsApps beim Planen und Umplanen." },
      angebot:   { titel: "Angebote", titelAufmass: "Aufmaß & Angebote",           je: "angebot",     bereich: "angebote",    text: "Aufmaß am Handy, Angebot aus Vorlagen und Preisliste. Sie prüfen und geben frei.", warum: "Notizen müssen nicht abgetippt, Preise nicht nachgeschlagen werden. Das Angebot ist fertig formatiert." },
      nachfassen:{ titel: "Anfragen & Nachfassen",       je: "angebot",     bereich: "anfragen",    text: "Alle Anfragen und Messekontakte in einer Liste. Erinnerung, wenn ein Angebot unbeantwortet bleibt.", warum: "Eine Erinnerung ersetzt das Suchen, welche Angebote noch offen sind." },
      material:  { titel: "Material & Bestellung",       je: "auftrag",     bereich: "material",    text: "Material von der Baustelle melden. Sammelbestellung nach Ihrer Freigabe.", warum: "Meldung vom Handy statt Anruf. Eine Sammelbestellung statt vieler einzelner." },
      doku:      { titel: "Baustellen-Doku & Nachkalkulation", je: "auftrag", bereich: "baustellen", text: "Fotos, Notizen, Stunden und Material landen automatisch beim richtigen Auftrag.", warum: "Fotos, Stunden und Material müssen nicht aus mehreren Quellen zusammengesucht werden." },
      rechnung:  { titel: "Rechnungen",                  je: "auftrag",     bereich: "rechnungen",  text: "Aus Stunden und Material entsteht ein Rechnungsentwurf. Sie geben frei.", warum: "Positionen kommen aus Zeiterfassung und Material. Sie prüfen nur noch." },
      belege:    { titel: "Belege & Buchhaltung",        je: "auftrag",     bereich: "buchhaltung", text: "Lieferantenrechnungen und Quittungen werden gesammelt und zugeordnet.", warum: "Belege kommen von selbst an. Sie schauen nur auf Unklares." }
    },

    /* Gewerke: Vorgabewerte und Minuten [vorher, nachher] je Einheit.
       Alle Werte sind Annahmen und können hier angepasst werden. */
    gewerke: [
      { id: "fenster", aufmass: true, titel: "Fenster & Türen", symbol: "fenster",
        vorgabe: { mitarbeiter: 8, auftraege: 20, angebote: 40, satz: 40 },
        minuten: { zeit: [84, 18], termine: [120, 66], angebot: [45, 25], nachfassen: [6, 1], material: [30, 10], doku: [25, 8], rechnung: [30, 10], belege: [12, 4] } },
      { id: "dach", aufmass: true, titel: "Dach & Zimmerei", symbol: "dach",
        vorgabe: { mitarbeiter: 10, auftraege: 8, angebote: 15, satz: 40 },
        minuten: { zeit: [84, 18], termine: [120, 66], angebot: [90, 45], nachfassen: [6, 1], material: [40, 12], doku: [60, 20], rechnung: [40, 12], belege: [16, 5] } },
      { id: "schreiner", aufmass: true, titel: "Schreinerei & Treppen", symbol: "schreiner",
        vorgabe: { mitarbeiter: 6, auftraege: 10, angebote: 15, satz: 40 },
        minuten: { zeit: [84, 18], termine: [120, 66], angebot: [90, 45], nachfassen: [6, 1], material: [30, 10], doku: [30, 10], rechnung: [30, 10], belege: [12, 4] } },
      { id: "ofen", aufmass: true, titel: "Ofen- & Kaminbau", symbol: "ofen",
        vorgabe: { mitarbeiter: 4, auftraege: 6, angebote: 12, satz: 40 },
        minuten: { zeit: [84, 18], termine: [120, 66], angebot: [60, 25], nachfassen: [6, 1], material: [30, 10], doku: [25, 8], rechnung: [30, 10], belege: [12, 4] } },
      { id: "sanierung", aufmass: true, titel: "Sanierung & Fliesen", symbol: "sanierung",
        vorgabe: { mitarbeiter: 6, auftraege: 12, angebote: 15, satz: 40 },
        minuten: { zeit: [84, 18], termine: [120, 66], angebot: [45, 20], nachfassen: [6, 1], material: [30, 10], doku: [45, 15], rechnung: [30, 10], belege: [12, 4] } },
      { id: "shk", aufmass: false, titel: "Heizung & Sanitär", symbol: "shk",
        vorgabe: { mitarbeiter: 5, auftraege: 40, angebote: 15, satz: 35 },
        minuten: { zeit: [84, 18], termine: [120, 66], angebot: [40, 15], nachfassen: [6, 1], material: [12, 4], doku: [10, 3], rechnung: [15, 3.75], belege: [6, 2] } },
      { id: "elektro", aufmass: false, titel: "Elektro", symbol: "elektro",
        vorgabe: { mitarbeiter: 6, auftraege: 40, angebote: 12, satz: 35 },
        minuten: { zeit: [84, 18], termine: [120, 66], angebot: [40, 15], nachfassen: [6, 1], material: [12, 4], doku: [10, 3], rechnung: [15, 3.75], belege: [6, 2] } },
      { id: "garten", aufmass: true, titel: "Garten- & Landschaftsbau", symbol: "garten",
        vorgabe: { mitarbeiter: 6, auftraege: 15, angebote: 15, satz: 35 },
        minuten: { zeit: [84, 18], termine: [120, 66], angebot: [45, 20], nachfassen: [6, 1], material: [30, 10], doku: [30, 10], rechnung: [30, 10], belege: [12, 4] } }
    ]
  },

  /* ---------------------------------------------------------------- */
  praxis: {
    ueberschrift: "Schon im Einsatz: Hausmeisterservice aus dem Raum Aichach",
    text: "Für einen Hausmeisterservice habe ich Zeiterfassung, Lohn und Rechnungen automatisiert. Das läuft heute im Alltag.",
    punkte: [
      "Mitarbeiter erfassen ihre Zeiten am Handy über einen persönlichen Link. Entweder Arbeitszeit mit Pause oder Objekteinsatz mit Objekt, Adresse, Anzahl Mitarbeiter, Pause, Werkzeugverschleiß und Großgerät.",
      "Stunden, Lohn und Rechnungsbeträge werden automatisch berechnet.",
      "Am 1. jedes Monats entstehen Rechnungsentwürfe in Lexware. Eine Position pro Einsatz. Bereits abgerechnete Einsätze werden markiert.",
      "Am Monatsletzten kommt eine Lohnübersicht per E-Mail. Bei Minijobbern wird die Verdienstgrenze beachtet, Stunden darüber gehen in den Folgemonat.",
      "Jeden Monat läuft ein automatisches Backup."
    ],
    technik: "Technik in einem Satz: n8n (ein Werkzeug, das Programme miteinander verbindet) auf einem Server in Deutschland, dazu eine Tabelle und Lexware Office."
  },

  /* ---------------------------------------------------------------- */
  arbeitsweise: {
    ueberschrift: "Wie ich arbeite",
    schritte: [
      { titel: "Analyse", text: "Ich komme in Ihren Betrieb und schaue zu, wie Büro und Baustelle heute zusammenarbeiten. Sie bekommen eine kurze Liste: Wo geht Zeit verloren, was lässt sich automatisieren, was nicht." },
      { titel: "Pilot", text: "Wir starten mit einem Ablauf, z. B. der Zeiterfassung. Klein, überschaubar, mit echten Daten. Nach wenigen Wochen sehen Sie, ob es passt." },
      { titel: "Umsetzung", text: "Was im Pilot funktioniert, bauen wir aus. Schritt für Schritt, ohne den Betrieb lahmzulegen." },
      { titel: "Betreuung", text: "Ich bleibe Ihr Ansprechpartner. Wenn sich etwas ändert, passe ich es an." }
    ],
    versprechen: [
      { titel: "Ihre Konten, Server in Deutschland", text: "Die Abläufe laufen auf Ihren Konten und auf einem Server in Deutschland. Sie behalten alles, ich habe nur Zugang zur Betreuung." },
      { titel: "Ihre Programme bleiben", text: "Sie arbeiten weiter mit Lexware oder dem, was Sie heute nutzen." },
      { titel: "Nichts ohne Freigabe", text: "Keine Rechnung, keine Mahnung, keine Bestellung geht ohne Ihren Klick raus." },
      { titel: "Verständlich", text: "Sie bekommen eine einfache Anleitung, keine IT-Sprache." }
    ]
  },

  /* ---------------------------------------------------------------- */
  kontakt: {
    band: "Gespräch nach der Messe",
    ueberschrift: "Kostenlose Erstanalyse",
    text: "Ich komme in Ihren Betrieb und schaue mir Ihre Büroabläufe an. Etwa 90 Minuten. Danach wissen Sie, wo sich Automatisierung lohnt und wo nicht. Kostenlos und unverbindlich.",
    qrText: "QR-Code abfotografieren und die Seite in Ruhe zu Hause ansehen.",
    pilotHinweis: "Ich suche gerade Pilotbetriebe, die mit mir starten."
  },

  /* ---------------------------------------------------------------- */
  /* EINGABEMASKEN: So sieht die Eingabe am Handy aus.
     Feldtypen: auswahl, text, notiz, datum, zeit, zahl, zeitspanne,
     chips, foto, material, modus, regler, schalter, tagesplan, info.
     Nichts davon wird gespeichert – es ist eine Vorführung.          */
  maskenText: {
    ueberschrift: "So sieht die Eingabe am Handy aus",
    einleitung: "Probieren Sie es aus: Felder antippen, ändern, speichern. Das ist eine Vorführung, es wird nichts gespeichert oder verschickt.",
    nachSpeichern: "Gespeichert. Das passiert jetzt automatisch:"
  },

  masken: {
    rechnungen: {
      titel: "Einsatz melden",
      wer: "Monteur A",
      felder: [
        { typ: "auswahl", label: "Kunde / Baustelle", optionen: ["Muster-Hausverwaltung, Lindenweg 4", "Bad Ringstraße 12", "Fam. Beispiel, Am Bach 3"] },
        { typ: "datum", label: "Datum", wert: "2026-11-25" },
        { typ: "zeitspanne", label: "Arbeitszeit", von: "07:30", bis: "11:00" },
        { typ: "zahl", label: "Pause", wert: 0, einheit: "Min." },
        { typ: "chips", label: "Wer war dabei?", optionen: ["Monteur A", "Helfer", "Monteur B"], gewaehlt: [0, 1] },
        { typ: "material", label: "Material verbaut", zeilen: [["Thermostatkopf", "2 Stück"], ["Pressfitting 15 mm", "6 Stück"]] },
        { typ: "schalter", label: "Anfahrt berechnen", an: true },
        { typ: "notiz", label: "Notiz für die Rechnung", platzhalter: "z. B. Heizkörper im Bad getauscht" }
      ],
      knopf: "Einsatz speichern"
    },

    mitarbeiter: {
      titel: "Meine Zeiten",
      wer: "Monteur B",
      felder: [
        { typ: "modus", optionen: ["Arbeitszeit", "Objekteinsatz"] },
        { typ: "datum", label: "Datum", wert: "2026-11-25" },
        { typ: "zeitspanne", label: "Beginn und Ende", von: "07:00", bis: "15:30" },
        { typ: "zahl", label: "Pause", wert: 30, einheit: "Min.", nurModus: 0 },
        { typ: "auswahl", label: "Objekt", optionen: ["Wohnanlage Lindenweg", "Bürohaus Ringstraße", "Kita Am Bach"], nurModus: 1 },
        { typ: "text", label: "Adresse", wert: "Lindenweg 4, Musterstadt", nurModus: 1 },
        { typ: "zahl", label: "Anzahl Mitarbeiter", wert: 2, einheit: "Pers.", nurModus: 1 },
        { typ: "zeitspanne", label: "Pause von – bis", von: "12:00", bis: "12:30", nurModus: 1 },
        { typ: "schalter", label: "Werkzeugverschleiß", an: false, nurModus: 1 },
        { typ: "chips", label: "Großgerät", optionen: ["keins", "Hebebühne", "Kehrmaschine", "Bagger"], gewaehlt: [0], einzeln: true, nurModus: 1 },
        { typ: "info", text: "Stunden diesen Monat: 96,5 · Davon heute: 8,0" }
      ],
      knopf: "Zeiten speichern"
    },

    buchhaltung: {
      titel: "Beleg erfassen",
      wer: "Chef",
      felder: [
        { typ: "foto", label: "Beleg fotografieren" },
        { typ: "info", text: "Automatisch erkannt: Großhandel Beispiel GmbH · 25.11.2026 · 214,90 €" },
        { typ: "chips", label: "Art", optionen: ["Material", "Tanken", "Werkzeug", "Sonstiges"], gewaehlt: [0], einzeln: true },
        { typ: "auswahl", label: "Für Baustelle (optional)", optionen: ["Bad Ringstraße 12", "Lindenweg 4", "keine / Lager"] },
        { typ: "notiz", label: "Notiz", platzhalter: "z. B. Rest geht ins Lager" }
      ],
      knopf: "Beleg speichern"
    },

    material: {
      titel: "Material melden",
      wer: "Monteur A",
      felder: [
        { typ: "auswahl", label: "Baustelle", optionen: ["Bad Ringstraße 12", "Wohnanlage Lindenweg", "Lager auffüllen"] },
        { typ: "material", label: "Was fehlt?", zeilen: [["Pressfitting Bogen 15 mm", "20 Stück"], ["Kupferrohr 15 mm", "25 m"]] },
        { typ: "chips", label: "Wann gebraucht?", optionen: ["heute", "morgen", "diese Woche"], gewaehlt: [1], einzeln: true },
        { typ: "chips", label: "Lieferung", optionen: ["auf die Baustelle", "ins Lager", "hole ich ab"], gewaehlt: [0], einzeln: true },
        { typ: "notiz", label: "Notiz", platzhalter: "z. B. gleiche Marke wie letztes Mal" }
      ],
      knopf: "Auf die Bestellliste"
    },

    baustellen: {
      titel: "Baustellen-Notiz",
      wer: "Monteur A",
      felder: [
        { typ: "auswahl", label: "Baustelle", optionen: ["Bad Ringstraße 12", "Wohnanlage Lindenweg", "Neubau Gewerbegebiet Süd"] },
        { typ: "foto", label: "Fotos aufnehmen" },
        { typ: "chips", label: "Was ist das?", optionen: ["Fortschritt", "Mangel", "Mehraufwand / Nachtrag", "Abnahme"], gewaehlt: [2], einzeln: true },
        { typ: "regler", label: "Wie weit ist die Baustelle?", wert: 60, einheit: "%" },
        { typ: "notiz", label: "Beschreibung", platzhalter: "z. B. Alte Leitung hinter der Wand marode, muss mit raus. Ca. 3 Std. extra." }
      ],
      knopf: "Notiz speichern"
    },

    angebote: {
      titel: "Aufmaß vor Ort",
      wer: "Chef",
      felder: [
        { typ: "text", label: "Kunde", wert: "Fam. Beispiel, Am Bach 3" },
        { typ: "chips", label: "Was soll gemacht werden?", optionen: ["Demontage", "Wand-WC", "Waschtisch", "Dusche", "Fliesen"], gewaehlt: [0, 1, 2] },
        { typ: "zahl", label: "Demontage geschätzt", wert: 8, einheit: "Std." },
        { typ: "foto", label: "Fotos vom Bad" },
        { typ: "notiz", label: "Besonderheiten", platzhalter: "z. B. Zugang nur über Treppenhaus, 3. Stock" }
      ],
      knopf: "Angebotsentwurf erstellen"
    },

    termine: {
      titel: "Mein Tag",
      wer: "Monteur B",
      felder: [
        { typ: "info", text: "Mittwoch, 25.11.2026" },
        { typ: "tagesplan", eintraege: [
          { zeit: "07:30–11:00", aufgabe: "Heizkörpertausch", ort: "Wohnanlage Lindenweg 4", hinweis: "Schlüssel beim Hausmeister" },
          { zeit: "12:00–15:00", aufgabe: "Wartung Gastherme", ort: "Fam. Beispiel, Am Bach 3", hinweis: "Kunde ist ab 12 Uhr da" }
        ] }
      ],
      knopf: "Plan gelesen"
    },

    anfragen: {
      titel: "Anfrage aufnehmen",
      wer: "Chef",
      felder: [
        { typ: "chips", label: "Wie kam die Anfrage?", optionen: ["Telefon", "Mail", "vor Ort", "Empfehlung"], gewaehlt: [0], einzeln: true },
        { typ: "text", label: "Name", wert: "Herr Beispiel" },
        { typ: "text", label: "Ort", wert: "Am Bach 3" },
        { typ: "chips", label: "Anliegen", optionen: ["Notfall", "Reparatur", "Wartung", "Angebot"], gewaehlt: [1], einzeln: true },
        { typ: "chips", label: "Rückruf bis", optionen: ["heute", "morgen", "diese Woche"], gewaehlt: [0], einzeln: true },
        { typ: "notiz", label: "Notiz", platzhalter: "z. B. Heizung im OG wird nicht warm" }
      ],
      knopf: "In die Anfragenliste"
    }
  }
};
