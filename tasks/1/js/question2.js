function question2()
{
    drawEllipse(80, 80, 60, 60, 80, 10, 150)
    drawEllipse(200, 500, 80, 80, 140, 52, 90)
    drawEllipse(400, 350, 30, 20, 80, 243, 133)
}

function drawEllipse(x, y, w, h, r, g, b)
{
    fill(r, g, b)
    ellipse(x, y, w, h);
}