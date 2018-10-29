function draw() {

    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var context = canvas.getContext('2d');

        for(var x=20;x<2500;x+=20) {
            context.moveTo(x,0);
            context.lineTo(x,2500);
        }


        context.strokeStyle='grey';
        context.stroke();

    }
}

function showCoords(event) {
    var x = event.clientX;
    var y = event.clientY;
    var coords = "X coordinates: " + x + ", Y coordinates: " + y;
    document.getElementById('showCoords').innerHTML = coords;

}