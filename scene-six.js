var SceneSix = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "SceneSix" });
    },
    init: function(data) {
    //  this.message = data.message;
    },

    preload: function() {
      this.load.image('sky', 'assets/Sewer.png');
      this.load.image('ground', 'assets/RockyPlat.png');
      this.load.image('star', 'assets/syringe.png');
      this.load.spritesheet('dude', 'assets/spritesheet.png', { frameWidth: 250, frameHeight: 340 }); // skal kanskkje være 340
      this.load.image('block', 'assets/blackbox.png');
      this.load.image('square', 'assets/block.png');
      this.load.image('upplat', 'assets/upplat.png');
      this.load.image('enemy', 'assets/bomb.png');
      this.load.image('goalpost', 'assets/goalpost.png');
    },
    create: function() {
      this.cameras.main.setBackgroundColor('#ccccff');
      let background = this.add.image( this.cameras.main.width/2, this.cameras.main.height/2, 'sky');
      let scaleX = this.cameras.main.width / background.width
      let scaleY = this.cameras.main.height / background.height
      let scale = Math.max(scaleX, scaleY)
      background.setScale(scale)
      background.setScrollFactor(0);

       this.startlevel = true;
       this.irrelevanttime = 0;


      let boundariesW = 2000
      let boundariesH = 2000



        platforms = this.physics.add.staticGroup();


        for(var j = 50; j < 2000; j +=100){
        for (var i = 0; i < 2000; i +=100)
    {

    if(((i === 800 || i===900)&& j === 150) || (i=== 900)&& (j===250 || j===350 || j===450 || j === 550)){ }
    else if (i===1000 && (j ===550 || j ===650)){}
    else if (i===900 && (j ===650)){}
    else if (i===1100 && (j === 650||j === 750 || j === 850 ||j ===950 ||j === 1050 || j === 1150 )){}
    else if (i===1200 && ( j === 850 || j === 950 || j === 1050|| j === 1150|| j === 1250 || j === 1350 || j === 1450 || j === 1550)){}
    else if ((i===1300 || i === 1400 || i === 1500 || i === 1600 || i === 1700 || i === 1800)&& ( j === 950 )){} //lag en melding 1800 950
    else if ((i===1300 || i === 1400 || i === 1500 || i === 1600 || i === 1700 || i === 1800)&& ( j === 1550 )){}
    else if (i===1400 && (  j === 1650 || j ===1750 || j ===1850)){}
    else if ((i=== 900 ||i=== 1000 ||i=== 1100 || i=== 1200 || i===1300 || i === 1400 || i === 1500 || i === 1600 || i === 1700 || i === 1800)&& ( j === 1850 )){}


    //Overordnet kode suger skikkelig. Men jeg orker virkelig ikke å finne en bedre løsning.


    else{
      platforms.create(j, i, 'square').setScale(1).refreshBody();
}

  }}

    goalpost = this.physics.add.staticGroup();
    scoreText = this.add.text(16, 16, 'ANUS: ', { fontSize: '32px', fill: '#FFF', backgroundColor: '#000' })

  scoreText.setScrollFactor(0) //sørger for at teksten følger kamera


    goalpost.create(1850, 900, 'goalpost').setScale(1,1).refreshBody();

    //    platforms.create(700,500 , 'upplat').setScale(0.25,0.25).refreshBody();

        danger = this.physics.add.staticGroup();
        danger.create(0,300 , 'ground').setScale(40,1).refreshBody();
        danger.setTint(0xff0000);


      //  platforms.create(500, 455, 'ground').setScale(0.5,5).refreshBody();
      //platforms.create(800, 555, 'ground').setScale(1,1).refreshBody();

      //  platforms.create(1250, 700, 'upplat').setScale(0.25,0.25).refreshBody();
      //  platforms.create(1800, 700, 'upplat').setScale(0.25,0.25).refreshBody();

      //  platforms.create(1600, 0, 'ground').setScale(2,1).refreshBody();
      //  platforms.create(1250, -100, 'upplat').setScale(0.25,0.25).refreshBody();



      //  this.add.text(650, 550, 'Try S', { fontSize: '32px', fill: '#FFF' })



        player = this.physics.add.sprite(120, 800, 'dude').setScale(0.15,0.15)
        player.setBounce(0);
        player.setCollideWorldBounds(true);
        player.body.onWorldBounds = true;
        player.setOrigin(0.5,0.5)
        //this.player.anchor.setTo(0.5)

        test2 = this.add.text(16, 200, 'FINN UTGANGEN INNEN 30 SEKUNDER ', { fontSize: '32px', fill: '#FFF', backgroundColor: '#000' })
        test2.setScrollFactor(0) //sørger for at teksten følger kamera
        //player.flipX = false;


        this.physics.world.bounds.width = boundariesW;
        this.physics.world.bounds.height = boundariesH;

      //  this.physics.world.bounds.height = 300;
        this.cameras.main.setBounds(0, 0, boundariesW, boundariesH);
        this.cameras.main.startFollow(player);


        cursors = this.input.keyboard.createCursorKeys();

        stars = this.physics.add.group({
            key: 'star',
            setXY: { x: 100, y: 0 }
        });

        this.physics.add.collider(player, platforms);
      //  this.physics.add.collider(player, danger);
        this.physics.add.collider(stars, platforms);

      //  this.physics.add.overlap(player, stars, collectStar, null, this);

        this.physics.add.overlap(player, danger, hit, null, this);

     this.physics.add.overlap(player, goalpost,  lastlevel, null, this);


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
      if (this.startlevel === true){
         this.irrelevanttime = time
        this.startlevel = false
      }

      scoreText.setText("Time " + Math.round((time-this.irrelevanttime)/1000))
      if(Math.round((time-this.irrelevanttime)/1000)> 5){
        test2.setText("")}
      controlscheme(time);
      gravityrush(this)

    player.body.world.on('worldbounds', function(body) {
    // Check if the body's game object is the sprite you are listening for
    if (body.gameObject === this) {
    // Stop physics and render updates for this object
    this.setActive(false);
    this.setVisible(false);
      hit();
    }
    }, player);
    }
    });
