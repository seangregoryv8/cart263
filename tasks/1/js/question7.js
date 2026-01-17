let q7Radius = 40;
let q7Colour = {
    r: "",
    g: "",
    b: ""
}

// True or false depending on either or
let circleToSquare = false;

function question7()
{
    fill(q7Colour.r, q7Colour.g, q7Colour.b);
    if (!circleToSquare) translate(q7Radius / 2, q7Radius / 2)
    for (let i = 0; i <= WIDTH; i += q7Radius)
    {
        for (let j = 0; j <= HEIGHT; j += q7Radius)
        {
            if (circleToSquare)
                square(i, j, q7Radius);
            else
                circle(i, j, q7Radius);
        }
    }
}