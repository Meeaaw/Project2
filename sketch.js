//for inspo and reference i directed to youtube for help, Frederik De Blesser, I got inspiration from Hilary Young, and i got chatgpt to help with fixing the code
let bobaSpots = [];
let boba;

const fixedPositions = [
  { x: 100, y: 100 },  { x: 300, y: 100 },  { x: 500, y: 100 },  { x: 700, y: 100 },  
  { x: 100, y: 300 },  { x: 300, y: 300 },  { x: 500, y: 300 },  { x: 700, y: 300 },  
  { x: 100, y: 500 },  { x: 300, y: 500 },  { x: 500, y: 500 },  { x: 700, y: 500 },  
  { x: 100, y: 700 },  { x: 300, y: 700 },  { x: 500, y: 700 },  { x: 700, y: 700 },  
  { x: 200, y: 200 },  { x: 600, y: 200 },  { x: 200, y: 600 },  { x: 600, y: 600 }
];

function preload() {
  bobaSpots = loadJSON("boba.json"); 
  boba = loadImage("Tap.jpg");    
}

function setup() {
  createCanvas(800, 1000);
  background(boba);

  if (typeof bobaSpots === 'object') {
    bobaSpots = Object.values(bobaSpots);
  }
  bobaSpots.sort((a, b) => b.rating - a.rating);

  displayBobaSpots();

  createInfoBox();
}

//this was to make the ball change depends on the price 
function displayBobaSpots() {
  for (let i = 0; i < min(bobaSpots.length, fixedPositions.length); i++) {
    let spot = bobaSpots[i];
    let position = fixedPositions[i];

    spot.x = position.x;
    spot.y = position.y;

    switch (spot.price) {
      case "$":
        spot.size = 70;
        break;
      case "$$":
        spot.size = 90;
        break;
      case "$$$":
        spot.size = 130;
        break;
      
    }

    fill(139, 69, 19); 
    noStroke();
    ellipse(spot.x, spot.y, spot.size);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(15);
    text(spot.name, spot.x, spot.y);
  }
}

function draw() {
  
}

function mousePressed() {
  for (let spot of bobaSpots) {
    let d = dist(mouseX, mouseY, spot.x, spot.y);
    if (d < spot.size / 2) {
      showInfo(spot);
      break;
    }
  }
}
//the info i chose 
function showInfo(spot) {
  const infoBox = document.getElementById('infoBox');
  infoBox.innerHTML = `
    <h2>${spot.name}</h2>
    <p><strong>Address:</strong> ${spot.address}</p>
    <p><strong>Rating:</strong> ${spot.rating}</p>
    <p><strong>Reviews:</strong> ${spot.reviews}</p>
    <p><strong>Price:</strong> ${spot.price}</p>
  `;
  infoBox.style.display = 'block'; 
}

//half of this part i wrote like the position, top, left, color and padding 
//i had a lot of trouble trying to adapt the text box to the text itself so i had to ask chatgpt for help 
function createInfoBox() {
  const infoBox = document.createElement('div');
  infoBox.id = 'infoBox';
  infoBox.style.position = 'absolute';
  infoBox.style.top = '50%';
  infoBox.style.left = '50%';
  infoBox.style.transform = 'translate(-50%, -50%)';
  infoBox.style.backgroundColor = '#D2B48C'; 
  infoBox.style.color = 'white'; 
  infoBox.style.padding = '20px';
  infoBox.style.borderRadius = '10px';
  infoBox.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
  infoBox.style.display = 'none'; 
//for this part was from the help of my bf since i couldnt make it display and stays on the screen i could only make the box pop-up 
  infoBox.addEventListener('click', function() {
    infoBox.style.display = 'none';
  });

  document.body.appendChild(infoBox);
}
