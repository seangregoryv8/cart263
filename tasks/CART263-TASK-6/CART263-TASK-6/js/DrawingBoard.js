class DrawingBoard {
  /* Constructor */
  constructor(canvas, context,drawingBoardId) {
    this.canvas = canvas;
    this.context = context;
    this.objectsOnCanvas = [];
    let self = this;
    this.drawingBoardId = drawingBoardId;
    //each element has a mouse clicked and a mouse over
    this.canvas.addEventListener("click", function (e) {
      self.clickCanvas(e);
    });

    this.canvas.addEventListener("mousemove", function (e) {
      self.overCanvas(e);
    });
    this.canvas.setAttribute("tabindex", "0");

    this.canvas.addEventListener("keydown", (e) => {
      console.log(e.key);
    
      if (e.key === "q") this.objectsOnCanvas.pop();
      if (e.key === "e")
      {
        for (let obj of this.objectsOnCanvas)
        {
          obj.x = this.ranInt(0, 400);
          obj.y = this.ranInt(0, 300);
        }
      }

      if (this.drawingBoardId == "partB")
      {
        let o = this.objectsOnCanvas[0]
        if (e.key === "d") o.x += 2;
        if (e.key === "a") o.x -= 2;
        if (e.key === "w") o.y -= 2;
        if (e.key === "s") o.y += 2;
      }
    });

    this.prevX = 0;
    this.prevY = 0;
    this.prevTime = 0;
    this.speed = 0;
    this.direction =
    {
      x: 0, y: 0
    };

    this.isActive = false;
    this.canvas.addEventListener("focus", () => {
      this.isActive = true;
      if (this.audioContext) this.audioContext.resume();
    });
    
    this.canvas.addEventListener("blur", () => {
      this.isActive = false;
      if (this.audioContext) this.audioContext.suspend();
    });

    this.audioInitiated = false;
  }

  updateMouseHistory(e)
  {
    const currentX = e.clientX - this.canvasBoundingRegion.x;
    const currentY = e.clientY - this.canvasBoundingRegion.y;
    const currentTime = performance.now(); // high precision time
  
    if (this.prevTime !== 0) {
      const dx = currentX - this.prevX;
      const dy = currentY - this.prevY;
      const dt = currentTime - this.prevTime;
  
      this.speed = Math.sqrt(dx * dx + dy * dy) / dt; // pixels per ms
      this.direction = {
        x: dx / dt,
        y: dy / dt
      };
    }
  
    // update previous values
    this.prevX = currentX;
    this.prevY = currentY;
    this.prevTime = currentTime;
  }

  overCanvas(e)
  {
    //console.log("over");
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.updateMouseHistory(e);
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);

    //differentiate which canvas
    //you can remove the console.logs /// 
    if(this.drawingBoardId ==="partA")
    {
      for (let obj of this.objectsOnCanvas)
      {
        obj.speed.x = this.speed * this.direction.x;
        obj.speed.y = this.speed * this.direction.y;
      }
    }
    if(this.drawingBoardId === "partB"){
      this.initAudio();
    }
    if(this.drawingBoardId ==="partC"){
      this.initAudio();
    }
    if(this.drawingBoardId ==="partD"){
      this.objectsOnCanvas[0].updatePositionRect(this.mouseOffsetX, this.mouseOffsetY);
   }
  }

  async initAudio() {
    if (this.audioInitialized) return;
  
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  
      this.audioContext = new AudioContext();
      const mic = this.audioContext.createMediaStreamSource(stream);
  
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 1024;
  
      mic.connect(this.analyser);
  
      this.audioInitialized = true;
  
      this.processAudio(); // start loop
    } catch (err) {
      console.log("Mic error:", err);
    }
  }
  processAudio() {
    const data = new Uint8Array(this.analyser.frequencyBinCount);
  
    const loop = () => {
      this.analyser.getByteFrequencyData(data);
  
      if (this.isActive) { // <-- only update objects if canvas is focused
        let sum = 0;
        for (let i = 0; i < data.length; i++) sum += data[i];
        const volume = sum / data.length;
  
        let low = 0, high = 0;
        for (let i = 0; i < data.length; i++) {
          if (i < data.length / 2) low += data[i];
          else high += data[i];
        }
  
        low /= data.length / 2;
        high /= data.length / 2;
  
        for (let obj of this.objectsOnCanvas) {
          if (this.drawingBoardId === "partB") {
            obj.width = 50 + (volume / 255) * 150;
            obj.height = 50 + (volume / 255) * 150;
  
            obj.x = 200 + (high / 255) * this.canvas.width;
            obj.y = 150 + (high / 255) * this.canvas.height;
  
            const hue = (low / 255) * 360;
            obj.fill_color = `hsl(${hue}, 80%, 50%)`;
          }
  
          if (this.drawingBoardId === "partC") {
            obj.angularSpeed = 0.05 + 0.05 * Math.sin(volume * 0.5);
            obj.hueShift = 10 * Math.sin(volume * 0.3);
            const currentHue = obj.baseHue + obj.hueShift;
            obj.fill_color = `hsl(${currentHue}, ${obj.baseSaturation}%, ${obj.baseLightness}%)`;
          }
        }
      }
  
      requestAnimationFrame(loop); // always looping, but only updating when focused
    };
  
    loop();
  }

  clickCanvas(e) {
   // console.log("clicked");
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);
    //console.log(this.mouseOffsetX, this.mouseOffsetY);
     
    //differentiate which canvas
   //you can remove the console.logs /// 
     if(this.drawingBoardId === "partA"){
      this.addObj(new CircularObj(this.ranInt(0, 400), this.ranInt(0, 300), this.ranInt(10, 40),this.getRandomColor(), this.getRandomColor(), this.context))
    }
    if(this.drawingBoardId ==="partB"){
      this.processAudio();
    }
    if(this.drawingBoardId ==="partC"){
      this.processAudio();
    }
    if(this.drawingBoardId ==="partD"){
      this.objectsOnCanvas[0].changeColor(this.getRandomColor());
    }
  }
  /* method to add obj to canvas */
  addObj(objToAdd) {
    this.objectsOnCanvas.push(objToAdd);
  }

  /* method to add display objects on canvas */
  display() {
    for (let obj of this.objectsOnCanvas) {
      obj.display();
    }
  }

  /* method to add animate objects on canvas */
  animate() {
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height)
    for (let obj of this.objectsOnCanvas) {
     obj.update();
     obj.display();
    }
  }

  run(videoElement){
    for (let obj of this.objectsOnCanvas) {
      obj.update(videoElement);
      obj.display();
    }

  }
  ranInt(min, max)
  {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
