function question6()
{
    // Make it white, big, and in the center
    fill(255);
    textSize(28);
    textAlign(CENTER, CENTER);
    // Middle of the screen
    text("test", WIDTH / 2, HEIGHT / 2);

    // Offset it from the corner
    translate(25, 25);
    for (let i = 0; i <= 9; i++)
    {
        // The x values goes from 25, 45, 65, 85, etc...
        let x = 20 * i;
        // Write the number with the x and y values
        text(i, x, 0);
    }

    for (let i = 15; i >= 0; i--)
    {
        // The y value goes from 25, 55, 85, 115, etc...
        let y = 30 * i;
        // Write the number with the x and y values
        text(i, 0, y);
    }

    // text("HELLO WORLD", 0, 0)
}