const sharp = require("sharp");
// Gebruik: node scripts/annotate-webmail.js
// Leest de originele webmail-screenshots uit ../screenshots/support-webmail/originals/ (buiten de repo),
// zet kader + pijl in merkgroen (zelfde stijl als annotate-screenshots.js) en schrijft webp van 1400px breed
// naar public/support/webmail/. Coördinaten in het origineel; `crop` snijdt vóór het verkleinen bij.
const OUT = "public/support/webmail/";
const SRC = "../screenshots/support-webmail/originals/";
const C = "#5FA47E";
// Desktop-screenshots (≈2200px) worden naar 760px getoond, dus dikkere lijnen dan bij de iPhone-plaatjes.
const STROKE = 10, ARROW = 14, RX = 18;

const jobs = [
  // Inlogformulier: velden + knop. Bijgesneden tot het formulier, anders is het een leeg vlak.
  { src: "01-inloggen", box: [930, 322, 360, 160], arrow: "below", crop: { left: 404, top: 80, width: 1400, height: 720 } },
  // Mappenlijst (solide) + hoofdknoppen links (gestippeld).
  { src: "02-overzicht", box: [70, 58, 395, 232], arrow: "below", extra: [[2, 60, 70, 352]] },
  // Instellingen-menu: Wachtwoord (solide, zonder pijl: rechts staat tekst, onder staat de volgende regel), Identiteiten gestippeld.
  { src: "03-instellingen", box: [78, 238, 385, 44], arrow: "none", extra: [[78, 130, 385, 44]] },
  // Identiteiten: Ondertekening (solide), Weergavenaam en Opslaan gestippeld.
  { src: "04-identiteiten", box: [1058, 446, 1150, 176], arrow: "left", extra: [[1436, 104, 772, 44], [1058, 702, 108, 46]] },
  // Twee-factor: rij Mobiele app met knop Schakel in.
  { src: "05-twee-factor", box: [1095, 200, 620, 82], arrow: "left" },
];

function rect([x, y, w, h], dash = false) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${RX}" fill="none" stroke="${C}" stroke-width="${STROKE}"${dash ? ' stroke-dasharray="22 14"' : ""}/>`;
}
function arrow([x, y, w, h], dir) {
  if (dir === "none") return "";
  const head = 44, len = 150, gap = 26, s = `stroke="${C}" stroke-width="${ARROW}" stroke-linecap="round" stroke-linejoin="round" fill="none"`;
  if (dir === "below") {
    const cx = x + w / 2, y2 = y + h + gap, y1 = y2 + len;
    return `<path d="M${cx} ${y1} L${cx} ${y2}" ${s}/><path d="M${cx - head} ${y2 + head * 1.3} L${cx} ${y2} L${cx + head} ${y2 + head * 1.3}" ${s}/>`;
  }
  if (dir === "right") {
    const cy = y + h / 2, x2 = x + w + gap, x1 = x2 + len;
    return `<path d="M${x1} ${cy} L${x2} ${cy}" ${s}/><path d="M${x2 + head * 1.3} ${cy - head} L${x2} ${cy} L${x2 + head * 1.3} ${cy + head}" ${s}/>`;
  }
  // left: pijl komt van links en wijst naar de linkerrand van het kader
  const cy = y + h / 2, x2 = x - gap, x1 = x2 - len;
  return `<path d="M${x1} ${cy} L${x2} ${cy}" ${s}/><path d="M${x2 - head * 1.3} ${cy - head} L${x2} ${cy} L${x2 - head * 1.3} ${cy + head}" ${s}/>`;
}

(async () => {
  for (const j of jobs) {
    const meta = await sharp(SRC + j.src + ".png").metadata();
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${meta.width}" height="${meta.height}">
      ${rect(j.box)}${arrow(j.box, j.arrow)}${(j.extra || []).map((b) => rect(b, true)).join("")}</svg>`;
    let img = sharp(await sharp(SRC + j.src + ".png").composite([{ input: Buffer.from(svg), top: 0, left: 0 }]).png().toBuffer());
    if (j.crop) img = img.extract(j.crop);
    await img.resize({ width: 1400 }).webp({ quality: 82 }).toFile(OUT + j.src + ".webp");
    console.log("ok", j.src);
  }
})();
