var Hallucination = Hallucination || {};

Hallucination.Player = function(game, x, y, key, health) {
	Phaser.Sprite.call(this, game, x, y, 'player');

	//this.game = game;
	game.physics.arcade.enable(this);
	this.anchor.setTo(0.5); 
	this.isJumping = false; 
	//reduce colliion area
	this.body.setSize(30, 78, 20, 13);
	this.body.collideWorldBounds = true;
	this.animations.add('runing', [0, 1, 2, 3, 4, 5], 14, false);  
	//this.animations.add('stop', [0, 1, 2, 3, 2, 1], 2, false);  
	this.animations.add('jump', [13, 12, 12, 6, 0], 5, false);  
	this.health = health;
	this.score = 0;
};

Hallucination.Player.prototype = Object.create(Phaser.Sprite.prototype);
Hallucination.Player.prototype.constructor = Hallucination.Player;

Hallucination.Player.prototype.update = function() {

	if(Hallucination.GameState.modePlayer == 'super'){
		if(this.angle <= 120 && this.angle >= 0){
			this.angle += 2;	
		}
	}
}

//   //kill if off world in the bottom
//   if(this.position.y > this.game.world.height) {
//     this.kill();
//   }
// };

// Hallucination.Player.prototype.damage = function(amount) {
//   Phaser.Sprite.prototype.damage.call(this, amount);
//   //play "getting hit" animation
//   this.play('getHit');

//   //particle explosion
//   if(this.health <= 0) {
//     var emitter = this.game.add.emitter(this.x, this.y, 100);
//     emitter.makeParticles('enemyParticle');
//     emitter.minParticleSpeed.setTo(-200, -200);
//     emitter.maxParticleSpeed.setTo(200, 200);
//     emitter.gravity = 0;
//     emitter.start(true, 500, null, 100);
//   }
// };

