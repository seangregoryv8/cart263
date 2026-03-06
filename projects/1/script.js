// Idea: Register the IP address in a generator, and only let them create 32 colour tiles. After that, they have to wait for the generator to reset (every 24 hours) before they can create more tiles. This way, we can prevent abuse of the generator and ensure that it is used fairly by everyone.

function addToConsole()
{
    let newText = document.getElementById("consoleInput").value;

    document.getElementById("consoleInput").value = "";
    if (newText == "") return;

    document.getElementById("consoleOutput").innerHTML += "> " + newText + "<br>";

    determineCommand(newText);
}

function inputToConsole(text)
{
    document.getElementById("consoleOutput").innerHTML += text + "<br>";
}
function determineCommand(newText)
{
    newText = newText.toLowerCase();
    switch (newText.split(" ")[0])
    {
        case "help":
            inputToConsole("Available commands: help, clear<br>");
            break;
        case "clear":
            document.getElementById("consoleOutput").innerHTML = "";
            break;
        case "cube":
            createCube(newText);
            break;
        case "reset":
            location.reload();
            break;
        case "erase":
            let cubes = document.querySelectorAll("div.cube");
            cubes.forEach(cube => {
                cube.remove();
            });
            inputToConsole("All cubes have been erased.");
            break;
        default:
            inputToConsole("Unknown command. Type 'help' for available commands.<br>");
    }
}

function createCube(input)
{
    let inputs = input.split(" ");

    console.log(inputs.length);

    if (inputs[1] == "help")
    {
        inputToConsole("There are 5 uses for this command:");
        inputToConsole("1. cube - Creates a 100x100 cube at x: 100, y: 100");
        inputToConsole("2. cube [size] - creates a cube with the specified size at x: 100, y: 100");
        inputToConsole("3. cube [x] [y] - creates a 100x100 cube at the specified position.");
        inputToConsole("4. cube [size] [x] [y] - creates a cube with the specified size at the specified position.");
        inputToConsole("5. cube [width] [height] [x] [y] - creates a cube with the specified width and height at the specified position.");
        return;
    }
    let width = 100;
    let height = 100;
    let x = 100;
    let y = 100;
    switch (inputs.length)
    {
        case 2:
            // Default position, custom size
            width = parseInt(inputs[1]);
            height = parseInt(inputs[1]);
            break;
        case 3:
            // Default size, custom position
            x = parseInt(inputs[1]);
            y = parseInt(inputs[2]);
            break;
        case 4:
            // Custom size, custom position
            width = parseInt(inputs[1]);
            height = parseInt(inputs[1]);
            x = parseInt(inputs[2]);
            y = parseInt(inputs[3]);
            break;
        case 5:
            // Custom rectangular size, custom position
            width = parseInt(inputs[1]);
            height = parseInt(inputs[2]);
            x = parseInt(inputs[3]);
            y = parseInt(inputs[3]);
            break;
    }

    let cube = document.createElement("div");
    cube.classList.add("cube");
    cube.style.width = width + "px";
    cube.style.height = height + "px";
    cube.style.backgroundColor = "red";
    cube.style.position = "absolute";
    cube.style.left = x + "px";
    cube.style.top = y + "px";
    // random colour for the cube
    cube.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    document.body.appendChild(cube);
    inputToConsole("You have created a cube!");
}


addEventListener("keydown", function(event) {
    if (event.key == "Enter")
        addToConsole();
});