let viewCanvas = document.getElementById("viewCanvas");
let viewCanvasCTX = viewCanvas.getContext("2d");
let positive = document.getElementById("positive");
let negative = document.getElementById("negative");
let particles = [];
let magneticFields = [];
let electricFields = [];
let canvasRefresh=false;
console.log("test")


spawnParticleMagnitude=0;
spawnParticleMass=0;
spawnParticleSize=0;
spawnParticleXVelocity=0;
spawnParticleYVelocity=0;
spawnParticleX = 0;
spawnParticleY = 0;
numParticles = 0;
viewCanvas.addEventListener('mousedown', function(e) {
    getCursorPosition(viewCanvas, e)
})

function toggleCanvasRefresh() {
  if (canvasRefresh) {
    canvasRefresh=false;
  } else {
    canvasRefresh=true;
  }
}
function clearParticles() {
  particles.length=0;
  ClearCanvas();
}
function getCursorPosition(canvas, event) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  spawnParticleX = x;
  spawnParticleY = y;

  for (i=0;i<numParticles;i++) {
    particles.push(new particle(x+(i/(numParticles/200)),viewCanvas.height-(spawnParticleSize*30)-y,spawnParticleSize*30,spawnParticleSize*30,spawnParticleMass,spawnParticleMagnitude,parseFloat(spawnParticleXVelocity)/10,parseFloat(spawnParticleYVelocity)/10))
  }
  


}

function setParticleParameters() {

  spawnParticleMagnitude = document.getElementById('chargeMagnitude').value;
  spawnParticleMass = document.getElementById('mass').value;
  spawnParticleSize = document.getElementById('size').value;
  spawnParticleXVelocity = document.getElementById('xVelocity').value;
  spawnParticleYVelocity = document.getElementById('yVelocity').value;
  numParticles = document.getElementById('numParticles').value;
  
}
class particle {
  constructor(x,y,width, height, mass, charge,xVelocity,yVelocity) {
    this.x = x;
    this.y = y;
    this.xVelocity = xVelocity;
    this.yVelocity = yVelocity;
    this.width = width;
    this.height = height;
    this.mass = mass;
    this.charge = charge;
    this.inMagneticField = [];
    this.inElectricField = [];
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
  
  let magneticField1 = new magneticField(600,100,100,350,10);
  let magneticField2 = new magneticField(800,100,100,350,10);
  magneticFields.push(magneticField1,magneticField2);
  let electricField1 = new electricField(0,200,300,150,50,1);
  let electricField2 = new electricField(400,200,300,150,50,1);
  electricFields.push(electricField1);
  electricFields.push(electricField2);
  requestAnimationFrame(function() {
    Update(particles,magneticFields,electricFields,performance.now());
  });
}
function Update(particles,magneticFields, electricFields,lastTime) {

  currentTime = performance.now()
  deltaTime = (currentTime - lastTime)/40;
  viewCanvasCTX.fillStyle = "#808080";
  viewCanvasCTX.globalAlpha = 0.07;
  viewCanvasCTX.fillRect(0, 0, viewCanvas.width, viewCanvas.height)
  viewCanvasCTX.globalAlpha = 1;
  if (canvasRefresh) {
    ClearCanvas();
  }


  viewCanvasCTX.fillStyle = "#FF0000";
  viewCanvasCTX.globalAlpha = 0.2;
  for (let i=0; i<magneticFields.length;i++) {
    viewCanvasCTX.fillRect(magneticFields[i].x, viewCanvas.height-magneticFields[i].height-magneticFields[i].y, magneticFields[i].width, magneticFields[i].height)
  }
  
  viewCanvasCTX.globalAlpha = 1;

  viewCanvasCTX.fillStyle = "#FFF000";
  viewCanvasCTX.globalAlpha = 0.2;
  for (let i=0; i<electricFields.length;i++) {
    viewCanvasCTX.fillRect(electricFields[i].x, viewCanvas.height-electricFields[i].height-electricFields[i].y, electricFields[i].width, electricFields[i].height)
  }
  
  
  for (let i = 0; i < particles.length; i++) { 
    
    particles[i].inMagneticField = DetectCollision(particles[i],magneticFields)
    particles[i].inElectricField = DetectCollision(particles[i],electricFields)
    particles[i] = wallCollision(particles[i])
    particles[i] = UpdateVelocities(particles[i],magneticFields,electricFields,deltaTime);

    viewCanvasCTX.globalAlpha = 1;

    viewCanvasCTX.fillStyle = "#000000";
    viewCanvasCTX.drawImage(particles[i].image,particles[i].x, viewCanvas.height-particles[i].height-particles[i].y, particles[i].width, particles[i].height)
    
    particles[i].x+=particles[i].xVelocity*deltaTime;
    particles[i].y+=particles[i].yVelocity*deltaTime;
    
  }

  
  

  document.getElementById("numParticlesOutput").innerHTML = "Total particles: " + particles.length;
  document.getElementById("fps").innerHTML = "FPS: " + Math.round(1000/(deltaTime*40)).toFixed(2);
  requestAnimationFrame(function() {
    Update(particles,magneticFields, electricFields,currentTime);
  });//*/
}

function ClearCanvas() {
    viewCanvasCTX.clearRect(0, 0, this.viewCanvas.width, this.viewCanvas.height);
}
/*
function MoveObject(object1,deltaTime) {

  if (object1.xVelocity>0) {
    for (i=0;i<object1.xVelocity;i++) {
      object1.inMagneticField =DetectCollision(object1,magneticFields)
      object1.inElectricField =DetectCollision(object1,electricFields)
      object1 = wallCollision(object1)
      object1 = UpdateVelocities(object1,magneticFields,electricFields,deltaTime);
      if (object1.xVelocity!=0) {
        object1.x+=1;
      }
    }
  }

  if (object1.xVelocity<0) {
    for (i=0;i<object1.xVelocity;i++) {
      object1.inMagneticField =DetectCollision(object1,magneticFields)
      object1.inElectricField =DetectCollision(object1,electricFields)
      object1 = wallCollision(object1)
      object1 = UpdateVelocities(object1,magneticFields,electricFields,deltaTime);
      if (object1.xVelocity!=0) {
        object1.x-=1;
      }
    }
  }

  if (object1.yVelocity>0) {
    for (i=0;i<object1.yVelocity;i++) {
      object1.inMagneticField =DetectCollision(object1,magneticFields)
      object1.inElectricField =DetectCollision(object1,electricFields)
      object1 = wallCollision(object1)
      object1 = UpdateVelocities(object1,magneticFields,electricFields,deltaTime);
      if (object1.yVelocity!=0) {
        object1.y+=1;
      }
    }
  }

  if (object1.yVelocity<0) {
    for (i=0;i<object1.yVelocity;i++) {
      object1.inMagneticField =DetectCollision(object1,magneticFields)
      object1.inElectricField =DetectCollision(object1,electricFields)
      object1 = wallCollision(object1)
      object1 = UpdateVelocities(object1,magneticFields,electricFields,deltaTime);
      if (object1.yVelocity!=0) {
        object1.y-=1;
      }
    }
  }
  return object1
  
}
*/
function DetectCollision(object1,object2) {

  let collisions = [];

  for (let i = 0; i < object2.length; i++) { 
    

    if (object1.x + object1.width >= object2[i].x && object1.x + object1.width <= object2[i].width+object2[i].x && object1.y + object1.height >= object2[i].y && object1.y <= object2[i].y + object2[i].height) {

      collisions.push(object2[i])
      
    } 
    
    
  }
  
  
  return collisions;
}
function UpdateVelocities(particle1, magneticFields,electricFields,deltaTime) {
  console.log(JSON.stringify(particle1.inMagneticField))
  for (let j=0;j<particle1.inMagneticField.length;j++) {
  
    for (let i = 0; i < 200; i++) { 
      let temp1 = (((particle1.yVelocity)/200)*particle1.inMagneticField[j].strength * -particle1.charge)/particle1.mass;
      let temp2 = (((-particle1.xVelocity)/200)*particle1.inMagneticField[j].strength * -particle1.charge)/particle1.mass;

      particle1.xVelocity+=temp1*deltaTime 
      particle1.yVelocity+=temp2 *deltaTime
     }
  }
  for (let j=0;j<particle1.inElectricField.length;j++) {
    if (particle1.inElectricField) {
      if (particle1.inElectricField[j].direction==1) {
        particle1.yVelocity += (particle1.inElectricField[j].strength * particle1.charge)/particle1.mass;
      } else if (particle1.inElectricField[j].direction==2) {
        particle1.yVelocity -= (particle1.inElectricField[j].strength * particle1.charge)/particle1.mass;
      } else if (particle1.inElectricField[j].direction==3) {
        particle1.xVelocity += (particle1.inElectricField[j].strength * particle1.charge)/particle1.mass;
      } else if (particle1.inElectricField[j].direction==4) {
        particle1.xVelocity -= (particle1.inElectricField[j].strength * particle1.charge)/particle1.mass;
      }
      
    }
  }
  return particle1
}

function wallCollision(particle1) {
  if (particle1.y<=0 || particle1.y>=viewCanvas.height) {
    
    particle1.yVelocity=particle1.yVelocity*-1;
  }

  if (particle1.x<=0 || particle1.x>=viewCanvas.width) {
    particle1.xVelocity=particle1.xVelocity*-1;
  }
  return particle1
}
Start();