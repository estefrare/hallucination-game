var Hallucination = Hallucination || {};

Hallucination.GameState = {
    init: function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1000;
        
        this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    },
    preload: function() {
        //tilemap
        this.load.tilemap('map', 'assets/tilemaps/maps/map.csv', null, Phaser.Tilemap.TILED_JSON);
        //audios
        this.load.audio('music', ['assets/audios/music.ogg']);
        this.load.audio('fly', ['assets/audios/01.ogg']);
        this.load.audio('pikedCoin', ['assets/audios/coin.ogg']);
        //background
        this.load.image('sky', 'assets/images/sky.png');
        this.load.image('mountain', 'assets/images/mountain.png');
        //image
        this.game.load.image('tiles1', 'assets/tilemaps/tiles/tiles1.png');
        //spritesheet
        this.load.spritesheet('enemi', 'assets/sprites/enemis.png', 32, 32);
        this.load.spritesheet('enemi2', 'assets/sprites/enemis2.png', 32, 32);
        this.load.spritesheet('coin', 'assets/sprites/coin.png', 32, 32);
        this.load.spritesheet('sun', 'assets/sprites/sun.png', 32, 32);
        this.load.spritesheet('player', 'assets/sprites/player2.png', 66, 92, 16);
        this.modePlayer = 'normal';
    },
    create: function() {
        this.stage.backgroundColor = "#a3cff0";
        //moving stars background
        //sky
        this.sky = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'sky');
        this.sky.autoScroll(-10, 0);
        this.sky.fixedToCamera = true;
        //map
        this.map = this.game.add.tilemap('map');
        //tiles
        this.map.addTilesetImage('tiles1');
        //music
        this.music = this.game.add.audio('music');
        this.pikedCoinMusic = this.game.add.audio('pikedCoin');
        this.flyMusic = this.game.add.audio('fly');
        //this.music.play();
        this.map.setCollisionBetween(1, 500);
        //player
        this.initPlayer();
        //layer
        this.layer = this.map.createLayer('Tile Layer 1');
        this.layer.resizeWorld();
        //coins
        this.coins = this.game.add.group();
        this.coins.enableBody = true;
        // //suns
        this.suns = this.game.add.group();
        this.suns.enableBody = true;
        //enemis
        this.enemis = this.game.add.group();
        this.enemis.enableBody = true;
        // this.enemy = new Hallucination.Enemy(this.game, 'enemi', 3);
        //this.enemies.add(this.enemy);

        //  And now we convert all of the Tiled objects with an ID of 34 into sprites within the coins group
        this.map.createFromObjects('Object Layer 1', 1, 'coin', 0, true, false, this.coins, Hallucination.Coin);
        this.map.createFromObjects('Object Layer 1', 21, 'sun', 0, true, false, this.suns);
        this.map.createFromObjects('Object Layer 1', 49, 'enemi', 0, true, false, this.enemis, Hallucination.Enemy);
        this.map.createFromObjects('Object Layer 1', 67, 'enemi2', 0, true, false, this.enemis, Hallucination.Enemy);

        //this.coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 13, true);
        //this.coins.callAll('animations.play', 'animations', 'spin');
        this.coins.setAll('body.allowGravity', false);

        this.suns.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1], 8, true);
        this.suns.callAll('animations.play', 'animations', 'spin');
        this.suns.setAll('body.allowGravity', false);
        this.suns.setAll('body.setSize', 5, 5, 5, 5);

        //player
        this.game.camera.follow(this.player);
        this.player.play('jump');
        //text
        this.style1 = { 
            font: "bold 32px Arial", 
            fill: "#fff", 
            boundsAlignH: "center", 
            boundsAlignV: "middle",
        };
        this.scoreText = this.game.add.text(10, 10, "Score: "+this.player.score.toString(), this.style1);
        this.scoreText.fixedToCamera = true;

        this.style2 = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        this.gameOverText = this.game.add.text(600, this.game.world.centerY-50, 'Game Over', this.style);
        this.gameOverText.visible = false;
        this.gameOverText.fixedToCamera = true;
    },
    update: function() {
        this.game.physics.arcade.collide(this.player, this.layer, this.collidePlayerLayer, null, this);
        this.game.physics.arcade.collide(this.enemis, this.layer, this.collideEnemiLayer, null, this);
        this.game.physics.arcade.overlap(this.player, this.enemis, this.collidePlayerEnemi, null, this);
        this.game.physics.arcade.overlap(this.player, this.coins, this.collectCoin, null, this);
        this.game.physics.arcade.overlap(this.player, this.suns, this.collectSun, null, this);
        

        if(this.modePlayer =='super'){
            //move up
            this.player.body.setSize(20, 48, 20, 33);
            if(this.upKey.isDown){
                this.player.scale.setTo(1, 1);
                this.player.frame = 0;
                this.player.body.velocity.y = -200;
                this.player.angle = 10;
            }
            this.player.body.velocity.x = 250; 
            this.stage.backgroundColor = "#cf747e";
        }else if(this.modePlayer == 'normal'){
            this.stage.backgroundColor = "#a3cff0";
            //down
            if(this.downKey.isDown){
                this.player.frame = 12;
                this.player.body.setSize(30, 58, 20, 33);
                if(this.player.body.velocity.x != 0){
                    if(this.player.body.velocity.x > 0){
                        this.player.body.velocity.x -= 2;
                    }else if(this.player.body.velocity.x < 0){
                        this.player.body.velocity.x += 2;
                    }
                }
            }else{
                this.player.body.setSize(25, 78, 20, 13);
                //move left
                if(this.leftKey.isDown) {
                    this.player.scale.setTo(-1, 1);
                    this.player.body.velocity.x = -180;                
                    if(this.player.animations.currentAnim.isFinished){
                       this.player.play('runing');
                    }
                //move right    
                }else if(this.rightKey.isDown) {
                    this.player.scale.setTo(1, 1);
                    this.player.body.velocity.x = +180;
                    if(this.player.animations.currentAnim.isFinished){
                       this.player.play('runing');
                    }
                }else{
                    this.player.body.velocity.x = 0;
                    this.player.animations.stop();
                }
                //up
                if(this.upKey.isDown && this.player.body.velocity.y == 0){
                    this.player.body.velocity.y = -550;
                    this.player.play('jump');
                }
            }
            //return normal frame
            if(this.downKey.isUp && this.player.animations.currentAnim.isFinished){
                this.player.frame = 0;
            }    
        }
    },
    render: function() {

        // this.game.debug.body(this.player);
        // call renderGroup on each of the alive members    
        // this.enemis.forEachAlive(renderGroup, this);
        // function renderGroup(member) {
        //     this.game.debug.body(member);
        // }
    },
    initPlayer: function(){
        this.players = this.add.group();
        this.players.enableBody = true;
        
        var player = new Hallucination.Player(this.game, 100, 100, 'player', 100);
        this.players.add(player); 
        this.player = this.players.getFirstExists(true);
    },
    collidePlayerLayer: function(player, layer){
        if(layer.index == 38){ //38 is water
            player.body.checkCollision.down = false;
        }       
    },
    collidePlayerEnemi: function(player, enemi){
        if(player.body.touching.down/* && enemi.body.touching.up*/){
            enemi.frame = 2;
            enemi.animations.stop();
            enemi.body.velocity.x = 0;
            enemi.health = 0;
        }else{
            if(enemi.health > 0){
                this.player.damage(10);
            } 
        }   
    },
    collideEnemiLayer: function(enemi, layer){
        if(layer.index == 31 || layer.index == 33 || layer.index == 45 || layer.index == 44){
            enemi.body.velocity.x = 0;
        }
    },
    killEnemi: function(enemi){
        enemi.kill();
    },
    collectCoin: function(player, coin) {
        coin.kill();
        this.player.score += 1;
        this.scoreText.text = 'Score: '+this.player.score.toString();
        //this.pikedCoinMusic.play();
    }, 
    collectSun: function(player, sun){
        sun.kill();
        this.modePlayer = 'super';
        //this.flyMusic.play();
        this.music.pause();
        setTimeout(this.changeMode.bind(this), 6000);
    },
    changeMode: function(){
        if(this.modePlayer == 'super'){
            this.modePlayer = 'normal';
            this.player.angle = 0;
            this.flyMusic.stop();
            //this.music.play();
        }else if(this.modePlayer == 'normal'){
            this.modePlayer = 'super';
        }
    }
}

