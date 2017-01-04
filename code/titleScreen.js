var titleScreen = function(game){
	console.log('%cGAME TITLE SCREEN LOADED', 'color:#fff;background:#00f;');
};

titleScreen.prototype = {
	preload: function(){
		
	},
	create: function(){

		var emitter = this.add.emitter(this.world.centerX, 0, 150);

		emitter.width = this.world.width;
		emitter.makeParticles('star');
		emitter.minParticleScale = 0.1;
		emitter.maxParticleScale = 0.5;
		emitter.setYSpeed(100, 500);
		emitter.setXSpeed(-5, 5);
		emitter.minRotation = 0;
		emitter.maxRotation = 0;

		emitter.start(false, 1200, 2, 0);

		// logo = this.add.sprite(0, 0, 'logo');
		// logo.alpha = 0;
		// this.add.tween(logo).to({ alpha: 1}, 8000, Phaser.Easing.Linear.None, true, 3, 0, false);
		
		var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, '- START -');
		
		text.anchor.set(0.5);
		text.align = 'center';
		
		text.font = 'Impact';
		text.fontSize = 48;
		text.fontWeight = 'bold';

		text.stroke = '#0066ff';
		text.strokeThickness = 25;
		text.fill = '#00ff00';

		text.inputEnabled = true;
		text.events.onInputDown.add(this.startGame, this);

		var creditsLink = this.game.add.text(this.game.world.centerX, this.game.world.centerY+75, '- CREDITS -');
		
		creditsLink.anchor.set(0.5);
		creditsLink.align = 'center';
		
		creditsLink.font = 'Impact';
		creditsLink.fontSize = 48;
		creditsLink.fontWeight = 'bold';

		creditsLink.stroke = '#0066ff';
		creditsLink.strokeThickness = 25;
		creditsLink.fill = '#00ff00';

		creditsLink.inputEnabled = true;
		creditsLink.events.onInputDown.add(this.viewCredits, this);

		//backgroundMusic = this.add.audio('music', 4, true, true);
		//backgroundMusic.play();
	},
	startGame: function(){
		this.game.state.start('BulkHead');
	},
	viewCredits : function(){
		this.game.state.start('Credits');
	}	
}