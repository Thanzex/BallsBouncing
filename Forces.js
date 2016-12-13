function Forces(){
	this.gravity = function(a, m){		
		this.g = p5.Vector.mult(a, m);
		return this.g;
	}

	this.directional = function(v){
		this.force = v;
	}

}
