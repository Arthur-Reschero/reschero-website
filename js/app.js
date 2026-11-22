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
    h += '<a class="karte" href="#/rechner" style="text-decoration:none;color:inherit"><h3>Ersparnis-Rechner</h3><p>Drei Werte einstellen und sehen, was Automatisierung in Ihrem Betrieb sparen könnte. Mit offenen Annahmen.</p><span style="color:var(--orange-dunkel);font-weight:700">Zum Rechner →</span></a>';
    h += '<a class="karte" href="#/arbeitsweise" style="text-decoration:none;color:inherit"><h3>So arbeite ich</h3><p>Analyse, Pilot, Umsetzung, Betreuung. Ihre Programme bleiben. Nichts geht ohne Ihre Freigabe raus.</p><span style="color:var(--orange-dunkel);font-weight:700">Ansehen →</span></a>';
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

  function ansichtRechner() {
    var r = I.rechner;
    var h = '<section class="abschnitt"><h1>' + esc(r.ueberschrift) + "</h1><p>" + esc(r.einleitung) + "</p></section>";
    h += '<section class="abschnitt raster-2"><div class="karte">' +
      regler("mitarbeiter", "Mitarbeiter", 1, 30, 1, 5, "") +
      regler("rechnungen", "Rechnungen pro Monat", 5, 300, 5, 40, "") +
      regler("satz", "Stundensatz fürs Büro", 20, 80, 1, 35, " €") +
      '<p class="hinweis">Stundensatz: Was eine Stunde Bürozeit kostet, inklusive Nebenkosten. Oder was Ihre eigene Stunde wert ist.</p></div>';
    h += '<div class="karte" aria-live="polite"><h2>Geschätzte Ersparnis</h2><div class="ergebnisse">' +
      '<div class="ergebnis-titel">Rechenbeispiel</div>' +
      '<div class="ergebnis haupt"><div class="wert" id="eStd"></div><div class="was">Stunden pro Monat</div></div>' +
      '<div class="ergebnis haupt"><div class="wert" id="eMon"></div><div class="was">Euro pro Monat</div></div>' +
      '<div class="ergebnis haupt" style="grid-column:1/-1"><div class="wert" id="eJahr"></div><div class="was">Euro pro Jahr</div></div>' +
      '<div class="ergebnis-titel">Vorsichtig gerechnet (die Hälfte)</div>' +
      '<div class="ergebnis"><div class="wert" id="vStd"></div><div class="was">Stunden pro Monat</div></div>' +
      '<div class="ergebnis"><div class="wert" id="vJahr"></div><div class="was">Euro pro Jahr</div></div>' +
      '</div><p class="hinweis" style="margin-top:16px">' + esc(r.hinweis) + "</p>" +
      "<details><summary>So wird gerechnet</summary><ul>" +
      "<li>Rechnungen: 15 Min. vorher, 3,75 Min. nachher. Gespart: " + zahl(r.minutenProRechnung, 2) + " Min. pro Rechnung.</li>" +
      "<li>Belege: 1,5 Eingangsbelege pro Rechnung, je 4 Min. gespart. Das sind " + zahl(r.minutenBelegeProRechnung) + " Min. pro Rechnung.</li>" +
      "<li>Zeiterfassung & Lohn: 84 Min. vorher, 18 Min. nachher. Gespart: " + zahl(r.minutenProMitarbeiter) + " Min. pro Mitarbeiter.</li>" +
      "<li>Stunden × Stundensatz = Euro pro Monat. Mal 12 = pro Jahr.</li>" +
      "<li>Die Annahmen stammen aus den Beispielen der einzelnen Bereiche. Es sind Schätzungen, keine Messungen.</li>" +
      "</ul></details></div></section>";
    return h;
  }
  function regler(id, text, min, max, schritt, wert, einheit) {
    return '<div class="regler"><label for="r_' + id + '"><span>' + esc(text) + '</span><output id="o_' + id + '"></output></label>' +
      '<input type="range" id="r_' + id + '" min="' + min + '" max="' + max + '" step="' + schritt + '" value="' + wert + '" data-einheit="' + esc(einheit) + '"></div>';
  }
  function rechnerAktiv() {
    var r = I.rechner;
    function wert(id) { return Number(document.getElementById("r_" + id).value); }
    function neu() {
      ["mitarbeiter", "rechnungen", "satz"].forEach(function (id) {
        var el = document.getElementById("r_" + id);
        document.getElementById("o_" + id).textContent = zahl(el.value) + el.getAttribute("data-einheit");
      });
      var min = wert("rechnungen") * (r.minutenProRechnung + r.minutenBelegeProRechnung) + wert("mitarbeiter") * r.minutenProMitarbeiter;
      var std = min / 60;
      var mon = std * wert("satz");
      var f = r.vorsichtigFaktor;
      document.getElementById("eStd").textContent = zahl(std, std < 10 ? 1 : 0);
      document.getElementById("eMon").textContent = zahl(Math.round(mon)) + " €";
      document.getElementById("eJahr").textContent = zahl(Math.round(mon * 12 / 10) * 10) + " €";
      document.getElementById("vStd").textContent = zahl(std * f, std * f < 10 ? 1 : 0);
      document.getElementById("vJahr").textContent = zahl(Math.round(mon * 12 * f / 10) * 10) + " €";
    }
    document.querySelectorAll("input[type=range]").forEach(function (el) { el.addEventListener("input", neu); });
    neu();
  }

  function ansichtArbeitsweise() {
    var a = I.arbeitsweise;
    var h = '<section class="abschnitt"><h1>' + esc(a.ueberschrift) + '</h1></section><section class="abschnitt schritte4">';
    a.schritte.forEach(function (s) { h += '<div class="schritt"><h3>' + esc(s.titel) + "</h3><p>" + esc(s.text) + "</p></div>"; });
    h += '</section><section class="abschnitt karte"><h2>Darauf können Sie sich verlassen</h2><div class="versprechen">';
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
    h += '<section class="abschnitt knopfreihe"><a class="knopf voll" href="#/kontakt">So etwas für meinen Betrieb</a><a class="knopf" href="#/bereich/mitarbeiter">Bereich Mitarbeiter ansehen</a></section>';
    return h;
  }

  function ansichtKontakt() {
    var k = I.kontakt;
    var link = (E.webadresse || location.origin) + "/" + (E.zugangsschluessel ? "?zugang=" + encodeURIComponent(E.zugangsschluessel) : "");
    var h = '<section class="abschnitt kontakt-box">';
    h += '<div class="karte dunkel"><div class="messe-band">Messe-Angebot</div><h1>' + esc(k.ueberschrift) + "</h1><p>" + esc(k.text) + "</p>";
    if (k.pilotHinweis) h += '<p style="font-weight:700;color:#fff">' + esc(k.pilotHinweis) + "</p>";
    h += '<a class="mail-knopf" href="mailto:' + esc(E.email) + "?subject=" + encodeURIComponent("Kostenlose Erstanalyse") + '">' + symbol("mail") + "<span>" + esc(E.email) + "</span></a>";
    if (E.name) h += '<p style="margin-top:16px">' + esc(E.name) + " · Reschero</p>";
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
    else if (teile[0] === "rechner") { html = ansichtRechner(); nav = "rechner"; }
    else if (teile[0] === "arbeitsweise") { html = ansichtArbeitsweise(); nav = "arbeitsweise"; }
    else if (teile[0] === "praxis") { html = ansichtPraxis(); nav = "arbeitsweise"; }
    else if (teile[0] === "kontakt") { html = ansichtKontakt(); nav = "kontakt"; }
    else html = ansichtStart();
    main.innerHTML = html;
    document.querySelectorAll("[data-nav]").forEach(function (a) { a.classList.toggle("aktiv", a.getAttribute("data-nav") === nav); });
    if (teile[0] === "rechner") rechnerAktiv();
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
