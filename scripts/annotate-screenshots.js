const sharp = require("sharp");
const path = require("path");
// Gebruik: node scripts/annotate-screenshots.js  (leest uit ~/Downloads, schrijft webp naar public/support/iphone/)
// Kader + pijl in merkgroen over iPhone-screenshots (1206x2622). Coördinaten in het origineel.
const OUT = "public/support/iphone/";
const SRC = process.env.HOME + "/Downloads/";
const C = "#5FA47E";
// coördinaten in origineel (1206x2622)
const jobs = [
  { src: "IMG_1235.PNG", out: "01-instellingen-mail", box: [60, 1075, 1086, 110], arrow: "below" },
  { src: "IMG_1236.jpg", out: "02-mail-accounts", box: [60, 1385, 1086, 110], arrow: "below" },
  { src: "IMG_1237.PNG", out: "03-nieuwe-account", box: [120, 1225, 310, 80], arrow: "below" },
  { src: "IMG_1238.PNG", out: "04-kies-aanbieder", box: [60, 1825, 1086, 105], arrow: "below" },
  { src: "IMG_1239.PNG", out: "05-mail-account", box: [60, 1820, 1086, 110], arrow: "below" },
  { src: "IMG_1240.PNG", out: "06-gegevens", box: [828, 258, 335, 140], arrow: "below" },
  { src: "IMG_1241.PNG", out: "07-servers", box: [828, 258, 335, 140], arrow: "below",
    extra: [[360, 615, 330, 95], [360, 1232, 330, 95]] },
];
function rect([x, y, w, h], dash = false) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="28" fill="none" stroke="${C}" stroke-width="9"${dash ? ' stroke-dasharray="22 14"' : ""}/>`;
}
function arrow([x, y, w, h]) {
  // pijl van onder naar de onderrand van het kader
  const cx = x + w / 2, y1 = y + h + 170, y2 = y + h + 30;
  return `<path d="M${cx} ${y1} L${cx} ${y2}" stroke="${C}" stroke-width="12" stroke-linecap="round" fill="none"/>
  <path d="M${cx - 42} ${y2 + 60} L${cx} ${y2} L${cx + 42} ${y2 + 60}" stroke="${C}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
}
(async () => {
  for (const j of jobs) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1206" height="2622">
      ${rect(j.box)}${arrow(j.box)}${(j.extra || []).map((b) => rect(b, true)).join("")}</svg>`;
    const full = await sharp(SRC + j.src).composite([{ input: Buffer.from(svg), top: 0, left: 0 }]).png().toBuffer();
    await sharp(full)
      .resize({ width: 640 })
      .webp({ quality: 82 })
      .toFile(OUT + j.out + ".webp");
    console.log("ok", j.out);
  }
})();
