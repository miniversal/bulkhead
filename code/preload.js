var preload = function(game){
	console.log('%cPRELOADING...', 'color:#fff;background:#0f0;');
}

preload.prototype = {
	preload: function(){
		var loadImage = this.add.sprite(this.world.centerX,this.world.centerY,'loading');
		loadImage.anchor.setTo(0.5,0.5);
		loadImage.scale.set(5);
		this.load.setPreloadSprite(loadImage);
		this.game.load.image('logo','asset/img/logo-miniversal.png');
		this.game.load.image('galaxy', 'asset/img/sprite-galaxy-bg.jpg');
		this.game.load.image('asteroids', 'asset/img/asteroids.png');
		this.game.load.spritesheet('star', 'asset/img/star.png', 17, 17);
		// this.load.spritesheet('debris01', 'asset/img/debris01.gif', 75 ,68, 23);
		// this.load.tilemap('map', 'assets/tilemaps/maps/collision_test.json', null, Phaser.Tilemap.TILED_JSON);
		// this.load.image('ground_1x1', 'assets/tilemaps/tiles/ground_1x1.png');
		// this.load.image('walls_1x2', 'assets/tilemaps/tiles/walls_1x2.png');
		// this.load.image('tiles2', 'assets/tilemaps/tiles/tiles2.png');
		// this.load.audio('beamSound', 'audio/beam3.mp3');
		this.load.image('bullet', 'asset/img/weapon-beam-gr.png'); 
		this.load.spritesheet('ship','asset/img/frog.png', 128, 96, 4);
		this.load.spritesheet('turret', 'asset/img/turret.png', 282, 108, 2);
	},
	create: function(){
		this.game.state.start('TitleScreen');
	}
}