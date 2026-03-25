class VideoObj {
  constructor(x, y, w, h, videoElement, context) {
    this.videoElement = videoElement;
    this.context = context;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.shapeX = 10;
    this.shapeY =10;
    this.shapeCol = "#000000";
 
 
    let fb = 
    {
      blur: document.getElementById("filter_button_blur"),
      sepia: document.getElementById("filter_button_sepia"),
      hue: document.getElementById("filter_button_hue"),
      invert: document.getElementById("filter_button_invert")
    }
    let imp = 
    {
      blur: document.getElementById("blurnum"),
      sepia: document.getElementById("sepianum"),
      hue: document.getElementById("huenum"),
      invert: document.getElementById("invertnum")
    }
    
    this.upBlur = 0;
    this.upSepia = 0;
    this.upHue = 0;
    this.upInvert = 0;
    let self = this;

    fb.blur.addEventListener("click", () => self.upBlur = imp.blur.value );
    fb.sepia.addEventListener("click", () => self.upSepia = imp.sepia.value );
    fb.hue.addEventListener("click", () => self.upHue = imp.hue.value );
    fb.invert.addEventListener("click", () => self.upInvert = imp.invert.value );
  }

  display() {
    this.context.save();
    this.context.filter = `blur(${this.upBlur}px)`
    this.context.filter += `sepia(${this.upSepia / 10})`
    this.context.filter += `hue-rotate(${this.upHue}deg)`
    this.context.filter += `invert(${this.upInvert / 10})`
    this.context.drawImage(this.videoElement, this.x, this.y, this.w, this.h);
    this.context.fillStyle = this.shapeCol;
    this.context.fillRect(this.shapeX, this.shapeY, 50,50)
    this.context.restore();
  }

    //called when rectangle color is to be updated
  changeColor(newCol){
    this.shapeCol = newCol;
  }
  //called when rectangle Pos is to be updated
  updatePositionRect(mx,my){
    this.shapeX = mx;
    this.shapeY = my;
  }
  update(videoElement) {
    this.videoElement = videoElement;
  }
}
