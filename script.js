let viewCanvas = document.getElementById("viewCanvas");
let viewCanvasCTX = viewCanvas.getContext("2d");
let positive = document.getElementById("positive");
let negative = document.getElementById("negative");
let upArrow = document.getElementById("uparrow");
let rightArrow = document.getElementById("rightarrow");
let downArrow = document.getElementById("downarrow");
let leftArrow = document.getElementById("leftarrow");
let cross = document.getElementById("cross");
let dot = document.getElementById("dot");
let particles = [];
let magneticFields = [];
let electricFields = [];
let canvasRefresh=false;
console.log("test")


let spawnParticleMagnitude=0;
let spawnParticleMass=0;
let spawnParticleSize=0;
let spawnParticleXVelocity=0;
let spawnParticleYVelocity=0;
let spawnParticleX = 0;
let spawnParticleY = 0;
let numParticles = 0;

let spawnEFieldWidth=0;
let spawnEFieldHeight=0;
let spawnEFieldStrength=0;
let spawnEFieldDirection=1;

let spawnMFieldWidth=0;
let spawnMFieldHeight=0;
let spawnMFieldStrength=0;

let objectToPlace = 0;

let particleAttraction = false;
viewCanvas.addEventListener('mousedown', function(e) {
    getCursorPosition(viewCanvas, e)
})

function toggleCanvasRefresh() {
  ClearCanvas();
  if (canvasRefresh) {
    canvasRefresh=false;
  } else {
    canvasRefresh=true;
  }
}

function toggleParticleAttraction() {
  if (particleAttraction) {
    particleAttraction=false;
  } else {
    particleAttraction=true;
  }
}
function clearParticles() {
  particles.length=0;
  ClearCanvas();
}
 function removeLastMField() {
   magneticFields.pop();
 }
function clearElectricFields() {
  electricFields.length=0;

  ClearCanvas();
}

function clearMagneticFields() {
  magneticFields.length=0;

  ClearCanvas();
}

function getCursorPosition(canvas, event) {
  let rect = canvas.getBoundingClientRect();
  let x = (event.clientX - rect.left)*(1/.85);
  let y = (event.clientY - rect.top)*(1/.85);
  //alert("x "+x+"y "+(viewCanvas.height-y))
  if (objectToPlace==0) {
    for (i=0;i<numParticles;i++) {
      particles.push(new particle(x+(i*200/numParticles),viewCanvas.height-(spawnParticleSize*30)-y,spawnParticleSize*30,spawnParticleSize*30,spawnParticleMass,spawnParticleMagnitude,parseFloat(spawnParticleXVelocity)/10,parseFloat(spawnParticleYVelocity)/10))
    }
  } else if (objectToPlace==1) {
    electricFields.push(new electricField(x,viewCanvas.height-y,spawnEFieldWidth,spawnEFieldHeight,spawnEFieldStrength,spawnEFieldDirection))

  } else if (objectToPlace==2) {
    magneticFields.push(new magneticField(x,viewCanvas.height-y,spawnMFieldWidth,spawnMFieldHeight,spawnMFieldStrength))
  }
  
  


}

function thanosSnap(){

  let itemsToRemove=[];

  for (i=0;i<particles.length;i++) {
    if (Math.random()>0.5) {
      itemsToRemove.push(i)
    }
    
  }

  for (i=0;i<itemsToRemove.length;i++) {
    
    particles.splice(itemsToRemove[i],1)
  }
  itemsToRemove.length=0;
  for (i=0;i<electricFields.length;i++) {
    if (Math.random()>0.5) {
      itemsToRemove.push(i)
    }
  }

  for (i=0;i<itemsToRemove.length;i++) {
    
    electricFields.splice(itemsToRemove[i],1)
  }
  itemsToRemove.length=0;
  for (i=0;i<magneticFields.length;i++) {
    if (Math.random()>0.5) {
      itemsToRemove.push(i)
    }
  }

  for (i=0;i<itemsToRemove.length;i++) {
    
    magneticFields.splice(itemsToRemove[i],1)
  }
  ClearCanvas();
}

function removeLastEField() {
  electricFields.pop();
}
function removeLastParticle() {
  particles.pop();
}
function setParticleParameters() {
  objectToPlace=0;
  spawnParticleMagnitude = parseFloat(document.getElementById('chargeMagnitude').value);
  spawnParticleMass = parseFloat(document.getElementById('mass').value);
  spawnParticleSize = parseFloat(document.getElementById('size').value);
  spawnParticleXVelocity = parseFloat(document.getElementById('xVelocity').value);
  spawnParticleYVelocity = parseFloat(document.getElementById('yVelocity').value);
  numParticles = parseFloat(document.getElementById('numParticles').value);
  
}

function setElectricParameters() {
  objectToPlace=1;
  spawnEFieldWidth=parseFloat(document.getElementById("eFieldWidth").value);
  spawnEFieldHeight=parseFloat(document.getElementById("eFieldHeight").value);
  spawnEFieldStrength=parseFloat(document.getElementById("eFieldStrength").value);
  spawnEFieldDirection=parseFloat(document.getElementById("eFieldDirection").value);

}

function setMagneticParameters() {
  objectToPlace=2;
  spawnMFieldWidth=parseFloat(document.getElementById("mFieldWidth").value);
  spawnMFieldHeight=parseFloat(document.getElementById("mFieldHeight").value);
  spawnMFieldStrength=parseFloat(document.getElementById("mFieldStrength").value);

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
    this.strength=strength/4;
    this.direction=direction;
  }
}
function Start() {
  /*particles.push(new particle(100,100,30,30,1,0,0))
  particles.push(new particle(200,200,30,30,1,0,0))
  particles.push(new particle(300,300,30,30,1,0,0))*/
  requestAnimationFrame(function() {
    Update(particles,magneticFields,electricFields,performance.now());
  });
}
function Update(particles,magneticFields, electricFields,lastTime) {

  currentTime = performance.now()
  deltaTime = (currentTime - lastTime)/40;

  if (canvasRefresh) {
    ClearCanvas();
    viewCanvasCTX.fillStyle = "#D3D3D3";
    viewCanvasCTX.globalAlpha = 0.2;
    viewCanvasCTX.fillRect(0, 0, viewCanvas.width, viewCanvas.height)
    viewCanvasCTX.globalAlpha = 1;
  } else {
    viewCanvasCTX.fillStyle = "#D3D3D3";
    viewCanvasCTX.globalAlpha = 0.07;
    viewCanvasCTX.fillRect(0, 0, viewCanvas.width, viewCanvas.height)
    viewCanvasCTX.globalAlpha = 1;
  }


  viewCanvasCTX.fillStyle = "#FF0000";
  if (canvasRefresh) {
    viewCanvasCTX.globalAlpha = 0.5;
  } else {
    viewCanvasCTX.globalAlpha = 0.08;
  }
  
  for (let i=0; i<magneticFields.length;i++) {
    viewCanvasCTX.fillRect(magneticFields[i].x, viewCanvas.height-magneticFields[i].height-magneticFields[i].y, magneticFields[i].width, magneticFields[i].height)

    if (magneticFields[i].strength>0){
      for (let j=0; j<magneticFields[i].width/100;j++) {
        for (let l=0; l<magneticFields[i].height/100;l++) {
          viewCanvasCTX.drawImage(cross,magneticFields[i].x+j*100+5, viewCanvas.height-magneticFields[i].height-magneticFields[i].y+l*100+5,90,90)
        }
      }
    }

    if (magneticFields[i].strength<0){
      for (let j=0; j<magneticFields[i].width/100;j++) {
        for (let l=0; l<magneticFields[i].height/100;l++) {
          viewCanvasCTX.drawImage(dot,magneticFields[i].x+j*100+5, viewCanvas.height-magneticFields[i].height-magneticFields[i].y+l*100+5,90,90)
        }
      }
    }
  }
  
  viewCanvasCTX.globalAlpha = 1;

  viewCanvasCTX.fillStyle = "#FFF000";
  if (canvasRefresh) {
    viewCanvasCTX.globalAlpha = 0.5;
  } else {
    viewCanvasCTX.globalAlpha = 0.08;
  }
  for (let i=0; i<electricFields.length;i++) {
    viewCanvasCTX.fillRect(electricFields[i].x, viewCanvas.height-electricFields[i].height-electricFields[i].y, electricFields[i].width, electricFields[i].height)
    if (electricFields[i].direction==1){
      for (let j=0; j<electricFields[i].width/100;j++) {
        for (let l=0; l<electricFields[i].height/100;l++) {
          viewCanvasCTX.drawImage(upArrow,electricFields[i].x+j*100+5, viewCanvas.height-electricFields[i].height-electricFields[i].y+l*100+5,90,90)
        }
      }
    }

    if (electricFields[i].direction==2){
      for (let j=0; j<electricFields[i].width/100;j++) {
        for (let l=0; l<electricFields[i].height/100;l++) {
          viewCanvasCTX.drawImage(rightArrow,electricFields[i].x+j*100+5, viewCanvas.height-electricFields[i].height-electricFields[i].y+l*100+5,90,90)
        }
      }
    }

    if (electricFields[i].direction==3){
      for (let j=0; j<electricFields[i].width/100;j++) {
        for (let l=0; l<electricFields[i].height/100;l++) {
          viewCanvasCTX.drawImage(downArrow,electricFields[i].x+j*100+5, viewCanvas.height-electricFields[i].height-electricFields[i].y+l*100+5,90,90)
        }
      }
    }

    if (electricFields[i].direction==4){
      for (let j=0; j<electricFields[i].width/100;j++) {
        for (let l=0; l<electricFields[i].height/100;l++) {
          viewCanvasCTX.drawImage(leftArrow,electricFields[i].x+j*100+5, viewCanvas.height-electricFields[i].height-electricFields[i].y+l*100+5,90,90)
        }
      }
    }
  }
  
  
  for (let i = 0; i < particles.length; i++) { 
    viewCanvasCTX.globalAlpha = 1;

    viewCanvasCTX.fillStyle = "#000000";
    if (particleAttraction) {
      for (let l=0; l<particles.length;l++) {
        if (l!=i) {
          particles[i] = calculateForceOfTwoCharges(particles[i],particles[l],deltaTime);

        }
      }
    }


    
    for (let j=0; j<4; j++) {

      particles[i].inMagneticField = DetectCollision(particles[i],magneticFields)
      particles[i].inElectricField = DetectCollision(particles[i],electricFields)
      
      particles[i] = UpdateVelocities(particles[i],magneticFields,electricFields,deltaTime/4);

      if (particles[i].xVelocity>50 && particles[i].xVelocity>0) {
        particles[i].xVelocity=50;
      }
      if (particles[i].yVelocity>50 && particles[i].yVelocity>0) {
        particles[i].yVelocity=50
      }
  
      if (particles[i].xVelocity<-50 && particles[i].xVelocity<0) {
        particles[i].xVelocity=-50;
      }
      if (particles[i].yVelocity<-50 && particles[i].yVelocity<0) {
        particles[i].yVelocity=-50
      }

      
      
      particles[i].x+=particles[i].xVelocity*deltaTime/4;
      particles[i].y+=particles[i].yVelocity*deltaTime/4;
      particles[i] = wallCollision(particles[i])
      
    }
    viewCanvasCTX.drawImage(particles[i].image,particles[i].x, viewCanvas.height-particles[i].height-particles[i].y, particles[i].width, particles[i].height)

    
    
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

function DetectCollision(object1,object2) {

  let collisions = [];
  for (let i = 0; i < object2.length; i++) { 
    

    if (object1.x + object1.width >= object2[i].x && object1.x  <= object2[i].width+object2[i].x && object1.y + object1.height >= object2[i].y && object1.y <= object2[i].y + object2[i].height) {

      collisions.push(object2[i])
      
    } 
    
    
  }
  
  
  return collisions;
}
function UpdateVelocities(particle1, magneticFields,electricFields,deltaTime) {

  for (let j=0;j<particle1.inMagneticField.length;j++) {
  
    for (let i = 0; i < 70; i++) { 
      let temp1 = (((particle1.yVelocity)/70)*particle1.inMagneticField[j].strength * -particle1.charge)/particle1.mass;
      let temp2 = (((-particle1.xVelocity)/70)*particle1.inMagneticField[j].strength * -particle1.charge)/particle1.mass;

      particle1.xVelocity+=temp1*deltaTime 
      particle1.yVelocity+=temp2 *deltaTime
     }
  }
  for (let j=0;j<particle1.inElectricField.length;j++) {
    if (particle1.inElectricField) {
      if (particle1.inElectricField[j].direction==1) {
        particle1.yVelocity += (particle1.inElectricField[j].strength * particle1.charge)/particle1.mass;
      } else if (particle1.inElectricField[j].direction==2) {
        particle1.xVelocity += (particle1.inElectricField[j].strength * particle1.charge)/particle1.mass;
      } else if (particle1.inElectricField[j].direction==3) {
        particle1.yVelocity -= (particle1.inElectricField[j].strength * particle1.charge)/particle1.mass;
      } else if (particle1.inElectricField[j].direction==4) {
        particle1.xVelocity -= (particle1.inElectricField[j].strength * particle1.charge)/particle1.mass;
      }
      
    }
  }
  return particle1
}

function wallCollision(particle1) {
  if (particle1.y<=0 ) {
    particle1.y=0;
    particle1.yVelocity=particle1.yVelocity*-1;
  } else if (particle1.y>=630) {
    particle1.y=630;
    particle1.yVelocity=particle1.yVelocity*-1;
  }

  if (particle1.x<=0 ) {
    particle.x=0;
    particle1.xVelocity=particle1.xVelocity*-1;
  } else if (particle1.x>=970) {
    particle1.x=970
    particle1.xVelocity=particle1.xVelocity*-1;
  }
  return particle1
}

function calculateForceOfTwoCharges(particle1,particle2,deltaTime) {

  let charges = -(particle1.charge*particle2.charge)*500000

  let distance = (Math.sqrt((((particle2.x-particle1.x))**2)+((particle2.y-particle1.y)**2)))
  let acceleration = ((charges/(distance**2))/particle1.mass);
  if (acceleration>1) {
    acceleration = 1;
  }
  console.log(distance)
  let angle = Math.abs(Math.atan((particle2.y-particle1.y)/(particle2.x-particle1.x)))

  
  if (particle1.x>particle2.x) {
    particle1.xVelocity += -acceleration * Math.cos(angle) * deltaTime
  } else if (particle1.x<particle2.x) {
    particle1.xVelocity += acceleration * Math.cos(angle) * deltaTime
  }
  

  
  if (particle1.y>particle2.y) {
    particle1.yVelocity += -acceleration * Math.sin(angle) * deltaTime
  } else if (particle1.y<particle2.y) {
    particle1.yVelocity += acceleration * Math.sin(angle) * deltaTime
  }
  
  
  

  return (particle1)
}
Start();