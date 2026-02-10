setup_C();
/** THEME: SERENITY  */
function setup_C() {
  console.log("in c");
  /**************************************************** */
  //get the buttons
  activateButtons(`#TEAM_C`, "ani_canvC",aniA,aniB,aniC,aniD);

  /**************** ANI A ************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN A INSIDE HERE */
  /**************** ANI A ************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:)
   * 1: create a creative, visual pattern using text, divs as shapes, images ...
   * 2: add in mouseclick event listener(s) somewhere to make the sketch interactive
   *
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function  -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/

  function aniA(parentCanvas)
  {
    console.log("in ani-A -teamC");
    
    // Get the canvas size and position for boundary checking and coordinate conversion
    let boundingBoxParent = parentCanvas.getBoundingClientRect();
    let arrayOfellipses = []; // Array to store all created cell elements
    let grid = {}; // Object to store grid cells by their "row,col" key for fast lookup
    
    // Constants for grid and animation timing
    const CELL_SIZE = 10;           // Each square is 10x10 pixels
    const SPACING = 20;             // Cells are spaced 20 pixels apart
    const ANIMATION_DELAY = 80;     // Wait 80ms between each spreading wave

    const colours = {
      red: "#FF3B30",
      orange: "#FF9500",
      yellow: "#FFCC00",
      lime: "#C7F000",
      green: "#34C759",
      teal: "#5AC8FA",
      cyan: "#00FFFF",
      blue: "#007AFF",
      indigo: "#5856D6",
      purple: "#AF52DE",
      magenta: "#FF2D55",
      pink: "#FF69B4",
      coral: "#FF6F61",
      peach: "#FFB7A5",
      brown: "#8B572A",
      beige: "#F5F5DC",
      tan: "#D2B48C",
      olive: "#808000",
      mint: "#98FF98",
      seafoam: "#93E9BE",
      sky: "#87CEEB",
      navy: "#001F3F",
      slate: "#708090",
      charcoal: "#36454F",
      silver: "#C0C0C0",
      gray: "#9E9E9E",
      black: "#000000",
      white: "#FFFFFF",
      gold: "#FFD700",
      bronze: "#CD7F32"
    };

    let SELECTED_COLOR = colours.red;
    function getColour()
    {
      const values = Object.values(colours);
      SELECTED_COLOR = values[Math.floor(Math.random() * values.length)];
    }
    // Creates the initial grid of blue squares and populates the grid object
    function drawStuff()
    {
      arrayOfellipses = [];
      parentCanvas.innerHTML = ''; // Clear any previous cells
      
      // Loop through rows (starting at 20px, incrementing by 20px)
      for (let i = 20; i < boundingBoxParent.height; i += SPACING)
      {
        // Loop through columns (starting at 20px, incrementing by 20px)
        for (let j = 20; j < boundingBoxParent.width; j += SPACING)
        {
          // Create a new div element for this grid cell
          let ellipse = document.createElement("div");
          ellipse.classList.add("TEAM_H_h_cell");
          parentCanvas.appendChild(ellipse);
          
          // Position the cell using CSS (left/top are relative to parent with position:relative)
          ellipse.style.left = `${j}px`;
          ellipse.style.top = `${i}px`;
          
          // Set cell dimensions and initial color to blue
          ellipse.style.width = `${CELL_SIZE}px`;
          ellipse.style.height = `${CELL_SIZE}px`;
          ellipse.style.opacity = 1;
          ellipse.style.background = "blue";
          ellipse.style.transition = "background 0.1s ease"; // Smooth color transitions
          
          // Calculate grid row and column indices (e.g., 20/20=1, 40/20=2, etc.)
          const row = i / SPACING;
          const col = j / SPACING;
          const key = `${row},${col}`; // Create unique key like "1,2" for lookup
          
          // Store this cell in the grid object for fast access during animation
          if (!grid[key])
          {
            grid[key] = {
              element: ellipse,      // Reference to the HTML element
              row: row,              // Grid row index
              col: col,              // Grid column index
              illuminated: false,    // Has this cell been part of a wave yet?
              distance: Infinity     // Distance from click point (used in BFS)
            };
          }
          else grid[key].element = ellipse;
          
          arrayOfellipses.push(ellipse); // Add to array for tracking
        }
      }
    }

    // Rounds click coordinates to the nearest grid position
    // Example: click at x=37 with SPACING=20 becomes 40 (nearest 20px increment)
    function round(number, increment, offset)
    {
      return Math.round((number - offset) / increment);
    }

    // Main animation function that spreads illumination outward in waves (Breadth-First Search)
    function animateSpread(startRow, startCol)
    {
      // Reset all cells to blue and mark them as not illuminated
      Object.values(grid).forEach(cell => {
        cell.distance = Infinity;
        cell.illuminated = false;
        cell.element.style.background = "blue";
      });

      // Initialize BFS: start with the clicked cell
      let queue = [[startRow, startCol]];      // First wave contains only the clicked cell
      let wavesToProcess = [queue];            // Array of all waves to process sequentially
      let waveIndex = 0;                       // Track which wave we're currently animating

      // Processes one wave of illumination at a time
      function processNextWave()
      {
        // If we've processed all waves, animation is done
        if (waveIndex >= wavesToProcess.length)
        {
          // Wait briefly, then reset all cells to blue
          setTimeout(() => {
            Object.values(grid).forEach(cell => {
              cell.element.style.background = "blue";
            });
          }, ANIMATION_DELAY);
          return;
        }

        // Turn all cells back to blue before illuminating the current wave
        // This creates the "moving front" effect where only the active wave is red
        Object.values(grid).forEach(cell => {
          cell.element.style.background = "blue";
        });

        // Get the current wave (array of [row, col] cells to illuminate)
        const currentWave = wavesToProcess[waveIndex];
        const nextWave = []; // Will store cells adjacent to current wave

        // For each cell in the current wave, illuminate it and find its neighbors
        currentWave.forEach(([row, col]) => {
          const key = `${row},${col}`;
          if (grid[key])
          {
            grid[key].element.style.background = SELECTED_COLOR;  // Turn this cell red
            grid[key].illuminated = true;                 // Mark as visited
          }

          // Check all 4 adjacent direction: up, down, left, right
          const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
          directions.forEach(([dRow, dCol]) => {
            // Calculate the neighbor's row and column
            const newRow = row + dRow;
            const newCol = col + dCol;
            const newKey = `${newRow},${newCol}`;

            // Get reference to the neighbor cell (if it exists)
            let c = grid[newKey];
            
            // Add neighbor to next wave if: it exists, hasn't been illuminated, and isn't already in nextWave
            if (c && !c.illuminated && !nextWave.some(([r, c]) => r === newRow && c === newCol))
              nextWave.push([newRow, newCol]);
          });
        });

        // If there are more cells to process, add this wave to the queue
        if (nextWave.length > 0)
          wavesToProcess.push(nextWave);

        // Move to the next wave
        waveIndex++;
        
        // Schedule the next wave to process after the animation delay (80ms)
        setTimeout(processNextWave, ANIMATION_DELAY);
      }

      // Kick off the animation by processing the first wave
      processNextWave();
    }

    // Listen for mouse clicks on the canvas
    addEventListener("click", (event) => 
    {
      // Get the click coordinates relative to the page
      let x = event.clientX;
      let y = event.clientY;
      
      // Get the canvas boundaries
      let mainXA = boundingBoxParent.x;
      let mainXB = mainXA + boundingBoxParent.width;
      let mainYA = boundingBoxParent.y;
      let mainYB = mainYA + boundingBoxParent.height;
      
      // Only process the click if it's within the canvas bounds
      if (x >= mainXA && x <= mainXB && y >= mainYA && y <= mainYB)
      {
        getColour();
        // Convert click coordinates from page space to canvas-relative space
        const relativeX = x - mainXA;
        const relativeY = y - mainYA;
        
        // Round to the nearest grid cell index
        const col = round(relativeX, SPACING, 0);
        const row = round(relativeY, SPACING, 0);

        // Immediately turn the clicked cell red so user sees instant feedback
        const clickedKey = `${row},${col}`;
        if (grid[clickedKey])
          grid[clickedKey].element.style.background = SELECTED_COLOR;

        // After a brief delay (80ms), start the wave animation spreading outward
        setTimeout(() => {
          animateSpread(row, col);
        }, ANIMATION_DELAY - 20);
      }
    })

    // Initialize the grid when this function first runs
    drawStuff();
  }
  
  


  /****************ANI B ************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN B INSIDE HERE */
  /****************ANI B ************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:).
   * 1: create a creatve, visual pattern using text, divs as shapes, images ... 
   * 2: add in mouseover event listener(s) somewhere to make the sketch interactive
   *
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/

  function aniB(parentCanvas) {
      console.log("in ani-B -teamC");
    
  }
  /****************ANI C ************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN C INSIDE HERE */
  /****************ANI C************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:)
   * 1: use the PROVIDED keyup/down callbacks `windowKeyDownRef` and/or `windowKeyUpnRef` to handle keyboard events
   * 2: create an interactive pattern/sketch based on keyboard input. Anything goes.
   * 
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/

  /* TASK: make an interactive pattern .. colors, shapes, sizes, text, images....
   * using  ONLY key down and/or keyup -- any keys::
   */

  function aniC(parentCanvas) {
      console.log("in ani-C -teamC");

    /*** THIS IS THE CALLBACK FOR KEY DOWN (* DO NOT CHANGE THE NAME *..) */
    windowKeyDownRef = function (e) {
      //code for key down in here
      console.log(e);
      console.log("c-down");
    };

    /*** THIS IS THE CALLBACK FOR KEY UP (*DO NOT CHANGE THE NAME..) */
    windowKeyUpRef = function (e) {
      console.log(e);
      console.log("c-up");
    };
    //DO NOT REMOVE
    window.addEventListener("keydown", windowKeyDownRef);
    window.addEventListener("keyup", windowKeyUpRef);
  }

   /****************ANI D************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN D INSIDE HERE */
  /****************ANI D************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:).
   * 1: create a creative, visual pattern using text, divs as shapes, images ...
   * 2: add in animation using requestAnimationFrame somewhere to make the sketch animate :)
   *
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/
   function aniD(parentCanvas) {
    console.log("in ani-D -teamC");
    }
}
   