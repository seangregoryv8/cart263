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

    switch (questionAsked)
    {
        case 0:
            fill(255);
            textSize(32);
            //text("Funky Town by Sean Gregory and Leah Song", 100, 100)
            textSize(24);
            //text("Choose a question that I answered", 100, 200)
        
            translate(100, 250);
            textSize(18);
            for (let i = 1; i <= 7; i++)
            {
                //text("Question " + i, 0, i * 60);
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

let questionAsked = 0;

document.onkeydown = function(e)
{
    if (e.key === "1") questionAsked = 1;
    if (e.key === "2") questionAsked = 2;
    if (e.key === "3") questionAsked = 3;
    if (e.key === "4") questionAsked = 4;
    if (e.key === "5") questionAsked = 5;
    if (e.key === "6") questionAsked = 6;
    if (e.key === "7") questionAsked = 7;
}