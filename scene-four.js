var SceneFour = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "SceneFour" });
    },
    init: function(data) {
  //  this.message = data.message;
},

    preload: function() {
      this.load.image('sky', 'assets/Back2.png');
      this.load.image('ground', 'assets/RockyPlat.png');
      this.load.image('star', 'assets/syringe.png');
      this.load.spritesheet('dude', 'assets/spritesheet.png', { frameWidth: 250, frameHeight: 340 }); // skal kanskkje være 340
      this.load.image('block', 'assets/blackbox.png');
      this.load.image('upplat', 'assets/upplat.png');
      this.load.image('enemy', 'assets/bomb.png');
      this.load.image('hospital', 'assets/hospital.png');
    },
    create: function() {
      this.cameras.main.setBackgroundColor('#ccccff');
      let background = this.add.image( this.cameras.main.width/2, this.cameras.main.height/2, 'hospital');
      let scaleX = this.cameras.main.width / background.width
      let scaleY = this.cameras.main.height / background.height
      let scale = Math.max(scaleX, scaleY)
      background.setScale(scale)
      background.setScrollFactor(0);

      let boundariesW = 2000


        platforms = this.physics.add.staticGroup();
        platforms.create(200, 520, 'ground').setScale(1,1).refreshBody();
        platforms.create(650, 520, 'ground').setScale(1,1).refreshBody();
        platforms.create(750, 200, 'ground').setScale(1,1).refreshBody();
        platforms.create(200, 200, 'ground').setScale(1,1).refreshBody();
        platforms.create(950, 690, 'upplat').setScale(0.25,0.25).refreshBody();
        platforms.create(1100, 660, 'upplat').setScale(0.25,0.25).refreshBody();
        platforms.create(1250, 630, 'upplat').setScale(0.25,0.25).refreshBody();
        platforms.create(1400, 600, 'upplat').setScale(0.25,0.25).refreshBody();


      //  platforms.create(500, 455, 'ground').setScale(0.5,5).refreshBody();
        //platforms.create(800, 555, 'ground').setScale(1,1).refreshBody();
      //  platforms.create(1000, 700, 'upplat').setScale(0.25,0.25).refreshBody();
      //  platforms.create(1250, 700, 'upplat').setScale(0.25,0.25).refreshBody();
      //  platforms.create(1800, 700, 'upplat').setScale(0.25,0.25).refreshBody();

      //  platforms.create(1600, 0, 'ground').setScale(2,1).refreshBody();
      //  platforms.create(1250, -100, 'upplat').setScale(0.25,0.25).refreshBody();

        this.add.text(0, 550, 'mmdmwad "up" to jump or use your momentum...', { fontSize: '16px', fill: '#FFF' })


        player = this.physics.add.sprite(100, 475, 'dude').setScale(0.15,0.15)
        player.setBounce(0);
        player.setCollideWorldBounds(true);
        player.body.onWorldBounds = true;
        player.setOrigin(0.5,0.5)
        //this.player.anchor.setTo(0.5)

        //player.flipX = false;


        this.physics.world.bounds.width = boundariesW;
      //  this.physics.world.bounds.height = 300;
        this.cameras.main.setBounds(0, 0, boundariesW, 600);
        this.cameras.main.startFollow(player);


        cursors = this.input.keyboard.createCursorKeys();

        stars = this.physics.add.group({
            key: 'star',
            setXY: { x: 100, y: 0 }
        });

        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);

        this.physics.add.overlap(player, stars, collectStar, null, this);

        //this.physics.add.overlap(player, enemy, enemyhit, null, this);


        let block = this.physics.add.image(1500, 400, 'ground')
          .setScale(0.1,1)
          .setImmovable(true)
        block.body.setAllowGravity(false)//sørger for at "block" ikke faller nedover

        this.tweens.timeline({
          targets: block.body.velocity,
          loop: -1,
          tweens: [
          { x:   0, y:    -50, duration: 4000, ease: 'Stepped' },
          { x:   0, y:    0, duration: 1000, ease: 'Stepped' },
          { x:    -100, y:    0, duration: 4000, ease: 'Stepped' },
          { x:   0, y:    0, duration: 1000, ease: 'Stepped' },
          { x:    100, y:    0, duration: 4000, ease: 'Stepped' },
          { x:   0, y:    0, duration: 1000, ease: 'Stepped' },
          { x:    0, y:    50, duration: 4000, ease: 'Stepped' },
          { x:   0, y:    0, duration: 1000, ease: 'Stepped' },




          ]
        })
          this.physics.add.collider(block, player);
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 1, end: 4 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 0 } ],
            frameRate: 20
        });


        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 1, end: 4 }),
            frameRate: 10,
              //  duration: 1000,
            repeat: -1
        });
        this.anims.create({
            key: 'testright',
            frames: this.anims.generateFrameNumbers('dude', { start: 1, end: 4 }),
            frameRate: 10,
              //  duration: 1000,
            repeat: -1
        });

        this.anims.create({
            key: 'dashed',
              frames: [ { key: 'dude', frame: 5 } ],
            frameRate: 20,

        });
        this.anims.create({
            key: 'dashed-side',
            frames: this.anims.generateFrameNumbers('dude', { start: 6, end: 9 }),
            frameRate: 10,
            repeat: -1

        })
        this.test = block
        this.defGravity = 0

    },
    update: function(time) {


      controlscheme(time);
    //  gravityrush(this)

player.body.world.on('worldbounds', function(body) {
  // Check if the body's game object is the sprite you are listening for
  if (body.gameObject === this) {
    // Stop physics and render updates for this object
    this.setActive(false);
    this.setVisible(false);
    this.scene.start("SceneSix")
  }
}, player);
    }
});
