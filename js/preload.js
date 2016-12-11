var preload = function(game){
	console.log('%cPRELOADING...', 'color:#fff;background:#0f0;');
}

preload.prototype = {
	preload: function(){
		var loadImage = this.add.sprite(this.world.centerX,this.world.centerY,'loading');
		loadImage.anchor.setTo(0.5,0.5);
		loadImage.scale.set(5);
		this.load.setPreloadSprite(loadImage);

		//TITLE ASSETS
		this.game.load.image('logo','img/logo-miniversal.png');
		
		this.game.load.image('galaxy', 'img/sprite-galaxy-bg.jpg');
		this.game.load.image('asteroids', 'img/asteroids.png');

		this.game.load.spritesheet('star', 'img/star.png', 17, 17);

		//DEBRIS
		this.load.spritesheet('debris01', 'img/debris01.gif', 75 ,68, 23);
		
		//GAME ASSETS
		// this.load.audio('beamSound', 'audio/beam3.mp3');
  //       this.load.audio('explosion', 'audio/explosion2.mp3');
  //       this.load.audio('music', 'audio/source.mp3');
        
        //this.load.image('background','img/bg-mountain-y-01.png');
        this.load.image('bullet', 'img/bullet.png'); 
        //this.load.image('friend', 'img/sprite-friend.png');
        this.load.spritesheet('ship','img/frog5-scaled.png', 200, 101, 2);
        this.load.image('turret', 'img/turret.png');
        // this.load.spritesheet('alien', 'img/sprite-enemy-1.png', 34, 44, 2);
        // this.load.spritesheet('abductor', 'img/sprite-enemy-retro.png', 25, 25, 2);
        // this.load.spritesheet('ufo', 'img/sprite-enemy-ufo.png', 75, 25, 2);
        // this.load.spritesheet('explosion', 'img/explode.png', 128, 128);
	},
	create: function(){
		this.game.state.start('TitleScreen');
	}
}