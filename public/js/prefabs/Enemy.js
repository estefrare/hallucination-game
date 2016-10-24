var Hallucination = Hallucination || {};

Hallucination.Enemy = function(game, x, y, key, health) {
	Phaser.Sprite.call(this, game, x, y, key);

  game.physics.arcade.enable(this);
  this.properties(key);
  this.health = health;
  this.anchor.setTo(0.5);
}

Hallucination.Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Hallucination.Enemy.prototype.constructor = Hallucination.Enemy;

Hallucination.Enemy.prototype.update = function() {
  if(this.inCamera){
    if(this.frame == 2){
      this.body.velocity.x = 0;
      if(this.key == 'enemi2'){
        this.body.allowGravity = true;
      }
    }else{
      this.play('move');
      if(this.body.velocity.x == 0){
        this.body.velocity.x = this.speed * -1;
        this.speed = this.speed * -1;
        this.scale.x = this.scale.x * -1;
      }
    }
  }else{
    this.animations.stop();
  }
};

Hallucination.Enemy.prototype.properties = function(key) {
  if(key == 'enemi'){
    this.animations.add('move', [0, 1, 0, 1], 5, true);
    this.play('move');
    this.speed = -20;
    this.body.setSize(25, 18, 0, 15);
    this.body.velocity.x = this.speed;
    this.body.allowGravity = true;
  }else if(key == 'enemi2'){
    this.animations.add('move', [0, 1, 0, 1], 8, true);
    this.play('move');
    this.speed = -40;
    this.body.setSize(20, 10, 5, 20);
    this.body.velocity.x = this.speed;
    this.body.allowGravity = false;
  }
}

// Hallucination.Enemy.prototype.damage = function(amount) {
//   this.play('getHit');
//   this.health -= amount;

//   if(this.health <= 0) {
//     var emitter = this.game.add.emitter(this.x, this.y, 100);
//     emitter.makeParticles('enemyParticle')
//     emitter.minParticleSpeed.setTo(-200, -200);
//     emitter.maxParticleSpeed.setTo(200, 200);
//     emitter.gravity = 0;
//     emitter.start(true, 500, null, 100);
//     this.kill()
//   }
// };

