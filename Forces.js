function Forces(){
	this.gravity = function(a, m){		
		this.g = p5.Vector.mult(a, m);
		return this.g;
	}

	this.directional = function(v){
		this.force = v;
		return this.force;
	}

	this.drag = function(v, a, c) {
		this.force = p5.Vector.mult(p5.Vector.div(v, v.mag()),(v.magSq() * a * c)/(-2));
		return this.force;
	}

}

//Constants

var airDrag = 0.001;
var waterDrag = 0.1;
