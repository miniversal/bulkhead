var credits = function(game){
	console.log('%cGAME CREDITS LOADED', 'color:#fff;background:#00f;');
};

credits.prototype = {
	preload: function(){
		
	},
	create: function(){

		logo = this.add.sprite(0, 0, 'logo');
		logo.alpha = 0;
		this.add.tween(logo).to({ alpha: 1}, 8000, Phaser.Easing.Linear.None, true, 3, 0, false);
		
		var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Developed By \n MINIVERSAL \n\n ');
		
		text.anchor.set(0.5);
		text.align = 'center';
		
		text.font = 'Verdana';
		text.fontSize = 22;
		

		// text.stroke = '#000000';
		// text.strokeThickness = 1;
		text.fill = '#00ff00';

		text.inputEnabled = true;
		text.events.onInputDown.add(this.goToTitle, this);

		//backgroundMusic = this.add.audio('music', 4, true, true);
		//backgroundMusic.play();
	},
	goToTitle: function(){
		this.game.state.start('TitleScreen');
	}	
}