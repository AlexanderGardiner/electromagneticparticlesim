let viewCanvas = document.getElementById("viewCanvas");
let viewCanvasCTX = viewCanvas.getContext("2d");
let positive = document.getElementById("positive");
let negative = document.getElementById("negative");


class particle {
  constructor(x,y,width, height, mass, charge) {
    this.x = x;
    this.y = y;
    this.xVelocity = 0;
    this.yVelocity = 5;
    this.width = width;
    this.height = height;
    this.mass = mass;
    this.charge = charge;
    this.inMagneticField = false;
    this.image;
  }
}

class magneticField {
  constructor(x,y,width,height,strength) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.strength = strength;
  }
}
function Start() {
  mainParticle = new particle(500.0,10.0,30.0,30.0,100.0,1.0);
  if (mainParticle.charge>0) {
    mainParticle.image = positive;
  } else {
    mainParticle.image = negative;
  }
  mainMagneticField = new magneticField(0.0,100.0,1000.0,500.0,10.0);
  requestAnimationFrame(function() {
    Update(mainParticle,mainMagneticField,performance.now());
  });
}
function Update(mainParticle,mainMagneticField, lastTime) {
  currentTime = performance.now()
  deltaTime = (currentTime - lastTime)/18;
  
  ClearCanvas();

  mainParticle.inMagneticField = DetectCollision(mainParticle,mainMagneticField)

  mainParticle = UpdateVelocities(mainParticle,mainMagneticField,deltaTime);

  viewCanvasCTX.fillStyle = "#FF0000";
  viewCanvasCTX.globalAlpha = 0.05;
  viewCanvasCTX.fillRect(mainMagneticField.x, viewCanvas.height-mainMagneticField.height-mainMagneticField.y, mainMagneticField.width, mainMagneticField.height)
  viewCanvasCTX.globalAlpha = 1;

  viewCanvasCTX.fillStyle = "#000000";
  viewCanvasCTX.drawImage(mainParticle.image,mainParticle.x, viewCanvas.height-mainParticle.height-mainParticle.y, mainParticle.width, mainParticle.height)
  
  mainParticle.x+=mainParticle.xVelocity*deltaTime;
  mainParticle.y+=mainParticle.yVelocity*deltaTime;

  
  requestAnimationFrame(function() {
    Update(mainParticle,mainMagneticField, currentTime);
  });
}

function ClearCanvas() {
    viewCanvasCTX.clearRect(0, 0, this.viewCanvas.width, this.viewCanvas.height);
}

function DetectCollision(object1,object2) {
  if (object1.y>100) {
    return true
  }
  if (object1.x + object1.width >= object2.x && object1.x + object1.width <= object2.x + 5 && object1.y + object1.height >= object2.y+1 && object1.y <= object2.y + object2.height-1) {
    return true;
  } 
  if (object1.x <= object2.x + object2.width && object1.x >= object2.x + (object2.width - 5) && object1.y + object1.height >= object2.y+1 && object1.y <= object2.y + object2.height-1) {
    return true;
  }

  if (object1.y + object1.height >= object2.y && object1.y + object1.height<= object2.y + 5 && object1.x + object1.width >= object2.x+1 && object1.x <= object2.x + object2.width -1) {
    return true;
  }

  if (object1.y <= object2.y + object2.height && object1.y >= object2.y + (object2.height-5) && object1.x + object1.width >= object2.x+1 && object1.x <= object2.x + object2.width-1) {
    return true;

  }
  return false;
}
function UpdateVelocities(mainParticle, mainMagneticField,deltaTime) {
  if (mainParticle.inMagneticField) {
  for (let i = 0; i < 200; i++) { 
    let temp1 = (((mainParticle.yVelocity)/200)*mainMagneticField.strength * mainParticle.charge)/mainParticle.mass;
    let temp2 = (((-mainParticle.xVelocity)/200)*mainMagneticField.strength * mainParticle.charge)/mainParticle.mass;
    

    mainParticle.xVelocity+=temp1*deltaTime 
    mainParticle.yVelocity+=temp2 *deltaTime
   }
  }
  return mainParticle
}

Start();