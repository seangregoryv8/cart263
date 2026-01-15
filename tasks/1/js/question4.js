function question4()
{
    if (r1.turnToWhite)
    {
        fill(255)
    }
    else
    {
        fill(r1.color.r, r1.color.g, r1.color.b)
    }
    rect(0            , 0, WIDTH / 3, HEIGHT);

    if (r2.turnToWhite)
    {
        fill(255)
    }
    else 
    {
        fill(r2.color.r, r2.color.g, r2.color.b)
    }
    rect(WIDTH / 3,     0, WIDTH / 3, HEIGHT);

    if (r3.turnToWhite)
    {
        fill(255)
    }
    else
    {
        fill(r3.color.r, r3.color.g, r3.color.b)
    }
    rect(WIDTH / 3 * 2, 0, WIDTH / 3, HEIGHT);
}