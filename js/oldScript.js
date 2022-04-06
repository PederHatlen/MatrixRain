var customColor;
var customColorAsCSS;

window.wallpaperPropertyListener = {
    applyUserProperties: function(properties) {
        if (properties.color) {
            // Convert the custom color to 0 - 255 range for CSS usage
            var customColor = properties.color.value.split(' ');
            customColor = customColor.map(function(c) {
                return Math.ceil(c * 255);
            });
            customColorAsCSS = 'rgb(' + customColor + ')';
        }
    },
};

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var infoel = document.getElementById("info");
infoel.innerHTML = "erbovdbvfrbdr";

var font_size = 20;
var columns;
var drops = [];

var matrix = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789#$%^&*()*&^%+-/~{[|`]}".split("");


function customlog(text=null, reset=false){
    if (reset){infoel.innerHTML = "Info:<br>"}
    if (text != false){infoel.innerHTML += text + "<br>";}
}


function setup()
{
    //making the canvas full screen
    c.height = window.innerHeight;
    c.width = window.innerWidth;

    columns = c.width/font_size;

    for(var i = 0; i < columns; i++){drops[i] = Math.random()* 0.5 * window.innerHeight;}

    var color = customColorAsCSS; //Original: #03A062

    ctx.shadowColor = "rgb(" + customColor.map(function(c) {if (c <= 50) {return 0;} return c - 50;}); + ")";
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 3;

    customlog("Color: " + customColorAsCSS, true);
    customlog("shadow color: " + ctx.shadowColor);
}

//drawing the characters
function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = color;
    ctx.font = font_size + "px Matrix Code NFI";

    for(var i = 0; i < drops.length; i++)
    {
        var text = matrix[Math.floor(Math.random()*matrix.length)];
        ctx.fillText(text, i*font_size, drops[i]*font_size);

        //sending the drop back to the top randomly after it has crossed the screen
        if(drops[i]*font_size > c.height && Math.random() > 0.96){drops[i] = 0;}

        drops[i]++;
    }
}

function pause(){clearInterval(timer)}
function start(){setInterval(draw, speed)}

window.onresize = function(){setup();}

setup();
var timer = setInterval(draw, 40);