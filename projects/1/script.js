// Idea: Register the IP address in a generator, and only let them create 32 colour tiles. After that, they have to wait for the generator to reset (every 24 hours) before they can create more tiles. This way, we can prevent abuse of the generator and ensure that it is used fairly by everyone.

function addToConsole()
{
    let newText = document.getElementById("consoleInput").value;

    document.getElementById("consoleInput").value = "";
    if (newText == "") return;

    document.getElementById("consoleOutput").innerHTML += "<br>" + newText;

    determineCommand(newText);
}

function determineCommand(newText)
{
    switch (newText)
    {
        case "help":
            document.getElementById("consoleOutput").innerHTML += "<br>Available commands: help, clear";
            break;
        case "clear":
            document.getElementById("consoleOutput").innerHTML = "";
            break;
        default:
            document.getElementById("consoleOutput").innerHTML += "<br>Unknown command. Type 'help' for available commands.";
    }
}



addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
        addToConsole();
    }
});