/**
 *  Funky Town
 * Sean Gregory and Leah Song
 * 
 * 
 */

"use strict";

const WIDTH = 800;
const HEIGHT = 800;

function setup()
{
    createCanvas(WIDTH, HEIGHT);
    background(0);
    changeColour();
}

function changeColour()
{
    q7Colour.r = random(0, 255);
    q7Colour.g = random(0, 255);
    q7Colour.b = random(0, 255);
}

function draw()
{
    background(0);
    push();

    switch (questionAsked)
    {
        case 0:
            fill(255);
            textSize(32);
            text("Funky Town by Sean Gregory and Leah Song", 100, 100)
            textSize(24);
            text("Choose a question that I answered", 100, 200)
        
            translate(100, 250);
            textSize(18);
            for (let i = 1; i <= 7; i++)
            {
                text("Question " + i, 0, i * 60);
            }
            break;
        case 1:
            question1();
            break;
        case 2:
            question2();
            break;
        case 3:
            question3();
            break;
        case 4:
            question4();
            break;
        case 5:
            question5();
            break;
        case 6:
            question6();
            break;
        case 7:
            question7();
            break;
    }

    pop();
}

let questionAsked = 7;

document.onkeydown = function(e)
{
    if (e.key === "1") questionAsked = 1;
    if (e.key === "2") questionAsked = 2;
    if (e.key === "3") questionAsked = 3;
    if (e.key === "4") questionAsked = 4;
    if (e.key === "5") questionAsked = 5;
    if (e.key === "6") questionAsked = 6;
    if (e.key === "7") questionAsked = 7;
    if (e.key === "0") questionAsked = 0;
}