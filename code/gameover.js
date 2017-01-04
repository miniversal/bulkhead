var finalScore = 0;

var gameover = function(game){
	console.log('%cGAME OVER!', 'color:#fff;background:#f00;');
}

gameover.prototype = {
	init: function(score){
		finalScore = score;
		console.log(score);
	},
	preload: function(){

	},
	create: function(){
		this.camera.focusOnXY(this.world.centerX, this.world.centerY);
		backgroundMusic.fadeOut(5);
		// logo = this.add.sprite(0.5, 0.5, 'logo');
		// logo.alpha = 0;
		// this.add.tween(logo).to({ alpha: 1}, 8000, Phaser.Easing.Linear.None, true, 3, 0, false);

		endGameText = this.add.text(this.world.centerX, this.world.centerY, 'GAME OVER');

		endGameText.font = 'Impact';
		endGameText.fontSize = 48;
		endGameText.fontWeight = '600';
		endGameText.stroke = '#0066ff';
		endGameText.align = 'center';
		endGameText.strokeThickness = '5';
		endGameText.fill = '#00ff00';

	//       endScore = ' FINAL SCORE: ' + this.gamescore;
	//       finalScoreText = this.add.text(this.world.centerX, this.world.centerY + 100, endScore);
				
	//       finalScoreText.font = 'Impact';
	//       finalScoreText.fontSize = 48;
	//       finalScoreText.fontWeight = '600';
	//       finalScoreText.stroke = '#0066ff';
	//       finalScoreText.align = 'center';
	//       finalScoreText.strokeThickness = '5';
	//       finalScoreText.fill = '#00ff00';

	//       var playButton = this.game.add.button(this.world.centerX, this.world.centerY,'ship',this.startGame,this);
		// playButton.anchor.setTo(0.5,0.5);
	}
}