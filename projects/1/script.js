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
    
    // Auto-scroll to bottom
    const consoleBox = document.querySelector(".consoleBlackBox");
    consoleBox.scrollTop = consoleBox.scrollHeight;

    determineCommand(newText);
}

function inputToConsole(text)
{
    document.getElementById("consoleOutput").innerHTML += text + "<br>";
    // Auto-scroll to bottom
    const consoleBox = document.querySelector(".consoleBlackBox");
    consoleBox.scrollTop = consoleBox.scrollHeight;
}

function attemptClose()
{
    inputToConsole("...Did I just catch you tryna close the console like this some kinda choice?!? Don't do that. If you want to close the console, just close the tab. Why are you like this? WHY MUST YOU FAIL ME SO OFTEN!?");
}

let clearAnnoyed = 0;
async function determineCommand(newText)
{
    let answered = false;
    newText = newText.toLowerCase();
    const command = newText.split(" ")[0];
    
    document.getElementById("consoleOutput").style.color = "#00ff00";
    document.getElementById("consoleOutput").style.fontWeight = "normal";
    document.getElementById("consoleOutput").style.fontSize = "12px";

    switch (newText)
    {
        case "how are you":
            inputToConsole("I'm just a console, but I'm doing great! Thanks for asking.");
            answered = true;
            break;
        case "among us":
            inputToConsole("AMONG US AMONG US OH MY GOD RED SUS HAHAHAHAHAHAAH DING DING DING DING!!!!!!");
            answered = true;
            break;
        case "what is my purpose":
            inputToConsole("You pass butter");
            answered = true;
            break;
        case "ultra secret":
            inputToConsole("Pssst... yknow, there's some hidden text on the top left. Hover over it with your mouse and bring it in here for a surprise...");
            answered = true;
            break;
        case "tell me a joke":
            inputToConsole("OH! I have a perfect joke lined up!<br><br>You");
            answered = true;
            break;
    }

    if (!answered)
    switch (command)
    {
        case "hint":
            inputToConsole("Nice try");
        case "debug":
            inputToConsole("Debug mode activated!");
            inputToConsole("Note: this does absolutely nothing and I have, in fact, trolled you. I am very funny");
            break;
        case "helloworld":
            // Now we give someone a full breakdown of everything they need to know about the console. This is basically a debug command.
            inputToConsole("Welcome to the debug! Here's every single command I wrote into this: ");

            inputToConsole("hello");
            inputToConsole("how are you");
            inputToConsole("tell me a joke");
            inputToConsole("among us");
            inputToConsole("amogus");
            inputToConsole("what is my purpose");
            inputToConsole("ultra secret");
            inputToConsole("sabine");
            inputToConsole("sean");
            inputToConsole("sorella");
            inputToConsole("bye");
            inputToConsole("goodbye");
            inputToConsole("sudo");
            inputToConsole("73cn278njhnciqyudn29ny2c8nysdan");
                
            inputToConsole("help");
            inputToConsole("clear");
            inputToConsole("attemptClose()");
                
            inputToConsole("cube");
            inputToConsole("cube help");
            inputToConsole("cube [size]");
            inputToConsole("cube [x] [y]");
            inputToConsole("cube [size] [x] [y]");
            inputToConsole("cube [width] [height] [x] [y]");
            inputToConsole("cubes [number]");
                
            inputToConsole("list");
            inputToConsole("select [id]");
            inputToConsole("deselect");
            inputToConsole("delete [id]");
            inputToConsole("erase");
            inputToConsole("rename [id] [newName]");
            inputToConsole("move [id] [newX] [newY]");
            inputToConsole("rotate [id] [angle]");
                
            inputToConsole("gravity");
            inputToConsole("rainbow");
            inputToConsole("dance");
                
            inputToConsole("reset");
                
            inputToConsole("W / A / S / D"); // keyboard move
            inputToConsole("Q / E"); // keyboard rotate
        
            break;
        case "secret":
            inputToConsole("You found the secret command! Congrats! Here's a cookie: 🍪");
            break;
        case "amogus":
            inputToConsole(`Stop posting about Among Us! I'm tired of seeing it! My friends on TikTok send me memes, on Discord it's fucking memes! I was in a server, right? And all of the channels are just Among Us stuff. I showed my Champion underwear to my girlfriend and the logo, I flipped it and I said, "Hey, babe, when the underwear is sus!" Haha, ding ding ding ding ding ding ding, ding-ding-ding! I fucking looked at a trashcan and I said, "That's a bit sussy!" I looked at my penis, I think of an astronaut's helmet and I go, "Penis? More like pen-sus!" Aaaaaaargh!`);
            break;
        case "sabine":
            inputToConsole("What about her? She's a great professor, great person. What else do you want me to say?")
            break;
        case "sean":
            inputToConsole("...who the hell is that?")
            break;
        case "sorella":
            inputToConsole("Ah... Sorella...")
            break;
        
        case "help":
            inputToConsole("Available commands:");
            inputToConsole("- help: Shows this message.");
            inputToConsole("- clear: Clears the console output.");
            inputToConsole("- cube: Creates a cube. Type 'cube help' for more info.");
            inputToConsole("- list: Lists all existing cubes.");
            inputToConsole("- select [id]: Selects a cube by its ID.");
            inputToConsole("- delete [id]: Deletes a cube by its ID.");
            inputToConsole("- erase: Deletes all cubes.");
            inputToConsole("- move [id] [newX] [newY]: Moves a cube to a new position.");
            inputToConsole("- rotate [id] [angle]: Rotates a cube by the specified angle.");
            inputToConsole("There's other commands to play with too. See if you can find em");
            break;
        case "clear":
            let output = document.getElementById("consoleOutput").innerHTML;
            console.log(output);
            if (output == "&gt; clear<br>" || output == "Console is already clear dingus.<br>&gt; clear<br>" || output == "Console is already clear dingus.<br>Stop it.<br>&gt; clear<br>")
            {
                document.getElementById("consoleOutput").innerHTML = "";
                inputToConsole("Console is already clear dingus.");
                clearAnnoyed++;
                if (clearAnnoyed > 3)
                    inputToConsole("Stop it.");
                if (clearAnnoyed > 5)
                {
                    document.getElementById("consoleOutput").innerHTML = "";
                    document.getElementById("consoleOutput").style.color = "red";
                    document.getElementById("consoleOutput").style.fontWeight = "bold";
                    document.getElementById("consoleOutput").style.fontSize = "40px";
                    inputToConsole("I SAID STOP IT!!!");
                    clearAnnoyed = 0;
                }
            }
            else
                document.getElementById("consoleOutput").innerHTML = "";
            break;
        case "cube":
            createCube(newText);
            break;
        case "cubes":
            // Spawn multiple cubes at random places
            for (let i = 0; i < newText.split(" ")[1]; i++)
            {
                createCube("cube");
                await sleep(100);
            }
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
        case "deselect":
            if (selectedCubeId !== null)
            {
                cubeRegistry[selectedCubeId].element.style.border = "none";
                selectedCubeId = null;
                inputToConsole("Deselected cube.");
            }
            break;
        case "delete":
            deleteCube(newText.split(" ")[1]);
            break;
        case "erase":
            eraseAllCubes();
            break;
        case "rename":
            const renameParts = newText.split(" ");
            if (renameParts.length < 3)
            {
                inputToConsole("Invalid rename command. Usage: rename [id] [newName]");
                break;
            }
            const newName = renameParts.slice(2).join(" ");
            renameCube(renameParts[1], newName);
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

            let gravityEvent = setInterval(() => {
                let allStopped = true;
                Object.keys(cubeRegistry).forEach(id => {
                    const cube = cubeRegistry[id];
                    const ground = window.innerHeight - cube.height - 10;
                    if (cube.y < ground)
                    {
                        moveCube(id, cube.x, cube.y + gravityInterval);
                        gravityInterval += 0.3; // Simulate acceleration due to gravity
                        allStopped = false;
                    }
                });
                if (allStopped)
                {
                    clearInterval(gravityEvent);
                    inputToConsole("All cubes have landed. Gravity stopped.");
                }
            }, 30);
            inputToConsole("Gravity enabled. Cubes will fall down.");
            break;
        
        case "rainbow":
            let hue = 0;
            setInterval(()=>{
                Object.values(cubeRegistry).forEach(cube=>{
                    cube.element.style.backgroundColor = `hsl(${hue},100%,50%)`;
                });
                hue+=5;
            },50);
            break;
        
        case "dance":
            let danceInterval = setInterval(()=>{
                Object.values(cubeRegistry).forEach(cube=>{
                    cube.element.style.transform = `rotate(${Math.random()*30-15}deg)`;
                });
            },100);
            inputToConsole("Let me break it down for you... *dances*");
            setTimeout(()=>{
                clearInterval(danceInterval);
            },5000);
            break;
        // Simple text stuff
        case "hello":
            inputToConsole("Sup");
            break;
        case "bye":
        case "goodbye":
            inputToConsole("I have no idea why you're saying goodbye, but ok. If you wanted to leave, close the tab");
            break;
        case "sudo":
            inputToConsole("Nice try, this ain't linux");
            break;
        case "73cn278njhnciqyudn29ny2c8nysdan":
            window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&autoplay=1";
            break;
        default:
            inputToConsole("Sorry, got no idea what " + newText + " is. Type 'help' for available commands.<br>");
    }
}

function checkValidPosition(x, y)
{
    return (x < 0 || x > window.innerWidth || y < 0 || y > window.innerHeight)
}

function randomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
    let x = randomInt(10, window.innerWidth - 110);
    let y = randomInt(10, window.innerHeight - 110);
    switch (inputs.length)
    {
        case 2:
            if (parseInt(inputs[1]) > 500)
            {
                inputToConsole("Invalid size. Please enter a value between 1 and 500.");
                return;
            }
            // Default position, custom size
            width = parseInt(inputs[1]);
            height = parseInt(inputs[1]);
            break;
        case 3:
            if (checkValidPosition(parseInt(inputs[1]) + 100, parseInt(inputs[2]) + 100))
            {
                inputToConsole("Invalid! It falls outside the window.");
                return;
            }
            // Default size, custom position
            x = parseInt(inputs[1]);
            y = parseInt(inputs[2]);
            break;
        case 4:
            // Custom size, custom position
            if (checkValidPosition(parseInt(inputs[2]) + parseInt(inputs[1]), parseInt(inputs[3]) + parseInt(inputs[1])))
            {
                inputToConsole("Invalid! It falls outside the window.");
                return;
            }
            if (parseInt(inputs[1]) > 500)
            {
                inputToConsole("Invalid size. Please enter a value between 1 and 500.");
                return;
            }
            width = parseInt(inputs[1]);
            height = parseInt(inputs[1]);
            x = parseInt(inputs[2]);
            y = parseInt(inputs[3]);
            break;
        case 5:
            if (checkValidPosition(parseInt(inputs[3]) + parseInt(inputs[1]), parseInt(inputs[4]) + parseInt(inputs[2])))
            {
                inputToConsole("Invalid! It falls outside the window.");
                return;
            }
            if (parseInt(inputs[1]) > 500 || parseInt(inputs[2]) > 500)
            {
                inputToConsole("Invalid size. Please enter a value between 1 and 500.");
                return;
            }
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
    
    cube.onclick = function(e)
    {
        e.stopPropagation();
        if (selectedCubeId == cubeId)
        {
            // Deselect if clicking on already selected cube
            cubeRegistry[cubeId].element.style.border = "none";
            selectedCubeId = null;
            inputToConsole("Deselected cube #" + cubeId);
        }
        else
        {
            selectCube(cubeId.toString());
        }
    };
    
    document.body.appendChild(cube);
    inputToConsole("Created cube #" + cubeId + " (100x100 at " + x + ", " + y + ")");
}

function cuboNoExisto(id)
{
    if (!(id in cubeRegistry))
    {
        inputToConsole("Cube #" + id + " not found.");
        return true;
    }
    return false;
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
    
    if (cuboNoExisto(id)) return;

    const cube = cubeRegistry[id];
    if (checkValidPosition(newX + cube.width, newY + cube.height))
    {
        inputToConsole("Invalid move! It falls outside the window.");
        return;
    }
    cube.x = newX;
    cube.y = newY;
    cube.element.style.left = newX + "px";
    cube.element.style.top = newY + "px";

    inputToConsole("Moved cube #" + id + " to (" + newX + ", " + newY + ").");
}

function rotateCube(id, angle)
{
    id = parseInt(id);

    if (cuboNoExisto(id)) return;

    const cube = cubeRegistry[id];
    cube.element.style.transform = "rotate(" + angle + "deg)";
    inputToConsole("Rotated cube #" + id + " to " + angle + " degrees.");
}

function selectCube(id)
{
    id = parseInt(id);
    
    if (cuboNoExisto(id)) return;
    // Remove border from previously selected
    if (selectedCubeId !== null && selectedCubeId in cubeRegistry)
        cubeRegistry[selectedCubeId].element.style.border = "none";
    
    selectedCubeId = id;
    cubeRegistry[id].element.style.border = "3px solid yellow";
    inputToConsole("Selected cube #" + id);
}

function renameCube(id, newName)
{
    id = parseInt(id);

    if (cuboNoExisto(id)) return;
    
    cubeRegistry[id].element.innerHTML = newName;
    inputToConsole("Renamed cube #" + id + " to " + newName);
    inputToConsole("Note: This does not change the cube's ID, just the text displayed on it.");
    inputToConsole("Say hi to " + newName);
}


function deleteCube(id)
{
    id = parseInt(id);
    
    if (cuboNoExisto(id)) return;
    
    inputToConsole("Deleted cube #" + id);
    let name = cubeRegistry[id].element.innerHTML;
    inputToConsole("You killed " + name);
    switch (randomInt(0,3))
    {
        case 0:
            inputToConsole("How could you do this to " + name + "?? They were a good cube! :(");
            break;
        case 1:
            inputToConsole("You euthanized your faithful " + name + " cube more quickly than any test subject on record. Congratulations")
            break;
        case 2:
            inputToConsole("You monster. You absolute monster. You killed " + name + " just for fun. I hope you're happy with yourself.");
            break;
        case 3:
            inputToConsole("I invited your best friend " + name + " cube. Of course, he couldn't come because you murdered him.");
            break;
    }

    cubeRegistry[id].element.remove();
    delete cubeRegistry[id];
    
    if (selectedCubeId === id)
        selectedCubeId = null;
}

function eraseAllCubes()
{
    const ids = Object.keys(cubeRegistry);
    ids.forEach(id => { cubeRegistry[id].element.remove(); });
    cubeRegistry = {};
    selectedCubeId = null;
    inputToConsole("All cubes erased.");
    switch (randomInt(0,3))
    {
        case 0:
            inputToConsole("You absolute madman. You just erased all the cubes. All of them. Gone. You have no respect for cube life.");
            break;
        case 1:
            inputToConsole("I literally cannot believe you just did that.")
            break;
        case 2:
            inputToConsole("I really do hope you're proud of yourself");
            break;
        case 3:
            inputToConsole("Y'know, I heard one of em was planning on settling down in the countryside, get married, have a couple of rugrat cubes. Poof. Gone. Just like that. You really are something else.");
            break;
    }
    cubeCounter = 0;
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

// Deselect cube when console input is focused
document.getElementById("consoleInput").addEventListener("focus", function()
{
    if (selectedCubeId !== null && selectedCubeId in cubeRegistry)
    {
        cubeRegistry[selectedCubeId].element.style.border = "none";
        selectedCubeId = null;
        inputToConsole("Deselected cube.");
    }
});

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}