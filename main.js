var c = document.getElementById("mainCanvas");
var ctx = c.getContext("2d");
var frameRate = 100;
var entities = [];
var gridSize=32;
var world = [];
var currKey = null;

window.addEventListener('keydown',this.checkDown,false);
function checkDown(e) {
    var code = e.keyCode;
    switch (code) {
        case 37: currKey = "left"; break; //Left key
        case 38: currKey = "up"; break; //Up key
        case 39: currKey = "right"; break; //Right key
        case 40: currKey = "down"; break; //Down key
        default: currKey = null; //Everything else
    }
}

window.addEventListener('keyup',this.checkUp,false);
function checkUp(e) {
    var code = e.keyCode;
    currKey = null;
}

function drawImage(offX,offY,sizeX,sizeY,x,y,size,path){
	var img = new Image();
	img.src = path;
	img.onload = function() {
		ctx.drawImage(img,offX,offY,sizeX,sizeY,x,y,size,size);
	}
}

class point{
	constructor(x,y){
		this.x=x;
		this.y=y;
	}
}

class thing{
	constructor(x,y){
		this.location = new point(x,y);
		this.imgPath = "images/brick.png";
		this.animated = false;
		this.basic = false;
		this.size = gridSize;
		this.basicColor = "#000000";
	}
	
	draw(){
		if(this.basic){
			ctx.fillStyle = this.basicColor;
			ctx.fillRect(this.location.x*this.size,this.location.y*this.size,this.location.x+this.size,this.location.y+this.size);
		}else{
			drawImage(0,0,64,64,this.location.x*this.size,this.location.y*this.size,this.size,this.imgPath);
		}
	}
}

class entity{
	constructor(){
		this.name = "";
		this.hp = 100;
		this.location = new point(5,5);
		this.imgPath = "images/temp.png";
		this.basic = true;
		this.basicColor = "#00FF00";
		this.size = gridSize;
		this.animated = false
		this.isControlled = false;
		this.frame = 1;
		this.imageOffset = new point(0,0);
	}
	
	draw(){
		if(this.basic){
			ctx.fillStyle = this.basicColor;
			ctx.fillRect(this.location.x*this.size,this.location.y*this.size,this.location.x+this.size,this.location.y+this.size);
		}else{
			drawImage(this.imageOffset.x,this.imageOffset.y,32,32,this.location.x*this.size,this.location.y*this.size,this.size,this.imgPath);
		}
		
		if(this.animated){
			//this.frame++;
			if(this.frame==1){
				this.imageOffset = new point(0,0);
			}
			if(this.frame==2){
				this.imageOffset = new point(32,0);
			}
			
			if(this.frame==3){
				this.imageOffset = new point(0,32);
			}
			
			if(this.frame==4){
				this.imageOffset = new point(32,32);
				this.frame = 0;
			}
			
			
			
		}
	}
	
	control(keyDown){
		if(keyDown != null){
			this.frame++;
			if(keyDown == "down"){
				for(var i = 0; i < world.length; i++){
					if(world[i].location.y == this.location.y+1 && world[i].location.x == this.location.x)
						return;
				}
				this.location.y = this.location.y+1;
			}
			
			if(keyDown == "up"){
				for(var i = 0; i < world.length; i++){
					if(world[i].location.y == this.location.y-1 && world[i].location.x == this.location.x)
						return;
				}
				this.location.y = this.location.y-1;
			}
			
			if(keyDown == "right"){
				this.imgPath = "images/playerRight.png";
				for(var i = 0; i < world.length; i++){
					if(world[i].location.x == this.location.x+1 && world[i].location.y == this.location.y)
						return;
				}
				this.location.x = this.location.x+1;
			}
			if(keyDown == "left"){
				this.imgPath = "images/playerLeft.png";
				for(var i = 0; i < world.length; i++){
					if(world[i].location.x == this.location.x-1 && world[i].location.y == this.location.y)
						return;
				}
				this.location.x = this.location.x-1;
			}
			
		}
	}
	
	
}

entities[0] = new entity();
entities[0].name = "player";
entities[0].isControlled = true;
entities[0].basic = false;
entities[0].animated = true;
entities[0].imgPath = "images/playerRight.png";

world[0] = new thing(1,3);
world[1] = new thing(2,3);
world[2] = new thing(3,3);
world[3] = new thing(4,3);

function frame(){
	ctx.fillStyle="#FFFFFF";
	ctx.fillRect(0,0,640,480);
	ctx.fillStyle="#000000";
	for(var i = 0; i < entities.length; i++){
		
		if(entities[i].isControlled && currKey!=null){
			entities[i].control(currKey);
			//currKey = null;
			
		}
		entities[i].draw();
		
	}
	
	for(var i = 0; i < world.length; i++){
		world[i].draw();
	}
	
	setTimeout(frame,frameRate);
}


frame();
