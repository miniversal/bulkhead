var score = 0;
var lives = 3;
var shipSpeed = 300;       
var facing = 'right';

//Weapon Systems
var bullets = bullets;
var fireRate = 1000;
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
		this.stage.backgroundColor = '#000000';
		// this.scale.setScreenSize(true);
		//bg = this.add.tileSprite(0, 0, 1920, 1920, 'background');
		this.world.setBounds(0, 0, 1920, 600);

		// COLLISION
		//  Turn on impact events for the world, without this we get no collision callbacks
		this.physics.p2.setImpactEvents(true);
		this.physics.p2.restitution = 0.8;
		alienCollisionGroup = this.physics.p2.createCollisionGroup();
		playerCollisionGroup = this.physics.p2.createCollisionGroup();
		bulletCollisionGroup = this.physics.p2.createCollisionGroup();
		//  This part is vital if you want the objects with their own collision groups to still collide with the world bounds
		//  (which we do) - what this does is adjust the bounds to use its own collision group.
		this.physics.p2.updateBoundsCollisionGroup();

		// UI TEXT
		// scoreString = 'SCORE: ';
		// scoreText = this.add.text(25, 10, scoreString + score, { font: 'Impact', fontSize: '2em', fill: '#0f0' });
		// scoreText.fixedToCamera = true;

		// AUDIO
		//phaserBeam = this.add.audio('beamSound', 8, false, true);
		//explosionSound = this.add.audio('explosion', 8, false, true);
		
		// PLAYER
		ship = this.add.sprite(445, 200, 'ship');
        //ship.alpha = 0;
        //this.add.tween(ship).to({ alpha: 1}, 5000, Phaser.Easing.Linear.None, true, 3, 0, false);
        //We fade the player in slowly to give them a short invincibility
		ship.animations.add('left', [2,3], 10, true);
		ship.animations.add('right', [0,1], 10, true);
		this.physics.p2.enable(ship, false);
		ship.body.fixedRotation = true;
		ship.body.setCollisionGroup(playerCollisionGroup);
		ship.body.collides(alienCollisionGroup, destroyShip, this);

		// WEAPONS
		turret = this.add.sprite(ship.x+25, ship.y+35, 'turret');
		turret.anchor.setTo(0.8, 0.5);

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
        this.gamescore = score;
		ship.body.setZeroVelocity();
        ship.body.rotation = 0;

        // aliens.forEachAlive(moveEnemies, this);
        // ufos.forEachAlive(moveUFOs, this);
        // abductors.forEachAlive(moveAbductors, this);

        turret.x = ship.x+7;
	    turret.y = ship.y+5;
    	turret.rotation = this.physics.arcade.angleToPointer(turret) - Math.PI;

        //Check for active boost
        if(boostKey.isDown){
        	shipSpeed=475;
        }else{
        	shipSpeed=300;
        }
        
        if (fireButton.isDown){                      
            //weapons[currentWeapon].fire(ship, facing);
            //phaserBeam.play();
        }

        if (cursors.down.isDown || downKey.isDown){
            ship.body.moveDown(shipSpeed);
        }

        if (cursors.up.isDown || upKey.isDown){
            ship.body.moveUp(shipSpeed)
        }
        
        if (cursors.left.isDown || leftKey.isDown){
            ship.body.moveLeft(shipSpeed)
            if(facing!='left') {
                ship.animations.play('left');
                facing='left';
            }
        }
        if (cursors.right.isDown || rightKey.isDown){
            ship.body.moveRight(shipSpeed);
            if(facing!='right'){
                ship.animations.play('right');
                facing='right';
            }
        }
        this.game.world.wrap(ship, 0, true);                    
	},
	render: function(){
		// var zone = this.game.camera.deadzone;
        // game.context.fillStyle = 'rgba(255,0,0,0.0)';
        // game.context.fillRect(zone.x, zone.y, zone.width, zone.height);
        this.game.debug.cameraInfo(this.camera, 500, 32);
        this.game.debug.spriteCoords(ship, 32, 32);
        // game.debug.text('Facing: ' + facing, 32, 113);
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