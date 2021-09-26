class Form{
  constructor(){
    this.input = createInput("").attribute("placeholder", "Enter your Name")
    this.playButton = createButton("Play");
    this.titleImage = createImg("assets/title.png","game title");
    this.greeting = createElement("h2");
  }
 
  setElementPosition(){
    this.input.position(width/2 - 110, height/2 - 80);
    this.playButton.position(width/2 - 90, height/2 - 20);
    this.greeting.position(width/2 - 300, height/2 - 100);
    this.titleImage.position( 120, 50);
  }

  setElementStyle(){
    this.titleImage.class("gameTitle")
    this.input.class("customInput")
    this.playButton.class("customButton")
    this.greeting.class("greeting")
  }

  hide(){
    this.greeting.hide();
    this.input.hide();
    this.playButton.hide();
  }

  handleMousePressed(){
    this.playButton.mousePressed(()=>{
        this.input.hide();
        this.playButton.hide();
        var message = `
        Hello ${this.input.value()}
        </br>wait for another player to join...`;
        this.greeting.html(message);
        playerCount += 1
        //player name property = input given by the user
        player.name = this.input.value();
        player.index = playerCount
        player.addPlayer();
        player.updateCount(playerCount)
        player.getDistance();
    })
  }
  
  display(){
      this.setElementPosition();
      this.setElementStyle()
      this.handleMousePressed()
  }

}
//h1- h6 in decreasing order of size