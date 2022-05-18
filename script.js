let viewCanvas = document.getElementById("viewCanvas");
let viewCanvasCTX = viewCanvas.getContext("2d");
let positive = document.getElementById("positive");
let negative = document.getElementById("negative");
let particles = [];
let magneticFields = [];

class particle {
  constructor(x,y,width, height, mass, charge) {
    this.x = x;
    this.y = y;
    this.xVelocity = 5;
    this.yVelocity = 0;
    this.width = width;
    this.height = height;
    this.mass = mass;
    this.charge = charge;
    this.inMagneticField = false;
    this.inElectricField = false;
    this.image;
    if (this.charge>0) {
      this.image = positive;
    } else {
      this.image = negative;
    }
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

class electricField {
  constructor(x,y,width,height,strength,direction) {
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
    this.strength=strength;
    this.direction=direction;
  }
}
function Start() {
  mainParticle = new particle(0,100,30,30,100,-1);
  
  mainMagneticField = new magneticField(100,100,700,200,10);

  mainElectricField = new electricField(300,200,700,200,10,1);
  requestAnimationFrame(function() {
    Update(mainParticle,mainMagneticField,mainElectricField,performance.now());
  });
}
function Update(mainParticle,mainMagneticField, mainElectricField,lastTime) {
  currentTime = performance.now()
  deltaTime = (currentTime - lastTime)/18;
  
  ClearCanvas();

  mainParticle.inMagneticField = DetectCollision(mainParticle,mainMagneticField)

  mainParticle.inElectricField = DetectCollision(mainParticle,mainElectricField)


  mainParticle = UpdateVelocities(mainParticle,mainMagneticField,mainElectricField,deltaTime);

  viewCanvasCTX.fillStyle = "#FF0000";
  viewCanvasCTX.globalAlpha = 0.05;
  viewCanvasCTX.fillRect(mainMagneticField.x, viewCanvas.height-mainMagneticField.height-mainMagneticField.y, mainMagneticField.width, mainMagneticField.height)
  viewCanvasCTX.globalAlpha = 1;

  viewCanvasCTX.fillStyle = "#FFF000";
  viewCanvasCTX.globalAlpha = 0.05;
  viewCanvasCTX.fillRect(mainElectricField.x, viewCanvas.height-mainElectricField.height-mainElectricField.y, mainElectricField.width, mainElectricField.height)
  viewCanvasCTX.globalAlpha = 1;

  viewCanvasCTX.fillStyle = "#000000";
  viewCanvasCTX.drawImage(mainParticle.image,mainParticle.x, viewCanvas.height-mainParticle.height-mainParticle.y, mainParticle.width, mainParticle.height)
  
  mainParticle.x+=mainParticle.xVelocity*deltaTime;
  mainParticle.y+=mainParticle.yVelocity*deltaTime;

  
  requestAnimationFrame(function() {
    Update(mainParticle,mainMagneticField, mainElectricField,currentTime);
  });
}

function ClearCanvas() {
    viewCanvasCTX.clearRect(0, 0, this.viewCanvas.width, this.viewCanvas.height);
}

function DetectCollision(object1,object2) {

  if (object1.x + object1.width >= object2.x && object1.x + object1.width <= object2.width+object2.x && object1.y + object1.height >= object2.y && object1.y <= object2.y + object2.height) {
    return true;
  } 
  
  return false;
}
function UpdateVelocities(mainParticle, mainMagneticField,mainElectricField,deltaTime) {
  if (mainParticle.inMagneticField) {
  for (let i = 0; i < 200; i++) { 
    let temp1 = (((mainParticle.yVelocity)/200)*mainMagneticField.strength * -mainParticle.charge)/mainParticle.mass;
    let temp2 = (((-mainParticle.xVelocity)/200)*mainMagneticField.strength * -mainParticle.charge)/mainParticle.mass;
    

    mainParticle.xVelocity+=temp1*deltaTime 
    mainParticle.yVelocity+=temp2 *deltaTime
   }
  }
  if (mainParticle.inElectricField) {
    if (mainElectricField.direction==1) {
      mainParticle.yVelocity += (mainElectricField.strength * mainParticle.charge)/mainParticle.mass;
    } else if (mainElectricField.direction==2) {
      mainParticle.yVelocity -= (mainElectricField.strength * mainParticle.charge)/mainParticle.mass;
    } else if (mainElectricField.direction==3) {
      mainParticle.xVelocity += (mainElectricField.strength * mainParticle.charge)/mainParticle.mass;
    } else if (mainElectricField.direction==4) {
      mainParticle.xVelocity -= (mainElectricField.strength * mainParticle.charge)/mainParticle.mass;
    }
    
  }
  return mainParticle
}

Start();