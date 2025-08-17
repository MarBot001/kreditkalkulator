function drawtable(uj) {
  hibakeres();

  if (uj !== 1 && !document.getElementById(String(uj))) {
    var ujsor = document.getElementById('1').cloneNode(true);
    var div = document.getElementById('tabla');
    ujsor.id = String(uj);

    ujsor.innerHTML =
      "<td style='text-align:center'>" + uj + "</td>" +
      "<td><input class='form-control text-center' id='" + uj + "k' type='text' style='text-align:center' onChange='drawtable(" + (uj + 1) + ")' maxlength='2' placeholder='Kredit'/></td>" +
      "<td><input class='form-control text-center' id='" + uj + "j' style='text-align:center' type='text' onChange='drawtable(" + (uj + 1) + ")' maxlength='1' placeholder='Jegy'></td>";

    div.appendChild(ujsor);
  }

  var j = 1;
  while (document.getElementById(String(j)) != undefined && document.getElementById(String(j)) != null) j++;

  var newuj = uj - 1;
  if (document.getElementById(uj + "k") && document.getElementById(uj + "j") &&
      document.getElementById(newuj + "k") && document.getElementById(newuj + "j")) {

    var currK = document.getElementById(uj + "k").value.trim();
    var currJ = document.getElementById(uj + "j").value.trim();
    var prevK = document.getElementById(newuj + "k").value.trim();
    var prevJ = document.getElementById(newuj + "j").value.trim();

    if (currK === "" && currJ === "" && prevK === "" && prevJ === "") {
      var div = document.getElementById('tabla');
      if ((j - 3) < parseInt(uj, 10)) {
        var rem = document.getElementById(String(uj));
        if (rem) div.removeChild(rem);
      }
    }
  }

  atlagszamol();
}

function atlagszamol() {
  var j = 1;
  while (document.getElementById(String(j)) != undefined && document.getElementById(String(j)) != null) j++;

  document.getElementById("output7").innerHTML = (j - 2);

  var felvettKred = 0;
  var teljesitettKred = 0;
  var sulyozott = 0;

  for (var z = 1; z <= (j - 2); z++) {
    var kStr = (document.getElementById(z + "k") || {}).value || "";
    var jStr = (document.getElementById(z + "j") || {}).value || "";

    var kNum = parseInt(kStr, 10);
    var jNum = parseInt(jStr, 10);

    if (!isFinite(kNum) || kNum <= 0) continue;

    if (jNum >= 1 && jNum <= 5) {
      felvettKred += kNum;

      if (jNum >= 2) {
        teljesitettKred += kNum;
        sulyozott += kNum * jNum;
      }
    }
  }

  document.getElementById("output3").innerHTML = felvettKred;
  document.getElementById("output5").innerHTML = teljesitettKred;

  var atlag = (teljesitettKred > 0) ? (sulyozott / teljesitettKred) : 0;
  document.getElementById("output1").innerHTML = Math.round(atlag * 100) / 100;
}

function hibakeres() {
  var j = 1;
  while (document.getElementById(String(j)) != undefined && document.getElementById(String(j)) != null) j++;

  var vanhiba = false;
  var rosszErtek = "";
  for (var idx = 1; idx < (j - 1); idx++) {
    var cell = document.getElementById(idx + "j");
    if (!cell) continue;
    var v = cell.value.trim();
    if (v === "") continue;

    var num = parseInt(v, 10);
    if (!(num >= 1 && num <= 5)) {
      vanhiba = true;
      rosszErtek = v;
      break;
    }
  }

  var hibadiv = document.getElementById("hibadiv");
  if (!hibadiv) return;

  if (vanhiba) {
    hibadiv.innerHTML = "<strong>Hiba!</strong><p>A(z) <strong>" + rosszErtek + "</strong> nem érvényes érdemjegy (csak 1–5)!</p>";
    hibadiv.style.display = "block";
  } else {
    hibadiv.style.display = "none";
  }
}
