var balls = [];
var n = 80
var acceleration;
var slider;
var slider1;
var slider2;
var slider3;
var damp = 0;
var history = [];
var gravity;
var forces;
var gravity;
var kineticSum = 0;
var ELASTICITY = .9



function setup() {
	createCanvas(800, 800);
	slider = createSlider(-1, 1, 0.1, 0.1);		//Gravity
	slider.position(20, height+40);
	slider1 = createSlider(0, 1000, n);			//Number
	slider1.position(160, height+40);
	slider2 = createSlider(2,50,20);			//Size
	slider2.position(300, height+40);
	slider3 = createSlider(0, 1, 0.1, 0.1);		//Damp
	slider3.position(440, height+40);
	slider4 = createSlider(0, 1, ELASTICITY, 0.01);		//ELASTICITY
	slider4.position(580, height+40);
	gravity = createVector(0,0.1);

	textSize(12);

	forces = new Forces();

	frameRate(60);
	for (var i = 0; i < n; i++){
		balls.push(new Ball());
	}


}

function draw() {

	gravity.y = slider.value();				//Gravity slider
	ELASTICITY = slider4.value();			//Elasticity Slider
	damp = slider3.value();					//Damp Slider

	//Number Slider
	if (n<slider1.value()){
		for (var i = 0 ; i<slider1.value()-n; i++){
			balls.push(new Ball());
			n++;
		}
	}
	else if (n>slider1.value()){
		for (var i = 0 ; i<n-slider1.value(); i++){
			balls.pop();
			n -= 1;
		}
	}

	background(100);
	for (var i = 0; i < n; i++){
		balls[i].size = slider2.value();	//Size Slider
		balls[i].show();
		balls[i].move();
		balls[i].bordercollision();
		balls[i].addForce(forces.gravity(gravity, balls[i].mass));
		balls[i].addForce(forces.drag(balls[i].vel, 1, airDrag));
		balls[i].acceleration();
		kineticSum += (balls[i].mass * balls[i].vel.magSq())/2;

		//Checking collisions between balls
		for (var j = i+1 ; j < n ; j++){
			if (intercollision(balls[i],balls[j])){
				newVel = newvelocities(balls[i], balls[j])
				balls[i].vel = newVel[0];
				balls[j].vel = newVel[1];
			}
		}
	}

	
	document.getElementById('Energy').textContent = "Kinetic Energy: " + kineticSum;
	kineticSum = 0;

	text("1", 10,height+40);
	text("2", 150,height+40);
	text("3", 10,height+70);
	text("4", 150,height+70);
	text("5", 10,height+100);

  
}


function intercollision(a,b){
	if (dist(a.pos.x, a.pos.y, b.pos.x, b.pos.y) < ((a.size/2)+(b.size/2))){
		
		deltaX = ((a.size+b.size)/2)-dist(a.pos.x, a.pos.y, b.pos.x, b.pos.y);
		deltaY = ((a.size+b.size)/2)-dist(a.pos.x, a.pos.y, b.pos.x, b.pos.y);

		if (a.pos.x < b.pos.x){
			b.pos.x += deltaX;
			a.pos.x -= deltaX;
		}
		else{
			a.pos.x += deltaX;
			b.pos.x -= deltaX;
		}

		if (a.pos.y < b.pos.y){
			b.pos.y += deltaY;
			a.pos.y -= deltaY;
		}
		else{
			a.pos.y += deltaY;
			b.pos.y -= deltaY;
		}

		return true;
	}
}

function newvelocities(a,b){

	var contactAngle = p5.Vector.sub(a.pos, b.pos);
	contactAngle = contactAngle.heading()

	var totalMass = a.mass + b.mass;
	var massDiff = a.mass - b.mass;

	var headingA = a.vel.heading();
	var headingB = b.vel.heading();

	var aVel = a.vel.mag() * ELASTICITY;
	var bVel = b.vel.mag() * ELASTICITY;


	var newVelAx = (((aVel * cos(headingA - contactAngle) * massDiff) + 2 * b.mass * bVel * cos(headingB - contactAngle)) 
				* (cos(contactAngle)/totalMass)) + aVel * sin(headingA - contactAngle) * cos(contactAngle + HALF_PI);

	var newVelAy = (((aVel * cos(headingA - contactAngle) * massDiff) + 2 * b.mass * bVel * cos(headingB - contactAngle)) 
				* (sin(contactAngle)/totalMass)) + aVel * sin(headingA - contactAngle) * sin(contactAngle + HALF_PI);


	var newVelBx = ((bVel * cos(headingB - contactAngle) * (-massDiff) + 2 * a.mass * aVel * cos(headingA - contactAngle)) 
				* (cos(contactAngle)/totalMass)) + bVel * sin(headingB - contactAngle) * cos(contactAngle + HALF_PI);

	var newVelBy = ((bVel * cos(headingB - contactAngle) * (-massDiff) + 2 * a.mass * aVel * cos(headingA - contactAngle)) 
				* (sin(contactAngle)/totalMass)) + bVel * sin(headingB - contactAngle) * sin(contactAngle + HALF_PI);


	return [createVector(newVelAx, newVelAy), createVector(newVelBx, newVelBy)];
}
