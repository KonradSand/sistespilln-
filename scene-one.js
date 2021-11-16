var SceneOne = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "SceneOne" });
    },
    init: function(data) {
  //  this.message = data.message;
  this.message = "Press 'space' to start Game"
},

    preload: function() { this.load.image('background', 'assets/newback2.png');
  this.load.image('tostart', 'assets/tostart.png')
  this.load.image('testing2', 'assets/newstart.png')
  this.load.image('testing3', 'assets/newstart2.png')
  this.load.audio('theme', [
        'assets/Audio/Life-Will-Change.ogg',
        'assets/Audio/Life-Will-Change.mp3'
    ]);


},
    create: function() {
     this.music = this.sound.add('theme');


     this.music.play();
     this.music.loop = true;
    // game.sound.mute = true
      this.add.image(400, 300, 'background')
      text = this.add.image(400, 300, 'testing2').setScale(0.5)
    text2 = this.add.image(400, 300, 'testing3').setScale(0.5)
      this.add.video(400, 300, 'intro');


    /*  var text = this.add.text(
     phaserConfig.width/2,
     phaserConfig.height/2,
    this.message,
     {
         fontSize: 25,
         color: "white",
         fontStyle: "bold" //husk koverwatch
     }
 ).setOrigin(0.5);
*/ // eksempel for å gjøre det med tekst i stedet for bilder

 this.time.addEvent({
     delay: 200,
     loop: true,
     callback: () => {
       if (text.alpha === 0){
         text.alpha = 1
         text2.alpha = 0
       }
       else{ text.alpha = 0;text2.alpha = 1 }

     }
 })


cursors = this.input.keyboard.createCursorKeys();

    },
    update: function() {

      if(cursors.space.isDown){ this.scene.start("SceneTwo")
    } //SceneFive egt

    }

});
