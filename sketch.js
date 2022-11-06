let writer;
let stubg = [],
  stubd = [],
  stani = 0;
let V = 0,
  i = 0;
let ACC = 1,
  BRZ = 4;
let ptica = null;
let sirina, visina;
let SKOR = 0;
let hs;

let boje1 = ["#344e41", "#3a5a40", "#588157", "#a3b18a"];
let boje0 = ["#001524", "#15616d", "#ffecd1", "#ff7d00"];
let boje2 = ["#003049", "#d62828", "#f77f00", "#eae2b7"];
let boje3 = ["#f72585", "#7209b7", "#3a0ca3", "#4cc9f0"];
let boje4 = [0, 63, 127, 255];

boje = boje0;
function promeniBoju() {
  boje = random([boje0, boje1, boje2, boje3, boje4]);
}
function promeniVelE() {
  if (windowWidth < windowHeight) {
    sirina = windowWidth;
    visina = floor((sirina * 13) / 16);
  } else {
    visina = windowHeight;
    sirina = floor((visina * 16) / 13);
  }
}

function preload() {
  button = createButton("click me");
  button.position(0, 0);
  if (getItem("skor") == null) {
    storeItem("skor", 0);
    hs=0;
  }else{
    hs=getItem("skor");
  }
}

function setup() {
  i = 0;
  SKOR = 0;
  stani = 0;

  promeniVelE();
  createCanvas(sirina, visina);
  select("canvas").position(
    windowWidth / 2 - width / 2,
    windowHeight / 2 - height / 2
  );
  noStroke();
  ptica = new Pozicija(width / 4, height / 2, height / 15, height / 15);
  rectMode(CORNER);
  ellipseMode(CORNER);
  stubg = [];
  stubd = [];
  dodajStub();
  BRZ = floor(width / 200);
  ACC = BRZ / 4;
  textSize(height / 10);
}

function draw() {
  razmisljaj();
}

function skorsejv() {
  if (SKOR >= hs) {
    storeItem("skor", SKOR);
    hs=SKOR;
  }
}

function mousePressed() {
  if (ptica.y > height - height / 10 || ptica.y < 0 || stani) setup();
  V = -15;
}
function keyPressed() {
  if (ptica.y > height - height / 10 || ptica.y < 0 || stani) setup();
  V = -15;
}
function dodajStub() {
  let r = random(height / 4, height - height / 10);
  stubg.push(new Pozicija(width, 0 - r, width / 10, (9 * height) / 10));
  stubd.push(
    new Pozicija(width, height - r + ptica.w * 2 + 15, width / 10, height)
  );
}
function razmisljaj() {
  if (
    (windowWidth < windowHeight && windowWidth != sirina) ||
    (windowWidth > windowHeight && windowHeight != visina)
  ) {
    setup();
  }

  i++;
  if (ptica.y > (9 * height) / 10 || ptica.y < 0 || stani);
  else {
    ptica.y += V;
    V += ACC;

    if (i % (BRZ * 20) == 0) {
      dodajStub();
    }
    button.mousePressed(promeniBoju);

    crtaj();
  }
}

function crtaj() {
  background(boje[0]);
  fill(boje[2]);
  rect(0, height - height / 10, width, height / 10);
  fill(boje[1]);
  circle(ptica.x, ptica.y, ptica.w);

  fill(boje[3]);
  for (let j = 0; j < stubg.length; j++) {
    rect(stubg[j].x, stubg[j].y, stubg[j].w, stubg[j].h, 20);
    stubg[j].x -= BRZ;
    if (ptica.dodiruje(stubg[j])) stani = 1;
    if (ptica.prosao(stubg[j])) {
      SKOR++;
      skorsejv();
    }
    ///////////////////////
    rect(stubd[j].x, stubd[j].y, stubd[j].w, stubd[j].h, 20);
    stubd[j].x -= BRZ;
    if (ptica.dodiruje(stubd[j])) stani = 1;
  }
  fill(boje[2]);
  text(SKOR, width / 2, height / 10);
  text(hs, width / 10, height / 10);
}
