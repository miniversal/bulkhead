var score = 0;
var lives = 3;
var shipSpeed = 300;       
var facing = 'right';
var playerGravity = 0;

var map;
var layer;

//Weapon Systems
var bullets = bullets;
var fireRate = 225;
var nextFire = 0;

var bulkhead = function(game){
	console.log('%cBULKHEAD LOADED', 'color:#fff;background:#00f;');
};

bulkhead.prototype = {
	preload: function(){
		
	},
	create: function(){
// GAME INIT
		this.physics.startSystem(Phaser.Physics.P2JS);
		//this.physics.startSystem(Phaser.Physics.ARCADE);
		this.stage.backgroundColor = '#000000';
		// this.scale.setScreenSize(true);
		bg = this.add.tileSprite(0, 0, 1920, 1920, 'galaxy');
		bg2 = this.add.tileSprite(600, 200, 640, 480, 'asteroids');
		bg2.anchor.setTo(0.5, 0.5);
		this.world.setBounds(0, 0, 1920, 600);

		// map = this.add.tilemap('map');
		// map.addTilesetImage('ground_1x1');
		// map.addTilesetImage('walls_1x2');
		// map.addTilesetImage('tiles2');
		// layer = map.createLayer('Tile Layer 1');
		// layer.resizeWorld();
		// //  Set the tiles for collision.
		// //  Do this BEFORE generating the p2 bodies below.
		// map.setCollisionBetween(1, 12);
		//  Convert the tilemap layer into bodies. Only tiles that collide (see above) are created.
		//  This call returns an array of body objects which you can perform addition actions on if
		//  required. There is also a parameter to control optimising the map build.
		// this.physics.p2.convertTilemap(map, layer);
		this.physics.p2.restitution = 0.5;
		this.physics.p2.gravity.y = playerGravity;

// COLLISION
		//  Turn on impact events for the world, without this we get no collision callbacks
		// this.physics.p2.setImpactEvents(true);
		// this.physics.p2.restitution = 0.8;
		// alienCollisionGroup = this.physics.p2.createCollisionGroup();
		// playerCollisionGroup = this.physics.p2.createCollisionGroup();
		// bulletCollisionGroup = this.physics.p2.createCollisionGroup();
		//  This part is vital if you want the objects with their own collision groups to still collide with the world bounds
		//  (which we do) - what this does is adjust the bounds to use its own collision group.
		//this.physics.p2.updateBoundsCollisionGroup();

// UI TEXT
		// scoreString = 'SCORE: ';
		// scoreText = this.add.text(25, 10, scoreString + score, { font: 'Impact', fontSize: '2em', fill: '#0f0' });
		// scoreText.fixedToCamera = true;

// AUDIO
			//phaserBeam = this.add.audio('beamSound', 8, false, true);
		//explosionSound = this.add.audio('explosion', 8, false, true);


		
// PLAYER
		ship = this.add.sprite(445, 200, 'ship');
		//ship.scale.setTo(5,5);
		//ship.alpha = 0;
		//this.add.tween(ship).to({ alpha: 1}, 5000, Phaser.Easing.Linear.None, true, 3, 0, false);
		//We fade the player in slowly to give them a short invincibility
		ship.animations.add('fly-left', [1], 1, true);
		ship.animations.add('fly-right', [0], 1, true);
		ship.animations.add('walk-left', [3], 1, true);
		ship.animations.add('walk-right', [2], 1, true);
		this.physics.p2.enable(ship, false);
		ship.body.fixedRotation = true;
		// ship.body.setCollisionGroup(playerCollisionGroup);
		// ship.body.collides(alienCollisionGroup, destroyShip, this);

// WEAPONS
		turret = this.add.sprite(ship.x, ship.y, 'turret');
		turret.animations.add('left', [0], 1, true);
		turret.animations.add('right', [1], 1, true);
		turret.anchor.setTo(0.8, 0.5);
		turret.scale.setTo(0.3, 0.3);
		//this.physics.p2.enable(turret, false);

		bullets = this.add.group();
		bullets.enableBody = true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;
		bullets.createMultiple(30, 'bullet', 0, false);
		bullets.setAll('anchor.x', 0.5);
		bullets.setAll('anchor.y', 0.5);
		bullets.setAll('outOfBoundsKill', true);
		bullets.setAll('checkWorldBounds', true);

		//Bring the ship to the front and then stack the weapon on top of it
		ship.bringToTop();
		turret.bringToTop();

// CONTROLS
		cursors = this.input.keyboard.createCursorKeys();
		//Add WASD Controls
		upKey = this.input.keyboard.addKey(Phaser.Keyboard.W);
		downKey = this.input.keyboard.addKey(Phaser.Keyboard.S);
		leftKey = this.input.keyboard.addKey(Phaser.Keyboard.A);
		rightKey = this.input.keyboard.addKey(Phaser.Keyboard.D);
		boostKey = this.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
		modeToggleKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		//Cannot use spacebar to fire because of keyboard ghosting
		fireButton = this.input.keyboard.addKey(Phaser.Keyboard.Z);

// CAMERA
		//  The deadzone is a Rectangle that defines the limits at which the camera will start to scroll
		//  It does NOT keep the target sprite within the rectangle, all it does is control the boundary
		//  at which the camera will start to move. So when the sprite hits the edge, the camera scrolls
		//  (until it reaches an edge of the world)
		this.camera.follow(ship);
		//this.camera.deadzone = new Phaser.Rectangle(400, 1, 10, 10);		
	},
	update: function(){

		//rotate asteroids
		bg2.angle += 0.125;

		this.gamescore = score;
		ship.body.setZeroVelocity();
		ship.body.rotation = 0;

		//turret.body.setZeroVelocity();

		// aliens.forEachAlive(moveEnemies, this);
		// ufos.forEachAlive(moveUFOs, this);
		// abductors.forEachAlive(moveAbductors, this);

		//Check for active boost
		if(boostKey.isDown){
			shipSpeed=475;
		}else{
			shipSpeed=300;
		}

		if (this.input.activePointer.isDown){
			if (this.time.now > nextFire && bullets.countDead() > 0){
				nextFire = this.time.now + fireRate;
				var bullet = bullets.getFirstExists(false);
				bullet.reset(turret.x, turret.y);
				//The maxTime parameter controls how fast the shot will arrive at the point coord
				//bullet.rotation = this.physics.arcade.moveToPointer(bullet, 1000, this.input.activePointer, 500);
				 bullet.rotation = this.physics.arcade.moveToPointer(bullet, 500);
			}
		}        

		if (playerGravity == 0 && (cursors.down.isDown || downKey.isDown)){
			ship.body.moveDown(shipSpeed);
			turret.y = ship.y;
		}

		if (playerGravity == 0 && (cursors.up.isDown || upKey.isDown)){
			ship.body.moveUp(shipSpeed);
			turret.y = ship.y;
		}
		
		if (cursors.left.isDown || leftKey.isDown){
			ship.body.moveLeft(shipSpeed);
			turret.x = ship.x;
			if(facing!='left') {
					if(playerGravity != 0){
						ship.animations.play('walk-left');
					}else{
						ship.animations.play('fly-left');
					}					
					turret.anchor.setTo(0.8, 0.5);
					turret.animations.play('left');
					facing='left';
			}
		}
		if (cursors.right.isDown || rightKey.isDown){
			ship.body.moveRight(shipSpeed);
			turret.x = ship.x;
			if(facing!='right'){
					if(playerGravity != 0){
						ship.animations.play('walk-right');
					}else{
						ship.animations.play('fly-right');
					}
					turret.anchor.setTo(0.25, 0.5);
					turret.animations.play('right');
					facing='right';
			}
		}

		turret.rotation = this.physics.arcade.angleToPointer(turret) - Math.PI;

		this.game.world.wrap(ship, 0, true);

		if (modeToggleKey.isDown){
			playerGravity = (playerGravity != 0) ? 0 : 1000;
			this.physics.p2.gravity.y = playerGravity;
		}
	},
	render: function(){
		// var zone = this.game.camera.deadzone;
		// game.context.fillStyle = 'rgba(255,0,0,0.0)';
		// game.context.fillRect(zone.x, zone.y, zone.width, zone.height);
		//this.game.debug.cameraInfo(this.camera, 500, 32);
		//this.game.debug.spriteCoords(ship, 32, 32);
		// game.debug.text('Facing: ' + facing, 32, 113);
		this.game.debug.text('Gravity: ' + playerGravity, 32, 113);
	},
	goToTitle: function(){
		this.game.state.start('TitleScreen');
	}	
}

function destroyShip(body1, body2){
		console.log('player hit! ' + lives);
		//Give player short invincibility when "spawning"
		if(body1.sprite.alpha>=1){
			//body1.sprite.kill();   
			lives--;
			var explosion = explosions.getFirstExists(false);
			//explosion.tint = 0x0000ff;
			explosion.reset(body2.x, body2.y);
			explosion.play('explosion', 30, false, true);
			explosionSound.play();
			if(lives==0){
				this.game.state.start('GameOver',true, false, score);
			}
		}
}

//////////////////////////////////////////////////////////////////////////
//  BULLETS
//  This is a simple Sprite object that we set a few properties on
//  It is fired by all of the Weapon classes
//////////////////////////////////////////////////////////////////////////
var Bullet = function (game, key) {
		Phaser.Sprite.call(this, game, 0, 0, key);
		this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
		this.anchor.set(0.5);
		this.checkWorldBounds = true;
		this.outOfBoundsKill = true;
		this.exists = false;
		this.tracking = true;
		this.scaleSpeed = 0;
};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.fire = function (x, y, angle, speed, gx, gy) {
		gx = gx || 0;
		gy = gy || 0;
		this.body.setCollisionGroup(bulletCollisionGroup);
		this.body.collides(alienCollisionGroup, destroyEnemy, this);
		this.body.collides(ufoCollisionGroup, destroyEnemy, this);
		this.body.collideWorldBounds = false;
		this.body.sprite.checkWorldBounds = true;
		this.body.sprite.outOfBoundsKill = true;
		this.reset(x, y);
		this.scale.set(1);
		this.angle = angle;
		this.body.rotation = 0;
		this.body.force.x = Math.cos(angle) * speed;    
		//this.body.force.y = Math.sin(angle) * speed;
		this.body.gravity.set(gx, gy);
};

var Weapon = {};
//////////////////////////////////////////////////////////////////////////
//  WEAPONS
//  Fires a streaming beam of lazers, very fast, in front of the ship //
//////////////////////////////////////////////////////////////////////////

Weapon.Beam = function (game) {
		// Phaser.Group.call(this, game, game.world, 'Beam', false, true, Phaser.Physics.ARCADE);
		Phaser.Group.call(this, game, game.world, 'Beam', false, true, Phaser.Physics.P2);
		this.enableBody = true;
		this.physicsBodyType = Phaser.Physics.P2JS;
		this.nextFire = 0;
		//this.bulletSpeed = 800;
		this.fireRate = 130;

		for (var i = 0; i < 64; i++) {
				this.add(new Bullet(game, 'beam'), true);
		}
		return this;
};

Weapon.Beam.prototype = Object.create(Phaser.Group.prototype);
Weapon.Beam.prototype.constructor = Weapon.Beam;

Weapon.Beam.prototype.fire = function (source, direction) {
		if (this.game.time.time < this.nextFire) { return; }
		var x = source.x + 10;
		var y = source.y + 10;
		//compensate for which direction ship is facing
		if(direction=='left'){
				this.bulletSpeed=-50000;
		}else{
				this.bulletSpeed=50000;
		}
		this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
		this.nextFire = this.game.time.time + this.fireRate;
};