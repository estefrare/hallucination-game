var Hallucination = Hallucination || {};

//initiate the Phaser framework
Hallucination.game = new Phaser.Game('100%', '100%', Phaser.AUTO);

Hallucination.game.state.add('GameState', Hallucination.GameState);
Hallucination.game.state.start('GameState');  