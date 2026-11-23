/* Reschero – Programmlogik. Texte bitte in inhalte.js ändern, nicht hier. */
(function () {
  "use strict";
  var E = window.EINSTELLUNGEN || {};
  var I = window.INHALTE || {};

  /* ---------- kleine Helfer ---------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function ersetze(s) { return esc(s).replace("{minijobGrenze}", esc(E.minijobGrenze)); }
  function zahl(n, stellen) {
    return Number(n).toLocaleString("de-DE", { minimumFractionDigits: stellen || 0, maximumFractionDigits: stellen || 0 });
  }
  function stunden(n) {
    var r = Math.round(n * 10) / 10;
    return zahl(r, r % 1 === 0 ? 0 : 1) + " Std.";
  }
  function speicher(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  /* ---------- Symbole ---------- */
  var S = {
    rechnung: '<path d="M6 2h9l5 5v15H6z"/><path d="M15 2v5h5"/><path d="M14 11.5a3 3 0 1 0 0 5"/><path d="M9.5 13.2h4M9.5 14.8h4"/>',
    mitarbeiter: '<circle cx="9" cy="7" r="3.5"/><path d="M2.5 21v-1.5A5.5 5.5 0 0 1 8 14h2"/><circle cx="17" cy="17" r="4.5"/><path d="M17 15v2.2l1.5 1"/>',
    buchhaltung: '<path d="M3 6h7l2 2h9v12H3z"/><path d="M8 13h8M8 16.5h5"/>',
    material: '<path d="M12 2.5 21 7v10l-9 4.5L3 17V7z"/><path d="M3 7l9 4.5L21 7M12 11.5v10"/>',
    baustelle: '<path d="M4 17a8 8 0 0 1 16 0"/><path d="M2 17h20v3H2z"/><path d="M10 9V6h4v3"/>',
    angebot: '<path d="M6 2h9l5 5v6"/><path d="M6 2v20h7"/><path d="M15 2v5h5"/><path d="m14.5 21 1-3.5 5-5 2.5 2.5-5 5z"/><path d="M9 9h4M9 12.5h6"/>',
    termine: '<rect x="3" y="4.5" width="18" height="16.5" rx="2"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/><path d="M7.5 13.5h3v3h-3z"/>',
    anfragen: '<path d="M4 4h16v11H9l-5 4z"/><path d="M8 8.5h8M8 11.5h5"/>',
    kamera: '<path d="M3 8h4l2-3h6l2 3h4v11H3z"/><circle cx="12" cy="13" r="3.5"/>',
    bild: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="9.5" r="1.8"/><path d="m4 18 5-5 4 4 3-3 4 4"/>',
    fenster: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M12 3v18M4 12h16"/>',
    dach: '<path d="M2 12 12 4l10 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/>',
    schreiner: '<path d="M4 20h16"/><path d="M6 20V9h4v11M14 20v-6h4v6"/><path d="M6 9l2-4 2 4"/>',
    ofen: '<rect x="5" y="3" width="14" height="18" rx="2"/><rect x="8" y="11" width="8" height="6" rx="1"/><path d="M11 15c0-1.5 2-1.5 1-3"/><path d="M8 7h8"/>',
    sanierung: '<path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3z"/><path d="m14 20 6-6M17 14h3v3"/>',
    shk: '<path d="M4 4v6a4 4 0 0 0 4 4h8"/><path d="M16 10v8M13 14h6"/><path d="M12 20c0-1.5 1-2.5 2-3"/>',
    elektro: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    garten: '<path d="M12 21v-8"/><path d="M12 13c-5 0-7-4-7-8 4 0 7 2 7 8zM12 13c5 0 7-3 7-7-4 0-7 2-7 7z"/>',
    mail: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>'
  };
  function symbol(name) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (S[name] || "") + "</svg>";
  }
  var LOGO = '<svg viewBox="0 0 230 40" role="img" aria-label="Reschero"><g fill="none" stroke="#D9631E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6v28h28"/><path d="M14 26 26 14M18 14h8v8"/></g><text x="46" y="29" font-family="system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif" font-size="25" font-weight="800" letter-spacing="2.5" fill="currentColor">RESCHERO</text></svg>';

  /* ---------- Zugang (Sichtschutz) ---------- */
  function zugangOk() {
    var soll = E.zugangsschluessel;
    if (!soll) return true;
    var params = new URLSearchParams(location.search);
    var ist = params.get("zugang");
    if (ist === soll) {
      speicher("reschero-zugang", soll);
      // Schlüssel aus der Adresszeile entfernen
      try { history.replaceState(null, "", location.pathname + location.hash); } catch (e) {}
      return true;
    }
    return speicher("reschero-zugang") === soll;
  }

  /* ---------- Ansichten ---------- */
  function bereichNach(id) {
    for (var i = 0; i < I.bereiche.length; i++) if (I.bereiche[i].id === id) return I.bereiche[i];
    return null;
  }

  function ansichtStart() {
    var st = I.start;
    var h = '<section class="held abschnitt">';
    if (E.messeHinweis) h += '<div class="messe-band">' + esc(E.messeHinweis) + "</div>";
    h += "<h1>" + esc(st.ueberschrift) + "</h1>";
    h += '<p class="unter">' + esc(st.unterzeile) + "</p>";
    h += '<div class="knopfreihe"><a class="knopf voll" href="#/kontakt">Kostenlose Erstanalyse</a><a class="knopf" href="#/rechner">Ersparnis berechnen</a></div>';
    h += "</section>";

    h += '<section class="abschnitt"><h2>Welcher Bereich kostet Sie am meisten Zeit?</h2><p class="hinweis">' + esc(st.kachelHinweis) + '</p><div class="kacheln">';
    I.bereiche.forEach(function (b) {
      h += '<a class="kachel" href="#/bereich/' + esc(b.id) + '"><div class="symbol">' + symbol(b.symbol) + "</div><h3>" + esc(b.titel) + "</h3>";
      if (b.untertitel) h += '<div class="unter">' + esc(b.untertitel) + "</div>";
      h += "<p>" + esc(b.kurz) + '</p><span class="pfeil">Ansehen →</span></a>';
    });
    h += '</div><p class="hinweis" style="margin-top:14px">' + esc(st.beispielHinweis) + "</p></section>";

    h += '<section class="abschnitt teaser">';
    h += '<a class="karte" href="#/praxis" style="text-decoration:none;color:inherit"><span class="beispiel-marke" style="border-style:solid;color:var(--gruen);border-color:var(--gruen)">Echt im Einsatz</span><h3 style="margin-top:10px">' + esc(I.praxis.ueberschrift) + "</h3><p>" + esc(I.praxis.text) + '</p><span class="pfeil" style="color:var(--orange-dunkel);font-weight:700">Mehr erfahren →</span></a>';
    h += '<a class="karte" href="#/rechner" style="text-decoration:none;color:inherit"><h3>Ersparnis-Rechner</h3><p>Gewerk wählen, Zahlen anpassen und sehen, welcher Ablauf in Ihrem Betrieb wie viel Zeit spart. Mit offenen Annahmen.</p><span style="color:var(--orange-dunkel);font-weight:700">Zum Rechner →</span></a>';
    h += '<a class="karte" href="#/arbeitsweise" style="text-decoration:none;color:inherit"><h3>So arbeiten wir</h3><p>Analyse, Pilot, Umsetzung, Betreuung. Ihre Programme bleiben. Nichts geht ohne Ihre Freigabe raus.</p><span style="color:var(--orange-dunkel);font-weight:700">Ansehen →</span></a>';
    h += "</section>";
    return h;
  }

  function tabelle(bsp) {
    var h = '<div class="tabelle-wrap"><table><thead><tr>';
    bsp.kopf.forEach(function (k, i) { h += "<th" + (i > 0 ? ' class="zahl"' : "") + ">" + esc(k) + "</th>"; });
    h += "</tr></thead><tbody>";
    bsp.zeilen.forEach(function (z) {
      h += "<tr>";
      z.forEach(function (c, i) { h += "<td" + (i > 0 ? ' class="zahl"' : "") + ">" + ersetze(c) + "</td>"; });
      h += "</tr>";
    });
    (bsp.summen || []).forEach(function (s, i, arr) {
      h += '<tr class="summe' + (i === arr.length - 1 ? " letzte" : "") + '"><td colspan="' + (bsp.kopf.length - 1) + '">' + esc(s[0]) + '</td><td class="zahl">' + esc(s[1]) + "</td></tr>";
    });
    return h + "</tbody></table></div>";
  }

  function ansichtBereich(id) {
    var b = bereichNach(id);
    if (!b) return ansichtStart();
    var h = '<a class="zurueck" href="#/">← Alle Bereiche</a>';
    h += '<div class="bereich-kopf"><div class="symbol">' + symbol(b.symbol) + "</div><div><h1>" + esc(b.titel) + "</h1>";
    if (b.untertitel) h += '<div class="hinweis" style="margin:0">' + esc(b.untertitel) + "</div>";
    h += "</div></div>";
    h += '<div class="sprungleiste" role="navigation" aria-label="Abschnitte">' +
      '<button data-ziel="ablauf">Heute & automatisiert</button><button data-ziel="maske">Eingabe am Handy</button><button data-ziel="optionen">Optionen</button>' +
      '<button data-ziel="beispiel">Rechenbeispiel</button><button data-ziel="zeit">Zeitaufwand</button></div>';

    // Ablauf
    h += '<section class="abschnitt vergleich" id="ablauf">';
    h += '<div class="karte"><div class="spalte-titel"><span class="punkt" style="background:var(--vorher)"></span><h2 style="margin:0">So läuft es heute</h2></div><ol class="ablauf">';
    b.heute.schritte.forEach(function (s) { h += "<li>" + esc(s) + "</li>"; });
    h += '</ol><h3 style="margin-top:16px">Typische Probleme</h3><div class="probleme">';
    b.heute.probleme.forEach(function (p) { h += "<span>" + esc(p) + "</span>"; });
    h += "</div></div>";
    h += '<div class="karte"><div class="spalte-titel"><span class="punkt" style="background:var(--gruen)"></span><h2 style="margin:0">So läuft es automatisiert</h2></div>';
    h += '<div class="legende"><span>passiert automatisch</span><span class="m">Sie schauen drüber</span></div><ol class="ablauf neu">';
    b.automatisch.forEach(function (s) {
      var m = s.typ === "mensch";
      h += '<li class="' + (m ? "mensch" : "auto") + '"><span class="marke">' + (m ? "Sie prüfen" : "Automatisch") + "</span>" + esc(s.text) + "</li>";
    });
    h += "</ol>";
    if (b.merksatz) h += '<div class="merksatz">' + esc(b.merksatz) + "</div>";
    h += "</div></section>";

    // Eingabemaske
    h += ansichtMaske(b);

    // Optionen
    h += '<section class="abschnitt" id="optionen"><h2>Was sich automatisieren lässt</h2><div class="optionen">';
    b.optionen.forEach(function (o) { h += '<div class="option"><h3>' + esc(o.titel) + "</h3><p>" + esc(o.text) + "</p></div>"; });
    h += "</div></section>";

    // Beispiel + Zeit
    var z = b.zeit;
    var max = Math.max(z.vorher, z.nachher) || 1;
    h += '<section class="abschnitt raster-2">';
    h += '<div class="karte" id="beispiel"><span class="beispiel-marke">Beispiel</span><h2 style="margin-top:10px">Rechenbeispiel: ' + esc(b.beispiel.titel) + '</h2><p class="hinweis">' + esc(b.beispiel.untertitel) + "</p>" + tabelle(b.beispiel);
    if (b.beispiel.text) h += '<p style="margin-top:14px">' + ersetze(b.beispiel.text) + "</p>";
    h += "</div>";
    h += '<div class="karte" id="zeit"><h2>Zeitaufwand pro Monat</h2><div class="annahme">' + esc(z.annahme) + "</div>";
    h += '<div class="balken-box" role="img" aria-label="Vorher ' + esc(stunden(z.vorher)) + ", nachher " + esc(stunden(z.nachher)) + '">';
    h += '<div class="balken-zeile"><span class="lbl">Vorher</span><div class="balken vorher" style="width:' + (z.vorher / max * 100) + '%">' + stunden(z.vorher) + "</div></div>";
    h += '<div class="balken-zeile"><span class="lbl">Nachher</span><div class="balken nachher" style="width:' + (z.nachher / max * 100) + '%">' + stunden(z.nachher) + "</div></div></div>";
    h += '<div class="ersparnis">Im Beispiel gespart: <b>' + stunden(z.vorher - z.nachher) + " pro Monat</b></div>";
    h += '<div class="tabelle-wrap"><table><thead><tr><th>Arbeitsschritt</th><th class="zahl">Vorher</th><th class="zahl">Nachher</th></tr></thead><tbody>';
    z.zeilen.forEach(function (r) { h += "<tr><td>" + esc(r[0]) + '</td><td class="zahl">' + esc(r[1]) + '</td><td class="zahl">' + esc(r[2]) + "</td></tr>"; });
    h += '<tr class="summe letzte"><td>Summe</td><td class="zahl">' + stunden(z.vorher) + '</td><td class="zahl">' + stunden(z.nachher) + "</td></tr></tbody></table></div>";
    if (z.zusatz) h += '<p class="hinweis" style="margin-top:10px">' + esc(z.zusatz) + "</p>";
    h += '<p class="hinweis" style="margin-top:10px">Geschätzte Werte für den erfundenen Beispielbetrieb, keine Messung. In Ihrem Betrieb kann es mehr oder weniger sein.</p></div>';
    h += "</section>";

    if (b.infokasten) {
      var k = b.infokasten;
      h += '<section class="abschnitt karte infokasten"><h3>' + esc(k.titel) + "</h3><p>" + esc(k.text) + '</p><p class="quellen">Quellen: ' +
        k.quellen.map(function (q) { return '<a href="' + esc(q[1]) + '" target="_blank" rel="noopener">' + esc(q[0]) + "</a>"; }).join(", ") + "</p></section>";
    }

    h += '<section class="abschnitt knopfreihe"><a class="knopf voll" href="#/kontakt">Kostenlose Erstanalyse</a><a class="knopf" href="#/rechner">Ersparnis berechnen</a><a class="knopf" href="#/">Andere Bereiche</a></section>';
    return h;
  }

  /* ---------- Rechner nach Gewerk (3 Schritte) ---------- */
  var R = { gewerk: null, werte: null };
  try { var gespeichert = JSON.parse(speicher("reschero-rechner") || "null"); if (gespeichert) R = gespeichert; } catch (e) {}
  function rSpeichern() { speicher("reschero-rechner", JSON.stringify(R)); }
  function gewerkNach(id) { var g = I.rechner.gewerke; for (var i = 0; i < g.length; i++) if (g[i].id === id) return g[i]; return null; }

  function schrittleiste(n) {
    var t = ["Gewerk", "Ihre Zahlen", "Ergebnis"];
    return '<ol class="schrittleiste">' + t.map(function (x, i) {
      return '<li class="' + (i + 1 === n ? "aktiv" : (i + 1 < n ? "fertig" : "")) + '"><span>' + (i + 1) + "</span>" + esc(x) + "</li>";
    }).join("") + "</ol>";
  }

  function ansichtRechner(schritt) {
    var r = I.rechner;
    var g = R.gewerk && gewerkNach(R.gewerk);
    if ((schritt === "werte" || schritt === "ergebnis") && !g) schritt = "";
    var h = '<section class="abschnitt"><h1>' + esc(r.ueberschrift) + "</h1><p>" + esc(r.einleitung) + "</p></section>";

    if (!schritt) {
      h += schrittleiste(1) + '<section class="abschnitt"><h2>In welchem Gewerk arbeiten Sie?</h2><div class="kacheln gewerke">';
      r.gewerke.forEach(function (x) {
        h += '<button type="button" class="kachel gewerk' + (R.gewerk === x.id ? " gewaehlt" : "") + '" data-gewerk="' + esc(x.id) + '"><div class="symbol">' + symbol(x.symbol) + "</div><h3>" + esc(x.titel) + "</h3></button>";
      });
      return h + "</div></section>";
    }

    if (schritt === "werte") {
      var w = R.werte || g.vorgabe;
      h += schrittleiste(2) + '<section class="abschnitt raster-2"><div class="karte"><h2>' + esc(g.titel) + "</h2>" +
        '<p class="hinweis">Die Werte sind typische Vorgaben für Ihr Gewerk. Schieben Sie sie auf Ihren Betrieb.</p>' +
        regler("mitarbeiter", "Mitarbeiter auf Baustellen", 1, 40, 1, w.mitarbeiter, "") +
        regler("auftraege", "Aufträge bzw. Einsätze pro Monat", 1, 150, 1, w.auftraege, "") +
        regler("angebote", "Angebote pro Monat", 0, 120, 1, w.angebote, "") +
        regler("satz", "Stundensatz fürs Büro", 20, 80, 1, w.satz, " €") +
        '<p class="hinweis">Stundensatz: Was eine Stunde Bürozeit kostet, inklusive Nebenkosten. Oder was Ihre eigene Stunde wert ist.</p>' +
        '<h3 style="margin-top:22px">Welche Abläufe gibt es bei Ihnen?</h3><p class="hinweis">Abwählen, was Sie nicht machen oder schon gut gelöst haben.</p><div class="ablauf-wahl">' +
        Object.keys(r.prozesse).map(function (k) {
          var an = (R.aus || []).indexOf(k) < 0;
          return '<button type="button" class="m-chip' + (an ? " an" : "") + '" aria-pressed="' + an + '" data-prozess="' + k + '">' + (an ? "✓ " : "") + esc(prozessTitel(k, g)) + "</button>";
        }).join("") + "</div>" +
        '<div class="knopfreihe"><a class="knopf voll" href="#/rechner/ergebnis" id="zumErgebnis">Ergebnis anzeigen →</a><a class="knopf" href="#/rechner">← Gewerk ändern</a></div></div>' +
        '<div class="karte vorschau"><h2>Vorschau</h2><div class="ergebnis haupt"><div class="wert" id="vorschauStd"></div><div class="was">Stunden pro Monat, die sich sparen lassen könnten</div></div><p class="hinweis" style="margin-top:12px">Im nächsten Schritt sehen Sie, welcher Ablauf wie viel ausmacht.</p></div></section>';
      return h;
    }

    // Ergebnis
    var e = berechne(g, R.werte || g.vorgabe);
    var f = r.vorsichtigFaktor;
    var max = e.liste[0] ? e.liste[0].gespart : 1;
    h += schrittleiste(3);
    h += '<section class="abschnitt karte ergebnis-kopf"><div><div class="hinweis" style="margin:0">' + esc(g.titel) + " · " + zahl(e.w.mitarbeiter) + " Mitarbeiter · " + zahl(e.w.auftraege) + " Aufträge · " + zahl(e.w.angebote) + " Angebote pro Monat</div>" +
      '<h2 style="margin:6px 0 0">Geschätzte Ersparnis: <span class="gruen">' + zahl(e.summe * f / 60) + "–" + zahl(e.summe / 60) + " Std. pro Monat</span></h2>" +
      '<p style="margin:6px 0 0">Das entspricht etwa <b>' + zahl(Math.round(e.summe * f / 60 * e.w.satz * 12 / 100) * 100) + "–" + zahl(Math.round(e.summe / 60 * e.w.satz * 12 / 100) * 100) + " € pro Jahr</b> bei " + zahl(e.w.satz) + " € pro Stunde.</p>" +
      '<p class="hinweis" style="margin:6px 0 0">Untere Zahl: vorsichtig gerechnet (die Hälfte). Obere Zahl: Rechenbeispiel mit allen Annahmen.</p></div></section>';
    h += '<section class="abschnitt karte erklaerung"><h3>So entstehen die Zahlen</h3><p>Für jeden Ablauf rechnet der Rechner: <b>Anzahl pro Monat × Minuten, die pro Vorgang wegfallen</b>. Beispiel: 40 Angebote × 20 Min. weniger = 800 Min. = 13,3 Std. im Monat.</p><p class="hinweis" style="margin:0">Die Minuten sind Schätzungen für einen typischen Betrieb im Bereich ' + esc(g.titel) + '. Im Gespräch ersetzen wir sie durch Ihre echten Werte.</p></section>';
    h += '<section class="abschnitt"><h2>Wo es sich am meisten lohnt</h2><p class="hinweis">Tippen Sie auf einen Ablauf: Sie sehen, warum Zeit wegfällt, und die Handy-Eingabe dazu.</p><div class="prozesse">';
    e.liste.forEach(function (p, i) {
      var einheit = { mitarbeiter: "Mitarbeiter", auftrag: "Aufträge", angebot: "Angebote" }[p.je];
      h += '<details class="prozess' + (i < 3 ? " top" : "") + '"><summary>' +
        '<span class="p-rang">' + (i + 1) + "</span>" +
        '<span class="p-name">' + esc(p.titel) + '<em>' + zahl(p.menge) + " " + einheit + " × " + zahl(p.min[0] - p.min[1], (p.min[0] - p.min[1]) % 1 ? 1 : 0) + " Min. weniger</em></span>" +
        '<span class="p-balken"><i style="width:' + Math.max(4, p.gespart / max * 100) + '%"></i></span>' +
        '<span class="p-wert">−' + stunden(p.gespart / 60) + "</span></summary>" +
        '<div class="p-details"><p><b>Was sich ändert:</b> ' + esc(p.text) + "</p>" + (p.warum ? "<p><b>Warum Zeit wegfällt:</b> " + esc(p.warum) + "</p>" : "") +
        '<table><tbody><tr><td>Heute</td><td class="zahl">' + stunden(p.vorher / 60) + '</td></tr><tr><td>Automatisiert</td><td class="zahl">' + stunden(p.nachher / 60) + '</td></tr><tr class="summe"><td>Gespart pro Monat</td><td class="zahl">' + stunden(p.gespart / 60) + " ≈ " + zahl(Math.round(p.gespart / 60 * e.w.satz)) + " €</td></tr></tbody></table>" +
        '<p class="hinweis">Annahme: ' + zahl(p.menge) + " " + einheit + " × " + zahl(p.min[0], p.min[0] % 1 ? 2 : 0) + " Min. heute, " + zahl(p.min[1], p.min[1] % 1 ? 2 : 0) + " Min. automatisiert, pro Monat.</p>" +
        '<a class="knopf" href="#/bereich/' + esc(p.bereich) + '">Ablauf & Handy-Eingabe ansehen →</a></div></details>';
    });
    h += "</div>";
    if (e.aus.length) h += '<p class="hinweis" style="margin-top:12px">Nicht eingerechnet, weil abgewählt: ' + e.aus.map(esc).join(", ") + ' · <a href="#/rechner/werte">ändern</a></p>';
    h += "</section>";
    h += '<section class="abschnitt karte"><p class="hinweis" style="margin:0">' + esc(r.hinweis) + "</p></section>";
    h += '<section class="abschnitt knopfreihe"><a class="knopf voll" href="#/kontakt">Kostenlose Erstanalyse</a><a class="knopf" href="#/rechner/werte">← Zahlen ändern</a><a class="knopf" href="#/rechner">Anderes Gewerk</a></section>';
    return h;
  }

  function berechne(g, w) {
    var P = I.rechner.prozesse, liste = [], summe = 0, aus = [];
    Object.keys(P).forEach(function (k) {
      var p = P[k], min = g.minuten[k];
      if (!min) return;
      if ((R.aus || []).indexOf(k) >= 0) { aus.push(prozessTitel(k, g)); return; }
      var menge = p.je === "mitarbeiter" ? w.mitarbeiter : p.je === "angebot" ? w.angebote : w.auftraege;
      var vorher = menge * min[0], nachher = menge * min[1];
      var x = { titel: prozessTitel(k, g), text: p.text, warum: p.warum, bereich: p.bereich, je: p.je, menge: menge, min: min, vorher: vorher, nachher: nachher, gespart: vorher - nachher };
      summe += x.gespart; liste.push(x);
    });
    liste.sort(function (a, b) { return b.gespart - a.gespart; });
    return { liste: liste, summe: summe, w: w, aus: aus };
  }
  function prozessTitel(k, g) {
    var p = I.rechner.prozesse[k];
    return (k === "angebot" && g && g.aufmass && p.titelAufmass) ? p.titelAufmass : p.titel;
  }

  function regler(id, text, min, max, schritt, wert, einheit) {
    return '<div class="regler"><label for="r_' + id + '"><span>' + esc(text) + '</span><output id="o_' + id + '"></output></label>' +
      '<input type="range" id="r_' + id + '" min="' + min + '" max="' + max + '" step="' + schritt + '" value="' + wert + '" data-einheit="' + esc(einheit) + '"></div>';
  }

  function rechnerAktiv(main, schritt) {
    main.querySelectorAll("[data-gewerk]").forEach(function (b) {
      b.addEventListener("click", function () {
        var g = gewerkNach(b.getAttribute("data-gewerk"));
        R.gewerk = g.id; R.werte = JSON.parse(JSON.stringify(g.vorgabe)); R.aus = []; rSpeichern();
        location.hash = "#/rechner/werte";
      });
    });
    if (schritt !== "werte") return;
    var g = gewerkNach(R.gewerk);
    function neu() {
      var w = {};
      ["mitarbeiter", "auftraege", "angebote", "satz"].forEach(function (id) {
        var el = document.getElementById("r_" + id);
        w[id] = Number(el.value);
        document.getElementById("o_" + id).textContent = zahl(el.value) + el.getAttribute("data-einheit");
      });
      R.werte = w; rSpeichern();
      var e = berechne(g, w);
      document.getElementById("vorschauStd").textContent = zahl(e.summe * I.rechner.vorsichtigFaktor / 60) + "–" + zahl(e.summe / 60);
    }
    main.querySelectorAll("input[type=range]").forEach(function (el) { el.addEventListener("input", neu); });
    main.querySelectorAll("[data-prozess]").forEach(function (b) {
      b.addEventListener("click", function () {
        var k = b.getAttribute("data-prozess"); R.aus = R.aus || [];
        var i = R.aus.indexOf(k);
        if (i >= 0) R.aus.splice(i, 1); else R.aus.push(k);
        var an = R.aus.indexOf(k) < 0;
        b.classList.toggle("an", an); b.setAttribute("aria-pressed", an);
        b.textContent = (an ? "✓ " : "") + prozessTitel(k, g);
        neu();
      });
    });
    neu();
  }

  function ansichtArbeitsweise() {
    var a = I.arbeitsweise;
    var h = '<section class="abschnitt"><h1>' + esc(a.ueberschrift) + '</h1></section>';
    if (a.team) {
      h += '<section class="abschnitt"><h2>' + esc(a.teamUeberschrift) + '</h2><p>' + esc(a.teamEinleitung) + '</p><div class="team">';
      a.team.forEach(function (t) {
        var ini = t.name.split(" ").map(function (x) { return x[0]; }).join("");
        h += '<div class="karte person"><div class="initialen">' + esc(ini) + '</div><div><h3>' + esc(t.name) + '</h3><div class="schwerpunkt">' + esc(t.schwerpunkt) + '</div><p>' + esc(t.text) + "</p></div></div>";
      });
      h += "</div></section>";
    }
    h += '<section class="abschnitt"><h2>In vier Schritten</h2><div class="schritte4">';
    a.schritte.forEach(function (s) { h += '<div class="schritt"><h3>' + esc(s.titel) + "</h3><p>" + esc(s.text) + "</p></div>"; });
    h += '</div></section><section class="abschnitt karte"><h2>Darauf können Sie sich verlassen</h2><div class="versprechen">';
    a.versprechen.forEach(function (v) { h += "<div><h3>" + esc(v.titel) + "</h3><p>" + esc(v.text) + "</p></div>"; });
    h += '</div></section><section class="abschnitt knopfreihe"><a class="knopf voll" href="#/kontakt">Kostenlose Erstanalyse</a><a class="knopf" href="#/praxis">Praxisbeispiel ansehen</a></section>';
    return h;
  }

  function ansichtPraxis() {
    var p = I.praxis;
    var h = '<a class="zurueck" href="#/">← Startseite</a><section class="abschnitt"><span class="beispiel-marke" style="border-style:solid;color:var(--gruen);border-color:var(--gruen)">Echt im Einsatz</span><h1 style="margin-top:12px">' + esc(p.ueberschrift) + "</h1><p>" + esc(p.text) + "</p></section>";
    h += '<section class="abschnitt karte"><ol class="ablauf neu">';
    p.punkte.forEach(function (t) { h += '<li class="auto"><span class="marke">Läuft automatisch</span>' + esc(t) + "</li>"; });
    h += "</ol><p class=\"hinweis\" style=\"margin-top:14px\">" + esc(p.technik) + "</p></section>";
    if (p.weitere) {
      h += '<section class="abschnitt"><h2>' + esc(p.weitereUeberschrift) + '</h2><div class="raster-2">';
      p.weitere.forEach(function (w) { h += '<div class="karte"><span class="beispiel-marke" style="border-style:solid">' + esc(w.stand) + '</span><h3 style="margin-top:10px">' + esc(w.titel) + "</h3><p style=\"margin:0\">" + esc(w.text) + "</p></div>"; });
      h += "</div>" + (p.ehrlich ? '<p class="hinweis" style="margin-top:14px">' + esc(p.ehrlich) + "</p>" : "") + "</section>";
    }
    h += '<section class="abschnitt knopfreihe"><a class="knopf voll" href="#/kontakt">So etwas für meinen Betrieb</a><a class="knopf" href="#/bereich/mitarbeiter">Bereich Mitarbeiter ansehen</a></section>';
    return h;
  }

  function ansichtKontakt() {
    var k = I.kontakt;
    var link = (E.webadresse || location.origin) + "/" + (E.zugangsschluessel ? "?zugang=" + encodeURIComponent(E.zugangsschluessel) : "");
    var h = '<section class="abschnitt kontakt-box">';
    h += '<div class="karte dunkel"><div class="messe-band">' + esc(k.band || "") + '</div><h1>' + esc(k.ueberschrift) + "</h1><p>" + esc(k.text) + "</p>";
    if (k.pilotHinweis) h += '<p style="font-weight:700;color:#fff">' + esc(k.pilotHinweis) + "</p>";
    var kontakte = E.kontakte && E.kontakte.length ? E.kontakte : [{ name: E.name, email: E.email }];
    kontakte.forEach(function (k2) {
      h += '<a class="mail-knopf" href="mailto:' + esc(k2.email) + "?subject=" + encodeURIComponent("Kostenlose Erstanalyse") + '">' + symbol("mail") + '<span><small>' + esc(k2.name) + "</small>" + esc(k2.email) + "</span></a>";
    });
    h += "</div>";
    h += '<div class="karte qr-karte"><h2>Zum Mitnehmen</h2><div class="qr" id="qr"></div><p style="margin-top:12px">' + esc(k.qrText) + "</p></div>";
    h += "</section>";
    setTimeout(function () { qrZeichnen(link); }, 0);
    return h;
  }
  function qrZeichnen(text) {
    var ziel = document.getElementById("qr");
    if (!ziel || typeof qrcode !== "function") return;
    var q = qrcode(0, "M");
    q.addData(text);
    q.make();
    ziel.innerHTML = q.createSvgTag({ cellSize: 6, margin: 2, scalable: true, alt: "QR-Code zur Seite" });
  }

  /* ---------- Eingabemasken (Vorführung) ---------- */
  function feld(f, i) {
    var mod = f.nurModus !== undefined ? ' data-modus="' + f.nurModus + '"' : "";
    var id = "mf" + i;
    var h = '<div class="m-feld"' + mod + ">";
    if (f.label && f.typ !== "schalter") h += '<label class="m-label" for="' + id + '">' + esc(f.label) + "</label>";
    switch (f.typ) {
      case "auswahl":
        h += '<select id="' + id + '" class="m-eingabe">' + f.optionen.map(function (o) { return "<option>" + esc(o) + "</option>"; }).join("") + "</select>"; break;
      case "text":
        h += '<input id="' + id + '" class="m-eingabe" type="text" value="' + esc(f.wert || "") + '" placeholder="' + esc(f.platzhalter || "") + '">'; break;
      case "notiz":
        h += '<textarea id="' + id + '" class="m-eingabe" rows="3" placeholder="' + esc(f.platzhalter || "") + '"></textarea>'; break;
      case "datum":
        h += '<input id="' + id + '" class="m-eingabe" type="date" value="' + esc(f.wert) + '">'; break;
      case "zeitspanne":
        h += '<div class="m-zwei"><input id="' + id + '" class="m-eingabe" type="time" value="' + esc(f.von) + '" aria-label="von"><span>bis</span><input class="m-eingabe" type="time" value="' + esc(f.bis) + '" aria-label="bis"></div>'; break;
      case "zahl":
        h += '<div class="m-zahl"><button type="button" class="m-minus" aria-label="weniger">−</button><input id="' + id + '" class="m-eingabe" type="number" inputmode="numeric" value="' + esc(f.wert) + '"><span>' + esc(f.einheit || "") + '</span><button type="button" class="m-plus" aria-label="mehr">+</button></div>'; break;
      case "chips":
        h += '<div class="m-chips" data-einzeln="' + (f.einzeln ? 1 : 0) + '">' + f.optionen.map(function (o, k) {
          var an = (f.gewaehlt || []).indexOf(k) >= 0;
          return '<button type="button" class="m-chip' + (an ? " an" : "") + '" aria-pressed="' + an + '">' + esc(o) + "</button>";
        }).join("") + "</div>"; break;
      case "foto":
        h += '<button type="button" class="m-foto"><span class="m-kamera">' + symbol("kamera") + '</span><span class="m-foto-text">Foto aufnehmen</span></button><div class="m-fotos"></div>'; break;
      case "material":
        h += '<div class="m-material">' + f.zeilen.map(function (z) {
          return '<div class="m-mat-zeile"><span>' + esc(z[0]) + "</span><b>" + esc(z[1]) + "</b></div>";
        }).join("") + '<button type="button" class="m-plus-zeile">+ Position hinzufügen</button></div>'; break;
      case "modus":
        h += '<div class="m-modus">' + f.optionen.map(function (o, k) {
          return '<button type="button" class="m-modus-knopf' + (k === 0 ? " an" : "") + '" data-m="' + k + '">' + esc(o) + "</button>";
        }).join("") + "</div>"; break;
      case "regler":
        h += '<div class="m-regler"><input id="' + id + '" type="range" min="0" max="100" step="5" value="' + esc(f.wert) + '"><output>' + esc(f.wert) + " " + esc(f.einheit) + "</output></div>"; break;
      case "schalter":
        h += '<button type="button" class="m-schalter' + (f.an ? " an" : "") + '" role="switch" aria-checked="' + !!f.an + '"><span>' + esc(f.label) + '</span><i></i></button>'; break;
      case "tagesplan":
        h += f.eintraege.map(function (e) {
          return '<div class="m-plan"><div class="m-plan-zeit">' + esc(e.zeit) + "</div><b>" + esc(e.aufgabe) + "</b><div>" + esc(e.ort) + '</div><div class="m-plan-hinweis">' + esc(e.hinweis) +
            '</div><div class="m-plan-knoepfe"><button type="button" class="m-chip">Navigation</button><button type="button" class="m-chip m-status">Angekommen</button></div></div>';
        }).join(""); break;
      case "info":
        h += '<div class="m-info">' + esc(f.text) + "</div>"; break;
    }
    return h + "</div>";
  }

  function ansichtMaske(b) {
    var m = (I.masken || {})[b.id];
    if (!m) return "";
    var t = I.maskenText;
    var h = '<section class="abschnitt maske-bereich" id="maske"><div class="maske-text"><h2>' + esc(t.ueberschrift) + "</h2><p>" + esc(t.einleitung) + "</p>";
    h += '<div class="legende"><span>passiert nach dem Speichern automatisch</span><span class="m">Sie schauen drüber</span></div><ol class="ablauf neu klein-ablauf">';
    b.automatisch.forEach(function (s) {
      var mm = s.typ === "mensch";
      h += '<li class="' + (mm ? "mensch" : "auto") + '"><span class="marke">' + (mm ? "Sie prüfen" : "Automatisch") + "</span>" + esc(s.text) + "</li>";
    });
    h += "</ol></div>";
    h += '<div class="handy"><div class="handy-rahmen"><div class="handy-kopf"><span class="handy-titel">' + esc(m.titel) + '</span><span class="handy-wer">' + esc(m.wer) + "</span></div>";
    h += '<form class="handy-inhalt" novalidate><div class="m-beispiel">Beispiel · nichts wird gespeichert</div>';
    m.felder.forEach(function (f, i) { h += feld(f, b.id + i); });
    h += '<button type="submit" class="m-speichern">' + esc(m.knopf) + "</button></form>";
    h += '<div class="handy-fertig" hidden><div class="m-haken">✓</div><p><b>' + esc(t.nachSpeichern) + "</b></p><ul>" +
      b.automatisch.slice(1).map(function (s) { return '<li class="' + (s.typ === "mensch" ? "mensch" : "auto") + '">' + esc(s.text) + "</li>"; }).join("") +
      '</ul><button type="button" class="m-nochmal">Noch einmal ausprobieren</button></div>';
    h += "</div></div></section>";
    return h;
  }

  function maskeAktiv(root) {
    var form = root.querySelector(".handy-inhalt");
    if (!form) return;
    var fertig = root.querySelector(".handy-fertig");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      form.hidden = true; fertig.hidden = false;
    });
    fertig.querySelector(".m-nochmal").addEventListener("click", function () { fertig.hidden = true; form.hidden = false; });
    form.addEventListener("click", function (e) {
      var el = e.target.closest("button");
      if (!el) return;
      if (el.classList.contains("m-chip")) {
        var grp = el.parentNode;
        if (el.classList.contains("m-status")) { el.textContent = el.textContent === "Angekommen" ? "Fertig ✓" : "Angekommen"; el.classList.toggle("an"); return; }
        if (grp.getAttribute("data-einzeln") === "1") grp.querySelectorAll(".m-chip").forEach(function (c) { c.classList.remove("an"); c.setAttribute("aria-pressed", "false"); });
        el.classList.toggle("an"); el.setAttribute("aria-pressed", el.classList.contains("an"));
      } else if (el.classList.contains("m-schalter")) {
        el.classList.toggle("an"); el.setAttribute("aria-checked", el.classList.contains("an"));
      } else if (el.classList.contains("m-plus") || el.classList.contains("m-minus")) {
        var inp = el.parentNode.querySelector("input");
        var schritt = Number(inp.value) >= 10 ? 5 : 1;
        inp.value = Math.max(0, Number(inp.value || 0) + (el.classList.contains("m-plus") ? schritt : -schritt));
      } else if (el.classList.contains("m-foto")) {
        var ziel = el.nextElementSibling;
        if (ziel.children.length < 3) ziel.insertAdjacentHTML("beforeend", '<span class="m-foto-mini">' + symbol("bild") + "</span>");
        el.querySelector(".m-foto-text").textContent = ziel.children.length + " Foto" + (ziel.children.length > 1 ? "s" : "") + " · weiteres aufnehmen";
      } else if (el.classList.contains("m-plus-zeile")) {
        el.insertAdjacentHTML("beforebegin", '<div class="m-mat-zeile"><input class="m-eingabe" placeholder="Artikel"><input class="m-eingabe m-menge" placeholder="Menge"></div>');
      } else if (el.classList.contains("m-modus-knopf")) {
        var k = el.getAttribute("data-m");
        el.parentNode.querySelectorAll(".m-modus-knopf").forEach(function (x) { x.classList.toggle("an", x === el); });
        form.querySelectorAll("[data-modus]").forEach(function (x) { x.hidden = x.getAttribute("data-modus") !== k; });
      }
    });
    form.querySelectorAll(".m-regler input").forEach(function (r) {
      r.addEventListener("input", function () { r.nextElementSibling.textContent = r.value + " %"; });
    });
    form.querySelectorAll('[data-modus]').forEach(function (x) { x.hidden = x.getAttribute("data-modus") !== "0"; });
  }

  /* ---------- Router ---------- */
  function zeige() {
    var pfad = (location.hash || "#/").replace(/^#/, "");
    var teile = pfad.split("/").filter(Boolean);
    var main = document.getElementById("inhalt");
    var nav = "start", html;
    if (teile[0] === "bereich") html = ansichtBereich(teile[1]);
    else if (teile[0] === "rechner") { html = ansichtRechner(teile[1] || ""); nav = "rechner"; }
    else if (teile[0] === "arbeitsweise") { html = ansichtArbeitsweise(); nav = "arbeitsweise"; }
    else if (teile[0] === "praxis") { html = ansichtPraxis(); nav = "arbeitsweise"; }
    else if (teile[0] === "kontakt") { html = ansichtKontakt(); nav = "kontakt"; }
    else html = ansichtStart();
    main.innerHTML = html;
    document.querySelectorAll("[data-nav]").forEach(function (a) { a.classList.toggle("aktiv", a.getAttribute("data-nav") === nav); });
    if (teile[0] === "rechner") rechnerAktiv(main, teile[1] || "");
    maskeAktiv(main);
    main.querySelectorAll(".sprungleiste button").forEach(function (b) {
      b.addEventListener("click", function () {
        var el = document.getElementById(b.getAttribute("data-ziel"));
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 140, behavior: "smooth" });
      });
    });
    window.scrollTo(0, 0);
  }

  /* ---------- Messe-Modus ---------- */
  var leerlauf;
  function messeModus(an) {
    document.body.classList.toggle("gross", an);
    document.getElementById("messeModus").setAttribute("aria-pressed", an ? "true" : "false");
    speicher("reschero-messe", an ? "1" : "0");
    zuruecksetzen();
  }
  function zuruecksetzen() {
    clearTimeout(leerlauf);
    var min = Number(E.messeModusZurueckNachMinuten) || 0;
    if (!document.body.classList.contains("gross") || !min) return;
    leerlauf = setTimeout(function () {
      if (location.hash && location.hash !== "#/") location.hash = "#/";
      else window.scrollTo(0, 0);
    }, min * 60000);
  }

  /* ---------- Start ---------- */
  function los() {
    document.querySelectorAll(".logo").forEach(function (l) { l.innerHTML = LOGO; });
    if (!zugangOk()) {
      document.getElementById("gesperrt").hidden = false;
      return;
    }
    document.getElementById("seite").hidden = false;
    if (E.impressumAnzeigen) document.getElementById("rechtsLinks").hidden = false;
    document.getElementById("messeModus").addEventListener("click", function () {
      messeModus(!document.body.classList.contains("gross"));
    });
    if (speicher("reschero-messe") === "1") messeModus(true);
    ["click", "touchstart", "scroll", "keydown"].forEach(function (ev) { window.addEventListener(ev, zuruecksetzen, { passive: true }); });
    window.addEventListener("hashchange", zeige);
    zeige();

    // Offline auf dem Handy: Dateien zwischenspeichern (nur online über https)
    if ("serviceWorker" in navigator && location.protocol === "https:") {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    }
  }
  los();
})();
