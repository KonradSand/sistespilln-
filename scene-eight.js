var SceneEight = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "SceneEight" });
    },
    init: function(data) {
  //  this.message = data.message;
  this.message = "Press 'space' to start Game"
},

    preload: function() { this.load.image('background', 'assets/backtest.png');
    this.load.image('newback', 'assets/Back2.jpg');
    this.load.image('newback2', 'assets/Back2.png')
  this.load.image('tostart', 'assets/tostart.png')
  this.load.image('newgame1', 'assets/newgame1.png')
  this.load.image('newgame2', 'assets/newgame2.png')
  this.load.image('selectlevel1', 'assets/soundon.png')


  this.load.image('soundon', 'assets/soundon.png')
  this.load.image('options1', 'assets/options1.png')
  this.load.image('options2', 'assets/options2.png')
  this.load.image('selected', 'assets/selectnew.png')
  this.load.image('selected2', 'assets/selectnew2.png')
  this.load.audio('theme', [
        'assets/Audio/Life-Will-Change.ogg',
        'assets/Audio/Life-Will-Change.mp3'
    ]);

},
    create: function() {
      this.selectposition = 0
       checktime = 0 ;

      this.press = false
      let background = this.add.image( this.cameras.main.width/2, this.cameras.main.height/2, 'newback2');
      let scaleX = this.cameras.main.width / background.width
      let scaleY = this.cameras.main.height / background.height
      let scale = Math.max(scaleX, scaleY)
      background.setScale(scale)
      background.setScrollFactor(0);
      xpos = 400
      ypos1 = 100
      ypos2 = 300
      this.select = [ypos1,ypos2]
      newgame1 = this.add.image(xpos, ypos1, 'newgame1').setScale(0.5)
      newgame2 = this.add.image(xpos, ypos1, 'newgame2').setScale(0.5)

      soundon = this.add.image(xpos, ypos2, 'soundon').setScale(0.5)


      selected = this.add.image(450, ypos1, 'selected').setScale(0.6)
      selected2 = this.add.image(450, ypos1, 'selected2').setScale(0.6)
      selected2.alpha = 0
      selected2.flipX = true
      selected.flipX = true




 this.time.addEvent({
     delay: 200,
     loop: true,
     callback: () => {
       if (newgame1.alpha === 0){
         newgame1.alpha = 1
         newgame2.alpha = 0






         selected.alpha = 0
         selected2.alpha = 1

       }
       else{
          newgame1.alpha = 0;
         newgame2.alpha = 1;


         selected.alpha = 1
         selected2.alpha =0
        }

     }
 })




cursors = this.input.keyboard.createCursorKeys();

    },
    update: function(time) {




      if(cursors.space.isDown && this.selectposition == 0 ){this.scene.start("SceneThree")}
      if(cursors.space.isDown && this.selectposition == 1 &&  time > checktime){
        checktime = time + 200
        if( game.sound.mute === true){

           game.sound.mute = false
        }
        else { game.sound.mute = true}


        }
      if(cursors.down.isDown && time > checktime){
         checktime = time + 200

        this.selectposition = this.selectposition +1
        selected.y = this.select[this.selectposition]
        selected2.y = this.select[this.selectposition]
        if(this.selectposition >=2){this.selectposition = 0
        selected.y = this.select[this.selectposition]
        selected2.y = this.select[this.selectposition]

      }


      }
      else if(cursors.up.isDown && time > checktime){
         checktime = time + 200

        this.selectposition = this.selectposition -1
        selected.y = this.select[this.selectposition]
        selected2.y = this.select[this.selectposition]
        if(this.selectposition <0){this.selectposition = 1
        selected.y = this.select[this.selectposition]
        selected2.y = this.select[this.selectposition]
      }
      }




    }

});
