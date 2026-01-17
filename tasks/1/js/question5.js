let q5Rect = {
    x: 50,
    y: 50,
    w: 50,
    h: 50,
    color: 
    {
        r: 255,
        g: 110,
        b: 0
    }
}

let counter = 0;
let circleRadius = 60;
let circleAlpha = 50;
let test = 2;
function question5()
{
    // Between 1 and 10 for counter
    // Make circle larger and more visible
    mouseHover();
    displaySquare(q5Rect.x, q5Rect.y, q5Rect.w, q5Rect.h, q5Rect.color.r, q5Rect.color.g, q5Rect.color.b)

    push();
    // White border
    stroke(255);
    // Heavy weight
    strokeWeight(3);
    translate(WIDTH / 2, HEIGHT / 2);
    // fill(red, green, blue, alpha)

    // counter = 0, tmpCounter = 1
    // 1 <= 10
    let tmpCounter = 1;
    while (tmpCounter <= counter)
    {
        fill(255, 255, 255, circleAlpha + (tmpCounter * 10));
        circle(0, 0, circleRadius + (tmpCounter * 60))
        tmpCounter++;
    }

    pop();

    //if (circleAlpha <= 0 || circleAlpha >= 255) test = -test;
    //circleAlpha += test;
}

function displaySquare(x, y, w, h, r, g, b)
{
    fill(r, g, b)
    rect(x, y, w, h)
}

function q5Hovering()
{
    return mouseX >= q5Rect.x && mouseX <= q5Rect.x + q5Rect.w && mouseY >= q5Rect.y && mouseY <= q5Rect.y + q5Rect.h;
}
function mouseHover()
{
    if (q5Hovering())
    {
        q5Rect.color.g = 165;
    }
    else
    {
        q5Rect.color.g = 110;
    }
}