var color = "#00d17d"; // 00d17d, 03A062
var firstColor = "#ffffff";
var colorAsRGB;

var speed = 40;
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var font_size = 20;
var columns;
var drops = [];

var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789#$%^&*()*&^%+-/~{[|`]}".split("");
function randomCharacter() {
	// return String.fromCharCode(0x30a0 + Math.random() * (0x30ff-0x30a0));
	return characters[Math.floor(Math.random()*characters.length)]
}

function setup(){
	//making the canvas full screen
	c.height = window.innerHeight;
	c.width = window.innerWidth;

	// ctx.shadowOffsetX = 0;
	// ctx.shadowOffsetY = 0;
	// ctx.shadowBlur = 3;
	// ctx.shadowColor = color; 

	ctx.font = font_size + "px matrix_code_nfiregular";

	colorAsRGB = hexToRgb(color);
	
	columns = c.width/font_size;

	for(var i = 0; i < columns; i++){drops[i] = [Math.random()* window.innerHeight/font_size, randomCharacter()]}

}

//drawing the characters
function draw() {
	ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
	ctx.fillRect(0, 0, c.width, c.height);	

	for(var i = 0; i < drops.length; i++){
		ctx.fillStyle = color;
		ctx.fillText(drops[i][1], i*font_size, drops[i][0]*font_size);

		var text = randomCharacter();
		drops[i][0]++;
		drops[i][1] = text;

		ctx.fillStyle = firstColor;
		ctx.fillText(text, i*font_size, drops[i][0]*font_size);

		//sending the drop back to the top randomly after it has crossed the screen
		if(drops[i][0]*font_size > c.height && Math.random() > 0.96){drops[i][0] = 0;}
	}
}

function pause(){clearInterval(timer)}
function start(){timer = setInterval(draw, speed)}
function restart(){pause(); start();}

function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
}

window.onresize = setup;
setup();
var timer = setInterval(draw, speed)