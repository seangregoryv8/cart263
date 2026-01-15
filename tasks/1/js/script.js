/**
 * Title of Project
 * Author Name
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup()
{
    createCanvas(800, 800);
    background(0);
}

function draw()
{
    push();
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
    pop();

    if (questionAsked == 1)
    {
        question1();
    }
}

let questionAsked = 0;

document.onkeydown = function(e)
{
    if (e.key === "1") questionAsked = 1;
}