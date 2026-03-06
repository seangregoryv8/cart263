// Idea: Register the IP address in a generator, and only let them create 32 colour tiles. After that, they have to wait for the generator to reset (every 24 hours) before they can create more tiles. This way, we can prevent abuse of the generator and ensure that it is used fairly by everyone.

let cubeRegistry = {};
let cubeCounter = 0;
let selectedCubeId = null;

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
    const command = newText.split(" ")[0];
    
    switch (command)
    {
        case "help":
            inputToConsole("Commands: cube [size/x y/size x y/width height x y], list, select [id], delete [id], erase all, clear, reset");
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
        case "list":
            listCubes();
            break;
        case "select":
            selectCube(newText.split(" ")[1]);
            break;
        case "delete":
            deleteCube(newText.split(" ")[1]);
            break;
        case "erase":
            eraseAllCubes();
            break;
        case "move":
            const parts = newText.split(" ");
            if (parts.length != 4)
            {
                inputToConsole("Invalid move command. Usage: move [id] [newX] [newY]");
                break;
            }
            moveCube(parts[1], parseInt(parts[2]), parseInt(parts[3]));
            break;

        case "rotate":
            const rotateParts = newText.split(" ");
            if (rotateParts.length != 3)
            {
                inputToConsole("Invalid rotate command. Usage: rotate [id] [angle]");
                break;
            }
            rotateCube(rotateParts[1], parseInt(rotateParts[2]));
            break;

        // Now for some fun commands

        case "gravity":
            let gravityInterval = 5;
            setInterval(() => {
                Object.keys(cubeRegistry).forEach(id => {
                    const cube = cubeRegistry[id];
                    moveCube(id, cube.x, cube.y + gravityInterval);
                    gravityInterval += 0.3; // Simulate acceleration due to gravity
                });
            }, 30);
            inputToConsole("Gravity enabled. Cubes will fall down.");
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
            y = parseInt(inputs[4]);
            break;
    }

    const cubeId = cubeCounter++;
    const color = "#" + Math.floor(Math.random()*16777215).toString(16);
    
    let cube = document.createElement("div");
    cube.classList.add("cube");
    cube.id = "cube-" + cubeId;
    cube.style.width = width + "px";
    cube.style.height = height + "px";
    cube.style.backgroundColor = color;
    cube.style.position = "absolute";
    cube.style.left = x + "px";
    cube.style.top = y + "px";
    cube.style.display = "flex";
    cube.style.alignItems = "center";
    cube.style.justifyContent = "center";
    cube.style.fontSize = "12px";
    cube.style.fontWeight = "bold";
    cube.style.color = "#fff";
    cube.style.cursor = "pointer";
    cube.innerHTML = "#" + cubeId;
    
    // Store cube data
    cubeRegistry[cubeId] = {
        element: cube,
        id: cubeId,
        width: width,
        height: height,
        x: x,
        y: y,
        color: color
    };
    
    cube.onclick = function(e) {
        e.stopPropagation();
        selectCube(cubeId.toString());
    };
    
    document.body.appendChild(cube);
    inputToConsole("Created cube #" + cubeId + " (100x100 at " + x + ", " + y + ")");
}

function listCubes()
{
    const ids = Object.keys(cubeRegistry);
    if (ids.length === 0)
    {
        inputToConsole("No cubes exist.");
        return;
    }
    
    inputToConsole("=== CUBE REGISTRY ===");
    ids.forEach(id => {
        const cube = cubeRegistry[id];
        const marker = selectedCubeId == id ? " [SELECTED]" : "";
        inputToConsole(`#${id}: ${cube.width}x${cube.height} at (${cube.x}, ${cube.y}) ${cube.color}${marker}`);
    });
}

function moveCube(id, newX, newY)
{
    id = parseInt(id);
    
    if (!(id in cubeRegistry))
    {
        inputToConsole("Cube #" + id + " not found.");
        return;
    }

    const cube = cubeRegistry[id];
    cube.x = newX;
    cube.y = newY;
    cube.element.style.left = newX + "px";
    cube.element.style.top = newY + "px";

    inputToConsole("Moved cube #" + id + " to (" + newX + ", " + newY + ").");
}

function rotateCube(id, angle)
{
    id = parseInt(id);

    if (!(id in cubeRegistry))
    {
        inputToConsole("Cube #" + id + " not found.");
        return;
    }

    const cube = cubeRegistry[id];
    cube.element.style.transform = "rotate(" + angle + "deg)";
    inputToConsole("Rotated cube #" + id + " to " + angle + " degrees.");
}

function selectCube(id)
{
    id = parseInt(id);
    
    if (!(id in cubeRegistry))
    {
        inputToConsole("Cube #" + id + " not found.");
        return;
    }
    
    // Remove border from previously selected
    if (selectedCubeId !== null && selectedCubeId in cubeRegistry)
    {
        cubeRegistry[selectedCubeId].element.style.border = "none";
    }
    
    selectedCubeId = id;
    cubeRegistry[id].element.style.border = "3px solid yellow";
    inputToConsole("Selected cube #" + id);
}

function deleteCube(id)
{
    id = parseInt(id);
    
    if (!(id in cubeRegistry))
    {
        inputToConsole("Cube #" + id + " not found.");
        return;
    }
    
    cubeRegistry[id].element.remove();
    delete cubeRegistry[id];
    
    if (selectedCubeId === id)
    {
        selectedCubeId = null;
    }
    
    inputToConsole("Deleted cube #" + id);
}

function eraseAllCubes()
{
    const ids = Object.keys(cubeRegistry);
    ids.forEach(id => {
        cubeRegistry[id].element.remove();
    });
    cubeRegistry = {};
    selectedCubeId = null;
    inputToConsole("All cubes erased.");
}


addEventListener("keydown", function(event)
{
    if (event.key == "Enter")
        addToConsole();
    if (event.key == "d" && selectedCubeId !== null)
        moveCube(selectedCubeId, cubeRegistry[selectedCubeId].x + 10, cubeRegistry[selectedCubeId].y);
    if (event.key == "a" && selectedCubeId !== null)
        moveCube(selectedCubeId, cubeRegistry[selectedCubeId].x - 10, cubeRegistry[selectedCubeId].y);
    if (event.key == "w" && selectedCubeId !== null)
        moveCube(selectedCubeId, cubeRegistry[selectedCubeId].x, cubeRegistry[selectedCubeId].y - 10);
    if (event.key == "s" && selectedCubeId !== null)
        moveCube(selectedCubeId, cubeRegistry[selectedCubeId].x, cubeRegistry[selectedCubeId].y + 10);
    if (event.key == "q" && selectedCubeId !== null)
        rotateCube(selectedCubeId, (parseInt(cubeRegistry[selectedCubeId].element.style.transform.replace("rotate(", "").replace("deg)", "")) || 0) - 10);
    if (event.key == "e" && selectedCubeId !== null)
        rotateCube(selectedCubeId, (parseInt(cubeRegistry[selectedCubeId].element.style.transform.replace("rotate(", "").replace("deg)", "")) || 0) + 10);
});