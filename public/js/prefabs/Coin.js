var Hallucination = Hallucination || {};

Hallucination.Coin = function(game, x, y, key) {
	Phaser.Sprite.call(this, game, x, y, key);

  game.physics.arcade.enable(this);
  //this.animations.add('spin', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 13, true);
  //this.play('spin');
}

Hallucination.Coin.prototype = Object.create(Phaser.Sprite.prototype);
Hallucination.Coin.prototype.constructor = Hallucination.Coin;

Hallucination.Coin.prototype.update = function() {
  if(this.inCamera){
    this.play('spin');
  }else{
    this.animations.stop();
  }
};

// Hallucination.Coin.prototype.damage = function(amount) {
//   this.play('getHit');
//   this.health -= amount;

//   if(this.health <= 0) {
//     var emitter = this.game.add.emitter(this.x, this.y, 100);
//     emitter.makeParticles('CoinParticle')
//     emitter.minParticleSpeed.setTo(-200, -200);
//     emitter.maxParticleSpeed.setTo(200, 200);
//     emitter.gravity = 0;
//     emitter.start(true, 500, null, 100);
//     this.kill()
//   }
// };

