var boot = function(game){
	console.log('%cBOOT SEQUENCE INITIATED', 'color:#fff;background:#0f0;');
}
boot.prototype = {
	preload: function(){
		//preload the loading image
		this.game.load.image('loading', 'img/loading.png');
	},
	create: function(){
		// this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
		// this.scale.pageAlignHorizontally = true;
		// this.scale.pageAlignVertically = true;
		// this.scale.setScreenSize();
		this.game.state.start('Preload');
	}
}