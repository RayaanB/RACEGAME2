class Game {
  constructor() {
    this.resetTitle = createElement('h2')
    this.resetButton = createButton("")

    this.leaderboardTitle = createElement('h2')
    this.leader1 = createElement('h2')
    this.leader2 = createElement('h2')

  }


  getState(){
    var gameStateRef = database.ref('gameState')
    gameStateRef.on("value",(data)=>{
    gameState = data.val();
    } )
  }

  updateState(state){
    database.ref('/').update({
      gameState:state
    })
  }

  start() {
    
    form = new Form();
    form.display();

    player = new Player();
    playerCount = player.getCount();

    car1 = createSprite (width/2 - 100, height - 100)
    car1.addImage(car1Img)
    car1.scale = 0.07

    car2 = createSprite (width/2 + 100, height - 100)
    car2.addImage(car2Img)
    car2.scale = 0.07

    cars = [car1, car2]
  }

  handleElements(){
    form.hide();
    form.titleImage.position(40, 50)
    form.titleImage.class("gameTitleAfterEffect")
    
    //creating reset title

    this.resetTitle.html("Reset Game")
    this.resetTitle.class("resetText")
    this.resetTitle.position(400,50)

    //creating reset button

    this.resetButton.class("resetButton")
    this.resetButton.position(450,50)

    //creating leaderboard Title

    this.leaderboardTitle.html("Leaderboard")
    this.leaderboardTitle.class("resetText")
    this.leaderboardTitle.position(500,50)

    //creating leaders

    this.leader1.class("leadersText")
    this.leader1.position(450,80)

    this.leader2.class("leadersText")
    this.leader2.position(450,110)
  }

  handleResetButton(){
    this.resetButton.mousePressed(()=>{
      database.ref('/').set({
        playerCount:0,
        gameState:0,
        player:{}
      })
      window.location.reload();
    })
  }

  showLeaderboard(){
    var leader1
    var leader2
    var players = Object.values(allPlayers)

    if((players[0].rank === 0 && players[1].rank === 0) || players[0].rank === 1
    ){
    leader1 = players[0].rank + "&emsp;" + players[0].name+ "&emsp;" + players[0].score
    leader2 = players[1].rank + "&emsp;" + players[1].name+ "&emsp;" + players[1].score
    }

    if( players[1].rank === 1
    ){
    leader2 = players[0].rank + "&emsp;" + players[0].name+ "&emsp;" + players[0].score
    leader1 = players[1].rank + "&emsp;" + players[1].name+ "&emsp;" + players[1].score
    }

    this.leader1.html(leader1)
    this.leader2.html(leader2)
  }

  play(){
    this.handleElements();
    Player.getPlayersInfo();

    if(allPlayers != undefined){
      image(trackImg, 0, -height*5, width, height*6)

      this.showLeaderboard();

      var index = 0
      for(var plr in allPlayers){
      index+=1

      var x = allPlayers[plr].positionX
      var y = height - allPlayers[plr].positionY

      cars[index-1].position.x = x
      cars[index-1].position.y = y

      //to check if it the active player
      if(index === player.index){
      fill("magenta")
      ellipse(x,y,60,60);

      //moving the camera allong with the active car
      camera.position.x = cars[index-1].position.x;
      camera.position.y = cars[index-1].position.y;


      }
      } 
      this.handlePlayerControl();
      drawSprites();
    }
  }

  handlePlayerControl(){
  if(keyIsDown(UP_ARROW)){
    player.positionY += 10
    player.update();
  }

  if(keyIsDown(LEFT_ARROW) && player.positiomX > width/3 - 50) {
    player.positionX -= 8
    player.update();
  }

  if(keyIsDown(RIGHT_ARROW) && player.positiomX < width/2 + 300) {
    player.positionX += 8
    player.update();
  }
  }
}

//gamestate =>
//0 = start (form)
//1 = play (race)
//2 = end (finish the race)
//oop - object oriented programmimg
//class = blueprint 
//objects