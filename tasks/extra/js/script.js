/**
 *  Funky Town
 * Sean Gregory and Leah Song
 * 
 * 
 */

"use strict";

const WIDTH = 800;
const HEIGHT = 800;
const circ = 40;

let wid = 20;

function setup()
{
    createCanvas(WIDTH, HEIGHT);
    background(0);

    noStroke();

}

let order = 1;
function draw()
{
    if (wid <= 0 || wid >= 40)
        order = -order;
    wid += order;
    for (let i = circ / 2; i < WIDTH; i += circ)
    {
        for (let j = circ / 2; j < HEIGHT; j += circ)
        {
            circle(i, j, wid);
        }
    }
}