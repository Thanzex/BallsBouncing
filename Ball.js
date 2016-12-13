function Ball(p, v){
	var movscale = 2;
	this.size = 10;		
	this.force = createVector(0,0);
	this.mass = 1;
	this.pos = p || createVector(random(this.size, width), random(this.size, height));
	this.vel = v || createVector(0,0);//createVector(random(-1*movscale, 1*movscale), random(-1*movscale, 1*movscale));


	this.move = function(){
		this.pos.add(this.vel);

	}

	this.show = function(){
		fill(200, 200, 200)
		ellipse(this.pos.x, this.pos.y, this.size, this.size);
	}

	this.acceleration = function(){
		this.acc = p5.Vector.div(this.force, this.mass);
		this.vel.add(this.acc);
	}

	this.bordercollision = function(){
		var posx = this.pos.x;
		var posy = this.pos.y;
		var size = this.size/2;

		if(posx < size){
			this.pos.x = size;
			this.vel.x = -this.vel.x * (1 - damp);
		}
		else if(posx > width - size){
			this.pos.x = width - size;
			this.vel.x = -this.vel.x * (1 - damp);
		}
		else if(posy <= size){
			this.pos.y = size;
			this.vel.y = -this.vel.y * (1 - damp);
		}
		else if(posy > height - size){
			this.pos.y = height - size;
			this.vel.y = -this.vel.y * (1 - damp);
		}
	}

	this.addForce = function(v){
		this.force = v;
	}
}
