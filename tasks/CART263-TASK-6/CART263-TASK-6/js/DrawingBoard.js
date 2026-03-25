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
    if(this.drawingBoardId ==="partB"){
      this.initAudio();
    }
    if(this.drawingBoardId ==="partC"){
      console.log("in C")
    }
    if(this.drawingBoardId ==="partD"){
      console.log("in D")
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
      const r = low;    // bass → red
      const g = volume; // loudness → green
      const b = high;   // treble → blue
    
      obj.fill_color = `rgb(${r}, ${g}, ${b})`;
    }

    requestAnimationFrame(loop);
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
      console.log("in C")
    }
    if(this.drawingBoardId ==="partD"){
      console.log("in D")
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
