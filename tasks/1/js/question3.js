let r1 = {
    x: 70,
    y: 100,
    w: 80,
    h: 60,
    color: {
        r: 40,
        g: 123,
        b: 80
    },
    turnToWhite: false
}
let r2 = {
    x: 150,
    y: 200,
    w: 40,
    h: 100,
    color: {
        r: 211,
        g: 24,
        b: 150
    },
    turnToWhite: false
}
let r3 = {
    x: 200,
    y: 60,
    w: 70,
    h: 100,
    color: {
        r: 30,
        g: 200,
        b: 240
    },
    turnToWhite: false
}

function question3()
{
    fill(r1.color.r, r1.color.g, r1.color.b);
    rect(r1.x, r1.y, r1.w, r1.h);
    fill(r2.color.r, r2.color.g, r2.color.b);white
    fill(r3.color.r, r3.color.g, r3.color.b);
    rect(r3.x, r3.y, r3.w, r3.h);

    if (r3.y >= HEIGHT) r3.y = 100;

    r3.y += 2;

}

function mouseMoved()
{
    if (questionAsked == 3)
    {
        r3.color.r = random(0, 255);
        r3.color.g = random(0, 255);
        r3.color.b = random(0, 255);
    }
    if (questionAsked == 4)
    {
        if (mouseX >= 0 && mouseX <= WIDTH / 3)
        {
            r1.turnToWhite = true;
            r2.turnToWhite = false;
            r3.turnToWhite = false;
        }
        if (mouseX >= WIDTH / 3 && mouseX <= WIDTH / 3 * 2)
        {
            r1.turnToWhite = false;
            r2.turnToWhite = true;
            r3.turnToWhite = false;
        }
        if (mouseX >= WIDTH / 3 * 2 && mouseX <= WIDTH)
        {
            r1.turnToWhite = false;
            r2.turnToWhite = false;
            r3.turnToWhite = true;
        }
    }
}

function mousePressed()
{
    r1.x += random(-5, 5);
    r1.y += random(-5, 5);
}

function keyPressed()
{
    if (keyIsPressed && key == " ")
    {
        r2.x += random(-5, 5);
        r2.y += random(-5, 5);
    }
}